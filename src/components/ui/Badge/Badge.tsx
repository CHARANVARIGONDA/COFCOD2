import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'surface' | 'lowStock' | 'preOrder' | 'outOfStock';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
  style,
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`} style={style}>
      {children}
    </span>
  );
};
