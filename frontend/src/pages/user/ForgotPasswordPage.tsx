import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';
import { motion } from 'framer-motion';

const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* BACKGROUND ANIMATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[30rem] h-[30rem] bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-[4rem] opacity-70 animate-blob"></div>
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
            <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 19l-1 1-1-1-2-2-1 1-1-1-2-2-1 1 1.757-1.757A6 6 0 1120 8a2 2 0 012 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-text-main mb-3">Quên mật khẩu?</h1>
            <p className="text-text-sub text-sm px-4 font-medium leading-relaxed">
              Đừng lo lắng! Hãy nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main ml-1">Email đăng ký</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="vidu@email.com"
                    className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/30 dark:border-white/10 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                  />
                </div>
              </div>

              <UserButton type="submit" variant="primary" fullWidth size="lg" className="rounded-2xl py-4 text-lg shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all duration-300 hover:-translate-y-1">
                Gửi liên kết khôi phục
              </UserButton>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-green-50/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/30 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-green-800 dark:text-green-300 font-bold mb-2">Đã gửi thành công!</h3>
              <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                Vui lòng kiểm tra hộp thư đến (và cả mục spam) để lấy lại mật khẩu.
              </p>
            </motion.div>
          )}

          <div className="mt-10 text-center">
            <Link to="/login" className="text-text-sub text-sm font-bold hover:text-brand-orange flex items-center justify-center gap-2 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;