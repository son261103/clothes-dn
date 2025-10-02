import { Router } from 'express';
import { AdminBrandController } from './brand.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import { uploadSingle } from '../../middlewares/upload';
import {
  createBrandValidation,
  updateBrandValidation,
  brandIdValidation,
  getBrandsQueryValidation
} from '../shared/brand.validation';

const router = Router();
const brandController = new AdminBrandController();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Brand statistics (should come before /:id routes)
router.get('/stats', brandController.getBrandStats);

// Brand CRUD operations
router.get('/', validate(getBrandsQueryValidation), brandController.getAllBrands);
router.post('/', uploadSingle('logo'), validate(createBrandValidation), brandController.createBrand);
router.get('/:id', validate(brandIdValidation), brandController.getBrandById);
router.put('/:id', uploadSingle('logo'), validate([...brandIdValidation, ...updateBrandValidation]), brandController.updateBrand);
router.delete('/:id', validate(brandIdValidation), brandController.deleteBrand);

export default router;
