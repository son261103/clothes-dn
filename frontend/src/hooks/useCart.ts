import { useState, useEffect, useCallback } from 'react';
import { CartService, Cart, CartSummary, CartItem } from '../services';
import { handleApiError } from '../lib/api';
import { useAuth } from './useAuth';

interface UseCartReturn {
  cart: Cart | null;
  summary: CartSummary | null;
  isLoading: boolean;
  itemCount: number;
  totalAmount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<{ success: boolean; message?: string }>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<{ success: boolean; message?: string }>;
  removeFromCart: (cartItemId: string) => Promise<{ success: boolean; message?: string }>;
  clearCart: () => Promise<{ success: boolean; message?: string }>;
  isItemInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

export const useCart = (): UseCartReturn => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart data
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      setSummary(null);
      return;
    }

    try {
      setIsLoading(true);
      const [cartResponse, summaryResponse] = await Promise.all([
        CartService.getCart(),
        CartService.getCartSummary()
      ]);

      if (cartResponse.success) {
        setCart(cartResponse.data);
      }

      if (summaryResponse.success) {
        setSummary(summaryResponse.data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Don't set error state, just leave cart empty
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Refresh cart data
  const refreshCart = useCallback(async () => {
    await loadCart();
  }, [loadCart]);

  // Load cart on mount and when auth state changes
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Add to cart function
  const addToCart = useCallback(async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please login to add items to cart' };
    }

    const validation = CartService.validateAddToCartData({ productId, quantity });
    if (!validation.isValid) {
      return { success: false, message: validation.errors.join(', ') };
    }

    try {
      setIsLoading(true);
      const response = await CartService.addToCart({ productId, quantity });

      if (response.success) {
        // Refresh cart to get updated data
        await loadCart();
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Update cart item function
  const updateCartItem = useCallback(async (cartItemId: string, quantity: number) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please login to update cart' };
    }

    const validation = CartService.validateUpdateCartItemData({ cartItemId, quantity });
    if (!validation.isValid) {
      return { success: false, message: validation.errors.join(', ') };
    }

    try {
      setIsLoading(true);
      const response = await CartService.updateCartItem({ cartItemId, quantity });

      if (response.success) {
        // Refresh cart to get updated data
        await loadCart();
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Remove from cart function
  const removeFromCart = useCallback(async (cartItemId: string) => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please login to remove items from cart' };
    }

    try {
      setIsLoading(true);
      const response = await CartService.removeFromCart(cartItemId);

      if (response.success) {
        // Refresh cart to get updated data
        await loadCart();
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Clear cart function
  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      return { success: false, message: 'Please login to clear cart' };
    }

    try {
      setIsLoading(true);
      const response = await CartService.clearCart();

      if (response.success) {
        // Refresh cart to get updated data
        await loadCart();
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, loadCart]);

  // Check if item is in cart
  const isItemInCart = useCallback((productId: string): boolean => {
    if (!cart) return false;
    return CartService.isItemInCart(cart, productId);
  }, [cart]);

  // Get cart item quantity
  const getCartItemQuantity = useCallback((productId: string): number => {
    if (!cart) return 0;
    const item = CartService.getCartItemByProductId(cart, productId);
    return item?.quantity || 0;
  }, [cart]);

  // Calculate derived values
  const itemCount = summary?.itemsCount || (cart ? CartService.getTotalItemsCount(cart) : 0);
  const totalAmount = summary?.totalAmount || (cart ? CartService.calculateCartTotal(cart) : 0);

  return {
    cart,
    summary,
    isLoading,
    itemCount,
    totalAmount,
    refreshCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    isItemInCart,
    getCartItemQuantity
  };
};

export default useCart;