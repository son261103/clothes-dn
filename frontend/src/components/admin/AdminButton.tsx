import React from 'react';

interface AdminButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-brand-orange text-white hover:bg-primary-hover shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50',
    secondary: 'bg-bg-sub text-text-main hover:brightness-95 shadow-sm',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 hover:shadow-red-500/50',
    ghost: 'bg-transparent text-text-main hover:bg-black/5 dark:hover:bg-white/5',
    outline: 'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
  };

  const sizeClasses = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-10 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default AdminButton;