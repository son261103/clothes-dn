// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    USER_REGISTER: '/auth/user/register',
    USER_LOGIN: '/auth/user/login',
    USER_REFRESH: '/auth/user/refresh',
    USER_PROFILE: '/auth/user/profile',
    USER_CHANGE_PASSWORD: '/auth/user/change-password',
    USER_LOGOUT: '/auth/user/logout',
    ADMIN_REGISTER: '/auth/admin/register',
    ADMIN_LOGIN: '/auth/admin/login',
    ADMIN_REFRESH: '/auth/admin/refresh',
    ADMIN_PROFILE: '/auth/admin/profile',
    ADMIN_CHANGE_PASSWORD: '/auth/admin/change-password',
    ADMIN_LOGOUT: '/auth/admin/logout',
  },
  USERS: {
    USER_PROFILE: '/users/user/profile',
    USER_UPDATE_PROFILE: '/users/user/profile',
    USER_DEACTIVATE: '/users/user/profile',
    ADMIN_GET_ALL: '/users/admin',
    ADMIN_GET_BY_ID: '/users/admin/:id',
    ADMIN_UPDATE: '/users/admin/:id',
    ADMIN_DELETE: '/users/admin/:id',
    ADMIN_PERMANENT_DELETE: '/users/admin/:id/permanent',
    ADMIN_TOGGLE_STATUS: '/users/admin/:id/toggle-status',
    ADMIN_GET_STATS: '/users/admin/stats',
  },
  CATEGORIES: {
    USER_GET_ALL: '/categories/user',
    USER_GET_TREE: '/categories/user/tree',
    USER_GET_BY_SLUG: '/categories/user/slug/:slug',
    USER_GET_BY_ID: '/categories/user/:id',
    ADMIN_GET_ALL: '/categories/admin',
    ADMIN_GET_TREE: '/categories/admin/tree',
    ADMIN_CREATE: '/categories/admin',
    ADMIN_GET_BY_ID: '/categories/admin/:id',
    ADMIN_UPDATE: '/categories/admin/:id',
    ADMIN_DELETE: '/categories/admin/:id',
  },
  BRANDS: {
    USER_GET_ALL: '/brands/user',
    USER_GET_BY_SLUG: '/brands/user/slug/:slug',
    USER_GET_BY_ID: '/brands/user/:id',
    ADMIN_GET_ALL: '/brands/admin',
    ADMIN_CREATE: '/brands/admin',
    ADMIN_GET_BY_ID: '/brands/admin/:id',
    ADMIN_UPDATE: '/brands/admin/:id',
    ADMIN_DELETE: '/brands/admin/:id',
    ADMIN_GET_STATS: '/brands/admin/stats',
  },
  PRODUCTS: {
    USER_GET_ALL: '/products/user',
    USER_GET_FEATURED: '/products/user/featured',
    USER_SEARCH: '/products/user/search',
    USER_GET_BY_SLUG: '/products/user/slug/:slug',
    USER_GET_BY_ID: '/products/user/:id',
    ADMIN_GET_ALL: '/products/admin',
    ADMIN_CREATE: '/products/admin',
    ADMIN_GET_BY_ID: '/products/admin/:id',
    ADMIN_UPDATE: '/products/admin/:id',
    ADMIN_DELETE: '/products/admin/:id',
    ADMIN_GET_STATS: '/products/admin/stats',
  },
  CARTS: {
    USER_GET_CART: '/carts/user',
    USER_GET_SUMMARY: '/carts/user/summary',
    USER_ADD: '/carts/user/add',
    USER_UPDATE: '/carts/user/update',
    USER_REMOVE: '/carts/user/remove',
    USER_CLEAR: '/carts/user/clear',
  },
  ORDERS: {
    USER_CREATE: '/orders/user/create',
    USER_GET_ALL: '/orders/user',
    USER_GET_BY_ID: '/orders/user/:id',
    USER_CANCEL: '/orders/user/:id/cancel',
    ADMIN_GET_ALL: '/orders/admin',
    ADMIN_GET_BY_ID: '/orders/admin/:id',
    ADMIN_UPDATE_STATUS: '/orders/admin/:id/status',
    ADMIN_UPDATE_PAYMENT: '/orders/admin/:id/payment',
    ADMIN_GET_STATS: '/orders/admin/stats',
  },
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// Order Status Constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
} as const;

