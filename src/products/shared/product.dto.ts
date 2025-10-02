import { IProductImage, IProductVariant } from './product.model';

export interface CreateProductDto {
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  salePrice?: number;
  category: string;
  brand: string;
  variants: IProductVariant[];
  tags?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  material?: string;
  careInstructions?: string;
  isFeatured?: boolean;
  images?: Express.Multer.File[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  price?: number;
  salePrice?: number;
  category?: string;
  brand?: string;
  variants?: IProductVariant[];
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  material?: string;
  careInstructions?: string;
  images?: Express.Multer.File[];
}

export interface ProductResponseDto {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  currentPrice: number;
  discountPercentage: number;
  images: IProductImage[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  variants: IProductVariant[];
  totalStock: number;
  isInStock: boolean;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
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

export interface ProductFilterDto {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt' | 'averageRating' | 'salesCount' | 'viewsCount';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductStatsDto {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  featuredProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  averagePrice: number;
  topCategories: Array<{
    _id: string;
    name: string;
    count: number;
  }>;
  topBrands: Array<{
    _id: string;
    name: string;
    count: number;
  }>;
}
