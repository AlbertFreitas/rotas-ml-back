const dayjs = require('dayjs');
const { Op } = require('sequelize');

const DeliveryRoute = require('../models/DeliveryRoute');
const { round2, toNumber } = require('../utils/finance');

const monthNames = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const buildDateWhere = ({ month, year, startDate, endDate }) => {
  if (month && year) {
    const start = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
    const end = start.endOf('month');
    return { [Op.between]: [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')] };
  }

  if (startDate && endDate) {
    return { [Op.between]: [startDate, endDate] };
  }

  return undefined;
};

const getRoutesByUser = async (userId, filters = {}) => {
  const dateWhere = buildDateWhere(filters);
  const where = { user_id: userId };

  if (dateWhere) {
    where.route_date = dateWhere;
  }

  if (filters.status) {
    where.status = String(filters.status).toUpperCase();
  }

  return DeliveryRoute.findAll({
    where,
    order: [
      ['route_date', 'ASC'],
      ['created_at', 'ASC'],
    ],
  });
};

const summarize = (routes) => {
  const totals = routes.reduce(
    (acc, route) => {
      acc.totalGross += toNumber(route.gross_amount);
      acc.totalConsidered += toNumber(route.considered_amount);
      acc.totalNet += toNumber(route.net_amount);
      acc.totalFuel += toNumber(route.fuel_cost);
      acc.totalLiters += toNumber(route.fuel_liters);
      acc.totalKm += toNumber(route.km);
      acc.totalRoutes += 1;
      if (route.status === 'CONCLUIDA') acc.completedRoutes += 1;
      if (route.status === 'CANCELADA') acc.canceledRoutes += 1;
      return acc;
    },
    {
      totalGross: 0,
      totalConsidered: 0,
      totalNet: 0,
      totalFuel: 0,
      totalLiters: 0,
      totalKm: 0,
      totalRoutes: 0,
      completedRoutes: 0,
      canceledRoutes: 0,
    }
  );

  const avgProfitPerRoute = totals.totalRoutes > 0 ? totals.totalNet / totals.totalRoutes : 0;
  const avgProfitPerKm = totals.totalKm > 0 ? totals.totalNet / totals.totalKm : 0;
  const avgCostPerKm = totals.totalKm > 0 ? totals.totalFuel / totals.totalKm : 0;

  return {
    ...Object.fromEntries(Object.entries(totals).map(([k, v]) => [k, round2(v)])),
    averageProfitPerRoute: round2(avgProfitPerRoute),
    averageProfitPerKm: round2(avgProfitPerKm),
    averageCostPerKm: round2(avgCostPerKm),
  };
};

const quickWindowSummary = (routes) => {
  const today = dayjs().format('YYYY-MM-DD');
  const weekStart = dayjs().startOf('week').format('YYYY-MM-DD');
  const monthStart = dayjs().startOf('month').format('YYYY-MM-DD');

  const byRange = (startDate, endDate) =>
    summarize(routes.filter((route) => route.route_date >= startDate && route.route_date <= endDate));

  return {
    today: byRange(today, today),
    week: byRange(weekStart, today),
    month: byRange(monthStart, today),
  };
};

const dailyCharts = (routes) => {
  const grouped = routes.reduce((acc, route) => {
    const key = route.route_date;
    if (!acc[key]) {
      acc[key] = {
        date: key,
        gross: 0,
        considered: 0,
        fuel: 0,
        net: 0,
      };
    }

    acc[key].gross += toNumber(route.gross_amount);
    acc[key].considered += toNumber(route.considered_amount);
    acc[key].fuel += toNumber(route.fuel_cost);
    acc[key].net += toNumber(route.net_amount);

    return acc;
  }, {});

  return Object.values(grouped).map((row) => ({
    date: row.date,
    gross: round2(row.gross),
    considered: round2(row.considered),
    fuel: round2(row.fuel),
    net: round2(row.net),
  }));
};

const monthlyComparison = (routes) => {
  const grouped = routes.reduce((acc, route) => {
    const date = dayjs(route.route_date);
    const key = `${date.year()}-${String(date.month() + 1).padStart(2, '0')}`;

    if (!acc[key]) {
      acc[key] = {
        key,
        label: `${monthNames[date.month()]}/${date.year()}`,
        gross: 0,
        fuel: 0,
        net: 0,
        km: 0,
        routes: 0,
      };
    }

    acc[key].gross += toNumber(route.gross_amount);
    acc[key].fuel += toNumber(route.fuel_cost);
    acc[key].net += toNumber(route.net_amount);
    acc[key].km += toNumber(route.km);
    acc[key].routes += 1;

    return acc;
  }, {});

  return Object.values(grouped)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => ({
      month: item.label,
      gross: round2(item.gross),
      fuel: round2(item.fuel),
      net: round2(item.net),
      km: round2(item.km),
      routes: item.routes,
    }));
};

const periodAnalysis = (routes, { month, year }) => {
  const summary = summarize(routes);
  const bestRoute = [...routes].sort((a, b) => toNumber(b.net_amount) - toNumber(a.net_amount))[0] || null;

  const concludedRoutes = routes.filter((route) => route.status === 'CONCLUIDA');
  const worstProfitRoute = [...concludedRoutes].sort(
    (a, b) => toNumber(a.profit_per_km) - toNumber(b.profit_per_km)
  )[0] || null;

  return {
    month,
    year,
    summary,
    insights: {
      bestRoute: bestRoute
        ? {
            id: bestRoute.id,
            routeName: bestRoute.route_name,
            date: bestRoute.route_date,
            netAmount: round2(bestRoute.net_amount),
          }
        : null,
      kmInsight: {
        totalKm: summary.totalKm,
        averageCostPerKm: summary.averageCostPerKm,
      },
      canceledRoutes: summary.canceledRoutes,
      worstProfitRoute: worstProfitRoute
        ? {
            id: worstProfitRoute.id,
            routeName: worstProfitRoute.route_name,
            profitPerKm: round2(worstProfitRoute.profit_per_km),
          }
        : null,
    },
  };
};

module.exports = {
  getRoutesByUser,
  summarize,
  quickWindowSummary,
  dailyCharts,
  monthlyComparison,
  periodAnalysis,
};
