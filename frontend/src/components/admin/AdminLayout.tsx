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
    <div className="flex h-screen bg-bg-tertiary font-sans">
      {/* Sidebar */}
      <div className={`bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-xl`}>
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-800">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Panel</h1>
          ) : (
            <div className="text-xl font-bold text-primary">A</div>
          )}
        </div>

        <div className="p-2 text-right">
             <button onClick={toggleSidebar} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800">
                {sidebarOpen ? '«' : '»'}
             </button>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 flex-shrink-0 bg-white/10 rounded flex items-center justify-center mr-3">
                      {/* Placeholder icon */}
                      <span className="text-xs font-bold">{item.label.charAt(0)}</span>
                  </div>
                  <span className={`truncate font-medium ${sidebarOpen ? 'block' : 'hidden'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold mr-3">
                    A
                </div>
                {sidebarOpen && (
                    <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-slate-400">admin@example.com</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-bg-primary shadow-sm border-b border-border z-10">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-text-primary">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="relative group cursor-pointer">
                <div className="p-2 rounded-full hover:bg-bg-tertiary text-text-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <span className="absolute top-1 right-1 bg-status-error text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-bg-primary">
                  3
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="flex-1 overflow-y-auto bg-bg-tertiary p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
