// ============================================================================
// COFOCO Type Definitions - Strict TypeScript Data & State Contracts
// ============================================================================

export type CharacterSlug = 'arjun' | 'bheema' | 'karna' | 'sita' | 'draupadi' | 'savitri';

export type ProductStatus = 'in_stock' | 'low_stock' | 'pre_order' | 'out_of_stock';

export interface BomItem {
  id: string;
  name: string;
  qty: number;
  spec: string;
  material: string;
  iconName: 'band' | 'block' | 'roller' | 'timer' | 'strap' | 'bottle' | 'grip' | 'mat' | 'towel' | 'case';
}

export interface KitVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  mrp: number;
  inStock: boolean;
  stockCount: number;
  colorName: string;
  colorHex: string;
}

export interface Kit {
  id: string;
  slug: string;
  characterSlug: CharacterSlug;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  mrp: number;
  badge?: string;
  status: ProductStatus;
  stockCount: number;
  variants: KitVariant[];
  bom: BomItem[];
  routines: string[];
  dimensions: string;
  weight: string;
  primaryImage: string;
  secondaryImage?: string;
}

export interface Character {
  slug: CharacterSlug;
  name: string;
  title: string;
  archetype: string;
  tagline: string;
  discipline: string;
  cue: string;
  routineDescription: string;
  mythicContext: string;
  color: string;
  textAccent: string;
  bgGradient: string;
  glowColor: string;
  emblemId: string;
  heroImage: string;
  kitSlugs: string[];
}

export interface CartItem {
  kitId: string;
  variantId: string;
  kitSlug: string;
  characterSlug: CharacterSlug;
  name: string;
  variantName: string;
  price: number;
  mrp: number;
  quantity: number;
  maxStock: number;
  image: string;
}

export interface PricingTotals {
  subtotal: number;
  discount: number;
  tax: number; // 18% GST portion included in subtotal
  shipping: number;
  totalPayable: number;
  qualifiesForFreeShipping: boolean;
  amountToFreeShipping: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<CartItem, 'quantity'>; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { variantId: string } }
  | { type: 'UPDATE_QTY'; payload: { variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'SET_DRAWER'; payload: boolean };

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface TrackingStep {
  status: 'confirmed' | 'assembled' | 'dispatched' | 'out_for_delivery' | 'delivered';
  label: string;
  date: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface OrderSnapshot {
  orderId: string;
  createdAt: string;
  customer: ShippingAddress;
  items: CartItem[];
  totals: PricingTotals;
  paymentMethod: string;
  paymentStatus: 'paid' | 'failed' | 'pending';
  trackingTimeline: TrackingStep[];
  estimatedDeliveryDate: string;
}

export interface ServiceablePin {
  pin: string;
  city: string;
  state: string;
  estimatedDays: number;
  codAvailable: boolean;
}
