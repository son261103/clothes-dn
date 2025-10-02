import { Request, Response, NextFunction } from 'express';
import { BrandService } from '../shared/brand.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse, sendCreatedResponse } from '../../utils/response';

export class AdminBrandController {
  private brandService: BrandService;

  constructor() {
    this.brandService = new BrandService();
  }

  /**
   * @desc    Get all brands with pagination and filtering
   * @route   GET /api/brands/admin
   * @access  Private (Admin)
   */
  getAllBrands = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.brandService.getAllBrands(req);
      sendSuccessResponse(res, result, 'Brands retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get brand by ID
   * @route   GET /api/brands/admin/:id
   * @access  Private (Admin)
   */
  getBrandById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brand = await this.brandService.getBrandById(req.params.id);
      sendSuccessResponse(res, brand, 'Brand retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Create new brand
   * @route   POST /api/brands/admin
   * @access  Private (Admin)
   */
  createBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandData = {
        ...req.body,
        logo: req.file
      };

      const brand = await this.brandService.createBrand(brandData);
      sendCreatedResponse(res, brand, 'Brand created successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Update brand
   * @route   PUT /api/brands/admin/:id
   * @access  Private (Admin)
   */
  updateBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = {
        ...req.body,
        logo: req.file
      };

      const brand = await this.brandService.updateBrand(req.params.id, updateData);
      sendSuccessResponse(res, brand, 'Brand updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Delete brand
   * @route   DELETE /api/brands/admin/:id
   * @access  Private (Admin)
   */
  deleteBrand = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.brandService.deleteBrand(req.params.id);
      sendSuccessResponse(res, null, 'Brand deleted successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get brand statistics
   * @route   GET /api/brands/admin/stats
   * @access  Private (Admin)
   */
  getBrandStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.brandService.getBrandStats();
      sendSuccessResponse(res, stats, 'Brand statistics retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
