import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  logo?: {
    public_id: string;
    secure_url: string;
  };
  website?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: [true, 'Please add a brand name'],
    trim: true,
    maxlength: [100, 'Brand name cannot be more than 100 characters'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  logo: {
    public_id: {
      type: String,
      trim: true
    },
    secure_url: {
      type: String,
      trim: true
    }
  },
  website: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      'Please provide a valid website URL'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for products count
brandSchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brand',
  count: true
});

// Generate slug from name before saving
brandSchema.pre('save', function(this: IBrand, next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  next();
});

// Prevent deletion if brand has products
brandSchema.pre('deleteOne', { document: true, query: false }, async function(this: IBrand, next) {
  try {
    const Product = mongoose.model('Product');
    const productCount = await Product.countDocuments({ brand: this._id });
    
    if (productCount > 0) {
      throw new Error('Cannot delete brand that has products. Please move or delete products first.');
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Virtual for products count
brandSchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brand',
  count: true
});

// Create indexes
brandSchema.index({ name: 1 });
brandSchema.index({ slug: 1 });
brandSchema.index({ isActive: 1 });
brandSchema.index({ sortOrder: 1 });

export const Brand = mongoose.model<IBrand>('Brand', brandSchema);
