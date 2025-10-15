import { api } from '../lib/api';
import {
  Product,
  ProductCreateData,
  ProductUpdateData,
  ApiResponse,
  PaginatedResponse,
  GetProductsQuery
} from '../types';

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  featuredProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  averagePrice: number;
  topSellingProducts: Array<{
    product: Product;
    soldCount: number;
  }>;
  productsByCategory: Array<{
    category: string;
    count: number;
  }>;
  productsByBrand: Array<{
    brand: string;
    count: number;
  }>;
  recentProducts: number;
}

export class ProductService {
  // User Product endpoints
  static async getAllProducts(params?: GetProductsQuery): Promise<PaginatedResponse<Product[]>> {
    const response = await api.get<PaginatedResponse<Product[]>>('/products/user', { params });
    return response.data;
  }

  static async getFeaturedProducts(params?: GetProductsQuery): Promise<PaginatedResponse<Product[]>> {
    const response = await api.get<PaginatedResponse<Product[]>>('/products/user/featured', { params });
    return response.data;
  }

  static async searchProducts(params: GetProductsQuery): Promise<PaginatedResponse<Product[]>> {
    const response = await api.get<PaginatedResponse<Product[]>>('/products/user/search', { params });
    return response.data;
  }

  static async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    const response = await api.get<ApiResponse<Product>>(`/products/user/slug/${slug}`);
    return response.data;
  }

  static async getProductById(productId: string): Promise<ApiResponse<Product>> {
    const response = await api.get<ApiResponse<Product>>(`/products/user/${productId}`);
    return response.data;
  }

  // Admin Product endpoints
  static async adminGetAllProducts(params?: GetProductsQuery): Promise<PaginatedResponse<Product[]>> {
    const response = await api.get<PaginatedResponse<Product[]>>('/products/admin', { params });
    return response.data;
  }

  static async createProduct(productData: ProductCreateData): Promise<ApiResponse<Product>> {
    const response = await api.post<ApiResponse<Product>>('/products/admin', productData);
    return response.data;
  }

  static async adminGetProductById(productId: string): Promise<ApiResponse<Product>> {
    const response = await api.get<ApiResponse<Product>>(`/products/admin/${productId}`);
    return response.data;
  }

  static async updateProduct(productId: string, productData: ProductUpdateData): Promise<ApiResponse<Product>> {
    const response = await api.put<ApiResponse<Product>>(`/products/admin/${productId}`, productData);
    return response.data;
  }

  static async deleteProduct(productId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/products/admin/${productId}`);
    return response.data;
  }

  static async getProductStats(): Promise<ApiResponse<ProductStats>> {
    const response = await api.get<ApiResponse<ProductStats>>('/products/admin/stats');
    return response.data;
  }

  // Product Images Upload
  static async uploadProductImages(files: File[]): Promise<ApiResponse<{ images: string[] }>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    const response = await api.upload<ApiResponse<{ images: string[] }>>('/products/admin/upload-images', formData);
    return response.data;
  }

  static async deleteProductImage(imageUrl: string): Promise<ApiResponse<{ message: string }>> {
    const response = await api.delete<ApiResponse<{ message: string }>>('/products/admin/delete-image', {
      data: { imageUrl }
    });
    return response.data;
  }

  // Utility methods
  static formatProductName(product: Product): string {
    return product.name.charAt(0).toUpperCase() + product.name.slice(1);
  }

  static formatProductDescription(description?: string): string {
    if (!description) return '';
    return description.charAt(0).toUpperCase() + description.slice(1);
  }

  static isProductActive(product: Product): boolean {
    return product.isActive;
  }

  static isProductFeatured(product: Product): boolean {
    return product.isFeatured;
  }

  static isProductInStock(product: Product): boolean {
    return product.stock > 0;
  }

  static isProductLowStock(product: Product): boolean {
    return product.stock <= product.minStock;
  }

  static getDisplayPrice(product: Product): number {
    return product.salePrice || product.price;
  }

  static hasDiscount(product: Product): boolean {
    return !!(product.salePrice && product.salePrice < product.price);
  }

  static getDiscountPercentage(product: Product): number {
    if (!product.salePrice || product.salePrice >= product.price) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  }

  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  static formatPriceVND(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  static validateProductSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  }

  static generateProductSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  static getStockStatus(product: Product): 'in-stock' | 'low-stock' | 'out-of-stock' {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= product.minStock) return 'low-stock';
    return 'in-stock';
  }

  static getStockStatusText(product: Product): string {
    const status = this.getStockStatus(product);
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  }

  static getStockStatusColor(product: Product): string {
    const status = this.getStockStatus(product);
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-100';
      case 'low-stock': return 'text-yellow-600 bg-yellow-100';
      case 'out-of-stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  static searchProductsByName(products: Product[], searchTerm: string): Product[] {
    const term = searchTerm.toLowerCase().trim();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.SKU.toLowerCase().includes(term)
    );
  }

  static filterProductsByCategory(products: Product[], categoryId: string): Product[] {
    return products.filter(product => product.categoryId === categoryId);
  }

  static filterProductsByBrand(products: Product[], brandId: string): Product[] {
    return products.filter(product => product.brandId === brandId);
  }

  static filterProductsByPriceRange(products: Product[], minPrice?: number, maxPrice?: number): Product[] {
    return products.filter(product => {
      const displayPrice = this.getDisplayPrice(product);
      if (minPrice !== undefined && displayPrice < minPrice) return false;
      if (maxPrice !== undefined && displayPrice > maxPrice) return false;
      return true;
    });
  }

  static filterFeaturedProducts(products: Product[]): Product[] {
    return products.filter(product => product.isFeatured);
  }

  static filterActiveProducts(products: Product[]): Product[] {
    return products.filter(product => product.isActive);
  }

  static filterInStockProducts(products: Product[]): Product[] {
    return products.filter(product => this.isProductInStock(product));
  }

  static sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
    return [...products].sort((a, b) => {
      const priceA = this.getDisplayPrice(a);
      const priceB = this.getDisplayPrice(b);
      return ascending ? priceA - priceB : priceB - priceA;
    });
  }

  static sortProductsByName(products: Product[], ascending: boolean = true): Product[] {
    return [...products].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  }

  static sortProductsByStock(products: Product[], ascending: boolean = true): Product[] {
    return [...products].sort((a, b) => {
      return ascending ? a.stock - b.stock : b.stock - a.stock;
    });
  }

  static sortProductsByCreatedDate(products: Product[], newestFirst: boolean = true): Product[] {
    return [...products].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return newestFirst ? dateB - dateA : dateA - dateB;
    });
  }

  static validateProductData(productData: Partial<ProductCreateData | ProductUpdateData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (productData.name) {
      if (productData.name.trim().length < 2) {
        errors.push('Product name must be at least 2 characters long');
      }
      if (productData.name.trim().length > 200) {
        errors.push('Product name cannot exceed 200 characters');
      }
    }

    if (productData.price !== undefined) {
      if (productData.price <= 0) {
        errors.push('Price must be greater than 0');
      }
      if (productData.price > 999999) {
        errors.push('Price cannot exceed 999,999');
      }
    }

    if (productData.salePrice !== undefined) {
      if (productData.salePrice < 0) {
        errors.push('Sale price cannot be negative');
      }
      if (productData.price && productData.salePrice >= productData.price) {
        errors.push('Sale price must be less than regular price');
      }
    }

    if (productData.SKU) {
      if (productData.SKU.trim().length < 2) {
        errors.push('SKU must be at least 2 characters long');
      }
      if (productData.SKU.trim().length > 50) {
        errors.push('SKU cannot exceed 50 characters');
      }
    }

    if (productData.stock !== undefined) {
      if (productData.stock < 0) {
        errors.push('Stock cannot be negative');
      }
      if (productData.stock > 99999) {
        errors.push('Stock cannot exceed 99,999');
      }
    }

    if (productData.minStock !== undefined) {
      if (productData.minStock < 0) {
        errors.push('Minimum stock cannot be negative');
      }
      if (productData.stock !== undefined && productData.minStock > productData.stock) {
        errors.push('Minimum stock cannot be greater than current stock');
      }
    }

    if (productData.description && productData.description.length > 2000) {
      errors.push('Product description cannot exceed 2000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static generateSKU(categoryId: string, brandId: string, productName: string): string {
    const categoryCode = categoryId.substring(0, 3).toUpperCase();
    const brandCode = brandId.substring(0, 3).toUpperCase();
    const nameCode = productName.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase().substring(-4);
    return `${categoryCode}-${brandCode}-${nameCode}-${timestamp}`;
  }
}

export default ProductService;