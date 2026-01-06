import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {

  // Kích thước modal
  const maxWidthClass = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Full screen overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10000 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full ${maxWidthClass[size]} bg-bg-main rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 flex flex-col max-h-[90vh]`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-bg-sub/50">
                <h3 className="text-2xl font-bold text-text-main">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-sub hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto bg-bg-main">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  // Use Portal to render outside the current DOM tree
  return createPortal(modalContent, document.body);
};

export default AdminModal;

