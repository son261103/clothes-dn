import { api } from '../lib/api';
import {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  ApiResponse,
  PaginatedResponse,
  GetCategoriesQuery
} from '../types';

export class CategoryService {
  // User Category endpoints
  static async getAllCategories(params?: GetCategoriesQuery): Promise<PaginatedResponse<Category[]>> {
    const response = await api.get<PaginatedResponse<Category[]>>('/categories/user', { params });
    return response.data;
  }

  static async getCategoryTree(): Promise<ApiResponse<Category[]>> {
    const response = await api.get<ApiResponse<Category[]>>('/categories/user/tree');
    return response.data;
  }

  static async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    const response = await api.get<ApiResponse<Category>>(`/categories/user/slug/${slug}`);
    return response.data;
  }

  static async getCategoryById(categoryId: string): Promise<ApiResponse<Category>> {
    const response = await api.get<ApiResponse<Category>>(`/categories/user/${categoryId}`);
    return response.data;
  }

  // Admin Category endpoints
  static async adminGetAllCategories(params?: GetCategoriesQuery): Promise<PaginatedResponse<Category[]>> {
    const response = await api.get<PaginatedResponse<Category[]>>('/categories/admin', { params });
    return response.data;
  }

  static async adminGetCategoryTree(): Promise<ApiResponse<Category[]>> {
    const response = await api.get<ApiResponse<Category[]>>('/categories/admin/tree');
    return response.data;
  }

  static async createCategory(categoryData: CategoryCreateData): Promise<ApiResponse<Category>> {
    const response = await api.post<ApiResponse<Category>>('/categories/admin', categoryData);
    return response.data;
  }

  static async adminGetCategoryById(categoryId: string): Promise<ApiResponse<Category>> {
    const response = await api.get<ApiResponse<Category>>(`/categories/admin/${categoryId}`);
    return response.data;
  }

  static async updateCategory(categoryId: string, categoryData: CategoryUpdateData): Promise<ApiResponse<Category>> {
    const response = await api.put<ApiResponse<Category>>(`/categories/admin/${categoryId}`, categoryData);
    return response.data;
  }

  static async deleteCategory(categoryId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/categories/admin/${categoryId}`);
    return response.data;
  }

  // Category Image Upload
  static async uploadCategoryImage(file: File): Promise<ApiResponse<{ image: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.upload<ApiResponse<{ image: string }>>('/categories/admin/upload-image', formData);
    return response.data;
  }

  // Utility methods
  static formatCategoryName(category: Category): string {
    return category.name.charAt(0).toUpperCase() + category.name.slice(1);
  }

  static getCategoryFullPath(category: Category): string {
    if (!category.parentId) return category.name;
    // This would need parent data from the tree structure
    return category.name; // Simplified for now
  }

  static getCategoryWithChildren(categories: Category[], parentId?: string): Category[] {
    return categories
      .filter(category => category.parentId === parentId)
      .map(category => ({
        ...category,
        children: this.getCategoryWithChildren(categories, category.id)
      }));
  }

  static buildCategoryTree(categories: Category[]): Category[] {
    return this.getCategoryWithChildren(categories);
  }

  static flattenCategoryTree(categories: Category[]): Category[] {
    const flattened: Category[] = [];

    const flatten = (items: Category[]) => {
      items.forEach(item => {
        flattened.push(item);
        if (item.children && item.children.length > 0) {
          flatten(item.children);
        }
      });
    };

    flatten(categories);
    return flattened;
  }

  static isCategoryActive(category: Category): boolean {
    return category.isActive;
  }

  static getCategoryDisplayText(category: Category): string {
    let prefix = '';
    let current = category;

    // Add visual hierarchy with dashes for subcategories
    if (category.parentId) {
      prefix = '— ';
    }

    return prefix + this.formatCategoryName(category);
  }

  static sortCategoriesByHierarchy(categories: Category[]): Category[] {
    const sorted: Category[] = [];
    const parentCategories = categories.filter(c => !c.parentId);
    const childCategories = categories.filter(c => c.parentId);

    // Add parent categories first
    sorted.push(...parentCategories);

    // Add child categories after their parents
    childCategories.forEach(child => {
      const parentIndex = sorted.findIndex(p => p.id === child.parentId);
      if (parentIndex !== -1) {
        // Insert child right after parent
        sorted.splice(parentIndex + 1, 0, child);
      } else {
        // If parent not found, add to end
        sorted.push(child);
      }
    });

    return sorted;
  }

  static validateCategorySlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  }

  static generateCategorySlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
}

export default CategoryService;