import React from 'react';
import AdminButton from '../../components/admin/AdminButton';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card-bg p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-text-secondary">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-text-primary">1,243</p>
          <p className="text-green-500 text-sm mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-card-bg p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-text-secondary">Total Orders</h3>
          <p className="text-3xl font-bold mt-2 text-text-primary">243</p>
          <p className="text-green-500 text-sm mt-1">↑ 8% from last month</p>
        </div>
        <div className="bg-card-bg p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-text-secondary">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-text-primary">$24,567</p>
          <p className="text-green-500 text-sm mt-1">↑ 5% from last month</p>
        </div>
        <div className="bg-card-bg p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-text-secondary">Conversion Rate</h3>
          <p className="text-3xl font-bold mt-2 text-text-primary">4.2%</p>
          <p className="text-red-500 text-sm mt-1">↓ 0.3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card-bg p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-text-primary">Recent Orders</h2>
            <AdminButton variant="secondary" size="sm">View All</AdminButton>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-card-bg divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">#ORD-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">2023-05-15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Shipped
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">$245.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">#ORD-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">2023-05-16</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">$123.50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">#ORD-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">Robert Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">2023-05-17</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-text-primary">$321.75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card-bg p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-text-primary">Top Products</h2>
            <AdminButton variant="secondary" size="sm">View All</AdminButton>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center">
                <div className="bg-bg-tertiary border-2 border-dashed border-border rounded-xl w-16 h-16" />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-text-primary">Product {item}</h3>
                  <p className="text-text-secondary text-sm">Category: Clothing</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">124 sales</p>
                  <p className="text-text-secondary text-sm">$2,450</p>
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