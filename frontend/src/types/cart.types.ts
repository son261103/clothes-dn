export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: import('./product.types').Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartSummary {
  itemsCount: number;
  totalAmount: number;
  subtotalAmount: number;
  taxAmount?: number;
  shippingAmount?: number;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemData {
  cartItemId: string;
  quantity: number;
}