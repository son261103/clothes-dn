import React from 'react';
import { Link } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* BACKGROUND ANIMATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-orange/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-teal-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        {/* Gradient Fade to Footer */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Main Card */}
        <div className="glass p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 relative z-10 bg-white/20 dark:bg-black/20 backdrop-blur-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-text-main mb-2 tracking-tight">Tạo tài khoản mới</h1>
            <p className="text-text-sub text-sm font-medium">Tham gia cộng đồng thời trang của chúng tôi</p>
          </div>

          <form className="space-y-4">
            {/* Họ tên */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Họ và Tên</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="vidu@email.com"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Mật khẩu</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Xác nhận Mật khẩu */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Xác nhận mật khẩu</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <UserButton variant="primary" fullWidth size="lg" className="rounded-2xl py-4 text-lg shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all duration-300 hover:-translate-y-1">
                Đăng Ký Ngay
              </UserButton>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-sub text-sm font-medium">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-brand-orange font-bold hover:text-brand-orange/80 transition-colors inline-block hover:underline">
                Đăng nhập tại đây
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
