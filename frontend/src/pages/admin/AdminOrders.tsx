import React from 'react';
import AdminButton from '../../components/admin/AdminButton';
import AdminSelect from '../../components/admin/AdminSelect';

const AdminOrders: React.FC = () => {
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main tracking-tight">Quản Lý Đơn Hàng</h1>
        <AdminButton variant="outline">Xuất Đơn Hàng</AdminButton>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-lg">
         <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm mã đơn, tên..."
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
                    { value: '', label: 'Tất cả trạng thái' },
                    { value: 'pending', label: 'Chờ xử lý' },
                    { value: 'processing', label: 'Đang xử lý' },
                    { value: 'shipped', label: 'Đã giao hàng' },
                    { value: 'delivered', label: 'Đã nhận' },
                    { value: 'cancelled', label: 'Đã hủy' }
                  ]}
                  placeholder="Trạng thái"
                />
              </div>
               <input type="date" className="border border-border rounded-xl px-4 py-2.5 bg-bg-sub/50 text-text-main focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-sub/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Mã đơn hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Khách hàng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Ngày đặt</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Tổng tiền</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-text-sub uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-orange">
                    #ORD-2025-{item.toString().padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                       <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold mr-2">
                         U{item}
                       </div>
                       <span className="text-sm font-medium text-text-main">Khách hàng {item}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-sub">
                    {item + 10} Th12, 2025
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-text-main">
                    {item + 2} sản phẩm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-main">
                    {(item * 123000).toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                        item === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                        item === 2 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                        item === 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200'
                     }`}>
                        {item === 1 ? 'Chờ xử lý' : item === 2 ? 'Đang xử lý' : item === 3 ? 'Đã giao' : 'Đã nhận'}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-brand-orange hover:text-primary-hover mr-4 font-semibold">Xem</button>
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
              <span className="font-bold text-text-main">42</span> kết quả
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
    </div>
  );
};

export default AdminOrders;
