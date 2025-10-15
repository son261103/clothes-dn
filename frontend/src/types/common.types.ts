// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

// Error Types
export interface ApiError {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}

// Store Types
export interface AuthState {
  user: import('./auth.types').User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CartState {
  cart: import('./cart.types').Cart | null;
  summary: import('./cart.types').CartSummary | null;
  isLoading: boolean;
}

export interface ProductState {
  products: import('./product.types').Product[];
  featuredProducts: import('./product.types').Product[];
  currentProduct: import('./product.types').Product | null;
  isLoading: boolean;
  categories: import('./category.types').Category[];
  brands: import('./brand.types').Brand[];
}

export interface OrderState {
  orders: import('./order.types').Order[];
  currentOrder: import('./order.types').Order | null;
  isLoading: boolean;
}

// Query Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}