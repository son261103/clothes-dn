import React, { useState } from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminCheckbox from '../../components/admin/AdminCheckbox';
import AdminModal from '../../components/admin/AdminModal';

type SettingsTab = 'general' | 'store' | 'payment' | 'shipping' | 'notifications' | 'security';

const AdminSettings: React.FC = () => {
   const [activeTab, setActiveTab] = useState<SettingsTab>('general');
   const [saving, setSaving] = useState(false);
   const [success, setSuccess] = useState<string | null>(null);
   const [showPasswordModal, setShowPasswordModal] = useState(false);

   // General settings
   const [generalSettings, setGeneralSettings] = useState({
      storeName: 'ClothesDN',
      storeEmail: 'admin@clothesdn.com',
      storePhone: '0987 654 321',
      storeAddress: '123 Nguyễn Văn Linh, Đà Nẵng',
      currency: 'vnd',
      timezone: 'hcm',
      language: 'vi',
      description: 'Cửa hàng thời trang cao cấp hàng đầu tại Đà Nẵng.'
   });

   // Store settings
   const [storeSettings, setStoreSettings] = useState({
      productsPerPage: '12',
      enableReviews: true,
      enableWishlist: true,
      enableCompare: true,
      showOutOfStock: true,
      lowStockThreshold: '5',
      maintenanceMode: false
   });

   // Payment settings
   const [paymentSettings, setPaymentSettings] = useState({
      enableCOD: true,
      enableBankTransfer: true,
      enableMomo: false,
      enableVNPay: false,
      bankName: 'Vietcombank',
      bankAccount: '1234567890',
      bankHolder: 'NGUYEN VAN A'
   });

   // Shipping settings
   const [shippingSettings, setShippingSettings] = useState({
      freeShippingThreshold: '500000',
      standardShippingFee: '30000',
      expressShippingFee: '50000',
      enableFreeShipping: true,
      estimatedDelivery: '3-5'
   });

   // Notification settings
   const [notificationSettings, setNotificationSettings] = useState({
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStock: true,
      newUser: true,
      newsletter: false,
      smsNotification: false
   });

   // Security settings
   const [securitySettings, setSecuritySettings] = useState({
      twoFactorAuth: false,
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      passwordExpiry: '90'
   });

   // Password change
   const [passwordData, setPasswordData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
   });

   const handleSave = async () => {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaving(false);
      setSuccess('Đã lưu cài đặt thành công!');
      setTimeout(() => setSuccess(null), 3000);
   };

   const handlePasswordChange = async () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
         alert('Mật khẩu xác nhận không khớp!');
         return;
      }
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaving(false);
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Đã đổi mật khẩu thành công!');
      setTimeout(() => setSuccess(null), 3000);
   };

   const tabs: { id: SettingsTab; label: string; icon: string }[] = [
      { id: 'general', label: 'Chung', icon: '⚙️' },
      { id: 'store', label: 'Cửa hàng', icon: '🏪' },
      { id: 'payment', label: 'Thanh toán', icon: '💳' },
      { id: 'shipping', label: 'Vận chuyển', icon: '🚚' },
      { id: 'notifications', label: 'Thông báo', icon: '🔔' },
      { id: 'security', label: 'Bảo mật', icon: '🔒' }
   ];

   const renderTabContent = () => {
      switch (activeTab) {
         case 'general':
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Tên cửa hàng</label>
                        <input
                           type="text"
                           value={generalSettings.storeName}
                           onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Email liên hệ</label>
                        <input
                           type="email"
                           value={generalSettings.storeEmail}
                           onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Số điện thoại</label>
                        <input
                           type="tel"
                           value={generalSettings.storePhone}
                           onChange={(e) => setGeneralSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Địa chỉ</label>
                        <input
                           type="text"
                           value={generalSettings.storeAddress}
                           onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Tiền tệ</label>
                        <AdminSelect
                           value={generalSettings.currency}
                           onChange={(val) => setGeneralSettings(prev => ({ ...prev, currency: String(val) }))}
                           options={[
                              { value: 'vnd', label: 'VND (₫)' },
                              { value: 'usd', label: 'USD ($)' }
                           ]}
                           placeholder="Chọn tiền tệ"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Múi giờ</label>
                        <AdminSelect
                           value={generalSettings.timezone}
                           onChange={(val) => setGeneralSettings(prev => ({ ...prev, timezone: String(val) }))}
                           options={[
                              { value: 'hcm', label: 'Asia/Ho_Chi_Minh (GMT+7)' },
                              { value: 'hanoi', label: 'Asia/Hanoi (GMT+7)' }
                           ]}
                           placeholder="Chọn múi giờ"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Ngôn ngữ</label>
                        <AdminSelect
                           value={generalSettings.language}
                           onChange={(val) => setGeneralSettings(prev => ({ ...prev, language: String(val) }))}
                           options={[
                              { value: 'vi', label: 'Tiếng Việt' },
                              { value: 'en', label: 'English' }
                           ]}
                           placeholder="Chọn ngôn ngữ"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-text-main">Mô tả cửa hàng</label>
                     <textarea
                        rows={3}
                        value={generalSettings.description}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main resize-none"
                     />
                  </div>
               </div>
            );

         case 'store':
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Sản phẩm mỗi trang</label>
                        <AdminSelect
                           value={storeSettings.productsPerPage}
                           onChange={(val) => setStoreSettings(prev => ({ ...prev, productsPerPage: String(val) }))}
                           options={[
                              { value: '8', label: '8 sản phẩm' },
                              { value: '12', label: '12 sản phẩm' },
                              { value: '16', label: '16 sản phẩm' },
                              { value: '24', label: '24 sản phẩm' }
                           ]}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Ngưỡng cảnh báo hết hàng</label>
                        <input
                           type="number"
                           value={storeSettings.lowStockThreshold}
                           onChange={(e) => setStoreSettings(prev => ({ ...prev, lowStockThreshold: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="font-bold text-text-main">Tính năng</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border">
                           <AdminCheckbox
                              checked={storeSettings.enableReviews}
                              onChange={(checked) => setStoreSettings(prev => ({ ...prev, enableReviews: checked }))}
                              label="Cho phép đánh giá sản phẩm"
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border">
                           <AdminCheckbox
                              checked={storeSettings.enableWishlist}
                              onChange={(checked) => setStoreSettings(prev => ({ ...prev, enableWishlist: checked }))}
                              label="Cho phép danh sách yêu thích"
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border">
                           <AdminCheckbox
                              checked={storeSettings.enableCompare}
                              onChange={(checked) => setStoreSettings(prev => ({ ...prev, enableCompare: checked }))}
                              label="Cho phép so sánh sản phẩm"
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border">
                           <AdminCheckbox
                              checked={storeSettings.showOutOfStock}
                              onChange={(checked) => setStoreSettings(prev => ({ ...prev, showOutOfStock: checked }))}
                              label="Hiển thị sản phẩm hết hàng"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                     <div className="flex items-center justify-between">
                        <div>
                           <h3 className="font-bold text-red-500">Chế độ bảo trì</h3>
                           <p className="text-sm text-text-sub">Tạm thời đóng cửa hàng để bảo trì</p>
                        </div>
                        <AdminCheckbox
                           checked={storeSettings.maintenanceMode}
                           onChange={(checked) => setStoreSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                        />
                     </div>
                  </div>
               </div>
            );

         case 'payment':
            return (
               <div className="space-y-6">
                  <h3 className="font-bold text-text-main">Phương thức thanh toán</h3>
                  <div className="space-y-4">
                     <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-2xl">💵</span>
                           <div>
                              <h4 className="font-bold text-text-main">Thanh toán khi nhận hàng (COD)</h4>
                              <p className="text-sm text-text-sub">Khách hàng thanh toán khi nhận hàng</p>
                           </div>
                        </div>
                        <AdminCheckbox
                           checked={paymentSettings.enableCOD}
                           onChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableCOD: checked }))}
                        />
                     </div>

                     <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-2xl">🏦</span>
                           <div>
                              <h4 className="font-bold text-text-main">Chuyển khoản ngân hàng</h4>
                              <p className="text-sm text-text-sub">Thanh toán qua tài khoản ngân hàng</p>
                           </div>
                        </div>
                        <AdminCheckbox
                           checked={paymentSettings.enableBankTransfer}
                           onChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableBankTransfer: checked }))}
                        />
                     </div>

                     <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-2xl">📱</span>
                           <div>
                              <h4 className="font-bold text-text-main">Ví MoMo</h4>
                              <p className="text-sm text-text-sub">Thanh toán qua ví điện tử MoMo</p>
                           </div>
                        </div>
                        <AdminCheckbox
                           checked={paymentSettings.enableMomo}
                           onChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableMomo: checked }))}
                        />
                     </div>

                     <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="text-2xl">💳</span>
                           <div>
                              <h4 className="font-bold text-text-main">VNPay</h4>
                              <p className="text-sm text-text-sub">Thanh toán qua cổng VNPay</p>
                           </div>
                        </div>
                        <AdminCheckbox
                           checked={paymentSettings.enableVNPay}
                           onChange={(checked) => setPaymentSettings(prev => ({ ...prev, enableVNPay: checked }))}
                        />
                     </div>
                  </div>

                  {paymentSettings.enableBankTransfer && (
                     <div className="space-y-4 pt-4 border-t border-border">
                        <h3 className="font-bold text-text-main">Thông tin tài khoản ngân hàng</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-text-main">Ngân hàng</label>
                              <input
                                 type="text"
                                 value={paymentSettings.bankName}
                                 onChange={(e) => setPaymentSettings(prev => ({ ...prev, bankName: e.target.value }))}
                                 className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-text-main">Số tài khoản</label>
                              <input
                                 type="text"
                                 value={paymentSettings.bankAccount}
                                 onChange={(e) => setPaymentSettings(prev => ({ ...prev, bankAccount: e.target.value }))}
                                 className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm font-bold text-text-main">Chủ tài khoản</label>
                              <input
                                 type="text"
                                 value={paymentSettings.bankHolder}
                                 onChange={(e) => setPaymentSettings(prev => ({ ...prev, bankHolder: e.target.value }))}
                                 className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                              />
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            );

         case 'shipping':
            return (
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Phí vận chuyển tiêu chuẩn (VNĐ)</label>
                        <input
                           type="number"
                           value={shippingSettings.standardShippingFee}
                           onChange={(e) => setShippingSettings(prev => ({ ...prev, standardShippingFee: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Phí vận chuyển nhanh (VNĐ)</label>
                        <input
                           type="number"
                           value={shippingSettings.expressShippingFee}
                           onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingFee: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Thời gian giao hàng ước tính (ngày)</label>
                        <input
                           type="text"
                           value={shippingSettings.estimatedDelivery}
                           onChange={(e) => setShippingSettings(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                           placeholder="Ví dụ: 3-5"
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                     <div className="flex items-center justify-between mb-4">
                        <div>
                           <h3 className="font-bold text-green-600 dark:text-green-400">Miễn phí vận chuyển</h3>
                           <p className="text-sm text-text-sub">Miễn phí vận chuyển cho đơn hàng đủ điều kiện</p>
                        </div>
                        <AdminCheckbox
                           checked={shippingSettings.enableFreeShipping}
                           onChange={(checked) => setShippingSettings(prev => ({ ...prev, enableFreeShipping: checked }))}
                        />
                     </div>
                     {shippingSettings.enableFreeShipping && (
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-text-main">Ngưỡng miễn phí vận chuyển (VNĐ)</label>
                           <input
                              type="number"
                              value={shippingSettings.freeShippingThreshold}
                              onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: e.target.value }))}
                              className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                           />
                           <p className="text-xs text-text-sub">Đơn hàng từ {Number(shippingSettings.freeShippingThreshold).toLocaleString('vi-VN')}₫ sẽ được miễn phí vận chuyển</p>
                        </div>
                     )}
                  </div>
               </div>
            );

         case 'notifications':
            return (
               <div className="space-y-6">
                  <div>
                     <h3 className="font-bold text-text-main mb-4">Email thông báo</h3>
                     <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Xác nhận đơn hàng</h4>
                              <p className="text-sm text-text-sub">Gửi email khi có đơn hàng mới</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.orderConfirmation}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderConfirmation: checked }))}
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Đơn hàng đã gửi</h4>
                              <p className="text-sm text-text-sub">Gửi email khi đơn hàng được giao cho vận chuyển</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.orderShipped}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderShipped: checked }))}
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Đơn hàng đã giao</h4>
                              <p className="text-sm text-text-sub">Gửi email khi đơn hàng đã được giao thành công</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.orderDelivered}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, orderDelivered: checked }))}
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Cảnh báo hết hàng</h4>
                              <p className="text-sm text-text-sub">Nhận thông báo khi sản phẩm sắp hết hàng</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.lowStock}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, lowStock: checked }))}
                           />
                        </div>
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Người dùng mới</h4>
                              <p className="text-sm text-text-sub">Nhận thông báo khi có người dùng mới đăng ký</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.newUser}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, newUser: checked }))}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                     <h3 className="font-bold text-text-main mb-4">Kênh thông báo khác</h3>
                     <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                           <div>
                              <h4 className="font-medium text-text-main">Thông báo SMS</h4>
                              <p className="text-sm text-text-sub">Gửi SMS cho các đơn hàng quan trọng</p>
                           </div>
                           <AdminCheckbox
                              checked={notificationSettings.smsNotification}
                              onChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotification: checked }))}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            );

         case 'security':
            return (
               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                     <div>
                        <h3 className="font-bold text-text-main">Xác thực hai yếu tố (2FA)</h3>
                        <p className="text-sm text-text-sub">Thêm một lớp bảo mật bổ sung cho tài khoản</p>
                     </div>
                     <AdminCheckbox
                        checked={securitySettings.twoFactorAuth}
                        onChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                     />
                  </div>

                  <div className="p-4 rounded-xl bg-bg-sub/30 border border-border flex items-center justify-between">
                     <div className="flex-1">
                        <h3 className="font-bold text-text-main">Đổi mật khẩu</h3>
                        <p className="text-sm text-text-sub">Cập nhật mật khẩu thường xuyên để giữ an toàn</p>
                     </div>
                     <AdminButton variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
                        Cập nhật
                     </AdminButton>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Thời gian hết phiên (phút)</label>
                        <input
                           type="number"
                           value={securitySettings.sessionTimeout}
                           onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Số lần đăng nhập sai tối đa</label>
                        <input
                           type="number"
                           value={securitySettings.maxLoginAttempts}
                           onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main">Thời hạn mật khẩu (ngày)</label>
                        <input
                           type="number"
                           value={securitySettings.passwordExpiry}
                           onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                           className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                        />
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                     <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">💡 Lưu ý bảo mật</h3>
                     <ul className="text-sm text-text-sub space-y-1">
                        <li>• Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
                        <li>• Bật xác thực hai yếu tố để tăng bảo mật</li>
                        <li>• Không chia sẻ thông tin đăng nhập với người khác</li>
                        <li>• Đăng xuất khi sử dụng máy tính công cộng</li>
                     </ul>
                  </div>
               </div>
            );

         default:
            return null;
      }
   };

   return (
      <div className="w-full">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main tracking-tight">Cài Đặt</h1>
            <p className="text-text-sub mt-2">Quản lý cài đặt ứng dụng và tùy chọn của bạn.</p>
         </div>

         {/* Success Message */}
         {success && (
            <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium flex justify-between items-center">
               <span>✓ {success}</span>
               <button onClick={() => setSuccess(null)} className="hover:opacity-70">✕</button>
            </div>
         )}

         <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Tabs */}
            <div className="lg:w-64 flex-shrink-0">
               <div className="glass rounded-2xl p-4 shadow-lg sticky top-4">
                  <nav className="space-y-1">
                     {tabs.map((tab) => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                                 ? 'bg-brand-orange text-white font-bold'
                                 : 'text-text-main hover:bg-bg-sub/50'
                              }`}
                        >
                           <span className="text-lg">{tab.icon}</span>
                           <span>{tab.label}</span>
                        </button>
                     ))}
                  </nav>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1">
               <div className="glass rounded-2xl overflow-hidden shadow-lg">
                  <div className="border-b border-border p-6">
                     <h2 className="text-xl font-bold text-text-main">
                        {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
                     </h2>
                  </div>
                  <div className="p-6">
                     {renderTabContent()}
                  </div>
                  <div className="border-t border-border p-6 flex justify-end">
                     <AdminButton variant="primary" onClick={handleSave} disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                     </AdminButton>
                  </div>
               </div>
            </div>
         </div>

         {/* Password Change Modal */}
         <AdminModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            title="Đổi Mật Khẩu"
         >
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Mật khẩu hiện tại</label>
                  <input
                     type="password"
                     value={passwordData.currentPassword}
                     onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                     className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Mật khẩu mới</label>
                  <input
                     type="password"
                     value={passwordData.newPassword}
                     onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                     className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Xác nhận mật khẩu mới</label>
                  <input
                     type="password"
                     value={passwordData.confirmPassword}
                     onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                     className="w-full px-4 py-2.5 rounded-xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-text-main"
                  />
               </div>
               <div className="flex justify-end gap-4 pt-4 border-t border-border">
                  <AdminButton variant="ghost" onClick={() => setShowPasswordModal(false)}>Hủy</AdminButton>
                  <AdminButton variant="primary" onClick={handlePasswordChange} disabled={saving}>
                     {saving ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                  </AdminButton>
               </div>
            </div>
         </AdminModal>
      </div>
   );
};

export default AdminSettings;
