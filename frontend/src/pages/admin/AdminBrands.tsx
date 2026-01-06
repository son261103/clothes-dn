import React, { useState, useEffect, useCallback } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';
import { brandService } from '../../services/brandService';
import { categoryService } from '../../services/categoryService';
import type { Brand, CreateBrandData, UpdateBrandData } from '../../services/brandService';
import type { Category } from '../../services/categoryService';

const AdminBrands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    website: '',
    isActive: true
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Categories for select
  const [categories, setCategories] = useState<Category[]>([]);

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; brand: Brand | null }>({
    isOpen: false,
    brand: null
  });

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await brandService.getAll({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchTerm || undefined,
        sort: sortBy || undefined
      });

      setBrands(response.brands || []);

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
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Không thể tải thương hiệu');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, searchTerm, sortBy]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Fetch categories for select dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll({ limit: 100 });
        setCategories(response.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
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

  const handleAddNew = () => {
    setEditingBrand(null);
    setFormData({ name: '', description: '', category: '', website: '', isActive: true });
    setLogoFile(null);
    setLogoPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description || '',
      category: brand.category?._id || '',
      website: brand.website || '',
      isActive: brand.isActive
    });
    setLogoPreview(brand.logo?.secure_url || null);
    setLogoFile(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
    setFormData({ name: '', description: '', category: '', website: '', isActive: true });
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên thương hiệu');
      return;
    }

    try {
      setFormLoading(true);
      setError(null);

      if (editingBrand) {
        const updateData: UpdateBrandData = {
          name: formData.name,
          description: formData.description,
          category: formData.category || undefined,
          website: formData.website || undefined,
          isActive: formData.isActive
        };
        await brandService.update(editingBrand._id, updateData, logoFile || undefined);
      } else {
        const createData: CreateBrandData = {
          name: formData.name,
          description: formData.description,
          category: formData.category || undefined,
          website: formData.website || undefined,
          isActive: formData.isActive
        };
        await brandService.create(createData, logoFile || undefined);
      }

      setIsModalOpen(false);
      setEditingBrand(null);
      setFormData({ name: '', description: '', category: '', website: '', isActive: true });
      setLogoFile(null);
      setLogoPreview(null);
      setFormLoading(false);

      fetchBrands();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Có lỗi xảy ra');
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (brand: Brand) => {
    setDeleteModal({ isOpen: true, brand });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.brand) return;

    try {
      setFormLoading(true);
      await brandService.delete(deleteModal.brand._id);
      setDeleteModal({ isOpen: false, brand: null });
      fetchBrands();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Không thể xóa thương hiệu');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Thương Hiệu</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Thương Hiệu Mới</AdminButton>
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
                placeholder="Tìm kiếm thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-border rounded-xl bg-bg-sub/50 text-text-main focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange w-full transition-all"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3 text-text-sub"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="w-48">
                <AdminSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(String(val))}
                  options={[
                    { value: '', label: 'Sắp xếp theo' },
                    { value: 'name', label: 'Tên (A-Z)' },
                    { value: '-name', label: 'Tên (Z-A)' },
                    { value: '-createdAt', label: 'Mới nhất' },
                    { value: 'createdAt', label: 'Cũ nhất' }
                  ]}
                  placeholder="Sắp xếp theo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
              <span className="text-text-sub mt-3">Đang tải...</span>
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center py-12 text-text-sub">
              {searchTerm ? 'Không tìm thấy thương hiệu phù hợp' : 'Chưa có thương hiệu nào'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <div key={brand._id} className="glass p-6 rounded-2xl border border-border hover:border-brand-orange/30 transition-all hover:shadow-xl group relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm p-2 overflow-hidden">
                      {brand.logo?.secure_url ? (
                        <img src={brand.logo.secure_url} alt={brand.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-black text-xl text-brand-orange">{brand.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="p-2 rounded-lg hover:bg-bg-sub text-text-sub hover:text-brand-orange"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(brand)}
                        className="p-2 rounded-lg hover:bg-bg-sub text-text-sub hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-main mb-1">{brand.name}</h3>
                  <p className="text-xs text-text-sub mb-1">{brand.slug}</p>
                  {brand.category && (
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-brand-orange/10 text-brand-orange rounded-full mb-2">
                      {brand.category.name}
                    </span>
                  )}
                  <p className="text-text-sub text-sm mb-4 line-clamp-2">{brand.description || 'Chưa có mô tả'}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${brand.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                      }`}>
                      {brand.isActive ? 'Hoạt động' : 'Ngừng'}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-text-sub">Sản phẩm</span>
                      <p className="text-lg font-bold text-brand-orange">{brand.productsCount || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <div className="hidden sm:block">
            <p className="text-sm text-text-sub">
              Hiển thị <span className="font-bold text-text-main">{brands.length}</span> trong số{' '}
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

      {/* Add/Edit Brand Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingBrand ? "Sửa Thương Hiệu" : "Thêm Thương Hiệu Mới"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Tên thương hiệu *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ví dụ: Nike, Adidas"
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Logo</label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <img src={logoPreview} alt="Preview" className="w-20 h-20 rounded-xl object-contain bg-white p-2" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-bg-sub border-2 border-dashed border-border flex items-center justify-center text-text-sub">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="flex-1 text-sm text-text-sub file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-primary-hover file:cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Danh mục</label>
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
            <label className="text-sm font-bold text-text-main">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Trạng thái</label>
            <AdminSelect
              value={formData.isActive ? 'active' : 'inactive'}
              onChange={(val) => setFormData(prev => ({ ...prev, isActive: val === 'active' }))}
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Ngừng hoạt động' }
              ]}
              placeholder="Chọn trạng thái"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Mô tả</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Nhập mô tả thương hiệu..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton variant="ghost" onClick={handleClose} type="button" disabled={formLoading}>
              Hủy
            </AdminButton>
            <AdminButton variant="primary" type="submit" disabled={formLoading}>
              {formLoading ? 'Đang lưu...' : (editingBrand ? 'Cập nhật' : 'Tạo mới')}
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, brand: null })}
        title="Xác nhận xóa"
      >
        <div className="space-y-6">
          <p className="text-text-main">
            Bạn có chắc chắn muốn xóa thương hiệu <strong>"{deleteModal.brand?.name}"</strong>?
          </p>
          <p className="text-sm text-text-sub">
            Hành động này không thể hoàn tác. Thương hiệu có sản phẩm sẽ không thể xóa.
          </p>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false, brand: null })}
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

export default AdminBrands;
