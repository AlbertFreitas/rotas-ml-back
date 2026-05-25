const { Router } = require('express');

const authRoutes = require('./authRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const routeRoutes = require('./routeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/routes', routeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
