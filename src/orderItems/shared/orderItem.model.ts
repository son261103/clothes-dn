import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem extends Document {
  _id: string;
  order: string | mongoose.Types.ObjectId;
  product: string | mongoose.Types.ObjectId;
  variant: {
    size: string;
    color: string;
  };
  quantity: number;
  price: number; // Price at the time of order
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
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
    min: [1, 'Quantity must be at least 1']
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
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate subtotal before saving
orderItemSchema.pre('save', function(this: IOrderItem, next) {
  this.subtotal = this.price * this.quantity;
  next();
});

// Create indexes
orderItemSchema.index({ order: 1 });
orderItemSchema.index({ product: 1 });

export const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
