import { Request, Response, NextFunction } from 'express';
import { UserService } from '../shared/user.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class AdminUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @desc    Get all users with pagination and filtering
   * @route   GET /api/users/admin
   * @access  Private (Admin)
   */
  getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAllUsers(req);
      sendSuccessResponse(res, result, 'Users retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get user by ID
   * @route   GET /api/users/admin/:id
   * @access  Private (Admin)
   */
  getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      sendSuccessResponse(res, user, 'User retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Update user by ID
   * @route   PUT /api/users/admin/:id
   * @access  Private (Admin)
   */
  updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      sendSuccessResponse(res, user, 'User updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Delete user (soft delete)
   * @route   DELETE /api/users/admin/:id
   * @access  Private (Admin)
   */
  deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.id);
      sendSuccessResponse(res, null, 'User deleted successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Permanently delete user
   * @route   DELETE /api/users/admin/:id/permanent
   * @access  Private (Admin)
   */
  permanentlyDeleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.permanentlyDeleteUser(req.params.id);
      sendSuccessResponse(res, null, 'User permanently deleted');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Toggle user active status
   * @route   PATCH /api/users/admin/:id/toggle-status
   * @access  Private (Admin)
   */
  toggleUserStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.toggleUserStatus(req.params.id);
      sendSuccessResponse(res, user, 'User status updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get user statistics
   * @route   GET /api/users/admin/stats
   * @access  Private (Admin)
   */
  getUserStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.userService.getUserStats();
      sendSuccessResponse(res, stats, 'User statistics retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
