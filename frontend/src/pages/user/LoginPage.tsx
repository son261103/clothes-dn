import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserButton from '../../components/user/UserButton';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      await login({ email, password });
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* BACKGROUND ANIMATION (LAVA LAMP EFFECT) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-orange/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-beige/60 dark:bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300/40 dark:bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
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

          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-orange-400 text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 text-2xl font-bold mx-auto">
                C
              </div>
            </Link>
            <h1 className="text-3xl font-black text-text-main mb-2 tracking-tight">Chào mừng trở lại</h1>
            <p className="text-text-sub text-sm font-medium">Nhập thông tin để truy cập tài khoản của bạn</p>
          </div>

          {/* Error Message */}
          {(error || localError) && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium">
              {error || localError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-text-main">Mật khẩu</label>
                <Link to="/forgot-password" className="text-xs text-brand-orange font-bold hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-sub group-focus-within:text-brand-orange transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-sub/50 border border-border focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition-all text-text-main placeholder-text-sub/50 font-medium shadow-sm"
                />
              </div>
            </div>

            <UserButton
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="rounded-2xl py-4 text-lg shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all duration-300 hover:-translate-y-1"
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </UserButton>
          </form>

          {/* Social Login */}
          <div className="mt-10">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-text-sub/20"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-text-sub uppercase font-bold tracking-wider opacity-60">Hoặc tiếp tục với</span>
              <div className="flex-grow border-t border-text-sub/20"></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-border rounded-2xl hover:bg-bg-sub transition-all duration-300 gap-3 text-sm font-bold bg-bg-sub/50 shadow-sm hover:shadow-md group text-text-main">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-border rounded-2xl hover:bg-bg-sub transition-all duration-300 gap-3 text-sm font-bold bg-bg-sub/50 shadow-sm hover:shadow-md group text-text-main">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Facebook" />
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-sub text-sm font-medium">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-brand-orange font-bold hover:text-brand-orange/80 transition-colors inline-block hover:underline">
                Tạo tài khoản mới
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;