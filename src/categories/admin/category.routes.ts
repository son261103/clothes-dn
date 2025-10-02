import { Router } from 'express';
import { AdminCategoryController } from './category.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { uploadSingle } from '../../middlewares/upload';
import {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
  getCategoriesQueryValidation
} from '../shared/category.validation';

const router = Router();
const categoryController = new AdminCategoryController();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Category tree (should come before /:id routes)
router.get('/tree', categoryController.getCategoryTree);

// Category CRUD operations
router.get('/', validate(getCategoriesQueryValidation), categoryController.getAllCategories);
router.post('/', uploadSingle('image'), validate(createCategoryValidation), categoryController.createCategory);
router.get('/:id', validate(categoryIdValidation), categoryController.getCategoryById);
router.put('/:id', uploadSingle('image'), validate([...categoryIdValidation, ...updateCategoryValidation]), categoryController.updateCategory);
router.delete('/:id', validate(categoryIdValidation), categoryController.deleteCategory);

export default router;
