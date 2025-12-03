import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`
        relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange cursor-pointer shadow-inner
        ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-brand-beige border border-brand-orange/30'}
      `}
      aria-label="Chuyển đổi giao diện"
    >
      {/* Background Icons (Nằm cố định trên thanh trượt) */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        {/* Icon Mặt trời (Bên trái) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-orange opacity-80" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        
        {/* Icon Mặt trăng (Bên phải) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-200 opacity-80" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Sliding Thumb (Nút tròn trượt qua lại) */}
      <motion.div
        className="w-6 h-6 rounded-full shadow-md flex items-center justify-center relative z-10"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        animate={{
          x: theme === 'dark' ? 32 : 0, // Di chuyển vị trí
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff' // Đổi màu nền nút
        }}
      >
        {/* Icon bên trong nút trượt (Thay đổi theo trạng thái) */}
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;