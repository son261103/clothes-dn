import { Router } from 'express';
import { AdminAuthController } from './auth.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  refreshTokenValidation
} from '../shared/auth.validation';

const router = Router();
const authController = new AdminAuthController();

// Public routes
router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/refresh', validate(refreshTokenValidation), authController.refreshToken);

// Protected routes (Admin only)
router.get('/profile', protect, authorize('admin'), authController.getProfile);
router.put('/change-password', protect, authorize('admin'), validate(changePasswordValidation), authController.changePassword);
router.post('/logout', protect, authorize('admin'), authController.logout);

export default router;
