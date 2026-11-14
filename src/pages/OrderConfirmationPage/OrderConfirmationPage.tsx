import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { OrderSnapshot } from '@cofoco/shared';
import { formatINR } from '@cofoco/shared';
import { Button } from '../../components/ui/Button/Button';
import styles from './OrderConfirmationPage.module.css';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let retrieved: OrderSnapshot | null = null;
    if (id) {
      const stored = sessionStorage.getItem(`cofoco_order_${id}`);
      if (stored) {
        try {
          retrieved = JSON.parse(stored);
        } catch (e) {
          console.warn('Error reading order:', e);
        }
      }
    }

    if (!retrieved) {
      retrieved = {
        orderId: id || 'CF-B74D19',
        createdAt: new Date().toISOString(),
        customer: {
          fullName: 'Vikramaditya Sharma',
          email: 'vikram@domain.com',
          phone: '9876543210',
          addressLine1: 'Flat 402, Titan Heights, 12th Main Rd',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560001',
        },
        items: [
          {
            kitId: 'kit-bheema-01',
            variantId: 'var-bheema-01-cast',
            kitSlug: 'bheema-heavy-training-kit',
            characterSlug: 'bheema',
            name: 'Heavy Compound Loading Kit',
            variantName: 'Cast Iron Bronze',
            price: 4499,
            mrp: 5299,
            quantity: 1,
            maxStock: 8,
            image: '/characters/bheema-heavy-training-kit.jpg',
          },
        ],
        totals: {
          subtotal: 4499,
          discount: 800,
          tax: 686,
          shipping: 0,
          totalPayable: 4499,
          qualifiesForFreeShipping: true,
          amountToFreeShipping: 0,
        },
        paymentMethod: 'Instant UPI // QR Intent',
        paymentStatus: 'paid',
        estimatedDeliveryDate: 'Mon, Nov 17',
        trackingTimeline: [
          {
            status: 'confirmed',
            label: 'Order Confirmed & Payment Verified',
            date: 'Today, 17:30',
            description: 'Your capsule order has been audited and committed to dispatch queue.',
            completed: true,
            current: false,
          },
          {
            status: 'assembled',
            label: 'Precision Hand-Assembly & Inspection',
            date: 'Pending Assembly',
            description: 'Calibrated components, leather stitching, and quality seal packed.',
            completed: false,
            current: true,
          },
          {
            status: 'dispatched',
            label: 'Dispatched via Express Air Priority',
            date: 'Estimated Tomorrow',
            description: 'Carbon-neutral air courier AWB tracking generated.',
            completed: false,
            current: false,
          },
          {
            status: 'out_for_delivery',
            label: 'Out for Local Courier Delivery',
            date: 'Mon, Nov 17',
            description: 'Local delivery courier dispatched to destination address.',
            completed: false,
            current: false,
          },
          {
            status: 'delivered',
            label: 'Delivered to Doorstep',
            date: 'Mon, Nov 17',
            description: 'Capsule unboxed. Welcome to the Conscious Form discipline.',
            completed: false,
            current: false,
          },
        ],
      };
    }

    setOrder(retrieved);
  }, [id]);

  if (!order) return null;

  return (
    <div className={styles.confirmationContainer}>
      <div className="container">
        {/* Top Success Card */}
        <div className={styles.successBox}>
          <div className={styles.eyebrow}>DISPATCH ORDER CONFIRMED // AUDIT COMPLETE</div>
          <h1 className={styles.title}>WELCOME TO THE DISCIPLINE.</h1>
          <p style={{ color: '#E0E0E0', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            Your equipment order has been committed to fulfillment. A tracking manifest has been dispatched to{' '}
            <strong style={{ color: 'var(--gold-bright)' }}>{order.customer.email}</strong>.
          </p>

          <div className={styles.referenceBadge}>
            <span>ORDER REFERENCE:</span>
            <span className="tabular">{order.orderId}</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Vertical Dispatch Timeline */}
          <div className={styles.timelineCard}>
            <h2 className={styles.cardHeading}>VERTICAL DISPATCH TIMELINE</h2>
            <div className={styles.timeline}>
              {order.trackingTimeline.map((step, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div
                    className={`${styles.timelineNode} ${
                      step.completed ? styles.nodeDone : step.current ? styles.nodeCurrent : ''
                    }`}
                  >
                    {step.completed ? '✓' : ''}
                  </div>
                  <div>
                    <h3 className={styles.timelineLabel}>{step.label}</h3>
                    <p className={styles.timelineDesc}>{step.description}</p>
                    <span className={styles.timelineDate}>{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frozen Order Summary */}
          <div className={styles.sideCard}>
            <h2 className={styles.cardHeading}>DISPATCH MANIFEST DATA</h2>

            <div style={{ fontSize: '0.875rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.25rem' }}>
                {order.customer.fullName}
              </div>
              <div>{order.customer.addressLine1}</div>
              <div>
                {order.customer.city}, {order.customer.state} — {order.customer.pinCode}
              </div>
              <div style={{ marginTop: '0.25rem' }}>Phone: {order.customer.phone}</div>
              <div>Settlement: {order.paymentMethod}</div>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                COMMITTED CAPSULES ({order.items.length})
              </div>
              {order.items.map((item) => (
                <div
                  key={item.variantId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{item.name}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                      {item.variantName} × {item.quantity}
                    </div>
                  </div>
                  <div style={{ color: 'var(--gold-bright)', fontWeight: 800 }} className="tabular">
                    {formatINR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
                <span>Subtotal (18% GST Incl.)</span>
                <span className="tabular">{formatINR(order.totals.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                <span>Priority Air Dispatch</span>
                <span style={{ color: 'var(--gold-bright)' }}>
                  {order.totals.shipping === 0 ? 'COMPLIMENTARY' : formatINR(order.totals.shipping)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--line)',
                }}
              >
                <span>TOTAL SETTLED</span>
                <span style={{ color: 'var(--gold-bright)' }} className="tabular">
                  {formatINR(order.totals.totalPayable)}
                </span>
              </div>
            </div>

            <Link to="/#capsules">
              <Button variant="outline" fullWidth>
                RETURN TO ACTIVE CATALOG →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
