import api from './api';

export interface UserAddress {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    role: 'user' | 'admin';
    phone?: string;
    address?: UserAddress;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
    phone?: string;
    isActive?: boolean;
}

export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'user' | 'admin';
    phone?: string;
    isActive?: boolean;
    address?: UserAddress;
}

export interface UsersResponse {
    users: User[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    adminUsers: number;
    regularUsers: number;
}

export const userService = {
    // Get all users (admin)
    async getAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        role?: string;
        isActive?: boolean;
    }): Promise<UsersResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.search) queryParams.append('search', params.search);
        if (params?.sort) queryParams.append('sort', params.sort);
        if (params?.role) queryParams.append('role', params.role);
        if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));

        const response = await api.get(`/users/admin?${queryParams}`);

        // Handle nested response structure
        const outerData = response.data;
        const innerData = outerData.data || outerData;

        return {
            users: innerData.data || innerData.users || [],
            pagination: {
                currentPage: innerData.pagination?.page || innerData.pagination?.currentPage || 1,
                totalPages: innerData.pagination?.totalPages || 1,
                totalItems: innerData.pagination?.totalCount || innerData.pagination?.totalItems || 0,
                itemsPerPage: innerData.pagination?.limit || innerData.pagination?.itemsPerPage || 10
            }
        };
    },

    // Get single user
    async getById(id: string): Promise<User> {
        const response = await api.get(`/users/admin/${id}`);
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Update user
    async update(id: string, data: UpdateUserData): Promise<User> {
        const response = await api.put(`/users/admin/${id}`, data);
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Toggle user status (active/inactive)
    async toggleStatus(id: string): Promise<User> {
        const response = await api.patch(`/users/admin/${id}/toggle-status`);
        const outerData = response.data;
        return outerData.data || outerData;
    },

    // Delete user (soft delete - deactivate)
    async delete(id: string): Promise<void> {
        await api.delete(`/users/admin/${id}`);
    },

    // Permanently delete user
    async permanentDelete(id: string): Promise<void> {
        await api.delete(`/users/admin/${id}/permanent`);
    },

    // Get user stats
    async getStats(): Promise<UserStats> {
        const response = await api.get('/users/admin/stats');
        const outerData = response.data;
        return outerData.data || outerData;
    }
};
