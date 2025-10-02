import { Router } from 'express';
import { AdminUserController } from './user.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  adminUpdateUserValidation,
  userIdValidation,
  getUsersQueryValidation
} from '../shared/user.validation';

const router = Router();
const adminUserController = new AdminUserController();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// User statistics (should come before /:id routes)
router.get('/stats', adminUserController.getUserStats);

// User CRUD operations
router.get('/', validate(getUsersQueryValidation), adminUserController.getAllUsers);
router.get('/:id', validate(userIdValidation), adminUserController.getUserById);
router.put('/:id', validate([...userIdValidation, ...adminUpdateUserValidation]), adminUserController.updateUser);
router.delete('/:id', validate(userIdValidation), adminUserController.deleteUser);
router.delete('/:id/permanent', validate(userIdValidation), adminUserController.permanentlyDeleteUser);
router.patch('/:id/toggle-status', validate(userIdValidation), adminUserController.toggleUserStatus);

export default router;
