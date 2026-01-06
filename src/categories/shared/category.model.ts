import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  parentCategory?: string | ICategory;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true,
    maxlength: [100, 'Category name cannot be more than 100 characters'],
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
  image: {
    public_id: {
      type: String,
      trim: true
    },
    secure_url: {
      type: String,
      trim: true
    }
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
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

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Virtual for products count
categorySchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Generate slug from name before saving (Vietnamese support)
categorySchema.pre('save', function (this: ICategory, next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/đ/g, 'd')  // Handle đ BEFORE normalize
      .replace(/Đ/g, 'd')  // Handle Đ
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (á->a, ô->o, etc)
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters, keep spaces
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  next();
});

// Prevent deletion if category has products
categorySchema.pre('deleteOne', { document: true, query: false }, async function (this: ICategory, next) {
  try {
    const Product = mongoose.model('Product');
    const productCount = await Product.countDocuments({ category: this._id });

    if (productCount > 0) {
      throw new Error('Cannot delete category that has products. Please move or delete products first.');
    }

    // Also check for subcategories
    const subcategoryCount = await mongoose.model('Category').countDocuments({ parentCategory: this._id });
    if (subcategoryCount > 0) {
      throw new Error('Cannot delete category that has subcategories. Please delete subcategories first.');
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for products count
categorySchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Create indexes (excluding name and slug as they already have unique: true)
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ sortOrder: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
