import mongoose, { Document, Schema } from 'mongoose';

export interface IProductImage {
  public_id: string;
  secure_url: string;
  alt?: string;
}

export interface IProductVariant {
  size: string;
  color: string;
  stock: number;
  price?: number; // Optional price override for specific variants
  sku?: string;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  images: IProductImage[];
  category: string | mongoose.Types.ObjectId;
  brand: string | mongoose.Types.ObjectId;
  variants: IProductVariant[];
  totalStock: number;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight?: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  material?: string;
  careInstructions?: string;
  averageRating: number;
  reviewsCount: number;
  viewsCount: number;
  salesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productImageSchema = new Schema<IProductImage>({
  public_id: {
    type: String,
    required: true
  },
  secure_url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    trim: true
  }
});

const productVariantSchema = new Schema<IProductVariant>({
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
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  price: {
    type: Number,
    min: 0
  },
  sku: {
    type: String,
    trim: true,
    uppercase: true
  }
});

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Short description cannot be more than 500 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'Please add a product SKU'],
    unique: true,
    trim: true,
    uppercase: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
    min: [0, 'Price cannot be negative']
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price cannot be negative'],
    validate: {
      validator: function(this: IProduct, value: number) {
        return !value || value < this.price;
      },
      message: 'Sale price must be less than regular price'
    }
  },
  images: [productImageSchema],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please add a product category']
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'Please add a product brand']
  },
  variants: [productVariantSchema],
  totalStock: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Number,
    min: 0
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  },
  material: {
    type: String,
    trim: true
  },
  careInstructions: {
    type: String,
    trim: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  viewsCount: {
    type: Number,
    default: 0,
    min: 0
  },
  salesCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current price (sale price if available, otherwise regular price)
productSchema.virtual('currentPrice').get(function(this: IProduct) {
  return this.salePrice || this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function(this: IProduct) {
  if (!this.salePrice) return 0;
  return Math.round(((this.price - this.salePrice) / this.price) * 100);
});

// Virtual for availability status
productSchema.virtual('isInStock').get(function(this: IProduct) {
  return this.totalStock > 0;
});

// Generate slug from name before saving
productSchema.pre('save', function(this: IProduct, next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  next();
});

// Calculate total stock from variants before saving
productSchema.pre('save', function(this: IProduct, next) {
  if (this.isModified('variants')) {
    this.totalStock = this.variants.reduce((total, variant) => total + variant.stock, 0);
  }
  next();
});

// Virtual for current price (sale price if available, otherwise regular price)
productSchema.virtual('currentPrice').get(function(this: IProduct) {
  return this.salePrice || this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function(this: IProduct) {
  if (this.salePrice && this.salePrice < this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('isInStock').get(function(this: IProduct) {
  return this.totalStock > 0;
});

// Create indexes (excluding slug and sku as they already have unique: true)
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ salesCount: -1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
