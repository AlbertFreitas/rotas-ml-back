const { Router } = require('express');

const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const { ensureAuth, ensureRole } = require('../middlewares/authMiddleware');
const { upsertVehicleSchema } = require('../validators/vehicleSchemas');
const vehicleController = require('../controllers/vehicleController');

const router = Router();

router.use(ensureAuth, ensureRole('user'));

router.get('/me', asyncHandler(vehicleController.getMyVehicle));
router.put('/me', validate(upsertVehicleSchema), asyncHandler(vehicleController.upsertMyVehicle));

module.exports = router;
