const { Router } = require('express');

const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const { ensureAuth } = require('../middlewares/authMiddleware');
const { authRateLimiter } = require('../middlewares/rateLimitMiddleware');
const { adminLoginSchema, firebaseLoginSchema } = require('../validators/authSchemas');
const authController = require('../controllers/authController');

const router = Router();

router.post('/admin/login', authRateLimiter, validate(adminLoginSchema), asyncHandler(authController.adminLogin));
router.post('/firebase/login', authRateLimiter, validate(firebaseLoginSchema), asyncHandler(authController.firebaseLogin));
router.post('/demo/login', authRateLimiter, asyncHandler(authController.demoLogin));
router.get('/me', ensureAuth, asyncHandler(authController.me));

module.exports = router;
