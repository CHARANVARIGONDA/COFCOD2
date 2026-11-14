import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useFocusTrap, formatINR, APP_CONFIG } from '@cofoco/shared';
import { Button } from '../../ui/Button/Button';
import { QuantityStepper } from '../../ui/QuantityStepper/QuantityStepper';
import styles from './CartDrawer.module.css';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setDrawer, totals, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const trapRef = useFocusTrap<HTMLDivElement>({
    isActive: isOpen,
    onEscape: () => setDrawer(false),
  });

  const handleCheckoutClick = () => {
    setDrawer(false);
    navigate('/checkout');
  };

  const handleExploreClick = () => {
    setDrawer(false);
    navigate('/#capsules');
  };

  const shippingPercent = Math.min(
    100,
    Math.round((totals.subtotal / APP_CONFIG.freeShippingThreshold) * 100)
  );

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={() => setDrawer(false)}>
      <div
        ref={trapRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Equipment Bag Manifest"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>BAG MANIFEST [{items.length}]</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setDrawer(false)}
            aria-label="Close Bag"
          >
            [CLOSE ✕]
          </button>
        </div>

        {/* Free Shipping Dynamic Meter */}
        <div className={styles.shippingBarContainer}>
          <div className={styles.shippingText}>
            {totals.qualifiesForFreeShipping && totals.subtotal > 0 ? (
              <span>
                ✓ <span className={styles.shippingHighlight}>COMPLIMENTARY AIR DISPATCH UNLOCKED</span>
              </span>
            ) : (
              <span>
                Add{' '}
                <span className={`${styles.shippingHighlight} tabular`}>
                  {formatINR(totals.amountToFreeShipping)}
                </span>{' '}
                more for free priority courier
              </span>
            )}
          </div>
          <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={shippingPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className={styles.progressBarFill} style={{ width: `${shippingPercent}%` }} />
          </div>
        </div>

        {/* Items List */}
        {items.length === 0 ? (
          <div className={styles.emptyContainer}>
            <div className={styles.emptyTitle}>NO CAPSULES SELECTED</div>
            <p className={styles.emptyDesc}>
              Select a character-calibrated equipment capsule from the active catalog.
            </p>
            <Button variant="primary" onClick={handleExploreClick}>
              VIEW SPECIMEN CATALOG →
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.variantId} className={styles.itemRow}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} loading="lazy" />
                  <div className={styles.itemDetails}>
                    <div>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <div className={styles.itemVariant}>Config: {item.variantName}</div>
                      <span className={`${styles.itemPrice} tabular`}>
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className={styles.itemControls}>
                      <QuantityStepper
                        value={item.quantity}
                        min={1}
                        max={item.maxStock}
                        onChange={(qty) => updateQuantity(item.variantId, qty)}
                        ariaLabelPrefix={item.name}
                      />
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeItem(item.variantId)}
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        [REMOVE]
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Totals */}
            <div className={styles.footer}>
              <div className={styles.summaryRow}>
                <span>Gross Subtotal</span>
                <span className="tabular">{formatINR(totals.subtotal)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>18% GST Portion (Included)</span>
                <span className="tabular">{formatINR(totals.tax)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Priority Courier Dispatch</span>
                <span>
                  {totals.shipping === 0 ? (
                    <span className={styles.shippingHighlight}>COMPLIMENTARY</span>
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

              <div className={styles.checkoutAction}>
                <Button variant="primary" fullWidth onClick={handleCheckoutClick}>
                  PROCEED TO GUEST CHECKOUT →
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
