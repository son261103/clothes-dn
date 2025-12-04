import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AdminButton from './AdminButton';
import ThemeToggle from '../user/ThemeToggle';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Tổng Quan', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { path: '/admin/products', label: 'Sản Phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { path: '/admin/categories', label: 'Danh Mục', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { path: '/admin/brands', label: 'Thương Hiệu', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { path: '/admin/users', label: 'Người Dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { path: '/admin/orders', label: 'Đơn Hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { path: '/admin/settings', label: 'Cài Đặt', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-sans flex overflow-hidden relative">
       {/* Abstract Background Decoration */}
       <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none opacity-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-beige/20 dark:bg-brand-orange/5 rounded-full blur-[120px]" />
       </div>

      {/* Sidebar - Fixed Width (No Toggle) */}
      <aside 
        className="w-72 flex-shrink-0 flex flex-col border-r border-border bg-bg-sub/80 backdrop-blur-2xl z-30 h-screen transition-all duration-300 shadow-2xl"
      >
        <div className="p-6 flex items-center h-20 border-b border-border">
          <Link to="/" className="flex items-center gap-3 group w-full">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-orange-400 text-white flex items-center justify-center shadow-lg shadow-brand-orange/30 transform group-hover:scale-105 transition-transform">
               <span className="font-black text-xl">C</span>
             </div>
             <span className="text-2xl font-extrabold tracking-tight text-text-main">ClothesDN</span>
          </Link>
        </div>

        <div className="px-4 py-2">
          <p className="text-xs font-bold text-text-sub uppercase tracking-widest px-4 mt-4 mb-2 opacity-70">Danh Mục</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path) || (item.path === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/'));
              return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3.5 px-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                      : 'text-text-sub hover:bg-white/50 dark:hover:bg-white/5 hover:text-brand-orange'
                  }`}
                >
                  <div className={`w-6 h-6 flex-shrink-0 mr-3 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-current'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-semibold tracking-wide text-sm">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              </li>
            )})}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-orange to-yellow-400 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/20">
                    A
                </div>
                <div className="overflow-hidden flex-1">
                    <p className="text-sm font-bold text-text-main truncate">Quản Trị Viên</p>
                    <p className="text-xs text-text-sub truncate">admin@clothesdn.com</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-sub" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
      </aside>

      {/* Main Content - Fluid Width */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 h-screen">
        {/* Admin Header - Full Width Sticky */}
        <header className="glass h-20 z-20 flex items-center justify-between px-8 shadow-sm sticky top-0 w-full backdrop-blur-xl bg-bg-main/80">
            <div className="flex items-center">
              <h2 className="text-2xl font-black text-text-main tracking-tight">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Tổng Quan'}
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center px-4 py-2 rounded-full bg-bg-sub border border-border focus-within:ring-2 focus-within:ring-brand-orange/50 transition-all w-64">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-sub mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-sm w-full text-text-main placeholder-text-sub" />
              </div>
              <div className="h-8 w-[1px] bg-border mx-2"></div>
              <ThemeToggle />
              <Link to="/">
                 <AdminButton variant="ghost" size="sm" className="font-bold hover:text-brand-orange">Xem Website</AdminButton>
              </Link>
            </div>
        </header>

        {/* Admin Content Area - Full Width */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth bg-bg-sub/30">
          <div className="animate-fade-in-up min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
