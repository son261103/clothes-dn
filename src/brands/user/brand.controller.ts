import { Request, Response, NextFunction } from 'express';
import { BrandService } from '../shared/brand.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';

export class UserBrandController {
  private brandService: BrandService;

  constructor() {
    this.brandService = new BrandService();
  }

  /**
   * @desc    Get all active brands with pagination
   * @route   GET /api/brands/user
   * @access  Public
   */
  getAllBrands = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Force filter to only show active brands for users
      req.query.isActive = 'true';
      
      const result = await this.brandService.getAllBrands(req);
      sendSuccessResponse(res, result, 'Brands retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get brand by slug
   * @route   GET /api/brands/user/slug/:slug
   * @access  Public
   */
  getBrandBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brand = await this.brandService.getBrandBySlug(req.params.slug);
      sendSuccessResponse(res, brand, 'Brand retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Get brand by ID
   * @route   GET /api/brands/user/:id
   * @access  Public
   */
  getBrandById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brand = await this.brandService.getBrandById(req.params.id);
      
      // Only return if brand is active
      if (!brand.isActive) {
        return sendErrorResponse(res, 'Brand not found', 404);
      }
      
      sendSuccessResponse(res, brand, 'Brand retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });
}
