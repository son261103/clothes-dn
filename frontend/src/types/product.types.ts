export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice?: number;
  SKU: string;
  images: string[];
  categoryId: string;
  brandId: string;
  stock: number;
  minStock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: import('./category.types').Category;
  brand?: import('./brand.types').Brand;
}

export interface ProductCreateData {
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  SKU: string;
  images?: string[];
  categoryId: string;
  brandId: string;
  stock: number;
  minStock?: number;
  isFeatured?: boolean;
}

export interface ProductUpdateData {
  name?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  SKU?: string;
  images?: string[];
  categoryId?: string;
  brandId?: string;
  stock?: number;
  minStock?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  featuredProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  averagePrice: number;
  topSellingProducts: Array<{
    product: Product;
    soldCount: number;
  }>;
  productsByCategory: Array<{
    category: string;
    count: number;
  }>;
  productsByBrand: Array<{
    brand: string;
    count: number;
  }>;
  recentProducts: number;
}

export interface GetProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}