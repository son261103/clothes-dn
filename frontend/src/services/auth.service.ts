import { api } from '../lib/api';
import {
  AuthResponse,
  RegisterData,
  LoginData,
  RefreshTokenData,
  ChangePasswordData,
  ApiResponse,
  User
} from '../types';

export class AuthService {
  // User Authentication
  static async register(userData: RegisterData): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await api.post<ApiResponse<AuthResponse['data']>>('/auth/user/register', userData);
    return response.data;
  }

  static async login(credentials: LoginData): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await api.post<ApiResponse<AuthResponse['data']>>('/auth/user/login', credentials);
    return response.data;
  }

  static async refreshToken(tokenData: RefreshTokenData): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/user/refresh', tokenData);
    return response.data;
  }

  static async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/auth/user/profile');
    return response.data;
  }

  static async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse<{ message: string }>> {
    const response = await api.put<ApiResponse<{ message: string }>>('/auth/user/change-password', passwordData);
    return response.data;
  }

  static async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/user/logout');
    return response.data;
  }

  // Admin Authentication
  static async adminRegister(userData: RegisterData): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await api.post<ApiResponse<AuthResponse['data']>>('/auth/admin/register', userData);
    return response.data;
  }

  static async adminLogin(credentials: LoginData): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await api.post<ApiResponse<AuthResponse['data']>>('/auth/admin/login', credentials);
    return response.data;
  }

  static async adminRefreshToken(tokenData: RefreshTokenData): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/admin/refresh', tokenData);
    return response.data;
  }

  static async adminGetProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/auth/admin/profile');
    return response.data;
  }

  static async adminChangePassword(passwordData: ChangePasswordData): Promise<ApiResponse<{ message: string }>> {
    const response = await api.put<ApiResponse<{ message: string }>>('/auth/admin/change-password', passwordData);
    return response.data;
  }

  static async adminLogout(): Promise<ApiResponse<{ message: string }>> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/admin/logout');
    return response.data;
  }

  // Utility methods
  static storeAuthData(data: AuthResponse['data']): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  static clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  static getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  static getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  static isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  static isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'admin';
  }
}

export default AuthService;