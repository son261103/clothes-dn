import { api } from '../lib/api';
import {
  Brand,
  BrandCreateData,
  BrandUpdateData,
  ApiResponse,
  PaginatedResponse,
  GetBrandsQuery
} from '../types';

export interface BrandStats {
  totalBrands: number;
  activeBrands: number;
  inactiveBrands: number;
  brandsWithMostProducts: Array<{
    brand: Brand;
    productCount: number;
  }>;
  recentBrands: number;
}

export class BrandService {
  // User Brand endpoints
  static async getAllBrands(params?: GetBrandsQuery): Promise<PaginatedResponse<Brand[]>> {
    const response = await api.get<PaginatedResponse<Brand[]>>('/brands/user', { params });
    return response.data;
  }

  static async getBrandBySlug(slug: string): Promise<ApiResponse<Brand>> {
    const response = await api.get<ApiResponse<Brand>>(`/brands/user/slug/${slug}`);
    return response.data;
  }

  static async getBrandById(brandId: string): Promise<ApiResponse<Brand>> {
    const response = await api.get<ApiResponse<Brand>>(`/brands/user/${brandId}`);
    return response.data;
  }

  // Admin Brand endpoints
  static async adminGetAllBrands(params?: GetBrandsQuery): Promise<PaginatedResponse<Brand[]>> {
    const response = await api.get<PaginatedResponse<Brand[]>>('/brands/admin', { params });
    return response.data;
  }

  static async createBrand(brandData: BrandCreateData): Promise<ApiResponse<Brand>> {
    const response = await api.post<ApiResponse<Brand>>('/brands/admin', brandData);
    return response.data;
  }

  static async adminGetBrandById(brandId: string): Promise<ApiResponse<Brand>> {
    const response = await api.get<ApiResponse<Brand>>(`/brands/admin/${brandId}`);
    return response.data;
  }

  static async updateBrand(brandId: string, brandData: BrandUpdateData): Promise<ApiResponse<Brand>> {
    const response = await api.put<ApiResponse<Brand>>(`/brands/admin/${brandId}`, brandData);
    return response.data;
  }

  static async deleteBrand(brandId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/brands/admin/${brandId}`);
    return response.data;
  }

  static async getBrandStats(): Promise<ApiResponse<BrandStats>> {
    const response = await api.get<ApiResponse<BrandStats>>('/brands/admin/stats');
    return response.data;
  }

  // Brand Logo Upload
  static async uploadBrandLogo(file: File): Promise<ApiResponse<{ logo: string }>> {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await api.upload<ApiResponse<{ logo: string }>>('/brands/admin/upload-logo', formData);
    return response.data;
  }

  // Utility methods
  static formatBrandName(brand: Brand): string {
    return brand.name.charAt(0).toUpperCase() + brand.name.slice(1);
  }

  static isBrandActive(brand: Brand): boolean {
    return brand.isActive;
  }

  static getBrandDisplayText(brand: Brand): string {
    return this.formatBrandName(brand);
  }

  static validateBrandSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  }

  static generateBrandSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  static formatBrandDescription(description?: string): string {
    if (!description) return '';
    return description.charAt(0).toUpperCase() + description.slice(1);
  }

  static getBrandInitials(brand: Brand): string {
    const words = brand.name.split(' ');
    if (words.length === 1) {
      return brand.name.substring(0, 2).toUpperCase();
    }
    return words.map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
  }

  static searchBrands(brands: Brand[], searchTerm: string): Brand[] {
    const term = searchTerm.toLowerCase().trim();
    return brands.filter(brand =>
      brand.name.toLowerCase().includes(term) ||
      brand.description?.toLowerCase().includes(term) ||
      brand.slug.toLowerCase().includes(term)
    );
  }

  static sortBrandsByName(brands: Brand[], ascending: boolean = true): Brand[] {
    return [...brands].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  }

  static sortBrandsByCreatedDate(brands: Brand[], newestFirst: boolean = true): Brand[] {
    return [...brands].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return newestFirst ? dateB - dateA : dateA - dateB;
    });
  }

  static filterActiveBrands(brands: Brand[]): Brand[] {
    return brands.filter(brand => brand.isActive);
  }

  static getActiveBrandCount(brands: Brand[]): number {
    return brands.filter(brand => brand.isActive).length;
  }

  static getInactiveBrandCount(brands: Brand[]): number {
    return brands.filter(brand => !brand.isActive).length;
  }

  static getBrandsByInitial(brands: Brand[]): Record<string, Brand[]> {
    return brands.reduce((acc, brand) => {
      const initial = brand.name.charAt(0).toUpperCase();
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(brand);
      return acc;
    }, {} as Record<string, Brand[]>);
  }

  static validateBrandData(brandData: Partial<BrandCreateData | BrandUpdateData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (brandData.name) {
      if (brandData.name.trim().length < 2) {
        errors.push('Brand name must be at least 2 characters long');
      }
      if (brandData.name.trim().length > 100) {
        errors.push('Brand name cannot exceed 100 characters');
      }
    }

    if (brandData.description && brandData.description.length > 500) {
      errors.push('Brand description cannot exceed 500 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default BrandService;