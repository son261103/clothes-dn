import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'bg-accent-primary text-hover-text hover:bg-hover-bg', // Blue primary
    secondary: 'bg-accent-secondary text-text-primary hover:bg-hover-bg hover:text-hover-text', // Teal secondary
    danger: 'bg-accent-error text-hover-text hover:bg-hover-bg', // Pink-red danger
    outline: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-hover-text' // Outline style
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

export default UserButton;