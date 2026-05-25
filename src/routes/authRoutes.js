const { Router } = require('express');

const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const { ensureAuth } = require('../middlewares/authMiddleware');
const { adminLoginSchema, firebaseLoginSchema } = require('../validators/authSchemas');
const authController = require('../controllers/authController');

const router = Router();

router.post('/admin/login', validate(adminLoginSchema), asyncHandler(authController.adminLogin));
router.post('/firebase/login', validate(firebaseLoginSchema), asyncHandler(authController.firebaseLogin));
router.post('/demo/login', asyncHandler(authController.demoLogin));
router.get('/me', ensureAuth, asyncHandler(authController.me));

module.exports = router;
