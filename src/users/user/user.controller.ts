import { Request, Response, NextFunction } from 'express';
import { UserService } from '../shared/user.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @desc    Get current user profile
   * @route   GET /api/users/user/profile
   * @access  Private (User)
   */
  getProfile = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.user._id);
      sendSuccessResponse(res, user, 'Profile retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Update current user profile
   * @route   PUT /api/users/user/profile
   * @access  Private (User)
   */
  updateProfile = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Remove sensitive fields that users shouldn't be able to update
      const { role, isActive, emailVerified, ...updateData } = req.body;
      
      const user = await this.userService.updateUser(req.user._id, updateData);
      sendSuccessResponse(res, user, 'Profile updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Deactivate current user account
   * @route   DELETE /api/users/user/profile
   * @access  Private (User)
   */
  deactivateAccount = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.user._id);
      sendSuccessResponse(res, null, 'Account deactivated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
