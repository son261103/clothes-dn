import { Router } from 'express';
import { AdminOrderController } from './order.controller';
import { protect, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validation';
import {
  updateOrderStatusValidation,
  updatePaymentStatusValidation,
  orderIdValidation,
  getOrdersQueryValidation
} from '../shared/order.validation';

const router = Router();
const orderController = new AdminOrderController();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Order statistics (should come before /:id routes)
router.get('/stats', orderController.getOrderStats);

// Order management operations
router.get('/', validate(getOrdersQueryValidation), orderController.getAllOrders);
router.get('/:id', validate(orderIdValidation), orderController.getOrderById);
router.put('/:id/status', validate([...orderIdValidation, ...updateOrderStatusValidation]), orderController.updateOrderStatus);
router.put('/:id/payment', validate([...orderIdValidation, ...updatePaymentStatusValidation]), orderController.updatePaymentStatus);

export default router;
