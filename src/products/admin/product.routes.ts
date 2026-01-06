import { Router, Request, Response, NextFunction } from 'express';
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

// Middleware to parse JSON fields from form data
const parseFormDataJSON = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof req.body.variants === 'string' && req.body.variants) {
      req.body.variants = JSON.parse(req.body.variants);
    }
    if (typeof req.body.tags === 'string' && req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }
    if (typeof req.body.dimensions === 'string' && req.body.dimensions) {
      req.body.dimensions = JSON.parse(req.body.dimensions);
    }
    // Convert string to boolean
    if (req.body.isActive !== undefined) {
      req.body.isActive = req.body.isActive === 'true' || req.body.isActive === true;
    }
    if (req.body.isFeatured !== undefined) {
      req.body.isFeatured = req.body.isFeatured === 'true' || req.body.isFeatured === true;
    }
    // Convert price strings to numbers
    if (req.body.price !== undefined) {
      req.body.price = parseFloat(req.body.price);
    }
    if (req.body.salePrice !== undefined && req.body.salePrice !== '') {
      req.body.salePrice = parseFloat(req.body.salePrice);
    } else {
      delete req.body.salePrice; // Remove empty salePrice
    }
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid JSON in form data' });
  }
};

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Product statistics (should come before /:id routes)
router.get('/stats', productController.getProductStats);

// Product CRUD operations
router.get('/', validate(getProductsQueryValidation), productController.getAllProducts);
router.post('/', uploadMultiple('images', 10), parseFormDataJSON, validate(createProductValidation), productController.createProduct);
router.get('/:id', validate(productIdValidation), productController.getProductById);
router.put('/:id', uploadMultiple('images', 10), parseFormDataJSON, validate([...productIdValidation, ...updateProductValidation]), productController.updateProduct);
router.delete('/:id', validate(productIdValidation), productController.deleteProduct);

export default router;

