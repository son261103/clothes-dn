import React, { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminCategories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Danh Mục</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Danh Mục Mới</AdminButton>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
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
               <div className="w-48">
                 <AdminSelect
                    options={[
                      { value: '', label: 'Sắp xếp theo' },
                      { value: 'name_asc', label: 'Tên (A-Z)' },
                      { value: 'name_desc', label: 'Tên (Z-A)' },
                      { value: 'newest', label: 'Mới nhất' }
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
              {[1, 2, 3, 4].map((item) => {
                const categoryName = ['Áo', 'Quần', 'Phụ kiện', 'Giày'][item - 1];
                return (
                <tr key={item} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-bg-sub border-2 border-dashed border-border rounded-xl w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-text-sub">
                        {categoryName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-text-main">{categoryName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    Tất cả các loại {categoryName.toLowerCase()} cho mọi người
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-orange">
                    {120 + item * 15}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                      Hoạt động
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit({ id: item, name: categoryName })}
                      className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                    >
                      Sửa
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-semibold">Xóa</button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
           <div className="hidden sm:block">
            <p className="text-sm text-text-sub">
              Hiển thị <span className="font-bold text-text-main">1</span> đến <span className="font-bold text-text-main">4</span> trong số {' '}
              <span className="font-bold text-text-main">4</span> kết quả
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingCategory ? "Sửa Danh Mục" : "Thêm Danh Mục Mới"}
      >
        <form className="space-y-6">
           <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Tên danh mục</label>
              <input 
                type="text" 
                defaultValue={editingCategory?.name || ''}
                placeholder="Ví dụ: Áo, Phụ kiện"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Trạng thái</label>
              <AdminSelect
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
               placeholder="Nhập mô tả danh mục..."
               className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
             ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
             <AdminButton variant="ghost" onClick={handleClose} type="button">Hủy</AdminButton>
             <AdminButton variant="primary" type="button">Lưu Danh Mục</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminCategories;
