import api from './api';

export interface ProductImage {
    public_id: string;
    secure_url: string;
    alt?: string;
}

export interface ProductVariant {
    size: string;
    color: string;
    stock: number;
    price?: number;
    sku?: string;
}

export interface ProductCategory {
    _id: string;
    name: string;
    slug: string;
}

export interface ProductBrand {
    _id: string;
    name: string;
    slug: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    shortDescription?: string;
    slug: string;
    sku: string;
    price: number;
    salePrice?: number;
    images: ProductImage[];
    category?: ProductCategory | null;
    brand?: ProductBrand | null;
    variants: ProductVariant[];
    totalStock: number;
    tags: string[];
    isActive: boolean;
    isFeatured: boolean;
    material?: string;
    averageRating: number;
    reviewsCount: number;
    salesCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductData {
    name: string;
    description: string;
    shortDescription?: string;
    sku: string;
    price: number;
    salePrice?: number;
    category: string;
    brand: string;
    variants?: ProductVariant[];
    tags?: string[];
    isActive?: boolean;
    isFeatured?: boolean;
    material?: string;
}

export interface UpdateProductData {
    name?: string;
    description?: string;
    shortDescription?: string;
    sku?: string;
    price?: number;
    salePrice?: number;
    category?: string;
    brand?: string;
    variants?: ProductVariant[];
    tags?: string[];
    isActive?: boolean;
    isFeatured?: boolean;
    material?: string;
}

export interface ProductsResponse {
    products: Product[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export const productService = {
    // Get all products (admin)
    async getAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        category?: string;
        brand?: string;
        isActive?: boolean;
        isFeatured?: boolean;
    }): Promise<ProductsResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.search) queryParams.append('search', params.search);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.category) queryParams.append('category', params.category);
        if (params?.brand) queryParams.append('brand', params.brand);
        if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
        if (params?.isFeatured !== undefined) queryParams.append('isFeatured', String(params.isFeatured));

        const response = await api.get(`/products/admin?${queryParams}`);

        // Handle nested response structure
        const outerData = response.data;
        const innerData = outerData.data || outerData;

        return {
            products: innerData.data || innerData.products || [],
            pagination: {
                currentPage: innerData.pagination?.page || innerData.pagination?.currentPage || 1,
                totalPages: innerData.pagination?.totalPages || 1,
                totalItems: innerData.pagination?.totalCount || innerData.pagination?.totalItems || 0,
                itemsPerPage: innerData.pagination?.limit || innerData.pagination?.itemsPerPage || 10
            }
        };
    },

    // Get single product
    async getById(id: string): Promise<Product> {
        const response = await api.get(`/products/admin/${id}`);
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Create product
    async create(data: CreateProductData, images?: File[]): Promise<Product> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.shortDescription) formData.append('shortDescription', data.shortDescription);
        formData.append('sku', data.sku);
        formData.append('price', String(data.price));
        if (data.salePrice) formData.append('salePrice', String(data.salePrice));
        formData.append('category', data.category);
        formData.append('brand', data.brand);
        if (data.variants) formData.append('variants', JSON.stringify(data.variants));
        if (data.tags) formData.append('tags', JSON.stringify(data.tags));
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.isFeatured !== undefined) formData.append('isFeatured', String(data.isFeatured));
        if (data.material) formData.append('material', data.material);

        if (images) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        const response = await api.post('/products/admin', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Update product
    async update(id: string, data: UpdateProductData, images?: File[]): Promise<Product> {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.description) formData.append('description', data.description);
        if (data.shortDescription !== undefined) formData.append('shortDescription', data.shortDescription);
        if (data.sku) formData.append('sku', data.sku);
        if (data.price !== undefined && data.price > 0) formData.append('price', String(data.price));
        // Only send salePrice if it has a valid positive value
        if (data.salePrice !== undefined && data.salePrice > 0) {
            formData.append('salePrice', String(data.salePrice));
        }
        if (data.category) formData.append('category', data.category);
        if (data.brand) formData.append('brand', data.brand);
        if (data.variants) formData.append('variants', JSON.stringify(data.variants));
        if (data.tags) formData.append('tags', JSON.stringify(data.tags));
        if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
        if (data.isFeatured !== undefined) formData.append('isFeatured', String(data.isFeatured));
        if (data.material !== undefined) formData.append('material', data.material);

        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        const response = await api.put(`/products/admin/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Delete product
    async delete(id: string): Promise<void> {
        await api.delete(`/products/admin/${id}`);
    }
};
