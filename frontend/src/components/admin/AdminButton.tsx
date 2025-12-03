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
    primary: 'bg-accentPrimary text-hover-text hover:bg-hover-bg', // Coral red with hover
    secondary: 'bg-accentSecondary text-text-primary hover:bg-hover-bg hover:text-hover-text', // Mint green with hover
    danger: 'bg-text-primary text-bg-primary hover:bg-hover-bg hover:text-hover-text', // Charcoal black with hover
    ghost: 'hover:bg-accentSecondary hover:text-text-primary' // Mint green hover for ghost
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