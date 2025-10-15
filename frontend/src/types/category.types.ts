export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface CategoryCreateData {
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface CategoryUpdateData {
  name?: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
}

export interface GetCategoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}