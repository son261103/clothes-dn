import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../shared/category.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';

export class UserCategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  /**
   * @desc    Get all active categories with pagination
   * @route   GET /api/categories/user
   * @access  Public
   */
  getAllCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Force filter to only show active categories for users
      req.query.isActive = 'true';
      
      const result = await this.categoryService.getAllCategories(req);
      sendSuccessResponse(res, result, 'Categories retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get category tree structure
   * @route   GET /api/categories/user/tree
   * @access  Public
   */
  getCategoryTree = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.getCategoryTree();
      sendSuccessResponse(res, result, 'Category tree retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get category by slug
   * @route   GET /api/categories/user/slug/:slug
   * @access  Public
   */
  getCategoryBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.getCategoryBySlug(req.params.slug);
      sendSuccessResponse(res, category, 'Category retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Get category by ID
   * @route   GET /api/categories/user/:id
   * @access  Public
   */
  getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      
      // Only return if category is active
      if (!category.isActive) {
        return sendErrorResponse(res, 'Category not found', 404);
      }
      
      sendSuccessResponse(res, category, 'Category retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });
}
