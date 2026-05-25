const {
  getRoutesByUser,
  summarize,
  quickWindowSummary,
  dailyCharts,
  monthlyComparison,
  periodAnalysis,
} = require('../services/dashboardService');

const summary = async (req, res) => {
  const selectedRoutes = await getRoutesByUser(req.auth.sub, req.query);
  const allRoutes = await getRoutesByUser(req.auth.sub);

  return res.json({
    period: {
      month: req.query.month ? Number(req.query.month) : null,
      year: req.query.year ? Number(req.query.year) : null,
      startDate: req.query.startDate || null,
      endDate: req.query.endDate || null,
    },
    cards: summarize(selectedRoutes),
    quick: quickWindowSummary(allRoutes),
  });
};

const charts = async (req, res) => {
  const selectedRoutes = await getRoutesByUser(req.auth.sub, req.query);

  return res.json({
    daily: dailyCharts(selectedRoutes),
    brutoVsLiquido: dailyCharts(selectedRoutes).map((row) => ({
      date: row.date,
      gross: row.considered,
      net: row.net,
    })),
  });
};

const monthly = async (req, res) => {
  const allRoutes = await getRoutesByUser(req.auth.sub);
  return res.json(monthlyComparison(allRoutes));
};

const analysis = async (req, res) => {
  const selectedRoutes = await getRoutesByUser(req.auth.sub, req.query);

  return res.json(
    periodAnalysis(selectedRoutes, {
      month: req.query.month ? Number(req.query.month) : null,
      year: req.query.year ? Number(req.query.year) : null,
    })
  );
};

const statement = async (req, res) => {
  const allRoutes = await getRoutesByUser(req.auth.sub);
  return res.json(summarize(allRoutes));
};

module.exports = {
  summary,
  charts,
  monthly,
  analysis,
  statement,
};
