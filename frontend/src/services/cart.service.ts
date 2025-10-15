import { api } from '../lib/api';
import {
  Cart,
  CartSummary,
  CartItem,
  AddToCartData,
  UpdateCartItemData,
  ApiResponse
} from '../types';

export class CartService {
  // Cart endpoints
  static async getCart(): Promise<ApiResponse<Cart>> {
    const response = await api.get<ApiResponse<Cart>>('/carts/user');
    return response.data;
  }

  static async getCartSummary(): Promise<ApiResponse<CartSummary>> {
    const response = await api.get<ApiResponse<CartSummary>>('/carts/user/summary');
    return response.data;
  }

  static async addToCart(itemData: AddToCartData): Promise<ApiResponse<CartItem>> {
    const response = await api.post<ApiResponse<CartItem>>('/carts/user/add', itemData);
    return response.data;
  }

  static async updateCartItem(itemData: UpdateCartItemData): Promise<ApiResponse<CartItem>> {
    const response = await api.put<ApiResponse<CartItem>>('/carts/user/update', itemData);
    return response.data;
  }

  static async removeFromCart(cartItemId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>('/carts/user/remove', {
      data: { cartItemId }
    });
    return response.data;
  }

  static async clearCart(): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>('/carts/user/clear');
    return response.data;
  }

  // Utility methods
  static calculateItemTotal(item: CartItem): number {
    const displayPrice = ProductService.getDisplayPrice(item.product);
    return displayPrice * item.quantity;
  }

  static calculateCartSubtotal(cart: Cart): number {
    return cart.items.reduce((total, item) => total + this.calculateItemTotal(item), 0);
  }

  static calculateCartTotal(cart: Cart): number {
    return this.calculateCartSubtotal(cart);
  }

  static getTotalItemsCount(cart: Cart): number {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  static getTotalUniqueItems(cart: Cart): number {
    return cart.items.length;
  }

  static isItemInCart(cart: Cart, productId: string): boolean {
    return cart.items.some(item => item.productId === productId);
  }

  static getCartItemByProductId(cart: Cart, productId: string): CartItem | undefined {
    return cart.items.find(item => item.productId === productId);
  }

  static getCartItemById(cart: Cart, cartItemId: string): CartItem | undefined {
    return cart.items.find(item => item.id === cartItemId);
  }

  static validateAddToCartData(data: AddToCartData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.productId) {
      errors.push('Product ID is required');
    }

    if (!data.quantity || data.quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (data.quantity > 999) {
      errors.push('Quantity cannot exceed 999');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateUpdateCartItemData(data: UpdateCartItemData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.cartItemId) {
      errors.push('Cart item ID is required');
    }

    if (!data.quantity || data.quantity <= 0) {
      errors.push('Quantity must be greater than 0');
    }

    if (data.quantity > 999) {
      errors.push('Quantity cannot exceed 999');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static formatCartItemQuantity(quantity: number): string {
    return quantity.toString();
  }

  static getCartItemImage(item: CartItem): string {
    return item.product.images?.[0] || '/placeholder-product.png';
  }

  static getCartItemName(item: CartItem): string {
    return ProductService.formatProductName(item.product);
  }

  static getCartItemPrice(item: CartItem): number {
    return ProductService.getDisplayPrice(item.product);
  }

  static getCartItemTotalPrice(item: CartItem): string {
    return ProductService.formatPrice(this.calculateItemTotal(item));
  }

  static isCartItemAvailable(item: CartItem): boolean {
    return ProductService.isProductActive(item.product) && ProductService.isProductInStock(item.product);
  }

  static getCartItemStockStatus(item: CartItem): string {
    if (!ProductService.isProductActive(item.product)) {
      return 'Product Unavailable';
    }
    if (!ProductService.isProductInStock(item.product)) {
      return 'Out of Stock';
    }
    if (item.quantity > item.product.stock) {
      return 'Insufficient Stock';
    }
    return 'Available';
  }

  static canAddToCart(product: any, quantity: number): boolean {
    return ProductService.isProductActive(product) &&
           ProductService.isProductInStock(product) &&
           product.stock >= quantity;
  }

  static getMaxAddableQuantity(product: any): number {
    if (!ProductService.isProductActive(product) || !ProductService.isProductInStock(product)) {
      return 0;
    }
    return Math.min(product.stock, 999);
  }

  static getCartDiscountAmount(cart: Cart): number {
    let discount = 0;
    cart.items.forEach(item => {
      if (ProductService.hasDiscount(item.product)) {
        const discountPerItem = item.product.price - item.product.salePrice!;
        discount += discountPerItem * item.quantity;
      }
    });
    return discount;
  }

  static getCartSavings(cart: Cart): string {
    const discount = this.getCartDiscountAmount(cart);
    return ProductService.formatPrice(discount);
  }

  static formatCartSummary(summary: CartSummary): {
    itemsCount: string;
    subtotalAmount: string;
    totalAmount: string;
    taxAmount?: string;
    shippingAmount?: string;
  } {
    return {
      itemsCount: `${summary.itemsCount} ${summary.itemsCount === 1 ? 'item' : 'items'}`,
      subtotalAmount: ProductService.formatPrice(summary.subtotalAmount),
      totalAmount: ProductService.formatPrice(summary.totalAmount),
      taxAmount: summary.taxAmount ? ProductService.formatPrice(summary.taxAmount) : undefined,
      shippingAmount: summary.shippingAmount ? ProductService.formatPrice(summary.shippingAmount) : undefined
    };
  }

  static getCartWeight(cart: Cart): number {
    // This would require weight information in the product model
    // For now, return 0 as placeholder
    return 0;
  }

  static getEstimatedDeliveryTime(cart: Cart): string {
    // This would depend on business logic
    // For now, return a placeholder
    return '3-5 business days';
  }

  static getCartValidationErrors(cart: Cart): string[] {
    const errors: string[] = [];

    cart.items.forEach(item => {
      if (!ProductService.isProductActive(item.product)) {
        errors.push(`${item.product.name} is no longer available`);
      }
      if (!ProductService.isProductInStock(item.product)) {
        errors.push(`${item.product.name} is out of stock`);
      }
      if (item.quantity > item.product.stock) {
        errors.push(`Only ${item.product.stock} ${item.product.name} available in stock`);
      }
    });

    return errors;
  }

  static isCartValid(cart: Cart): boolean {
    return this.getCartValidationErrors(cart).length === 0;
  }

  static removeInvalidItems(cart: Cart): CartItem[] {
    return cart.items.filter(item => this.isCartItemAvailable(item));
  }

  static getRecommendedProducts(cart: Cart): string[] {
    // This would implement recommendation logic based on cart contents
    // For now, return empty array as placeholder
    return [];
  }

  static mergeCarts(localCart: Cart, serverCart: Cart): Cart {
    const mergedItems: CartItem[] = [];
    const itemMap = new Map<string, CartItem>();

    // Add server cart items first
    serverCart.items.forEach(item => {
      itemMap.set(item.productId, item);
    });

    // Add or update with local cart items
    localCart.items.forEach(item => {
      const existingItem = itemMap.get(item.productId);
      if (existingItem) {
        // Merge quantities
        existingItem.quantity += item.quantity;
      } else {
        itemMap.set(item.productId, item);
      }
    });

    return {
      ...serverCart,
      items: Array.from(itemMap.values())
    };
  }
}

// Import ProductService for utility methods
import ProductService from './product.service';

export default CartService;