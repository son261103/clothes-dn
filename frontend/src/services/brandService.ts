import api from './api';

export interface BrandLogo {
    public_id: string;
    secure_url: string;
}

export interface BrandCategory {
    _id: string;
    name: string;
    slug: string;
}

export interface Brand {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    logo?: BrandLogo;
    category?: BrandCategory | null;
    website?: string;
    isActive: boolean;
    sortOrder: number;
    productsCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBrandData {
    name: string;
    description?: string;
    category?: string;
    website?: string;
    isActive?: boolean;
    sortOrder?: number;
}

export interface UpdateBrandData {
    name?: string;
    description?: string;
    category?: string | null;
    website?: string;
    isActive?: boolean;
    sortOrder?: number;
}

export interface BrandsResponse {
    brands: Brand[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export const brandService = {
    // Get all brands (admin)
    async getAll(params?: { page?: number; limit?: number; search?: string; sort?: string; isActive?: boolean }): Promise<BrandsResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.search) queryParams.append('search', params.search);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));

        const response = await api.get(`/brands/admin?${queryParams}`);

        // Handle nested response structure
        const outerData = response.data;
        const innerData = outerData.data || outerData;

        return {
            brands: innerData.data || innerData.brands || [],
            pagination: {
                currentPage: innerData.pagination?.page || innerData.pagination?.currentPage || 1,
                totalPages: innerData.pagination?.totalPages || 1,
                totalItems: innerData.pagination?.totalCount || innerData.pagination?.totalItems || 0,
                itemsPerPage: innerData.pagination?.limit || innerData.pagination?.itemsPerPage || 10
            }
        };
    },

    // Get single brand
    async getById(id: string): Promise<Brand> {
        const response = await api.get(`/brands/admin/${id}`);
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Create brand
    async create(data: CreateBrandData, logo?: File): Promise<Brand> {
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.description) formData.append('description', data.description);
        if (data.category) formData.append('category', data.category);
        if (data.website) formData.append('website', data.website);
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.sortOrder !== undefined) formData.append('sortOrder', String(data.sortOrder));
        if (logo) formData.append('logo', logo);

        const response = await api.post('/brands/admin', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Update brand
    async update(id: string, data: UpdateBrandData, logo?: File): Promise<Brand> {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.description !== undefined) formData.append('description', data.description);
        if (data.category && data.category.trim()) formData.append('category', data.category);
        if (data.website !== undefined) formData.append('website', data.website);
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.sortOrder !== undefined) formData.append('sortOrder', String(data.sortOrder));
        if (logo) formData.append('logo', logo);

        const response = await api.put(`/brands/admin/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Delete brand
    async delete(id: string): Promise<void> {
        await api.delete(`/brands/admin/${id}`);
    }
};
