import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AdminButton from './AdminButton';
import ThemeToggle from '../user/ThemeToggle';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/categories', label: 'Categories' },
    { path: '/admin/brands', label: 'Brands' },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/orders', label: 'Orders' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-bg-secondary">
      {/* Sidebar */}
      <div className={`bg-text-primary text-hover-text transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          ) : (
            <div className="text-xl font-bold">A</div>
          )}
          <AdminButton
            onClick={toggleSidebar}
            variant="ghost"
            className="ml-auto text-hover-text"
          >
            {sidebarOpen ? '«' : '»'}
          </AdminButton>
        </div>

        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-6 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-accentPrimary text-hover-text'
                      : 'text-text-secondary hover:bg-hover-bg'
                  }`}
                >
                  <span className={`truncate ${sidebarOpen ? 'block' : 'hidden'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-bg-secondary shadow-sm border-r borderColor">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-text-primary">Admin Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="relative">
                <AdminButton variant="ghost">Notifications</AdminButton>
                <span className="absolute top-0 right-0 bg-accentPrimary text-hover-text text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                  3
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-accentPrimary flex items-center justify-center text-hover-text mr-2">
                  A
                </div>
                <span className="text-text-secondary">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-bg-primary">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;