import { OrderStatus, PaymentStatus, PaymentMethod, IShippingAddress } from './order.model';

export interface CreateOrderDto {
  paymentMethod: PaymentMethod;
  shippingAddress: IShippingAddress;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  trackingNumber?: string;
  cancelReason?: string;
}

export interface UpdatePaymentStatusDto {
  paymentStatus: PaymentStatus;
}

export interface OrderItemResponseDto {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    images: Array<{
      public_id: string;
      secure_url: string;
      alt?: string;
    }>;
  };
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponseDto {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: OrderItemResponseDto[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: IShippingAddress;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  notes?: string;
  trackingNumber?: string;
  orderAge: number;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilterDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string; // Search by order number or user name
  sortBy?: 'createdAt' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderStatsDto {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersToday: number;
  revenueToday: number;
  topPaymentMethods: Array<{
    method: PaymentMethod;
    count: number;
    percentage: number;
  }>;
}
