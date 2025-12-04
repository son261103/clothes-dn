import React, { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminModal from '../../components/admin/AdminModal';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminBrands: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);

  const handleAddNew = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Thương Hiệu</h1>
        <AdminButton variant="primary" onClick={handleAddNew}>Thêm Thương Hiệu Mới</AdminButton>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
             <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm thương hiệu..."
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="glass p-6 rounded-2xl border border-border hover:border-brand-orange/30 transition-all hover:shadow-xl group relative">
              <div className="flex items-start justify-between mb-4">
                 <div className="w-16 h-16 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm p-2">
                    {/* Placeholder Logo */}
                    <span className="font-black text-xl text-brand-orange">B{item}</span>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit({ id: item, name: `Thương Hiệu ${item}` })}
                      className="p-2 rounded-lg hover:bg-bg-sub text-text-sub hover:text-brand-orange"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-bg-sub text-text-sub hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                 </div>
              </div>
              
              <h3 className="text-xl font-bold text-text-main mb-1">Thương Hiệu {item}</h3>
              <p className="text-text-sub text-sm mb-4 line-clamp-2">Một thương hiệu thời trang hàng đầu với phong cách và chất lượng vượt trội.</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                 <span className="text-xs font-bold uppercase tracking-wider text-text-sub">Sản phẩm</span>
                 <span className="text-lg font-bold text-brand-orange">{24 * item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Brand Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={editingBrand ? "Sửa Thương Hiệu" : "Thêm Thương Hiệu Mới"}
      >
        <form className="space-y-6">
           <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">Tên thương hiệu</label>
              <input 
                type="text" 
                defaultValue={editingBrand?.name || ''}
                placeholder="Ví dụ: Nike, Adidas"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
              />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-bold text-text-main">URL Logo</label>
               <input 
                type="text" 
                placeholder="https://..."
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
               placeholder="Nhập mô tả thương hiệu..."
               className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
             ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
             <AdminButton variant="ghost" onClick={handleClose} type="button">Hủy</AdminButton>
             <AdminButton variant="primary" type="button">Lưu Thương Hiệu</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminBrands;
