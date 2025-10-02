import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../shared/order.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse, sendCreatedResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class UserOrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   * @desc    Create order from cart
   * @route   POST /api/orders/user/create
   * @access  Private (User)
   */
  createOrder = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.createOrder(req.user._id, req.body);
      sendCreatedResponse(res, order, 'Order created successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get user's orders
   * @route   GET /api/orders/user
   * @access  Private (User)
   */
  getUserOrders = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.getUserOrders(req.user._id, req);
      sendSuccessResponse(res, result, 'Orders retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get order by ID (user can only access their own orders)
   * @route   GET /api/orders/user/:id
   * @access  Private (User)
   */
  getOrderById = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      
      // Check if order belongs to the user
      if (order.user._id !== req.user._id) {
        return sendErrorResponse(res, 'Access denied', 403);
      }
      
      sendSuccessResponse(res, order, 'Order retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Cancel order (only if status is pending or confirmed)
   * @route   PUT /api/orders/user/:id/cancel
   * @access  Private (User)
   */
  cancelOrder = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      
      // Check if order belongs to the user
      if (order.user._id !== req.user._id) {
        return sendErrorResponse(res, 'Access denied', 403);
      }

      // Check if order can be cancelled
      if (!['pending', 'confirmed'].includes(order.status)) {
        return sendErrorResponse(res, 'Order cannot be cancelled at this stage', 400);
      }

      const updatedOrder = await this.orderService.updateOrderStatus(req.params.id, {
        status: 'cancelled',
        cancelReason: req.body.reason || 'Cancelled by customer'
      });

      sendSuccessResponse(res, updatedOrder, 'Order cancelled successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
