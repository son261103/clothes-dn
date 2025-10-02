import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../shared/order.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';

export class AdminOrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   * @desc    Get all orders with pagination and filtering
   * @route   GET /api/orders/admin
   * @access  Private (Admin)
   */
  getAllOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.getAllOrders(req);
      sendSuccessResponse(res, result, 'Orders retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get order by ID
   * @route   GET /api/orders/admin/:id
   * @access  Private (Admin)
   */
  getOrderById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      sendSuccessResponse(res, order, 'Order retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Update order status
   * @route   PUT /api/orders/admin/:id/status
   * @access  Private (Admin)
   */
  updateOrderStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.updateOrderStatus(req.params.id, req.body);
      sendSuccessResponse(res, order, 'Order status updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Update payment status
   * @route   PUT /api/orders/admin/:id/payment
   * @access  Private (Admin)
   */
  updatePaymentStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.updatePaymentStatus(req.params.id, req.body);
      sendSuccessResponse(res, order, 'Payment status updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get order statistics
   * @route   GET /api/orders/admin/stats
   * @access  Private (Admin)
   */
  getOrderStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.orderService.getOrderStats();
      sendSuccessResponse(res, stats, 'Order statistics retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
