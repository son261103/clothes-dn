import { Cart, ICart } from './cart.model';
import { Product } from '../../products/shared/product.model';
import { 
  AddToCartDto, 
  UpdateCartItemDto, 
  RemoveFromCartDto,
  CartResponseDto,
  CartSummaryDto,
  CartItemResponseDto 
} from './cart.dto';

export class CartService {
  /**
   * Get user's cart
   */
  async getCart(userId: string): Promise<CartResponseDto> {
    try {
      let cart = await Cart.findOne({ user: userId })
        .populate({
          path: 'items.product',
          select: 'name slug images price salePrice isActive totalStock variants'
        });

      if (!cart) {
        // Create empty cart if doesn't exist
        cart = await Cart.create({ user: userId, items: [] });
        await cart.populate({
          path: 'items.product',
          select: 'name slug images price salePrice isActive totalStock variants'
        });
      }

      return this.formatCartResponse(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add item to cart
   */
  async addToCart(userId: string, addToCartData: AddToCartDto): Promise<CartResponseDto> {
    try {
      const { productId, variant, quantity } = addToCartData;

      // Validate product and variant
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        throw new Error('Product not found or inactive');
      }

      // Check if variant exists and has stock
      const productVariant = product.variants.find(
        v => v.size === variant.size && v.color === variant.color
      );

      if (!productVariant) {
        throw new Error('Product variant not found');
      }

      if (productVariant.stock < quantity) {
        throw new Error(`Only ${productVariant.stock} items available in stock`);
      }

      // Get current price (sale price if available, otherwise regular price)
      const currentPrice = product.salePrice || product.price;

      // Find or create cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => 
          item.product.toString() === productId &&
          item.variant.size === variant.size &&
          item.variant.color === variant.color
      );

      if (existingItemIndex > -1) {
        // Update existing item
        const newQuantity = cart.items[existingItemIndex].quantity + quantity;
        
        if (newQuantity > productVariant.stock) {
          throw new Error(`Cannot add ${quantity} more items. Only ${productVariant.stock - cart.items[existingItemIndex].quantity} more available`);
        }

        cart.items[existingItemIndex].quantity = newQuantity;
        cart.items[existingItemIndex].price = currentPrice;
        cart.items[existingItemIndex].subtotal = currentPrice * newQuantity;
      } else {
        // Add new item
        cart.items.push({
          product: productId as any,
          variant,
          quantity,
          price: currentPrice,
          subtotal: currentPrice * quantity
        });
      }

      await cart.save();
      
      // Populate and return
      await cart.populate({
        path: 'items.product',
        select: 'name slug images price salePrice isActive totalStock variants'
      });

      return this.formatCartResponse(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    userId: string, 
    productId: string, 
    variant: { size: string; color: string }, 
    updateData: UpdateCartItemDto
  ): Promise<CartResponseDto> {
    try {
      const { quantity } = updateData;

      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }

      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex(
        item => 
          item.product.toString() === productId &&
          item.variant.size === variant.size &&
          item.variant.color === variant.color
      );

      if (itemIndex === -1) {
        throw new Error('Item not found in cart');
      }

      // Validate stock availability
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const productVariant = product.variants.find(
        v => v.size === variant.size && v.color === variant.color
      );

      if (!productVariant || productVariant.stock < quantity) {
        throw new Error(`Only ${productVariant?.stock || 0} items available in stock`);
      }

      // Update item
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].subtotal = cart.items[itemIndex].price * quantity;

      await cart.save();

      // Populate and return
      await cart.populate({
        path: 'items.product',
        select: 'name slug images price salePrice isActive totalStock variants'
      });

      return this.formatCartResponse(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(userId: string, removeData: RemoveFromCartDto): Promise<CartResponseDto> {
    try {
      const { productId, variant } = removeData;

      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new Error('Cart not found');
      }

      cart.items = cart.items.filter(
        item => !(
          item.product.toString() === productId &&
          item.variant.size === variant.size &&
          item.variant.color === variant.color
        )
      );

      await cart.save();

      // Populate and return
      await cart.populate({
        path: 'items.product',
        select: 'name slug images price salePrice isActive totalStock variants'
      });

      return this.formatCartResponse(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Clear entire cart
   */
  async clearCart(userId: string): Promise<CartResponseDto> {
    try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
      } else {
        cart.items = [];
        await cart.save();
      }

      return this.formatCartResponse(cart);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get cart summary
   */
  async getCartSummary(userId: string): Promise<CartSummaryDto> {
    try {
      const cart = await Cart.findOne({ user: userId });
      
      if (!cart) {
        return {
          totalItems: 0,
          totalAmount: 0,
          itemsCount: 0
        };
      }

      return {
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        itemsCount: cart.items.length
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format cart response
   */
  private formatCartResponse(cart: ICart): CartResponseDto {
    const formattedItems: CartItemResponseDto[] = cart.items.map(item => {
      const product = item.product as any;
      
      // Find the specific variant to get stock info
      const productVariant = product.variants?.find(
        (v: any) => v.size === item.variant.size && v.color === item.variant.color
      );

      return {
        _id: item._id?.toString() || '',
        product: {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          images: product.images || [],
          currentPrice: product.salePrice || product.price,
          isActive: product.isActive,
          totalStock: product.totalStock
        },
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        isAvailable: product.isActive && (productVariant?.stock || 0) > 0,
        maxQuantity: productVariant?.stock || 0
      };
    });

    return {
      _id: cart._id,
      user: cart.user.toString(),
      items: formattedItems,
      totalItems: cart.totalItems,
      totalAmount: cart.totalAmount,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt
    };
  }
}
