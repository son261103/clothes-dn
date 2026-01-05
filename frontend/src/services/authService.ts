import api from './api';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
    phone?: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponseData {
    token: string;
    refreshToken: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export type AuthResponse = AuthResponseData;

export const authService = {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponseData>>('/auth/user/login', data);
        return response.data.data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponseData>>('/auth/user/register', data);
        return response.data.data;
    },

    async getProfile(): Promise<User> {
        const response = await api.get<ApiResponse<User>>('/auth/user/profile');
        return response.data.data;
    },

    async logout(): Promise<void> {
        await api.post('/auth/user/logout');
    },

    // Save auth data to localStorage
    saveAuth(data: AuthResponse): void {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
    },

    // Get current user from localStorage
    getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr || userStr === 'undefined' || userStr === 'null') {
                return null;
            }
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    // Clear auth data
    clearAuth(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
};
