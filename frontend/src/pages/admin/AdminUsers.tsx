import React, { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminUsers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Người Dùng</h1>
        <div className="flex gap-3">
           <AdminButton variant="outline">Xuất CSV</AdminButton>
           <AdminButton variant="primary" onClick={handleAddNew}>Thêm Người Dùng</AdminButton>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-border">
           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="pl-10 pr-4 py-2.5 border border-border rounded-xl bg-bg-sub/50 text-text-main focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange w-full transition-all"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3 text-text-sub"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="w-40">
                <AdminSelect
                  options={[
                    { value: '', label: 'Tất cả vai trò' },
                    { value: 'admin', label: 'Quản trị viên' },
                    { value: 'customer', label: 'Khách hàng' }
                  ]}
                  placeholder="Vai trò"
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
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">
                         {['A', 'B', 'C', 'D', 'E'][item - 1]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-text-main">Người dùng {item}</div>
                        <div className="text-sm text-text-sub">user{item}@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                        item === 1 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                    }`}>
                      {item === 1 ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    0987 654 32{item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    2023-10-0{item}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                      Hoạt động
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                     <button 
                        onClick={() => handleEdit({ id: item, name: `Người dùng ${item}` })}
                        className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                     >
                        Sửa
                     </button>
                     <button className="text-red-500 hover:text-red-700 font-semibold">Cấm</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
           <div className="hidden sm:block">
            <p className="text-sm text-text-sub">
              Hiển thị <span className="font-bold text-text-main">1</span> đến <span className="font-bold text-text-main">5</span> trong số {' '}
              <span className="font-bold text-text-main">123</span> kết quả
            </p>
          </div>
           <div className="flex-1 flex justify-between sm:justify-end gap-3">
            <button className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-xl text-text-main bg-transparent hover:bg-bg-sub transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Trước
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-xl text-text-main bg-transparent hover:bg-bg-sub transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingUser ? "Sửa Người Dùng" : "Thêm Người Dùng Mới"}
      >
        <form className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Họ và tên</label>
                  <input 
                    type="text" 
                    defaultValue={editingUser?.name || ''}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Email</label>
                  <input 
                    type="email" 
                    placeholder="Ví dụ: nguyenvan@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Vai trò</label>
                  <AdminSelect
                     options={[
                       { value: 'customer', label: 'Khách hàng' },
                       { value: 'admin', label: 'Quản trị viên' },
                       { value: 'staff', label: 'Nhân viên' }
                     ]}
                     placeholder="Chọn vai trò"
                  />
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Trạng thái</label>
                  <AdminSelect
                     options={[
                       { value: 'active', label: 'Hoạt động' },
                       { value: 'inactive', label: 'Ngừng hoạt động' },
                       { value: 'banned', label: 'Bị cấm' }
                     ]}
                     placeholder="Chọn trạng thái"
                  />
              </div>
           </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
             <AdminButton variant="ghost" onClick={handleClose} type="button">Hủy</AdminButton>
             <AdminButton variant="primary" type="button">Lưu Người Dùng</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminUsers;
