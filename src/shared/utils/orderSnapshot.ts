// ============================================================================
// COFOCO Order Snapshot Generator
// Creates frozen, deterministic records for checkout confirmation & tracking
// ============================================================================

import type { CartItem, OrderSnapshot, ShippingAddress, TrackingStep } from '../types';
import { calculateOrderTotals } from './pricing';

export function generateOrderId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CF-${id}`;
}

export function createOrderSnapshot(
  items: CartItem[],
  customer: ShippingAddress,
  paymentMethod: string = 'Instant UPI (Mock)'
): OrderSnapshot {
  const orderId = generateOrderId();
  const now = new Date();
  const totals = calculateOrderTotals(items);

  const deliveryDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const trackingTimeline: TrackingStep[] = [
    {
      status: 'confirmed',
      label: 'Order Confirmed & Payment Verified',
      date: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      description: 'Your kit order has been secured and sent to fulfillment.',
      completed: true,
      current: false,
    },
    {
      status: 'assembled',
      label: 'Precision Hand-Assembly & Inspection',
      date: 'Pending Fulfillment',
      description: 'All components, tension calibrations, and certifications packed.',
      completed: false,
      current: true,
    },
    {
      status: 'dispatched',
      label: 'Dispatched via Express Air',
      date: 'Estimated Tomorrow',
      description: 'Courier AWB generated. Carbon-neutral priority transit.',
      completed: false,
      current: false,
    },
    {
      status: 'out_for_delivery',
      label: 'Out for Local Delivery',
      date: formattedDelivery,
      description: 'Delivery courier dispatched to your pinned shipping address.',
      completed: false,
      current: false,
    },
    {
      status: 'delivered',
      label: 'Delivered to Doorstep',
      date: formattedDelivery,
      description: 'Kit received. Welcome to the Conscious Form collective.',
      completed: false,
      current: false,
    },
  ];

  return {
    orderId,
    createdAt: now.toISOString(),
    customer,
    items: JSON.parse(JSON.stringify(items)),
    totals,
    paymentMethod,
    paymentStatus: 'paid',
    trackingTimeline,
    estimatedDeliveryDate: formattedDelivery,
  };
}
