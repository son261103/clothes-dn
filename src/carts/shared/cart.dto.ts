export interface AddToCartDto {
  productId: string;
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface RemoveFromCartDto {
  productId: string;
  variant: {
    size: string;
    color: string;
  };
}

export interface CartItemResponseDto {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    images: Array<{
      public_id: string;
      secure_url: string;
      alt?: string;
    }>;
    currentPrice: number;
    isActive: boolean;
    totalStock: number;
  };
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
  isAvailable: boolean;
  maxQuantity: number;
}

export interface CartResponseDto {
  _id: string;
  user: string;
  items: CartItemResponseDto[];
  totalItems: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummaryDto {
  totalItems: number;
  totalAmount: number;
  itemsCount: number;
}
