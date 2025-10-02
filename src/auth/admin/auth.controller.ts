import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../shared/auth.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class AdminAuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @desc    Register admin
   * @route   POST /api/auth/admin/register
   * @access  Public (should be restricted in production)
   */
  register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body, 'admin');
      sendSuccessResponse(res, result, 'Admin registered successfully', 201);
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Login admin
   * @route   POST /api/auth/admin/login
   * @access  Public
   */
  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      
      // Verify that the user is actually an admin
      if (result.user.role !== 'admin') {
        return sendErrorResponse(res, 'Access denied. Admin privileges required.', 403);
      }

      sendSuccessResponse(res, result, 'Admin login successful');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 401);
    }
  });

  /**
   * @desc    Refresh admin access token
   * @route   POST /api/auth/admin/refresh
   * @access  Public
   */
  refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return sendErrorResponse(res, 'Refresh token is required', 400);
      }

      const result = await this.authService.refreshToken(refreshToken);
      sendSuccessResponse(res, result, 'Admin token refreshed successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 401);
    }
  });

  /**
   * @desc    Get current admin profile
   * @route   GET /api/auth/admin/profile
   * @access  Private (Admin only)
   */
  getProfile = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.getProfile(req.user._id);
      sendSuccessResponse(res, result, 'Admin profile retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Change admin password
   * @route   PUT /api/auth/admin/change-password
   * @access  Private (Admin only)
   */
  changePassword = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.authService.changePassword(req.user._id, req.body);
      sendSuccessResponse(res, null, 'Admin password changed successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Logout admin
   * @route   POST /api/auth/admin/logout
   * @access  Private (Admin only)
   */
  logout = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    // In a stateless JWT system, logout is handled client-side by removing the token
    sendSuccessResponse(res, null, 'Admin logout successful');
  });
}
