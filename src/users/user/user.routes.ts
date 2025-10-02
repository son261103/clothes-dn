import { Router } from 'express';
import { UserController } from './user.controller';
import { protect } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { updateUserValidation } from '../shared/user.validation';

const router = Router();
const userController = new UserController();

// All routes are protected (require authentication)
router.use(protect);

// User profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateUserValidation), userController.updateProfile);
router.delete('/profile', userController.deactivateAccount);

export default router;
