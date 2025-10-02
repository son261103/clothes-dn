import { Router } from 'express';
import { UserAuthController } from './auth.controller';
import { protect } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  refreshTokenValidation
} from '../shared/auth.validation';

const router = Router();
const authController = new UserAuthController();

// Public routes
router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/refresh', validate(refreshTokenValidation), authController.refreshToken);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/change-password', protect, validate(changePasswordValidation), authController.changePassword);
router.post('/logout', protect, authController.logout);

export default router;
