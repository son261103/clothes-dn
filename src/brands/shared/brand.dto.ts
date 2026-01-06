export interface CreateBrandDto {
  name: string;
  description?: string;
  category?: string;
  website?: string;
  sortOrder?: number;
  logo?: Express.Multer.File;
}

export interface UpdateBrandDto {
  name?: string;
  description?: string;
  category?: string;
  website?: string;
  isActive?: boolean;
  sortOrder?: number;
  logo?: Express.Multer.File;
}

export interface BrandResponseDto {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  logo?: {
    public_id: string;
    secure_url: string;
  };
  category?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  website?: string;
  isActive: boolean;
  sortOrder: number;
  productsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandFilterDto {
  search?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'createdAt' | 'sortOrder';
  sortOrder?: 'asc' | 'desc';
}
