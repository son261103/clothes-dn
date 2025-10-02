import { Request, Response, NextFunction } from 'express';
import { CartService } from '../shared/cart.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccessResponse, sendErrorResponse } from '../../utils/response';
import { AuthRequest } from '../../middlewares/auth';

export class UserCartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  /**
   * @desc    Get user's cart
   * @route   GET /api/carts/user
   * @access  Private (User)
   */
  getCart = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.getCart(req.user._id);
      sendSuccessResponse(res, cart, 'Cart retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Add item to cart
   * @route   POST /api/carts/user/add
   * @access  Private (User)
   */
  addToCart = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.addToCart(req.user._id, req.body);
      sendSuccessResponse(res, cart, 'Item added to cart successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Update cart item quantity
   * @route   PUT /api/carts/user/update
   * @access  Private (User)
   */
  updateCartItem = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { productId, variant, quantity } = req.body;
      
      const cart = await this.cartService.updateCartItem(
        req.user._id, 
        productId, 
        variant, 
        { quantity }
      );
      
      sendSuccessResponse(res, cart, 'Cart item updated successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Remove item from cart
   * @route   DELETE /api/carts/user/remove
   * @access  Private (User)
   */
  removeFromCart = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.removeFromCart(req.user._id, req.body);
      sendSuccessResponse(res, cart, 'Item removed from cart successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Clear entire cart
   * @route   DELETE /api/carts/user/clear
   * @access  Private (User)
   */
  clearCart = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.clearCart(req.user._id);
      sendSuccessResponse(res, cart, 'Cart cleared successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });

  /**
   * @desc    Get cart summary
   * @route   GET /api/carts/user/summary
   * @access  Private (User)
   */
  getCartSummary = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const summary = await this.cartService.getCartSummary(req.user._id);
      sendSuccessResponse(res, summary, 'Cart summary retrieved successfully');
    } catch (error) {
      sendErrorResponse(res, (error as Error).message, 400);
    }
  });
}
