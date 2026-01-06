import React, { useState, useEffect, useCallback } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminCheckbox from '../../components/admin/AdminCheckbox';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import type { Product, CreateProductData, UpdateProductData, ProductVariant } from '../../services/productService';
import type { Category } from '../../services/categoryService';
import type { Brand } from '../../services/brandService';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Categories & Brands for selects
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    sku: '',
    price: '',
    salePrice: '',
    category: '',
    brand: '',
    material: '',
    isActive: true,
    isFeatured: false
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchTerm || undefined,
        sort: sortBy || undefined,
        category: filterCategory || undefined,
        brand: filterBrand || undefined
      });

      setProducts(response.products || []);

      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems
        }));
      }
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Không thể tải sản phẩm');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, searchTerm, sortBy, filterCategory, filterBrand]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catResponse, brandResponse] = await Promise.all([
          categoryService.getAll({ limit: 100 }),
          brandService.getAll({ limit: 100 })
        ]);
        setCategories(catResponse.categories || []);
        setBrands(brandResponse.brands || []);
      } catch (err) {
        console.error('Failed to fetch categories/brands', err);
      }
    };
    fetchData();
  }, []);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== searchTerm) {
        setDebouncedSearch(searchTerm);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      shortDescription: '',
      sku: '',
      price: '',
      salePrice: '',
      category: '',
      brand: '',
      material: '',
      isActive: true,
      isFeatured: false
    });
    setImageFiles([]);
    setImagePreviews([]);
    setVariants([]);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription || '',
      sku: product.sku,
      price: String(product.price),
      salePrice: product.salePrice ? String(product.salePrice) : '',
      category: product.category?._id || '',
      brand: product.brand?._id || '',
      material: product.material || '',
      isActive: product.isActive,
      isFeatured: product.isFeatured
    });
    setImagePreviews(product.images?.map(img => img.secure_url) || []);
    setVariants(product.variants || []);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  // Resize image before upload to reduce file size
  const resizeImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Only resize if larger than maxWidth
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
              resolve(resizedFile);
            } else {
              resolve(file);
            }
          }, 'image/jpeg', quality);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Resize images before adding
      const resizedFiles: File[] = [];
      for (const file of files) {
        const resized = await resizeImage(file);
        resizedFiles.push(resized);
      }

      setImageFiles(prev => [...prev, ...resizedFiles]);
      resizedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { size: '', color: '', stock: 0 }]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.price || !formData.category || !formData.brand) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      setFormLoading(true);
      setError(null);

      const validVariants = variants.filter(v => v.size && v.color);

      if (editingProduct) {
        // Only include salePrice if it has a valid numeric value greater than 0
        const salePriceValue = formData.salePrice && Number(formData.salePrice) > 0 ? Number(formData.salePrice) : undefined;

        const updateData: UpdateProductData = {
          name: formData.name,
          description: formData.description,
          shortDescription: formData.shortDescription,
          sku: formData.sku,
          price: Number(formData.price),
          salePrice: salePriceValue,
          category: formData.category,
          brand: formData.brand,
          material: formData.material,
          isActive: formData.isActive,
          isFeatured: formData.isFeatured,
          variants: validVariants.length > 0 ? validVariants : undefined
        };
        await productService.update(editingProduct._id, updateData, imageFiles.length > 0 ? imageFiles : undefined);
      } else {
        const createData: CreateProductData = {
          name: formData.name,
          description: formData.description,
          shortDescription: formData.shortDescription,
          sku: formData.sku,
          price: Number(formData.price),
          salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
          category: formData.category,
          brand: formData.brand,
          material: formData.material,
          isActive: formData.isActive,
          isFeatured: formData.isFeatured,
          variants: validVariants.length > 0 ? validVariants : undefined
        };
        await productService.create(createData, imageFiles.length > 0 ? imageFiles : undefined);
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
      setFormLoading(false);

      fetchProducts();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Có lỗi xảy ra');
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.product) return;

    try {
      setFormLoading(true);
      await productService.delete(deleteModal.product._id);
      setDeleteModal({ isOpen: false, product: null });
      fetchProducts();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Không thể xóa sản phẩm');
    } finally {
      setFormLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Sản Phẩm</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Sản Phẩm Mới</AdminButton>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">✕</button>
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-border rounded-xl bg-bg-sub/50 text-text-main focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange w-full transition-all"
              />
              <svg className="w-5 h-5 absolute left-3 top-3 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-3 w-full md:w-auto flex-wrap">
              <div className="w-40">
                <AdminSelect
                  value={filterCategory}
                  onChange={(val) => setFilterCategory(String(val))}
                  options={[
                    { value: '', label: 'Tất cả danh mục' },
                    ...categories.map(cat => ({ value: cat._id, label: cat.name }))
                  ]}
                  placeholder="Danh mục"
                />
              </div>
              <div className="w-40">
                <AdminSelect
                  value={filterBrand}
                  onChange={(val) => setFilterBrand(String(val))}
                  options={[
                    { value: '', label: 'Tất cả thương hiệu' },
                    ...brands.map(b => ({ value: b._id, label: b.name }))
                  ]}
                  placeholder="Thương hiệu"
                />
              </div>
              <div className="w-40">
                <AdminSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(String(val))}
                  options={[
                    { value: '', label: 'Sắp xếp' },
                    { value: '-createdAt', label: 'Mới nhất' },
                    { value: 'price', label: 'Giá tăng' },
                    { value: '-price', label: 'Giá giảm' },
                    { value: '-salesCount', label: 'Bán chạy' }
                  ]}
                  placeholder="Sắp xếp"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-sub/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Kho</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Danh mục</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-text-sub">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-sub">
                    {searchTerm || filterCategory || filterBrand ? 'Không tìm thấy sản phẩm phù hợp' : 'Chưa có sản phẩm nào'}
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.images?.[0]?.secure_url ? (
                          <img src={product.images[0].secure_url} alt={product.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="bg-bg-sub border-2 border-dashed border-border rounded-xl w-12 h-12 flex-shrink-0 flex items-center justify-center text-text-sub">
                            📦
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-bold text-text-main">{product.name}</div>
                          <div className="text-xs text-text-sub">SKU: {product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-main">
                        {product.salePrice ? (
                          <>
                            <span className="text-brand-orange">{formatPrice(product.salePrice)}</span>
                            <span className="text-text-sub line-through ml-2 text-xs">{formatPrice(product.price)}</span>
                          </>
                        ) : (
                          formatPrice(product.price)
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                      {product.totalStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                      {product.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${product.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                          }`}>
                          {product.isActive ? 'Hoạt động' : 'Ngừng'}
                        </span>
                        {product.isFeatured && (
                          <span className="px-2 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                            ⭐ Nổi bật
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <div className="hidden sm:block">
            <p className="text-sm text-text-sub">
              Hiển thị <span className="font-bold text-text-main">{products.length}</span> trong số{' '}
              <span className="font-bold text-text-main">{pagination.totalItems}</span> kết quả
            </p>
          </div>
          {pagination.totalPages > 1 && (
            <div className="flex gap-2">
              <AdminButton
                variant="ghost"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
              >
                Trước
              </AdminButton>
              <span className="px-4 py-2 text-sm text-text-main">
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <AdminButton
                variant="ghost"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Sau
              </AdminButton>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
        size="xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Tên sản phẩm *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Áo Sơ Mi Linen"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">SKU *</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value.toUpperCase() }))}
                placeholder="Ví dụ: PRD-0001"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Giá gốc (VNĐ) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Giá khuyến mãi (VNĐ)</label>
              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Danh mục *</label>
              <AdminSelect
                value={formData.category}
                onChange={(val) => setFormData(prev => ({ ...prev, category: String(val) }))}
                options={[
                  { value: '', label: 'Chọn danh mục' },
                  ...categories.map(cat => ({ value: cat._id, label: cat.name }))
                ]}
                placeholder="Chọn danh mục"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Thương hiệu *</label>
              <AdminSelect
                value={formData.brand}
                onChange={(val) => setFormData(prev => ({ ...prev, brand: String(val) }))}
                options={[
                  { value: '', label: 'Chọn thương hiệu' },
                  ...brands.map(b => ({ value: b._id, label: b.name }))
                ]}
                placeholder="Chọn thương hiệu"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Chất liệu</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                placeholder="Ví dụ: Cotton 100%"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Trạng thái</label>
              <div className="flex gap-6">
                <AdminCheckbox
                  checked={formData.isActive}
                  onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  label="Hoạt động"
                />
                <AdminCheckbox
                  checked={formData.isFeatured}
                  onChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  label="Nổi bật"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Hình ảnh sản phẩm</label>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 rounded-xl bg-bg-sub border-2 border-dashed border-border flex items-center justify-center text-text-sub cursor-pointer hover:border-brand-orange transition-colors">
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                <span className="text-2xl">+</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Mô tả ngắn</label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Mô tả ngắn gọn về sản phẩm..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Mô tả chi tiết *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Nhập mô tả sản phẩm..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main resize-none"
              required
            />
          </div>

          {/* Variants */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-main">Biến thể (Size, Màu sắc)</label>
              <AdminButton type="button" variant="ghost" size="sm" onClick={addVariant}>
                + Thêm biến thể
              </AdminButton>
            </div>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) => updateVariant(index, 'size', e.target.value.toUpperCase())}
                  placeholder="Size (S, M, L...)"
                  className="flex-1 px-3 py-2 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange outline-none text-sm text-text-main"
                />
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) => updateVariant(index, 'color', e.target.value)}
                  placeholder="Màu sắc"
                  className="flex-1 px-3 py-2 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange outline-none text-sm text-text-main"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={variant.stock === 0 ? '' : variant.stock}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    updateVariant(index, 'stock', val === '' ? 0 : parseInt(val, 10));
                  }}
                  placeholder="Số lượng"
                  className="w-24 px-3 py-2 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange outline-none text-sm text-text-main"
                />
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton variant="ghost" onClick={handleClose} type="button" disabled={formLoading}>
              Hủy
            </AdminButton>
            <AdminButton variant="primary" type="submit" disabled={formLoading}>
              {formLoading ? 'Đang lưu...' : (editingProduct ? 'Cập nhật' : 'Tạo mới')}
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        title="Xác nhận xóa"
      >
        <div className="space-y-6">
          <p className="text-text-main">
            Bạn có chắc chắn muốn xóa sản phẩm <strong>"{deleteModal.product?.name}"</strong>?
          </p>
          <p className="text-sm text-text-sub">
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false, product: null })}
              disabled={formLoading}
            >
              Hủy
            </AdminButton>
            <AdminButton
              variant="primary"
              onClick={handleDeleteConfirm}
              disabled={formLoading}
              className="!bg-red-500 hover:!bg-red-600"
            >
              {formLoading ? 'Đang xóa...' : 'Xóa'}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminProducts;