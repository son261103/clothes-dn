import React, { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminProducts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Sản Phẩm</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Sản Phẩm Mới</AdminButton>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
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
                    { value: '', label: 'Tất cả danh mục' },
                    { value: 'ao', label: 'Áo' },
                    { value: 'quan', label: 'Quần' },
                    { value: 'phukien', label: 'Phụ kiện' }
                  ]}
                  placeholder="Danh mục"
                />
              </div>
              <div className="w-40">
                <AdminSelect
                  options={[
                    { value: '', label: 'Tất cả trạng thái' },
                    { value: 'active', label: 'Còn hàng' },
                    { value: 'inactive', label: 'Hết hàng' }
                  ]}
                  placeholder="Trạng thái"
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
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-bg-sub border-2 border-dashed border-border rounded-xl w-12 h-12 flex-shrink-0" />
                      <div className="ml-4">
                        <div className="text-sm font-bold text-text-main">Sản phẩm {item}</div>
                        <div className="text-sm text-text-sub">SKU: PRD-{item.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">
                    1.250.000₫
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    {item === 1 ? 0 : 25 + item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    Áo Thun
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                      item === 1 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                    }`}>
                      {item === 1 ? 'Hết hàng' : 'Còn hàng'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit({ id: item, name: `Sản phẩm ${item}`, price: 1250000 })}
                      className="text-brand-orange hover:text-primary-hover mr-4 font-semibold"
                    >
                      Sửa
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-semibold">Xóa</button>
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
              <span className="font-bold text-text-main">20</span> kết quả
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

      {/* Add/Edit Product Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
        size="xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Tên sản phẩm</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name || ''}
                  placeholder="Ví dụ: Áo Sơ Mi Linen"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Giá (VNĐ)</label>
                <input 
                  type="number" 
                  defaultValue={editingProduct?.price || ''}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Danh mục</label>
                <AdminSelect
                  options={[
                    { value: 'ao', label: 'Áo' },
                    { value: 'quan', label: 'Quần' },
                    { value: 'phukien', label: 'Phụ kiện' }
                  ]}
                  placeholder="Chọn danh mục"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Số lượng trong kho</label>
                <input 
                  type="number" 
                  defaultValue={editingProduct?.stock || ''}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Trạng thái</label>
                <AdminSelect
                  options={[
                    { value: 'active', label: 'Còn hàng' },
                    { value: 'inactive', label: 'Hết hàng' },
                    { value: 'draft', label: 'Bản nháp' }
                  ]}
                  placeholder="Chọn trạng thái"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Đường dẫn ảnh sản phẩm</label>
                 <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                />
             </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-sm font-bold text-text-main">Mô tả chi tiết</label>
             <textarea 
               rows={4} 
               placeholder="Nhập mô tả sản phẩm..."
               className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
             ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
             <AdminButton variant="ghost" onClick={handleClose} type="button">Hủy</AdminButton>
             <AdminButton variant="primary" type="button">Lưu Sản Phẩm</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminProducts;