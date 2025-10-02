import { Router } from 'express';

// Import route modules
import userAuthRoutes from '../auth/user/auth.routes';
import adminAuthRoutes from '../auth/admin/auth.routes';
import userRoutes from '../users/user/user.routes';
import adminUserRoutes from '../users/admin/user.routes';
import userCategoryRoutes from '../categories/user/category.routes';
import adminCategoryRoutes from '../categories/admin/category.routes';
import userBrandRoutes from '../brands/user/brand.routes';
import adminBrandRoutes from '../brands/admin/brand.routes';
import userProductRoutes from '../products/user/product.routes';
import adminProductRoutes from '../products/admin/product.routes';
import userCartRoutes from '../carts/user/cart.routes';
import userOrderRoutes from '../orders/user/order.routes';
import adminOrderRoutes from '../orders/admin/order.routes';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Authentication routes
router.use('/auth/user', userAuthRoutes);
router.use('/auth/admin', adminAuthRoutes);

// User management routes
router.use('/users/user', userRoutes);
router.use('/users/admin', adminUserRoutes);

// Category routes
router.use('/categories/user', userCategoryRoutes);
router.use('/categories/admin', adminCategoryRoutes);

// Brand routes
router.use('/brands/user', userBrandRoutes);
router.use('/brands/admin', adminBrandRoutes);

// Product routes
router.use('/products/user', userProductRoutes);
router.use('/products/admin', adminProductRoutes);

// Cart routes
router.use('/carts/user', userCartRoutes);

// Order routes
router.use('/orders/user', userOrderRoutes);
router.use('/orders/admin', adminOrderRoutes);

// API documentation endpoint
router.get('/docs', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Clothing Shop API Documentation',
    version: '1.0.0',
    endpoints: {
      authentication: {
        user: {
          register: 'POST /api/auth/user/register',
          login: 'POST /api/auth/user/login',
          refresh: 'POST /api/auth/user/refresh',
          profile: 'GET /api/auth/user/profile',
          changePassword: 'PUT /api/auth/user/change-password',
          logout: 'POST /api/auth/user/logout'
        },
        admin: {
          register: 'POST /api/auth/admin/register',
          login: 'POST /api/auth/admin/login',
          refresh: 'POST /api/auth/admin/refresh',
          profile: 'GET /api/auth/admin/profile',
          changePassword: 'PUT /api/auth/admin/change-password',
          logout: 'POST /api/auth/admin/logout'
        }
      },
      users: {
        user: {
          profile: 'GET /api/users/user/profile',
          updateProfile: 'PUT /api/users/user/profile',
          deactivateAccount: 'DELETE /api/users/user/profile'
        },
        admin: {
          getAllUsers: 'GET /api/users/admin',
          getUserById: 'GET /api/users/admin/:id',
          updateUser: 'PUT /api/users/admin/:id',
          deleteUser: 'DELETE /api/users/admin/:id',
          permanentlyDeleteUser: 'DELETE /api/users/admin/:id/permanent',
          toggleUserStatus: 'PATCH /api/users/admin/:id/toggle-status',
          getUserStats: 'GET /api/users/admin/stats'
        }
      },
      categories: {
        user: {
          getAllCategories: 'GET /api/categories/user',
          getCategoryTree: 'GET /api/categories/user/tree',
          getCategoryBySlug: 'GET /api/categories/user/slug/:slug',
          getCategoryById: 'GET /api/categories/user/:id'
        },
        admin: {
          getAllCategories: 'GET /api/categories/admin',
          getCategoryTree: 'GET /api/categories/admin/tree',
          createCategory: 'POST /api/categories/admin',
          getCategoryById: 'GET /api/categories/admin/:id',
          updateCategory: 'PUT /api/categories/admin/:id',
          deleteCategory: 'DELETE /api/categories/admin/:id'
        }
      },
      brands: {
        user: {
          getAllBrands: 'GET /api/brands/user',
          getBrandBySlug: 'GET /api/brands/user/slug/:slug',
          getBrandById: 'GET /api/brands/user/:id'
        },
        admin: {
          getAllBrands: 'GET /api/brands/admin',
          createBrand: 'POST /api/brands/admin',
          getBrandById: 'GET /api/brands/admin/:id',
          updateBrand: 'PUT /api/brands/admin/:id',
          deleteBrand: 'DELETE /api/brands/admin/:id',
          getBrandStats: 'GET /api/brands/admin/stats'
        }
      },
      products: {
        user: {
          getAllProducts: 'GET /api/products/user',
          getFeaturedProducts: 'GET /api/products/user/featured',
          searchProducts: 'GET /api/products/user/search',
          getProductBySlug: 'GET /api/products/user/slug/:slug',
          getProductById: 'GET /api/products/user/:id'
        },
        admin: {
          getAllProducts: 'GET /api/products/admin',
          createProduct: 'POST /api/products/admin',
          getProductById: 'GET /api/products/admin/:id',
          updateProduct: 'PUT /api/products/admin/:id',
          deleteProduct: 'DELETE /api/products/admin/:id',
          getProductStats: 'GET /api/products/admin/stats'
        }
      },
      carts: {
        user: {
          getCart: 'GET /api/carts/user',
          getCartSummary: 'GET /api/carts/user/summary',
          addToCart: 'POST /api/carts/user/add',
          updateCartItem: 'PUT /api/carts/user/update',
          removeFromCart: 'DELETE /api/carts/user/remove',
          clearCart: 'DELETE /api/carts/user/clear'
        }
      },
      orders: {
        user: {
          createOrder: 'POST /api/orders/user/create',
          getUserOrders: 'GET /api/orders/user',
          getOrderById: 'GET /api/orders/user/:id',
          cancelOrder: 'PUT /api/orders/user/:id/cancel'
        },
        admin: {
          getAllOrders: 'GET /api/orders/admin',
          getOrderById: 'GET /api/orders/admin/:id',
          updateOrderStatus: 'PUT /api/orders/admin/:id/status',
          updatePaymentStatus: 'PUT /api/orders/admin/:id/payment',
          getOrderStats: 'GET /api/orders/admin/stats'
        }
      }
    }
  });
});

export default router;
