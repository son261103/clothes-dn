import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../shared/category.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse, sendCreatedResponse } from '../../utils/response';

export class AdminCategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  /**
   * @desc    Get all categories with pagination and filtering
   * @route   GET /api/categories/admin
   * @access  Private (Admin)
   */
  getAllCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.getAllCategories(req);
      sendSuccessResponse(res, result, 'Categories retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get category tree structure
   * @route   GET /api/categories/admin/tree
   * @access  Private (Admin)
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
   * @desc    Get category by ID
   * @route   GET /api/categories/admin/:id
   * @access  Private (Admin)
   */
  getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      sendSuccessResponse(res, category, 'Category retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Create new category
   * @route   POST /api/categories/admin
   * @access  Private (Admin)
   */
  createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData = {
        ...req.body,
        image: req.file
      };

      const category = await this.categoryService.createCategory(categoryData);
      sendCreatedResponse(res, category, 'Category created successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Update category
   * @route   PUT /api/categories/admin/:id
   * @access  Private (Admin)
   */
  updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateData = {
        ...req.body,
        image: req.file
      };

      const category = await this.categoryService.updateCategory(req.params.id, updateData);
      sendSuccessResponse(res, category, 'Category updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Delete category
   * @route   DELETE /api/categories/admin/:id
   * @access  Private (Admin)
   */
  deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.categoryService.deleteCategory(req.params.id);
      sendSuccessResponse(res, null, 'Category deleted successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
