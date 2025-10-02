import { Router } from 'express';
import { UserProductController } from './product.controller';
import { validate } from '../../middlewares/validation';
import {
  productIdValidation,
  productSlugValidation,
  getProductsQueryValidation,
  searchProductsValidation
} from '../shared/product.validation';

const router = Router();
const productController = new UserProductController();

// Public routes for users to view products
router.get('/featured', validate(getProductsQueryValidation), productController.getFeaturedProducts);
router.get('/search', validate(searchProductsValidation), productController.searchProducts);
router.get('/slug/:slug', validate(productSlugValidation), productController.getProductBySlug);
router.get('/:id', validate(productIdValidation), productController.getProductById);
router.get('/', validate(getProductsQueryValidation), productController.getAllProducts);

export default router;
