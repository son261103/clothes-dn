import { Router } from 'express';
import { UserCategoryController } from './category.controller';
import { validate } from '../../middlewares/validation';
import {
  categoryIdValidation,
  categorySlugValidation,
  getCategoriesQueryValidation
} from '../shared/category.validation';

const router = Router();
const categoryController = new UserCategoryController();

// Public routes for users to view categories
router.get('/tree', categoryController.getCategoryTree);
router.get('/slug/:slug', validate(categorySlugValidation), categoryController.getCategoryBySlug);
router.get('/:id', validate(categoryIdValidation), categoryController.getCategoryById);
router.get('/', validate(getCategoriesQueryValidation), categoryController.getAllCategories);

export default router;
