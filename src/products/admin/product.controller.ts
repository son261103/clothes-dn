import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../shared/product.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse, sendCreatedResponse } from '../../utils/response';

export class AdminProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * @desc    Get all products with pagination and filtering
   * @route   GET /api/products/admin
   * @access  Private (Admin)
   */
  getAllProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.productService.getAllProducts(req);
      sendSuccessResponse(res, result, 'Products retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get product by ID
   * @route   GET /api/products/admin/:id
   * @access  Private (Admin)
   */
  getProductById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      sendSuccessResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Create new product
   * @route   POST /api/products/admin
   * @access  Private (Admin)
   */
  createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse variants if it's a string (from form data)
      if (typeof req.body.variants === 'string') {
        req.body.variants = JSON.parse(req.body.variants);
      }

      // Parse tags if it's a string
      if (typeof req.body.tags === 'string') {
        req.body.tags = JSON.parse(req.body.tags);
      }

      // Parse dimensions if it's a string
      if (typeof req.body.dimensions === 'string') {
        req.body.dimensions = JSON.parse(req.body.dimensions);
      }

      const productData = {
        ...req.body,
        images: req.files as Express.Multer.File[]
      };

      const product = await this.productService.createProduct(productData);
      sendCreatedResponse(res, product, 'Product created successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Update product
   * @route   PUT /api/products/admin/:id
   * @access  Private (Admin)
   */
  updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse variants if it's a string (from form data)
      if (typeof req.body.variants === 'string') {
        req.body.variants = JSON.parse(req.body.variants);
      }

      // Parse tags if it's a string
      if (typeof req.body.tags === 'string') {
        req.body.tags = JSON.parse(req.body.tags);
      }

      // Parse dimensions if it's a string
      if (typeof req.body.dimensions === 'string') {
        req.body.dimensions = JSON.parse(req.body.dimensions);
      }

      const updateData = {
        ...req.body,
        images: req.files as Express.Multer.File[]
      };

      const product = await this.productService.updateProduct(req.params.id, updateData);
      sendSuccessResponse(res, product, 'Product updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Delete product
   * @route   DELETE /api/products/admin/:id
   * @access  Private (Admin)
   */
  deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productService.deleteProduct(req.params.id);
      sendSuccessResponse(res, null, 'Product deleted successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get product statistics
   * @route   GET /api/products/admin/stats
   * @access  Private (Admin)
   */
  getProductStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.productService.getProductStats();
      sendSuccessResponse(res, stats, 'Product statistics retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
