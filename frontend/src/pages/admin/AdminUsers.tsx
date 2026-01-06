import React, { useState, useEffect, useCallback } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminCheckbox from '../../components/admin/AdminCheckbox';
import { userService } from '../../services/userService';
import type { User, UpdateUserData } from '../../services/userService';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [filterRole, setFilterRole] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user' as 'user' | 'admin',
    isActive: true
  });

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null; permanent: boolean }>({
    isOpen: false,
    user: null,
    permanent: false
  });

  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAll({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchTerm || undefined,
        sort: sortBy || undefined,
        role: filterRole || undefined
      });

      setUsers(response.users || []);

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
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Không thể tải người dùng');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, searchTerm, sortBy, filterRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'user',
      isActive: true
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      isActive: user.isActive
    });
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setFormLoading(true);
      setError(null);

      const updateData: UpdateUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        role: formData.role,
        isActive: formData.isActive
      };

      await userService.update(editingUser._id, updateData);

      setIsModalOpen(false);
      setEditingUser(null);
      resetForm();
      setFormLoading(false);

      fetchUsers();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.response?.data?.message || error.message || 'Có lỗi xảy ra');
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      await userService.toggleStatus(user._id);
      fetchUsers();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.message || 'Không thể thay đổi trạng thái');
    }
  };

  const handleDeleteClick = (user: User, permanent: boolean = false) => {
    setDeleteModal({ isOpen: true, user, permanent });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.user) return;

    try {
      setFormLoading(true);
      if (deleteModal.permanent) {
        await userService.permanentDelete(deleteModal.user._id);
      } else {
        await userService.delete(deleteModal.user._id);
      }
      setDeleteModal({ isOpen: false, user: null, permanent: false });
      fetchUsers();
    } catch (err) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      setError(error.response?.data?.error || error.message || 'Không thể xóa người dùng');
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Người Dùng</h1>
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
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-border rounded-xl bg-bg-sub/50 text-text-main focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange w-full transition-all"
              />
              <svg className="w-5 h-5 absolute left-3 top-3 text-text-sub" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="w-40">
                <AdminSelect
                  value={filterRole}
                  onChange={(val) => setFilterRole(String(val))}
                  options={[
                    { value: '', label: 'Tất cả vai trò' },
                    { value: 'admin', label: 'Quản trị viên' },
                    { value: 'user', label: 'Khách hàng' }
                  ]}
                  placeholder="Vai trò"
                />
              </div>
              <div className="w-40">
                <AdminSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(String(val))}
                  options={[
                    { value: '-createdAt', label: 'Mới nhất' },
                    { value: 'createdAt', label: 'Cũ nhất' },
                    { value: 'firstName', label: 'Tên A-Z' },
                    { value: '-firstName', label: 'Tên Z-A' }
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
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Người dùng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Ngày tham gia</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-sub">
                    {searchTerm || filterRole ? 'Không tìm thấy người dùng phù hợp' : 'Chưa có người dùng nào'}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-text-main">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-text-sub">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                        }`}>
                        {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                      {user.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${user.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 hover:bg-red-200'
                          }`}
                      >
                        {user.isActive ? 'Hoạt động' : 'Đã khóa'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user, false)}
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
              Hiển thị <span className="font-bold text-text-main">{users.length}</span> trong số{' '}
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

      {/* Edit User Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Sửa Thông Tin Người Dùng"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Họ *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Ví dụ: Nguyễn"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Tên *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Ví dụ: Văn A"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Ví dụ: nguyenvan@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Số điện thoại</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Ví dụ: 0912 345 678"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Vai trò</label>
              <AdminSelect
                value={formData.role}
                onChange={(val) => setFormData(prev => ({ ...prev, role: val as 'user' | 'admin' }))}
                options={[
                  { value: 'user', label: 'Khách hàng' },
                  { value: 'admin', label: 'Quản trị viên' }
                ]}
                placeholder="Chọn vai trò"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Trạng thái</label>
              <div className="pt-2">
                <AdminCheckbox
                  checked={formData.isActive}
                  onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  label="Tài khoản hoạt động"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton variant="ghost" onClick={handleClose} type="button" disabled={formLoading}>
              Hủy
            </AdminButton>
            <AdminButton variant="primary" type="submit" disabled={formLoading}>
              {formLoading ? 'Đang lưu...' : 'Cập nhật'}
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null, permanent: false })}
        title={deleteModal.permanent ? "Xóa vĩnh viễn" : "Xác nhận xóa"}
      >
        <div className="space-y-6">
          <p className="text-text-main">
            Bạn có chắc chắn muốn {deleteModal.permanent ? 'xóa vĩnh viễn' : 'vô hiệu hóa'} người dùng{' '}
            <strong>"{deleteModal.user?.firstName} {deleteModal.user?.lastName}"</strong>?
          </p>
          {deleteModal.permanent && (
            <p className="text-sm text-red-500">
              ⚠️ Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa.
            </p>
          )}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <AdminButton
              variant="ghost"
              onClick={() => setDeleteModal({ isOpen: false, user: null, permanent: false })}
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
              {formLoading ? 'Đang xử lý...' : (deleteModal.permanent ? 'Xóa vĩnh viễn' : 'Vô hiệu hóa')}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminUsers;
