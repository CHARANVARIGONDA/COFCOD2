import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'surface';
  size?: 'normal' | 'small';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const combinedClass = [
    styles.button,
    styles[variant],
    size === 'small' ? styles.small : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClass} disabled={disabled || loading} {...props}>
      {loading ? <span>PROCESSING...</span> : children}
    </button>
  );
};
