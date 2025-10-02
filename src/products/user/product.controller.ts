import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../shared/product.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';

export class UserProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * @desc    Get all active products with pagination and filtering
   * @route   GET /api/products/user
   * @access  Public
   */
  getAllProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Force filter to only show active products for users
      req.query.isActive = 'true';
      
      const result = await this.productService.getAllProducts(req);
      sendSuccessResponse(res, result, 'Products retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get featured products
   * @route   GET /api/products/user/featured
   * @access  Public
   */
  getFeaturedProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Force filter to only show active and featured products
      req.query.isActive = 'true';
      req.query.isFeatured = 'true';
      
      const result = await this.productService.getAllProducts(req);
      sendSuccessResponse(res, result, 'Featured products retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get product by slug
   * @route   GET /api/products/user/slug/:slug
   * @access  Public
   */
  getProductBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.getProductBySlug(req.params.slug);
      sendSuccessResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Get product by ID
   * @route   GET /api/products/user/:id
   * @access  Public
   */
  getProductById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      
      // Only return if product is active
      if (!product.isActive) {
        return sendErrorResponse(res, 'Product not found', 404);
      }
      
      sendSuccessResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Search products
   * @route   GET /api/products/user/search
   * @access  Public
   */
  searchProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.q) {
        return sendErrorResponse(res, 'Search query is required', 400);
      }

      req.query.search = req.query.q;
      req.query.isActive = 'true';
      
      const result = await this.productService.getAllProducts(req);
      sendSuccessResponse(res, result, 'Search results retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
