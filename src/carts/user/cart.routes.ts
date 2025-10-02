import { Router } from 'express';
import { UserCartController } from './cart.controller';
import { protect } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  addToCartValidation,
  updateCartItemValidation,
  removeFromCartValidation
} from '../shared/cart.validation';

const router = Router();
const cartController = new UserCartController();

// All routes require user authentication
router.use(protect);

// Cart operations
router.get('/summary', cartController.getCartSummary);
router.get('/', cartController.getCart);
router.post('/add', validate(addToCartValidation), cartController.addToCart);
router.put('/update', validate(updateCartItemValidation), cartController.updateCartItem);
router.delete('/remove', validate(removeFromCartValidation), cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

export default router;
