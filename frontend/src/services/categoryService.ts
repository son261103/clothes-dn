import api from './api';

export interface CategoryImage {
    public_id: string;
    secure_url: string;
}

export interface Category {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    image?: CategoryImage;
    parentCategory?: string | Category;
    isActive: boolean;
    sortOrder: number;
    productsCount?: number;
    subcategories?: Category[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryData {
    name: string;
    description?: string;
    parentCategory?: string;
    isActive?: boolean;
    sortOrder?: number;
}

export interface UpdateCategoryData {
    name?: string;
    description?: string;
    parentCategory?: string | null;
    isActive?: boolean;
    sortOrder?: number;
}

export interface CategoriesResponse {
    categories: Category[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const categoryService = {
    // Get all categories (admin)
    async getAll(params?: { page?: number; limit?: number; search?: string; sort?: string; isActive?: boolean }): Promise<CategoriesResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.search) queryParams.append('search', params.search);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));

        const response = await api.get(`/categories/admin?${queryParams}`);

        // Backend returns nested structure: { success, data: { success, data: [...], pagination }, message }
        const outerData = response.data;
        const innerData = outerData.data || outerData;

        return {
            categories: innerData.data || innerData.categories || [],
            pagination: {
                currentPage: innerData.pagination?.page || innerData.pagination?.currentPage || 1,
                totalPages: innerData.pagination?.totalPages || 1,
                totalItems: innerData.pagination?.totalCount || innerData.pagination?.totalItems || 0,
                itemsPerPage: innerData.pagination?.limit || innerData.pagination?.itemsPerPage || 10
            }
        };
    },

    // Get category tree
    async getTree(): Promise<Category[]> {
        const response = await api.get<ApiResponse<Category[]>>('/categories/admin/tree');
        return response.data.data;
    },

    // Get single category
    async getById(id: string): Promise<Category> {
        const response = await api.get<ApiResponse<Category>>(`/categories/admin/${id}`);
        return response.data.data;
    },

    // Create category
    async create(data: CreateCategoryData, image?: File): Promise<Category> {
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.description) formData.append('description', data.description);
        if (data.parentCategory) formData.append('parentCategory', data.parentCategory);
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.sortOrder !== undefined) formData.append('sortOrder', String(data.sortOrder));
        if (image) formData.append('image', image);

        const response = await api.post<ApiResponse<Category>>('/categories/admin', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    },

    // Update category
    async update(id: string, data: UpdateCategoryData, image?: File): Promise<Category> {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.description !== undefined) formData.append('description', data.description);
        // Only send parentCategory if it has a valid value
        if (data.parentCategory && data.parentCategory.trim()) {
            formData.append('parentCategory', data.parentCategory);
        }
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.sortOrder !== undefined) formData.append('sortOrder', String(data.sortOrder));
        if (image) formData.append('image', image);

        const response = await api.put<ApiResponse<Category>>(`/categories/admin/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    },

    // Delete category
    async delete(id: string): Promise<void> {
        await api.delete(`/categories/admin/${id}`);
    }
};