// Payment Status Constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PAID]: 'Paid',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.REFUNDED]: 'Refunded',
} as const;

// User Role Constants
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: 'User',
  [USER_ROLES.ADMIN]: 'Admin',
} as const;

// Sort Options Constants
export const SORT_OPTIONS = {
  NAME_ASC: 'name',
  NAME_DESC: '-name',
  PRICE_ASC: 'price',
  PRICE_DESC: '-price',
  CREATED_ASC: 'createdAt',
  CREATED_DESC: '-createdAt',
  UPDATED_ASC: 'updatedAt',
  UPDATED_DESC: '-updatedAt',
} as const;

export const SORT_LABELS = {
  [SORT_OPTIONS.NAME_ASC]: 'Name (A-Z)',
  [SORT_OPTIONS.NAME_DESC]: 'Name (Z-A)',
  [SORT_OPTIONS.PRICE_ASC]: 'Price (Low to High)',
  [SORT_OPTIONS.PRICE_DESC]: 'Price (High to Low)',
  [SORT_OPTIONS.CREATED_ASC]: 'Oldest First',
  [SORT_OPTIONS.CREATED_DESC]: 'Newest First',
  [SORT_OPTIONS.UPDATED_ASC]: 'Last Updated (Oldest)',
  [SORT_OPTIONS.UPDATED_DESC]: 'Last Updated (Newest)',
} as const;

// Stock Status Constants
export const STOCK_STATUS = {
  IN_STOCK: 'in-stock',
  LOW_STOCK: 'low-stock',
  OUT_OF_STOCK: 'out-of-stock',
} as const;

export const STOCK_STATUS_LABELS = {
  [STOCK_STATUS.IN_STOCK]: 'In Stock',
  [STOCK_STATUS.LOW_STOCK]: 'Low Stock',
  [STOCK_STATUS.OUT_OF_STOCK]: 'Out of Stock',
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 255,
  MAX_PHONE_LENGTH: 20,
  MIN_ADDRESS_LENGTH: 5,
  MAX_ADDRESS_LENGTH: 255,
  MAX_PRODUCT_NAME_LENGTH: 200,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 2000,
  MAX_BRAND_NAME_LENGTH: 100,
  MAX_BRAND_DESCRIPTION_LENGTH: 500,
  MAX_CATEGORY_NAME_LENGTH: 100,
  MAX_CATEGORY_DESCRIPTION_LENGTH: 500,
  MAX_SKU_LENGTH: 50,
  MAX_ORDER_NOTES_LENGTH: 1000,
  MAX_CANCEL_REASON_LENGTH: 500,
} as const;

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  MAX_IMAGES_PER_PRODUCT: 10,
} as const;

// Currency Constants
export const CURRENCY = {
  USD: 'USD',
  VND: 'VND',
} as const;

export const CURRENCY_SYMBOLS = {
  [CURRENCY.USD]: '$',
  [CURRENCY.VND]: '₫',
} as const;

// Date Format Constants
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  INPUT: 'MM/dd/yyyy',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCT_BY_SLUG: '/products/:slug',
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: '/categories/:id',
  CATEGORY_BY_SLUG: '/categories/:slug',
  BRANDS: '/brands',
  BRAND_DETAIL: '/brands/:id',
  BRAND_BY_SLUG: '/brands/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
    CATEGORIES: '/admin/categories',
    BRANDS: '/admin/brands',
    ORDERS: '/admin/orders',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
  },
} as const;

// Toast Notification Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Modal Types
export const MODAL_TYPES = {
  CONFIRM: 'confirm',
  ALERT: 'alert',
  PROMPT: 'prompt',
  FORM: 'form',
} as const;

// Breakpoint Constants
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Animation Duration Constants
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Debounce and Throttle Constants
export const TIMING = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 200,
  TOAST_DURATION: 5000,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ITEM_ADDED_TO_CART: 'Item added to cart!',
  CART_UPDATED: 'Cart updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  ACCOUNT_DELETED: 'Account deleted successfully!',
} as const;

// Default Values
export const DEFAULTS = {
  AVATAR: '/assets/images/default-avatar.png',
  PRODUCT_IMAGE: '/assets/images/default-product.png',
  BRAND_LOGO: '/assets/images/default-brand.png',
  CATEGORY_IMAGE: '/assets/images/default-category.png',
  PAGINATION_LIMIT: 20,
  SEARCH_DEBOUNCE: 300,
} as const;