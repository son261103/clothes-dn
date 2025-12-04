import React from 'react';
import AdminButton from '../../components/admin/AdminButton';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Tổng Quan</h1>
        <p className="text-text-sub mt-2">Chào mừng trở lại, Admin. Đây là những gì đang diễn ra hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-text-sub uppercase tracking-wider">Tổng Người Dùng</h3>
          <p className="text-3xl font-bold mt-2 text-text-main">1,243</p>
          <p className="text-green-500 text-sm mt-1 font-medium">↑ 12% so với tháng trước</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-text-sub uppercase tracking-wider">Tổng Đơn Hàng</h3>
          <p className="text-3xl font-bold mt-2 text-text-main">243</p>
          <p className="text-green-500 text-sm mt-1 font-medium">↑ 8% so với tháng trước</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-text-sub uppercase tracking-wider">Doanh Thu</h3>
          <p className="text-3xl font-bold mt-2 text-text-main">24,567,000₫</p>
          <p className="text-green-500 text-sm mt-1 font-medium">↑ 5% so với tháng trước</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-text-sub uppercase tracking-wider">Tỷ Lệ Chuyển Đổi</h3>
          <p className="text-3xl font-bold mt-2 text-text-main">4.2%</p>
          <p className="text-red-500 text-sm mt-1 font-medium">↓ 0.3% so với tháng trước</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main">Đơn Hàng Gần Đây</h2>
            <AdminButton variant="secondary" size="sm" className="rounded-lg">Xem Tất Cả</AdminButton>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Mã Đơn</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Khách Hàng</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Ngày</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-text-main">#ORD-001</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">Nguyễn Văn A</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">15/05/2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Đã giao
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-text-main">245.000₫</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-text-main">#ORD-002</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">Trần Thị B</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">16/05/2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Đang xử lý
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-text-main">123.500₫</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-text-main">#ORD-003</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">Lê Văn C</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-text-sub">17/05/2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Đã nhận
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-text-main">321.750₫</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main">Sản Phẩm Bán Chạy</h2>
            <AdminButton variant="secondary" size="sm" className="rounded-lg">Xem Tất Cả</AdminButton>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="bg-bg-sub border-2 border-dashed border-border rounded-xl w-16 h-16 flex-shrink-0" />
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-text-main">Sản phẩm {item}</h3>
                  <p className="text-text-sub text-sm">Danh mục: Thời trang</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-orange">124 đã bán</p>
                  <p className="text-text-sub text-sm">2,450,000₫</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;