import React from 'react';

interface AdminButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover', 
    secondary: 'bg-accent text-white hover:bg-accent-hover', 
    danger: 'bg-status-error text-white hover:bg-red-600',
    ghost: 'hover:bg-bg-tertiary hover:text-primary' 
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default AdminButton;