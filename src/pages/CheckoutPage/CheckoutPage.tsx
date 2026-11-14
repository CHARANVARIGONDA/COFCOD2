import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  useCart,
  validatePinCode,
  createOrderSnapshot,
  formatINR,
  type ShippingAddress,
} from '@cofoco/shared';
import { Button } from '../../components/ui/Button/Button';
import styles from './CheckoutPage.module.css';

export const CheckoutPage: React.FC = () => {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [pinMessage, setPinMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [failureError, setFailureError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pinCode: val }));

    if (val.length === 6) {
      const res = validatePinCode(val);
      if (res.isValid && res.pinData) {
        setFormData((prev) => ({
          ...prev,
          city: res.pinData?.city || prev.city,
          state: res.pinData?.state || prev.state,
        }));
        setPinMessage(res.message);
      } else {
        setPinMessage(res.message);
      }
    } else {
      setPinMessage('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid Email is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = '10-digit Phone is required';
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim() || formData.pinCode.length !== 6)
      newErrors.pinCode = 'Valid 6-digit PIN code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFailureError(null);

    setTimeout(() => {
      if (simulateFailure) {
        setIsSubmitting(false);
        setFailureError(
          'DEMO ERROR (US02): Simulated payment authorization failure. Gateway rejected mock transaction.'
        );
        return;
      }

      const snapshot = createOrderSnapshot(
        items,
        formData,
        paymentMethod === 'upi' ? 'Instant UPI // QR Intent' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'
      );

      try {
        sessionStorage.setItem(`cofoco_order_${snapshot.orderId}`, JSON.stringify(snapshot));
      } catch (err) {
        console.warn('Error saving snapshot:', err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate(`/order/${snapshot.orderId}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className={styles.checkoutContainer}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1 className={styles.title}>NO CAPSULES IN BAG</h1>
          <p style={{ color: 'var(--text-dim)', margin: '1.5rem auto', maxWidth: '400px' }}>
            Add an equipment capsule from the catalog to initialize the checkout manifest.
          </p>
          <Link to="/#capsules">
            <Button variant="primary">VIEW SPECIMEN CATALOG →</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>DISPATCH ORDER MANIFEST // STEP-BY-STEP AUDIT</div>
          <h1 className={styles.title}>GUEST CHECKOUT DISPATCH</h1>
        </div>

        {failureError && (
          <div className={styles.failureBox} role="alert">
            {failureError}
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className={styles.grid}>
            <div>
              {/* Step 1: Destination */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>[01]</span>
                  <h2 className={styles.stepTitle}>COURIER DESTINATION ADDRESS</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2FullName">
                      Full Legal Name *
                    </label>
                    <input
                      id="d2FullName"
                      type="text"
                      className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Sharma"
                    />
                    {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2Email">
                      Email Address (Tracking Manifest) *
                    </label>
                    <input
                      id="d2Email"
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="athlete@domain.com"
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2Phone">
                      Mobile Number (Courier SMS Updates) *
                    </label>
                    <input
                      id="d2Phone"
                      type="tel"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      maxLength={10}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2PinCode">
                      6-Digit Indian PIN Code *
                    </label>
                    <input
                      id="d2PinCode"
                      type="text"
                      className={`${styles.input} ${errors.pinCode ? styles.inputError : ''}`}
                      value={formData.pinCode}
                      onChange={handlePinChange}
                      placeholder="e.g. 560001"
                      maxLength={6}
                    />
                    {pinMessage && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-bright)' }}>
                        {pinMessage}
                      </span>
                    )}
                    {errors.pinCode && <span className={styles.errorText}>{errors.pinCode}</span>}
                  </div>

                  <div className={`${styles.inputGroup} ${styles.fullSpan}`}>
                    <label className={styles.label} htmlFor="d2Address1">
                      Street Address / House / Flat *
                    </label>
                    <input
                      id="d2Address1"
                      type="text"
                      className={`${styles.input} ${errors.addressLine1 ? styles.inputError : ''}`}
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="Flat 402, Titan Heights, 12th Main Rd"
                    />
                    {errors.addressLine1 && <span className={styles.errorText}>{errors.addressLine1}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2City">
                      City *
                    </label>
                    <input
                      id="d2City"
                      type="text"
                      className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bengaluru"
                    />
                    {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="d2State">
                      State *
                    </label>
                    <input
                      id="d2State"
                      type="text"
                      className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Karnataka"
                    />
                    {errors.state && <span className={styles.errorText}>{errors.state}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Selector & QA Error Trigger */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}>[02]</span>
                  <h2 className={styles.stepTitle}>PAYMENT SETTLEMENT SIMULATOR</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.activePayment : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: '#FFFFFF' }}>
                        INSTANT UPI // QR INTENT
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Google Pay, PhonePe, Paytm, BHIM. Zero processing fee.
                      </div>
                    </div>
                  </label>

                  <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.activePayment : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: '#FFFFFF' }}>
                        CREDIT / DEBIT CARD
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Visa, Mastercard, RuPay, American Express.
                      </div>
                    </div>
                  </label>

                  {/* Failure toggle for US02 QA verification */}
                  <div
                    style={{
                      background: 'rgba(217, 131, 36, 0.1)',
                      border: '1px solid rgba(217, 131, 36, 0.4)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      id="d2FailCheck"
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      style={{ accentColor: '#D98324' }}
                    />
                    <label htmlFor="d2FailCheck" style={{ fontSize: '0.8125rem', color: '#FFAA4D', cursor: 'pointer' }}>
                      QA Simulator: Simulate gateway timeout / failure (tests US02 error handling)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Order Summary Column */}
            <div className={styles.summaryBox}>
              <h2 className={styles.summaryTitle}>DISPATCH SUMMARY [{items.length} ITEMS]</h2>

              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.variantId} className={styles.itemSnapshot}>
                    <img src={item.image} alt={item.name} className={styles.itemSnapshotImg} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#FFFFFF' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {item.variantName} × {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--gold-bright)' }} className="tabular">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.row}>
                <span>Gross Subtotal</span>
                <span className="tabular">{formatINR(totals.subtotal)}</span>
              </div>

              <div className={styles.row}>
                <span>18% GST Portion (Included)</span>
                <span className="tabular">{formatINR(totals.tax)}</span>
              </div>

              <div className={styles.row}>
                <span>Priority Air Courier</span>
                <span>
                  {totals.shipping === 0 ? (
                    <span style={{ color: 'var(--gold-bright)', fontWeight: 800 }}>COMPLIMENTARY</span>
                  ) : (
                    <span className="tabular">{formatINR(totals.shipping)}</span>
                  )}
                </span>
              </div>

              <div className={styles.totalRow}>
                <span>TOTAL SETTLED</span>
                <span className={`${styles.totalAmount} tabular`}>
                  {formatINR(totals.totalPayable)}
                </span>
              </div>

              <Button variant="primary" fullWidth type="submit" loading={isSubmitting}>
                COMMIT & AUTHORIZE DISPATCH →
              </Button>

              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                30-Day Return Guarantee // 100% Zero-Plastic Packaging
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
