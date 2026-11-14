import React from 'react';
import { formatINR } from '@cofoco/shared';
import styles from './Price.module.css';

interface PriceProps {
  price: number;
  mrp?: number;
  isLarge?: boolean;
  showGstNote?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  mrp,
  isLarge = false,
  showGstNote = true,
  className = '',
}) => {
  const hasDiscount = mrp && mrp > price;
  const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className={`${styles.container} ${isLarge ? styles.large : ''} ${className}`}>
      <span className={`${styles.current} tabular`}>{formatINR(price)}</span>

      {hasDiscount && (
        <>
          <span className={`${styles.mrp} tabular`}>{formatINR(mrp)}</span>
          <span className={styles.discountBadge}>[-{discountPercent}%]</span>
        </>
      )}

      {showGstNote && <span className={styles.gst}>INCL. GST</span>}
    </div>
  );
};
