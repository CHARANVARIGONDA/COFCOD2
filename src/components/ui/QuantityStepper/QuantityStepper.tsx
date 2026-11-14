import React from 'react';
import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
  ariaLabelPrefix?: string;
  className?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  ariaLabelPrefix = 'Quantity',
  className = '',
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={`${styles.stepper} ${className}`}>
      <button
        type="button"
        className={styles.stepButton}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label={`${ariaLabelPrefix}: Decrease quantity`}
      >
        −
      </button>

      <span className={`${styles.value} tabular`} aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        className={styles.stepButton}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label={`${ariaLabelPrefix}: Increase quantity`}
      >
        +
      </button>
    </div>
  );
};
