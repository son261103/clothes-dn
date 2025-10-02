import { Router } from 'express';
import { AdminProductController } from './product.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { uploadMultiple } from '../../middlewares/upload';
import {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
  getProductsQueryValidation
} from '../shared/product.validation';

const router = Router();
const productController = new AdminProductController();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Product statistics (should come before /:id routes)
router.get('/stats', productController.getProductStats);

// Product CRUD operations
router.get('/', validate(getProductsQueryValidation), productController.getAllProducts);
router.post('/', uploadMultiple('images', 10), validate(createProductValidation), productController.createProduct);
router.get('/:id', validate(productIdValidation), productController.getProductById);
router.put('/:id', uploadMultiple('images', 10), validate([...productIdValidation, ...updateProductValidation]), productController.updateProduct);
router.delete('/:id', validate(productIdValidation), productController.deleteProduct);

export default router;
