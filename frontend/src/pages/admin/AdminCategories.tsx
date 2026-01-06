import React, { useState, useEffect, useCallback } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';
import { categoryService } from '../../services/categoryService';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../../services/categoryService';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    parentCategory: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; category: Category | null }>({
    isOpen: false,
    category: null
  });

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAll({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchTerm || undefined,
        sort: sortBy || undefined
      });

      // Handle nested response structure
      const data = (response as any).data || response;
      setCategories(data.categories || data.data || []);

      if (data.pagination) {
        setPagination({
          currentPage: data.pagination.page || data.pagination.currentPage || 1,
          totalPages: data.pagination.totalPages || 1,
          totalItems: data.pagination.totalCount || data.pagination.totalItems || 0,
          itemsPerPage: data.pagination.limit || data.pagination.itemsPerPage || 10
        });
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Không thể tải danh mục');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, searchTerm, sortBy]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Debounced search - only reset page when search changes
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== searchTerm) {
        setDebouncedSearch(searchTerm);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', isActive: true, parentCategory: '' });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive,
      parentCategory: typeof category.parentCategory === 'string'
        ? category.parentCategory
        : category.parentCategory?._id || ''
    });
    setImagePreview(category.image?.secure_url || null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', isActive: true, parentCategory: '' });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      setFormLoading(true);
      setError(null);

      if (editingCategory) {
        // Update
        const updateData: UpdateCategoryData = {
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          parentCategory: formData.parentCategory || null
        };
        await categoryService.update(editingCategory._id, updateData, imageFile || undefined);
      } else {
        // Create
        const createData: CreateCategoryData = {
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          parentCategory: formData.parentCategory || undefined
        };
        await categoryService.create(createData, imageFile || undefined);
      }

      // Close modal first
      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', isActive: true, parentCategory: '' });
      setImageFile(null);
      setImagePreview(null);
      setFormLoading(false);

      // Then fetch new data
      fetchCategories();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Có lỗi xảy ra');
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setDeleteModal({ isOpen: true, category });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.category) return;

    try {
      setFormLoading(true);
      await categoryService.delete(deleteModal.category._id);
      setDeleteModal({ isOpen: false, category: null });
      fetchCategories();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Không thể xóa danh mục');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Danh Mục</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Danh Mục Mới</AdminButton>
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
                placeholder="Tìm kiếm danh mục..."
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-sub/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Tên danh mục</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-text-sub">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-sub">
                    {searchTerm ? 'Không tìm thấy danh mục phù hợp' : 'Chưa có danh mục nào'}
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.image?.secure_url ? (
                          <img
                            src={category.image.secure_url}
                            alt={category.name}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="bg-bg-sub border-2 border-dashed border-border rounded-xl w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-text-sub">
                            {category.name.charAt(0)}
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-bold text-text-main">{category.name}</div>
                          <div className="text-xs text-text-sub">{category.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-sub max-w-xs truncate">
                      {category.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-orange">
                      {category.productsCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${category.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                        }`}>
                        {category.isActive ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
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
              Hiển thị <span className="font-bold text-text-main">{categories.length}</span> trong số{' '}
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

      {/* Add/Edit Category Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingCategory ? "Sửa Danh Mục" : "Thêm Danh Mục Mới"}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Tên danh mục *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ví dụ: Áo, Phụ kiện"
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-main">Hình ảnh</label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover" />
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
                onChange={handleImageChange}
                className="flex-1 text-sm text-text-sub file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-primary-hover file:cursor-pointer"
              />
            </div>
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
              placeholder="Nhập mô tả danh mục..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton variant="ghost" onClick={handleClose} type="button" disabled={formLoading}>
              Hủy
            </AdminButton>
            <AdminButton variant="primary" type="submit" disabled={formLoading}>
              {formLoading ? 'Đang lưu...' : (editingCategory ? 'Cập nhật' : 'Tạo mới')}
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, category: null })}
        title="Xác nhận xóa"
      >
        <div className="space-y-6">
          <p className="text-text-main">
            Bạn có chắc chắn muốn xóa danh mục <strong>"{deleteModal.category?.name}"</strong>?
          </p>
          <p className="text-sm text-text-sub">
            Hành động này không thể hoàn tác. Danh mục chứa sản phẩm hoặc danh mục con sẽ không thể xóa.
          </p>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false, category: null })}
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

export default AdminCategories;
