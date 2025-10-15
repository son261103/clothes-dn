import { api } from '../lib/api';
import {
  Order,
  OrderItem,
  CreateOrderData,
  CancelOrderData,
  ApiResponse,
  PaginatedResponse,
  GetOrdersQuery
} from '../types';

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByPaymentStatus: Record<string, number>;
  averageOrderValue: number;
  recentOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRefunds: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  topSellingProducts: Array<{
    product: string;
    quantity: number;
    revenue: number;
  }>;
}

export class OrderService {
  // User Order endpoints
  static async createOrder(orderData: CreateOrderData): Promise<ApiResponse<Order>> {
    const response = await api.post<ApiResponse<Order>>('/orders/user/create', orderData);
    return response.data;
  }

  static async getUserOrders(params?: GetOrdersQuery): Promise<PaginatedResponse<Order[]>> {
    const response = await api.get<PaginatedResponse<Order[]>>('/orders/user', { params });
    return response.data;
  }

  static async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    const response = await api.get<ApiResponse<Order>>(`/orders/user/${orderId}`);
    return response.data;
  }

  static async cancelOrder(orderId: string, cancelData: CancelOrderData): Promise<ApiResponse<Order>> {
    const response = await api.put<ApiResponse<Order>>(`/orders/user/${orderId}/cancel`, cancelData);
    return response.data;
  }

  // Admin Order endpoints
  static async getAllOrders(params?: GetOrdersQuery): Promise<PaginatedResponse<Order[]>> {
    const response = await api.get<PaginatedResponse<Order[]>>('/orders/admin', { params });
    return response.data;
  }

  static async adminGetOrderById(orderId: string): Promise<ApiResponse<Order>> {
    const response = await api.get<ApiResponse<Order>>(`/orders/admin/${orderId}`);
    return response.data;
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<ApiResponse<Order>> {
    const response = await api.put<ApiResponse<Order>>(`/orders/admin/${orderId}/status`, { status });
    return response.data;
  }

  static async updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Promise<ApiResponse<Order>> {
    const response = await api.put<ApiResponse<Order>>(`/orders/admin/${orderId}/payment`, { paymentStatus });
    return response.data;
  }

  static async getOrderStats(): Promise<ApiResponse<OrderStats>> {
    const response = await api.get<ApiResponse<OrderStats>>('/orders/admin/stats');
    return response.data;
  }

  // Utility methods
  static getOrderStatusText(status: Order['status']): string {
    const statusMap: Record<Order['status'], string> = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  }

  static getPaymentStatusText(status: Order['paymentStatus']): string {
    const statusMap: Record<Order['paymentStatus'], string> = {
      'pending': 'Pending',
      'paid': 'Paid',
      'failed': 'Failed',
      'refunded': 'Refunded'
    };
    return statusMap[status] || status;
  }

  static getOrderStatusColor(status: Order['status']): string {
    const colorMap: Record<Order['status'], string> = {
      'pending': 'text-yellow-600 bg-yellow-100',
      'confirmed': 'text-blue-600 bg-blue-100',
      'processing': 'text-purple-600 bg-purple-100',
      'shipped': 'text-indigo-600 bg-indigo-100',
      'delivered': 'text-green-600 bg-green-100',
      'cancelled': 'text-red-600 bg-red-100'
    };
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  }

  static getPaymentStatusColor(status: Order['paymentStatus']): string {
    const colorMap: Record<Order['paymentStatus'], string> = {
      'pending': 'text-yellow-600 bg-yellow-100',
      'paid': 'text-green-600 bg-green-100',
      'failed': 'text-red-600 bg-red-100',
      'refunded': 'text-orange-600 bg-orange-100'
    };
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  }

  static isOrderCancellable(order: Order): boolean {
    return order.status === 'pending' || order.status === 'confirmed';
  }

  static isOrderReturnable(order: Order): boolean {
    return order.status === 'delivered';
  }

  static canTrackOrder(order: Order): boolean {
    return ['confirmed', 'processing', 'shipped'].includes(order.status);
  }

  static getOrderProgress(order: Order): number {
    const statusProgress: Record<Order['status'], number> = {
      'pending': 10,
      'confirmed': 25,
      'processing': 50,
      'shipped': 75,
      'delivered': 100,
      'cancelled': 0
    };
    return statusProgress[order.status] || 0;
  }

  static getOrderSteps(): Array<{ status: Order['status']; label: string }> {
    return [
      { status: 'pending', label: 'Order Placed' },
      { status: 'confirmed', label: 'Order Confirmed' },
      { status: 'processing', label: 'Processing' },
      { status: 'shipped', label: 'Shipped' },
      { status: 'delivered', label: 'Delivered' }
    ];
  }

  static getCurrentOrderStep(order: Order): number {
    const steps = this.getOrderSteps();
    return steps.findIndex(step => step.status === order.status) + 1;
  }

  static calculateOrderTotal(order: Order): number {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  static calculateOrderSubtotal(order: Order): number {
    return order.totalAmount;
  }

  static getOrderItemCount(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  static getOrderUniqueItemCount(order: Order): number {
    return order.items.length;
  }

  static formatOrderDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  static formatOrderDateShort(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  static formatOrderAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  static formatOrderAmountVND(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  static getShippingAddressText(address: Order['shippingAddress']): string {
    return `${address.street}, ${address.city}${address.state ? `, ${address.state}` : ''}, ${address.zipCode}, ${address.country}`;
  }

  static getBillingAddressText(address: Order['billingAddress']): string {
    if (!address) return 'Same as shipping address';
    return `${address.street}, ${address.city}${address.state ? `, ${address.state}` : ''}, ${address.zipCode}, ${address.country}`;
  }

  static validateCreateOrderData(data: CreateOrderData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.shippingAddress) {
      errors.push('Shipping address is required');
    } else {
      if (!data.shippingAddress.street?.trim()) {
        errors.push('Street address is required');
      }
      if (!data.shippingAddress.city?.trim()) {
        errors.push('City is required');
      }
      if (!data.shippingAddress.zipCode?.trim()) {
        errors.push('ZIP code is required');
      }
      if (!data.shippingAddress.country?.trim()) {
        errors.push('Country is required');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateCancelOrderData(data: CancelOrderData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.reason?.trim()) {
      errors.push('Cancellation reason is required');
    }

    if (data.reason.trim().length < 10) {
      errors.push('Cancellation reason must be at least 10 characters long');
    }

    if (data.reason.trim().length > 500) {
      errors.push('Cancellation reason cannot exceed 500 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static getOrderTrackingInfo(order: Order): {
    isTrackable: boolean;
    trackingNumber?: string;
    estimatedDelivery?: string;
    currentStatus: string;
  } {
    return {
      isTrackable: this.canTrackOrder(order),
      trackingNumber: order.status === 'shipped' ? 'TRK' + order.id.substring(0, 8).toUpperCase() : undefined,
      estimatedDelivery: order.status === 'shipped' ? this.getEstimatedDeliveryDate(order) : undefined,
      currentStatus: this.getOrderStatusText(order.status)
    };
  }

  static getEstimatedDeliveryDate(order: Order): string {
    const processingDays = 2;
    const shippingDays = 5;
    const now = new Date();
    const orderDate = new Date(order.createdAt);

    let estimatedDate = new Date(orderDate);
    estimatedDate.setDate(estimatedDate.getDate() + processingDays + shippingDays);

    return estimatedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  static filterOrdersByStatus(orders: Order[], status: Order['status']): Order[] {
    return orders.filter(order => order.status === status);
  }

  static filterOrdersByPaymentStatus(orders: Order[], paymentStatus: Order['paymentStatus']): Order[] {
    return orders.filter(order => order.paymentStatus === paymentStatus);
  }

  static filterOrdersByDateRange(orders: Order[], startDate: string, endDate: string): Order[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= start && orderDate <= end;
    });
  }

  static sortOrdersByDate(orders: Order[], newestFirst: boolean = true): Order[] {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return newestFirst ? dateB - dateA : dateA - dateB;
    });
  }

  static sortOrdersByTotal(orders: Order[], highestFirst: boolean = true): Order[] {
    return [...orders].sort((a, b) => {
      return highestFirst ? b.totalAmount - a.totalAmount : a.totalAmount - b.totalAmount;
    });
  }

  static getOrderNumberDisplay(order: Order): string {
    return `#${order.orderNumber}`;
  }

  static getOrderSummaryText(order: Order): string {
    const itemCount = this.getOrderItemCount(order);
    const itemText = itemCount === 1 ? 'item' : 'items';
    return `${itemCount} ${itemText} • ${this.formatOrderAmount(order.totalAmount)}`;
  }

  static generateOrderInvoiceData(order: Order): {
    invoiceNumber: string;
    invoiceDate: string;
    customerInfo: {
      name: string;
      email: string;
      phone?: string;
    };
    shippingAddress: Order['shippingAddress'];
    billingAddress?: Order['shippingAddress'];
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      total: number;
    }>;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    paymentStatus: string;
    orderStatus: string;
  } {
    return {
      invoiceNumber: `INV-${order.orderNumber}`,
      invoiceDate: this.formatOrderDate(order.createdAt),
      customerInfo: {
        name: 'Customer Name', // This would come from user data
        email: 'customer@example.com',
        phone: '+1234567890'
      },
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      subtotal: order.totalAmount,
      tax: 0, // Calculate tax based on business rules
      shipping: 0, // Calculate shipping based on business rules
      total: order.totalAmount,
      paymentStatus: this.getPaymentStatusText(order.paymentStatus),
      orderStatus: this.getOrderStatusText(order.status)
    };
  }
}

export default OrderService;