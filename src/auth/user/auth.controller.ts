import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../shared/auth.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class UserAuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @desc    Register user
   * @route   POST /api/auth/user/register
   * @access  Public
   */
  register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body, 'user');
      sendSuccessResponse(res, result, 'User registered successfully', 201);
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Login user
   * @route   POST /api/auth/user/login
   * @access  Public
   */
  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      sendSuccessResponse(res, result, 'Login successful');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 401);
    }
  });

  /**
   * @desc    Refresh access token
   * @route   POST /api/auth/user/refresh
   * @access  Public
   */
  refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return sendErrorResponse(res, 'Refresh token is required', 400);
      }

      const result = await this.authService.refreshToken(refreshToken);
      sendSuccessResponse(res, result, 'Token refreshed successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 401);
    }
  });

  /**
   * @desc    Get current user profile
   * @route   GET /api/auth/user/profile
   * @access  Private
   */
  getProfile = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.getProfile(req.user._id);
      sendSuccessResponse(res, result, 'Profile retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 404);
    }
  });

  /**
   * @desc    Change password
   * @route   PUT /api/auth/user/change-password
   * @access  Private
   */
  changePassword = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.authService.changePassword(req.user._id, req.body);
      sendSuccessResponse(res, null, 'Password changed successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Logout user (client-side token removal)
   * @route   POST /api/auth/user/logout
   * @access  Private
   */
  logout = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // Here we can optionally log the logout event or add token to blacklist
    sendSuccessResponse(res, null, 'Logout successful');
  });
}
