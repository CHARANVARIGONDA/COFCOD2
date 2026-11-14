// ============================================================================
// COFOCO Pricing & Order Arithmetic
// Tax-inclusive 18% GST model with dynamic free-shipping threshold
// ============================================================================

import { APP_CONFIG } from '../config';
import type { CartItem, PricingTotals } from '../types';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, amount));
}

export function calculateOrderTotals(items: CartItem[]): PricingTotals {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalMrp = items.reduce((acc, item) => acc + (item.mrp || item.price) * item.quantity, 0);
  const discount = Math.max(0, totalMrp - subtotal);

  // Tax-inclusive arithmetic: GST (18%) extracted from the gross subtotal
  // Base = Subtotal / 1.18; Tax = Subtotal - Base
  const tax = subtotal > 0 ? Math.round(subtotal - subtotal / (1 + APP_CONFIG.gstRate)) : 0;

  const qualifiesForFreeShipping = subtotal >= APP_CONFIG.freeShippingThreshold;
  const shipping = subtotal === 0 ? 0 : qualifiesForFreeShipping ? 0 : APP_CONFIG.flatShippingFee;
  const amountToFreeShipping = subtotal === 0 ? 0 : Math.max(0, APP_CONFIG.freeShippingThreshold - subtotal);

  const totalPayable = subtotal + shipping;

  return {
    subtotal,
    discount,
    tax,
    shipping,
    totalPayable,
    qualifiesForFreeShipping: subtotal === 0 ? true : qualifiesForFreeShipping,
    amountToFreeShipping,
  };
}
