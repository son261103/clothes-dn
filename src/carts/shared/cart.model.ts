import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  _id?: string;
  product: string | mongoose.Types.ObjectId;
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
  price: number; // Price at the time of adding to cart
  subtotal: number;
}

export interface ICart extends Document {
  _id: string;
  user: string | mongoose.Types.ObjectId;
  items: ICartItem[];
  totalItems: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variant: {
    size: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  }
});

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalItems: {
    type: Number,
    default: 0,
    min: 0
  },
  totalAmount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate subtotal for each item before saving
cartItemSchema.pre('save', function(this: ICartItem, next) {
  this.subtotal = this.price * this.quantity;
  next();
});

// Calculate totals before saving cart
cartSchema.pre('save', function(this: ICart, next) {
  if (this.isModified('items')) {
    this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = this.items.reduce((total, item) => total + item.subtotal, 0);
  }
  next();
});

// Ensure unique product-variant combination in cart
cartSchema.index({
  user: 1,
  'items.product': 1,
  'items.variant.size': 1,
  'items.variant.color': 1
}, {
  unique: true,
  sparse: true
});

// Create indexes (excluding user as it already has unique: true)
cartSchema.index({ 'items.product': 1 });

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
