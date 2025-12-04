import React from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminSettings: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Cài Đặt</h1>
        <p className="text-text-sub mt-2">Quản lý cài đặt ứng dụng và tùy chọn của bạn.</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg mb-8">
         <div className="border-b border-border p-6">
            <h2 className="text-xl font-bold text-text-main">Cài Đặt Chung</h2>
            <p className="text-sm text-text-sub mt-1">Cấu hình cơ bản cho cửa hàng của bạn.</p>
         </div>
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Tên cửa hàng</label>
                  <input type="text" defaultValue="ClothesDN" className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Email liên hệ</label>
                  <input type="email" defaultValue="admin@clothesdn.com" className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main" />
               </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Tiền tệ</label>
                  <AdminSelect
                    options={[
                      { value: 'vnd', label: 'VND (₫)' },
                      { value: 'usd', label: 'USD ($)' }
                    ]}
                    value="vnd"
                    placeholder="Chọn tiền tệ"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Múi giờ</label>
                  <AdminSelect
                    options={[
                      { value: 'hcm', label: 'Asia/Ho_Chi_Minh (GMT+7)' }
                    ]}
                    value="hcm"
                    placeholder="Chọn múi giờ"
                  />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-sm font-bold text-text-main">Mô tả cửa hàng</label>
               <textarea rows={3} defaultValue="Cửa hàng thời trang tốt nhất trong thị trấn." className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"></textarea>
            </div>
            <div className="flex justify-end">
               <AdminButton variant="primary">Lưu Thay Đổi</AdminButton>
            </div>
         </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
         <div className="border-b border-border p-6">
            <h2 className="text-xl font-bold text-text-main">Bảo Mật</h2>
            <p className="text-sm text-text-sub mt-1">Quản lý bảo mật tài khoản của bạn.</p>
         </div>
         <div className="p-6 space-y-6">
             <div className="flex items-center justify-between p-4 rounded-xl bg-bg-sub/30 border border-border">
                <div>
                   <h3 className="font-bold text-text-main">Xác thực hai yếu tố</h3>
                   <p className="text-sm text-text-sub">Thêm một lớp bảo mật bổ sung cho tài khoản của bạn.</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer">
                   <span className="translate-x-0 inline-block w-6 h-6 transform bg-white rounded-full shadow transition-transform duration-200"></span>
                </div>
             </div>
             
             <div className="flex items-center justify-between p-4 rounded-xl bg-bg-sub/30 border border-border">
                 <div className="flex-1">
                   <h3 className="font-bold text-text-main">Đổi mật khẩu</h3>
                   <p className="text-sm text-text-sub">Cập nhật mật khẩu thường xuyên để giữ an toàn.</p>
                </div>
                <AdminButton variant="outline" size="sm">Cập nhật</AdminButton>
             </div>
         </div>
      </div>
    </div>
  );
};

export default AdminSettings;
