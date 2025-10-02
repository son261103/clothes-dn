import { Router } from 'express';
import { UserBrandController } from './brand.controller';
import { validate } from '../../middlewares/validation';
import {
  brandIdValidation,
  brandSlugValidation,
  getBrandsQueryValidation
} from '../shared/brand.validation';

const router = Router();
const brandController = new UserBrandController();

// Public routes for users to view brands
router.get('/slug/:slug', validate(brandSlugValidation), brandController.getBrandBySlug);
router.get('/:id', validate(brandIdValidation), brandController.getBrandById);
router.get('/', validate(getBrandsQueryValidation), brandController.getAllBrands);

export default router;
