import { Order, IOrder } from './order.model';
import { Cart } from '../../carts/shared/cart.model';
import { Product } from '../../products/shared/product.model';
import { 
  CreateOrderDto, 
  UpdateOrderStatusDto,
  UpdatePaymentStatusDto,
  OrderResponseDto,
  OrderStatsDto 
} from './order.dto';
import { 
  getPaginationParams, 
  calculatePagination, 
  getSkipValue,
  PaginatedResponse 
} from '../../utils/pagination';
import { Request } from 'express';

export class OrderService {
  /**
   * Create order from cart
   */
  async createOrder(userId: string, orderData: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      // Get user's cart
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Validate stock availability and calculate totals
      let subtotal = 0;
      const orderItems = [];

      for (const cartItem of cart.items) {
        const product = cartItem.product as any;
        
        if (!product.isActive) {
          throw new Error(`Product ${product.name} is no longer available`);
        }

        // Find the specific variant
        const variant = product.variants.find(
          (v: any) => v.size === cartItem.variant.size && v.color === cartItem.variant.color
        );

        if (!variant || variant.stock < cartItem.quantity) {
          throw new Error(`Insufficient stock for ${product.name} (${cartItem.variant.size}, ${cartItem.variant.color})`);
        }

        const itemSubtotal = cartItem.price * cartItem.quantity;
        subtotal += itemSubtotal;

        orderItems.push({
          product: product._id,
          variant: cartItem.variant,
          quantity: cartItem.quantity,
          price: cartItem.price,
          subtotal: itemSubtotal
        });
      }

      // Calculate fees and total
      const shippingFee = this.calculateShippingFee(subtotal);
      const tax = this.calculateTax(subtotal);
      const totalAmount = subtotal + shippingFee + tax - (orderData as any).discount || 0;

      // Create order
      const order = await Order.create({
        user: userId,
        items: orderItems,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        subtotal,
        shippingFee,
        tax,
        totalAmount,
        notes: orderData.notes
      });

      // Update product stock
      for (const item of orderItems) {
        await Product.findOneAndUpdate(
          { 
            _id: item.product,
            'variants.size': item.variant.size,
            'variants.color': item.variant.color
          },
          { 
            $inc: { 
              'variants.$.stock': -item.quantity,
              salesCount: item.quantity
            }
          }
        );
      }

      // Clear cart
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } }
      );

      // Return populated order
      const populatedOrder = await Order.findById(order._id)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name slug images');

      return this.formatOrderResponse(populatedOrder!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all orders with pagination and filtering
   */
  async getAllOrders(req: Request): Promise<PaginatedResponse<OrderResponseDto>> {
    try {
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      // Build filter query
      const filter: any = {};

      // Status filter
      if (req.query.status) {
        filter.status = req.query.status;
      }

      // Payment status filter
      if (req.query.paymentStatus) {
        filter.paymentStatus = req.query.paymentStatus;
      }

      // Payment method filter
      if (req.query.paymentMethod) {
        filter.paymentMethod = req.query.paymentMethod;
      }

      // Date range filter
      if (req.query.dateFrom || req.query.dateTo) {
        filter.createdAt = {};
        if (req.query.dateFrom) {
          filter.createdAt.$gte = new Date(req.query.dateFrom as string);
        }
        if (req.query.dateTo) {
          filter.createdAt.$lte = new Date(req.query.dateTo as string);
        }
      }

      // Search by order number or user name
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search as string, 'i');
        filter.$or = [
          { orderNumber: searchRegex },
          { 'user.firstName': searchRegex },
          { 'user.lastName': searchRegex },
          { 'user.email': searchRegex }
        ];
      }

      // Get total count
      const totalCount = await Order.countDocuments(filter);

      // Get orders
      const orders = await Order.find(filter)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name slug images')
        .sort(sort)
        .skip(skip)
        .limit(limit);

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedOrders = orders.map(order => this.formatOrderResponse(order));

      return {
        success: true,
        data: formattedOrders,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's orders
   */
  async getUserOrders(userId: string, req: Request): Promise<PaginatedResponse<OrderResponseDto>> {
    try {
      req.query.user = userId;
      
      const { page, limit, sort } = getPaginationParams(req);
      const skip = getSkipValue(page, limit);

      const filter: any = { user: userId };

      // Status filter
      if (req.query.status) {
        filter.status = req.query.status;
      }

      // Get total count
      const totalCount = await Order.countDocuments(filter);

      // Get orders
      const orders = await Order.find(filter)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name slug images')
        .sort(sort)
        .skip(skip)
        .limit(limit);

      // Calculate pagination
      const pagination = calculatePagination(page, limit, totalCount);

      // Format response
      const formattedOrders = orders.map(order => this.formatOrderResponse(order));

      return {
        success: true,
        data: formattedOrders,
        pagination
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string): Promise<OrderResponseDto> {
    try {
      const order = await Order.findById(orderId)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name slug images');

      if (!order) {
        throw new Error('Order not found');
      }

      return this.formatOrderResponse(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, updateData: UpdateOrderStatusDto): Promise<OrderResponseDto> {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      // Update order
      order.status = updateData.status;
      if (updateData.trackingNumber) {
        order.trackingNumber = updateData.trackingNumber;
      }
      if (updateData.cancelReason) {
        order.cancelReason = updateData.cancelReason;
      }

      await order.save();

      // Return populated order
      const populatedOrder = await Order.findById(order._id)
        .populate('user', 'firstName lastName email')
        .populate('items.product', 'name slug images');

      return this.formatOrderResponse(populatedOrder!);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(orderId: string, updateData: UpdatePaymentStatusDto): Promise<OrderResponseDto> {
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: updateData.paymentStatus },
        { new: true }
      ).populate('user', 'firstName lastName email')
       .populate('items.product', 'name slug images');

      if (!order) {
        throw new Error('Order not found');
      }

      return this.formatOrderResponse(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get order statistics
   */
  async getOrderStats(): Promise<OrderStatsDto> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [basicStats, paymentMethodStats, todayStats] = await Promise.all([
        // Basic order statistics
        Order.aggregate([
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              pendingOrders: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
              confirmedOrders: { $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] } },
              processingOrders: { $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] } },
              shippedOrders: { $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] } },
              deliveredOrders: { $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] } },
              cancelledOrders: { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
              totalRevenue: { $sum: '$totalAmount' },
              averageOrderValue: { $avg: '$totalAmount' }
            }
          }
        ]),

        // Payment method statistics
        Order.aggregate([
          { $group: { _id: '$paymentMethod', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]),

        // Today's statistics
        Order.aggregate([
          { $match: { createdAt: { $gte: today } } },
          {
            $group: {
              _id: null,
              ordersToday: { $sum: 1 },
              revenueToday: { $sum: '$totalAmount' }
            }
          }
        ])
      ]);

      const stats = basicStats[0] || {};
      const todayData = todayStats[0] || { ordersToday: 0, revenueToday: 0 };

      // Calculate payment method percentages
      const totalOrders = stats.totalOrders || 0;
      const topPaymentMethods = paymentMethodStats.map(item => ({
        method: item._id,
        count: item.count,
        percentage: totalOrders > 0 ? Math.round((item.count / totalOrders) * 100) : 0
      }));

      return {
        totalOrders: stats.totalOrders || 0,
        pendingOrders: stats.pendingOrders || 0,
        confirmedOrders: stats.confirmedOrders || 0,
        processingOrders: stats.processingOrders || 0,
        shippedOrders: stats.shippedOrders || 0,
        deliveredOrders: stats.deliveredOrders || 0,
        cancelledOrders: stats.cancelledOrders || 0,
        totalRevenue: stats.totalRevenue || 0,
        averageOrderValue: stats.averageOrderValue || 0,
        ordersToday: todayData.ordersToday,
        revenueToday: todayData.revenueToday,
        topPaymentMethods
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculate shipping fee based on subtotal
   */
  private calculateShippingFee(subtotal: number): number {
    // Free shipping for orders over 500,000 VND
    if (subtotal >= 500000) return 0;
    
    // Standard shipping fee
    return 30000;
  }

  /**
   * Calculate tax (VAT 10%)
   */
  private calculateTax(subtotal: number): number {
    return Math.round(subtotal * 0.1);
  }

  /**
   * Format order response
   */
  private formatOrderResponse(order: IOrder): OrderResponseDto {
    return {
      _id: order._id,
      orderNumber: order.orderNumber,
      user: order.user as any,
      items: order.items.map((item, index) => ({
        _id: (item as any)._id?.toString() || index.toString(),
        product: item.product as any,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal
      })),
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      tax: order.tax,
      discount: order.discount,
      totalAmount: order.totalAmount,
      notes: order.notes,
      trackingNumber: order.trackingNumber,
      orderAge: (order as any).orderAge || 0,
      shippedAt: order.shippedAt,
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt,
      cancelReason: order.cancelReason,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
  }
}
