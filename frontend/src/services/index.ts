// Export all services for easy import
export { default as AuthService } from './auth.service';
export { default as UserService } from './user.service';
export { default as CategoryService } from './category.service';
export { default as BrandService } from './brand.service';
export { default as ProductService } from './product.service';
export { default as CartService } from './cart.service';
export { default as OrderService } from './order.service';

// Re-export types that are commonly used with services
export type {
  // Authentication types
  RegisterData,
  LoginData,
  RefreshTokenData,
  ChangePasswordData,
  AuthResponse,
  User,

  // Category types
  Category,
  CategoryCreateData,
  CategoryUpdateData,

  // Brand types
  Brand,
  BrandCreateData,
  BrandUpdateData,
  BrandStats,

  // Product types
  Product,
  ProductCreateData,
  ProductUpdateData,
  ProductStats,
  GetProductsQuery,

  // Cart types
  Cart,
  CartItem,
  CartSummary,
  AddToCartData,
  UpdateCartItemData,

  // Order types
  Order,
  OrderItem,
  CreateOrderData,
  CancelOrderData,
  OrderStats,
  GetOrdersQuery,
  ShippingAddress,

  // Common types
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  SortParams,
  FilterParams
} from '../types';