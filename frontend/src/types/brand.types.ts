export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandCreateData {
  name: string;
  description?: string;
  logo?: string;
}

export interface BrandUpdateData {
  name?: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
}

export interface BrandStats {
  totalBrands: number;
  activeBrands: number;
  inactiveBrands: number;
  brandsWithMostProducts: Array<{
    brand: Brand;
    productCount: number;
  }>;
  recentBrands: number;
}

export interface GetBrandsQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}