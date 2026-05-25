const Vehicle = require('../models/Vehicle');
const AppError = require('../utils/AppError');

const getMyVehicle = async (req, res) => {
  const vehicle = await Vehicle.findOne({
    where: {
      user_id: req.auth.sub,
      is_default: true,
    },
  });

  return res.json(vehicle || null);
};

const upsertMyVehicle = async (req, res) => {
  const { name, consumptionKmL, fuelPrice } = req.body;

  let vehicle = await Vehicle.findOne({
    where: {
      user_id: req.auth.sub,
      is_default: true,
    },
  });

  if (!vehicle) {
    vehicle = await Vehicle.create({
      user_id: req.auth.sub,
      name,
      consumption_km_l: consumptionKmL,
      fuel_price: fuelPrice,
      is_default: true,
    });
  } else {
    vehicle.name = name;
    vehicle.consumption_km_l = consumptionKmL;
    vehicle.fuel_price = fuelPrice;
    await vehicle.save();
  }

  return res.json(vehicle);
};

const getVehicleForRoute = async ({ userId, vehicleId }) => {
  if (!vehicleId) {
    return Vehicle.findOne({ where: { user_id: userId, is_default: true } });
  }

  const vehicle = await Vehicle.findOne({
    where: {
      id: vehicleId,
      user_id: userId,
    },
  });

  if (!vehicle) {
    throw new AppError('Veículo não encontrado para este usuário.', 404);
  }

  return vehicle;
};

module.exports = {
  getMyVehicle,
  upsertMyVehicle,
  getVehicleForRoute,
};
