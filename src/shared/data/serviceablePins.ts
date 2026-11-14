// ============================================================================
// COFOCO Serviceable PIN Codes Database (Demo Mock)
// ============================================================================

import type { ServiceablePin } from '../types';

export const SERVICEABLE_PINS: ServiceablePin[] = [
  { pin: '110001', city: 'New Delhi', state: 'Delhi', estimatedDays: 2, codAvailable: true },
  { pin: '110020', city: 'South Delhi', state: 'Delhi', estimatedDays: 2, codAvailable: true },
  { pin: '400001', city: 'Mumbai', state: 'Maharashtra', estimatedDays: 2, codAvailable: true },
  { pin: '400050', city: 'Bandra West, Mumbai', state: 'Maharashtra', estimatedDays: 2, codAvailable: true },
  { pin: '560001', city: 'Bengaluru', state: 'Karnataka', estimatedDays: 3, codAvailable: true },
  { pin: '560038', city: 'Indiranagar, Bengaluru', state: 'Karnataka', estimatedDays: 2, codAvailable: true },
  { pin: '560034', city: 'Koramangala, Bengaluru', state: 'Karnataka', estimatedDays: 2, codAvailable: true },
  { pin: '600001', city: 'Chennai', state: 'Tamil Nadu', estimatedDays: 3, codAvailable: true },
  { pin: '500001', city: 'Hyderabad', state: 'Telangana', estimatedDays: 3, codAvailable: true },
  { pin: '500081', city: 'Hitec City, Hyderabad', state: 'Telangana', estimatedDays: 2, codAvailable: true },
  { pin: '700001', city: 'Kolkata', state: 'West Bengal', estimatedDays: 4, codAvailable: false },
  { pin: '411001', city: 'Pune', state: 'Maharashtra', estimatedDays: 2, codAvailable: true },
  { pin: '380001', city: 'Ahmedabad', state: 'Gujarat', estimatedDays: 3, codAvailable: true },
];

export interface PinValidationResult {
  isValid: boolean;
  pinData?: ServiceablePin;
  message: string;
}

export function validatePinCode(pin: string): PinValidationResult {
  const cleaned = pin.trim();
  if (!/^\d{6}$/.test(cleaned)) {
    return {
      isValid: false,
      message: 'PIN code must be exactly 6 digits',
    };
  }

  const match = SERVICEABLE_PINS.find((p) => p.pin === cleaned);
  if (match) {
    return {
      isValid: true,
      pinData: match,
      message: `Delivery available in ${match.estimatedDays} business days to ${match.city}, ${match.state}.`,
    };
  }

  // Fallback for any other valid 6-digit Indian PIN code in demo mode
  return {
    isValid: true,
    pinData: {
      pin: cleaned,
      city: 'India Metro / Tier 1',
      state: 'National Express',
      estimatedDays: 4,
      codAvailable: true,
    },
    message: 'Express nationwide courier available. Delivery in 4-5 business days.',
  };
}
