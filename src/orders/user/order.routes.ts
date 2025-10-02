import { Router } from 'express';
import { UserOrderController } from './order.controller';
import { protect } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  createOrderValidation,
  cancelOrderValidation,
  orderIdValidation,
  getOrdersQueryValidation
} from '../shared/order.validation';

const router = Router();
const orderController = new UserOrderController();

// All routes require user authentication
router.use(protect);

// Order operations
router.post('/create', validate(createOrderValidation), orderController.createOrder);
router.get('/', validate(getOrdersQueryValidation), orderController.getUserOrders);
router.get('/:id', validate(orderIdValidation), orderController.getOrderById);
router.put('/:id/cancel', validate([...orderIdValidation, ...cancelOrderValidation]), orderController.cancelOrder);

export default router;
