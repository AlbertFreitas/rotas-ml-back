const { Op } = require('sequelize');
const dayjs = require('dayjs');

const DeliveryRoute = require('../models/DeliveryRoute');
const { calculateRouteMetrics } = require('../services/routeFinanceService');
const AppError = require('../utils/AppError');
const { getVehicleForRoute } = require('./vehicleController');

const normalizeStatus = (status) => String(status || '').toUpperCase();

const buildRouteWhere = (userId, query) => {
  const where = { user_id: userId };

  if (query.status) {
    where.status = normalizeStatus(query.status);
  }

  if (query.month && query.year) {
    const start = dayjs(`${query.year}-${String(query.month).padStart(2, '0')}-01`);
    const end = start.endOf('month');
    where.route_date = { [Op.between]: [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')] };
  }

  if (query.startDate && query.endDate) {
    where.route_date = { [Op.between]: [query.startDate, query.endDate] };
  }

  return where;
};

const createRoute = async (req, res) => {
  const { routeName, routeDate, status, grossAmount, km, consumptionKmL, fuelPrice, vehicleId, notes } = req.body;
  const normalizedStatus = normalizeStatus(status);

  const vehicle = await getVehicleForRoute({ userId: req.auth.sub, vehicleId });
  const appliedConsumption = consumptionKmL ?? Number(vehicle?.consumption_km_l);
  const appliedFuelPrice = fuelPrice ?? Number(vehicle?.fuel_price);

  if (!appliedConsumption || !appliedFuelPrice) {
    throw new AppError('Consumo e valor do litro são obrigatórios. Configure o veículo padrão.', 422);
  }

  const metrics = calculateRouteMetrics({
    status: normalizedStatus,
    grossAmount,
    km,
    consumptionKmL: appliedConsumption,
    fuelPrice: appliedFuelPrice,
  });

  const route = await DeliveryRoute.create({
    user_id: req.auth.sub,
    vehicle_id: vehicle?.id || null,
    route_name: routeName,
    route_date: routeDate,
    status: normalizedStatus,
    gross_amount: grossAmount,
    considered_amount: metrics.consideredAmount,
    km,
    consumption_km_l: appliedConsumption,
    fuel_price: appliedFuelPrice,
    fuel_liters: metrics.fuelLiters,
    fuel_cost: metrics.fuelCost,
    net_amount: metrics.netAmount,
    profit_per_km: metrics.profitPerKm,
    cost_per_km: metrics.costPerKm,
    notes: notes || null,
  });

  return res.status(201).json(route);
};

const listRoutes = async (req, res) => {
  const routes = await DeliveryRoute.findAll({
    where: buildRouteWhere(req.auth.sub, req.query),
    order: [
      ['route_date', 'DESC'],
      ['created_at', 'DESC'],
    ],
  });

  return res.json(routes);
};

const deleteRoute = async (req, res) => {
  const { id } = req.params;
  const route = await DeliveryRoute.findOne({ where: { id, user_id: req.auth.sub } });

  if (!route) {
    throw new AppError('Rota não encontrada.', 404);
  }

  await route.destroy();

  return res.status(204).send();
};

module.exports = {
  createRoute,
  listRoutes,
  deleteRoute,
};
