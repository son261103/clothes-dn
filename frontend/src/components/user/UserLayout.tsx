import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import UserButton from './UserButton';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UserLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mapping đường dẫn sang tên hiển thị Tiếng Việt
  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Bộ sưu tập', path: '/collections' },
    { name: 'Giới thiệu', path: '/about' }
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-sans selection:bg-brand-orange selection:text-white flex flex-col overflow-x-hidden">
      
      {/* Header Glassmorphism */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'glass py-2 border-white/20 dark:border-white/10 shadow-lg' 
            : 'bg-transparent border-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 transform group-hover:rotate-6 transition-transform">
                <span className="font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">ClothesDN</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 bg-bg-sub/50 px-8 py-3 rounded-full backdrop-blur-sm border border-white/20 dark:border-white/5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-orange relative group ${
                    location.pathname === item.path ? 'text-brand-orange' : 'text-text-sub'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/cart" className="relative p-2 text-text-main hover:text-brand-orange transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
              </Link>
              <div className="hidden md:block">
                <Link to="/login">
                  <UserButton variant="primary" size="sm" className="rounded-full">Đăng nhập</UserButton>
                </Link>
              </div>
              {/* Mobile Toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-main border-t border-border"
            >
              <div className="p-4 space-y-2">
                {navItems.map(item => (
                  <Link key={item.name} to={item.path} className="block p-3 rounded-lg hover:bg-bg-sub font-medium">{item.name}</Link>
                ))}
                <Link to="/login" className="block w-full">
                  <UserButton fullWidth>Đăng nhập</UserButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content with Flex Grow */}
      <main className="flex-grow pt-20 relative z-0">
         {/* Abstract Background Decoration */}
         <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-beige/20 dark:bg-brand-orange/5 rounded-full blur-[120px]" />
         </div>
         {children}
         <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass border-t-0 pt-16 pb-8 relative overflow-hidden mt-auto backdrop-blur-xl">
        <div className="absolute inset-0 bg-bg-sub/60 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
           <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">C</div>
                <h3 className="text-xl font-bold">ClothesDN</h3>
              </div>
              <p className="text-text-sub text-sm">Thời trang cao cấp dành cho tâm hồn hiện đại. Thiết kế với đam mê, chế tác vì sự thoải mái.</p>
           </div>
           
           <div>
              <h4 className="font-bold mb-4 text-brand-orange">Cửa hàng</h4>
              <ul className="space-y-2 text-sm text-text-sub">
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Hàng mới về</a></li>
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Bán chạy nhất</a></li>
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Khuyến mãi</a></li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold mb-4 text-brand-orange">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-text-sub">
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Câu hỏi thường gặp</a></li>
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Vận chuyển & Đổi trả</a></li>
                 <li><a href="#" className="hover:text-brand-orange transition-colors">Liên hệ</a></li>
              </ul>
           </div>

           <div>
              <h4 className="font-bold mb-4 text-brand-orange">Bản tin</h4>
              <div className="flex gap-2">
                 <input type="email" placeholder="Email của bạn..." className="flex-1 bg-bg-main border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-orange outline-none" />
                 <button className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-primary-hover">→</button>
              </div>
           </div>
        </div>
        <div className="text-center text-text-sub text-xs mt-12 pt-8 border-t border-border">
           © 2025 ClothesDN. Đã đăng ký bản quyền.
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
