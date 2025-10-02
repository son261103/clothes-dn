export interface CreateCategoryDto {
  name: string;
  description?: string;
  parentCategory?: string;
  sortOrder?: number;
  image?: Express.Multer.File;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  parentCategory?: string;
  isActive?: boolean;
  sortOrder?: number;
  image?: Express.Multer.File;
}

export interface CategoryResponseDto {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  parentCategory?: CategoryResponseDto;
  subcategories?: CategoryResponseDto[];
  isActive: boolean;
  sortOrder: number;
  productsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryTreeDto {
  _id: string;
  name: string;
  slug: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  sortOrder: number;
  children: CategoryTreeDto[];
}

export interface CategoryFilterDto {
  search?: string;
  parentCategory?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'createdAt' | 'sortOrder';
  sortOrder?: 'asc' | 'desc';
}
