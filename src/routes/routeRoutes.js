const { Router } = require('express');

const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const { ensureAuth, ensureRole } = require('../middlewares/authMiddleware');
const { createRouteSchema, listRoutesQuerySchema } = require('../validators/routeSchemas');
const routeController = require('../controllers/routeController');

const router = Router();

router.use(ensureAuth, ensureRole('user'));

router.post('/', validate(createRouteSchema), asyncHandler(routeController.createRoute));
router.get('/', validate(listRoutesQuerySchema, 'query'), asyncHandler(routeController.listRoutes));
router.delete('/:id', asyncHandler(routeController.deleteRoute));

module.exports = router;
