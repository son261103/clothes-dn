import { api } from '../lib/api';
import {
  User,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  SortParams
} from '../types';

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface GetUsersQuery extends PaginationParams, SortParams {
  search?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentRegistrations: number;
}

export class UserService {
  // User Profile Management
  static async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>('/users/user/profile');
    return response.data;
  }

  static async updateProfile(userData: UpdateUserData): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>('/users/user/profile', userData);
    return response.data;
  }

  static async deactivateAccount(): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>('/users/user/profile');
    return response.data;
  }

  // Admin User Management
  static async getAllUsers(params?: GetUsersQuery): Promise<PaginatedResponse<User[]>> {
    const response = await api.get<PaginatedResponse<User[]>>('/users/admin', { params });
    return response.data;
  }

  static async getUserById(userId: string): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>(`/users/admin/${userId}`);
    return response.data;
  }

  static async updateUser(userId: string, userData: UpdateUserData): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>(`/users/admin/${userId}`, userData);
    return response.data;
  }

  static async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/users/admin/${userId}`);
    return response.data;
  }

  static async permanentlyDeleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/users/admin/${userId}/permanent`);
    return response.data;
  }

  static async toggleUserStatus(userId: string): Promise<ApiResponse<User>> {
    const response = await api.patch<ApiResponse<User>>(`/users/admin/${userId}/toggle-status`);
    return response.data;
  }

  static async getUserStats(): Promise<ApiResponse<UserStats>> {
    const response = await api.get<ApiResponse<UserStats>>('/users/admin/stats');
    return response.data;
  }

  // Avatar Upload
  static async uploadAvatar(file: File): Promise<ApiResponse<{ avatar: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.upload<ApiResponse<{ avatar: string }>>('/users/user/upload-avatar', formData);
    return response.data;
  }

  // Utility methods
  static updateUserInLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getCurrentUserFromStorage(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  static getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`.trim();
  }

  static getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  static formatUserRole(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  static isUserActive(user: User): boolean {
    return user.isActive;
  }

  static formatUserDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export default UserService;