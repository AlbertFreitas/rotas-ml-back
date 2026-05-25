const { Router } = require('express');

const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const { ensureAuth, ensureRole } = require('../middlewares/authMiddleware');
const { periodSchema } = require('../validators/dashboardSchemas');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

router.use(ensureAuth, ensureRole('user'));

router.get('/summary', validate(periodSchema, 'query'), asyncHandler(dashboardController.summary));
router.get('/charts', validate(periodSchema, 'query'), asyncHandler(dashboardController.charts));
router.get('/monthly-comparison', asyncHandler(dashboardController.monthly));
router.get('/analysis', validate(periodSchema, 'query'), asyncHandler(dashboardController.analysis));
router.get('/statement', asyncHandler(dashboardController.statement));

module.exports = router;
