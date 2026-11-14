import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare, useCart, KITS, getKitBySlug, getCharacterBySlug, formatINR } from '@cofoco/shared';
import { Button } from '../../ui/Button/Button';
import { Badge } from '../../ui/Badge/Badge';
import { Price } from '../../ui/Price/Price';
import styles from './CompareMatrix.module.css';

export const CompareMatrix: React.FC = () => {
  const { selectedSlugs, removeKit, addKit } = useCompare();
  const { addItem } = useCart();

  const kit1 = selectedSlugs[0] ? getKitBySlug(selectedSlugs[0]) : undefined;
  const kit2 = selectedSlugs[1] ? getKitBySlug(selectedSlugs[1]) : undefined;

  const char1 = kit1 ? getCharacterBySlug(kit1.characterSlug) : undefined;
  const char2 = kit2 ? getCharacterBySlug(kit2.characterSlug) : undefined;

  const availableKits = KITS.filter((k) => !selectedSlugs.includes(k.slug));

  const handleAddToCart = (kit: typeof kit1) => {
    if (!kit || kit.status === 'out_of_stock') return;
    const variant = kit.variants[0];
    addItem({
      kitId: kit.id,
      variantId: variant.id,
      kitSlug: kit.slug,
      characterSlug: kit.characterSlug,
      name: kit.name,
      variantName: variant.name,
      price: variant.price,
      mrp: variant.mrp,
      maxStock: variant.stockCount,
      image: kit.primaryImage,
    });
  };

  const renderKitCol = (kit: typeof kit1, char: typeof char1) => {
    if (!kit) {
      return (
        <div className={styles.emptySlot}>
          <div className={styles.emptyTitle}>[EMPTY SPECIMEN COLUMN]</div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem', maxWidth: '240px' }}>
            Select an equipment capsule to inspect side-by-side technical parity.
          </p>

          <select
            className={styles.emptySelect}
            onChange={(e) => {
              if (e.target.value) addKit(e.target.value);
            }}
            defaultValue=""
            aria-label="Select capsule to compare"
          >
            <option value="" disabled>
              + CHOOSE SPECIMEN CAPSULE
            </option>
            {availableKits.map((k) => (
              <option key={k.slug} value={k.slug}>
                {k.name} ({formatINR(k.price)})
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className={styles.kitCol}>
        <div className={styles.kitTopCell}>
          <div className={styles.imageFrame}>
            <img src={kit.primaryImage} alt={kit.name} className={styles.image} />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeKit(kit.slug)}
              aria-label={`Remove ${kit.name} from comparison`}
            >
              [REMOVE ✕]
            </button>
          </div>

          <div>
            <Badge variant="gold">{char?.name} ARCHETYPE</Badge>
            <h3 className={styles.kitName} style={{ marginTop: '0.35rem' }}>
              {kit.name}
            </h3>
            <Price price={kit.price} mrp={kit.mrp} />
          </div>
        </div>

        {/* Spec Rows */}
        <div className={styles.specRow}>
          <span className={styles.mobileLabel}>Discipline</span>
          <span>{char?.discipline}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.mobileLabel}>Dimensions</span>
          <span className="tabular">{kit.dimensions}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.mobileLabel}>Net Packaged Weight</span>
          <span className="tabular">{kit.weight}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.mobileLabel}>Included BOM Specimens</span>
          <span>{kit.bom.map((b) => `${b.qty}x ${b.name}`).join(' // ')}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.mobileLabel}>Status</span>
          <span>
            {kit.status === 'in_stock' && 'In Stock — Dispatches Today'}
            {kit.status === 'low_stock' && `Low Stock (${kit.stockCount} left)`}
            {kit.status === 'pre_order' && 'Pre-Order Dispatches in 10 Days'}
            {kit.status === 'out_of_stock' && 'Sold Out — Waitlist Active'}
          </span>
        </div>

        <div className={styles.actionCell}>
          {kit.status === 'out_of_stock' ? (
            <Button variant="outline" fullWidth disabled>
              WAITLIST ONLY
            </Button>
          ) : (
            <Button variant="primary" fullWidth onClick={() => handleAddToCart(kit)}>
              ADD TO BAG +
            </Button>
          )}

          <Link to={`/kits/${kit.slug}`} style={{ display: 'block', marginTop: '0.25rem' }}>
            <Button variant="outline" size="small" fullWidth>
              INSPECT SPECIMEN →
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.compareSection} aria-label="Specification Matrix">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>SPECIFICATION PARITY AUDIT</div>
          <h1 className={styles.title}>DUAL CAPSULE MATRIX</h1>
        </div>

        <div className={styles.matrixGrid}>
          {/* Desktop Labels Column */}
          <div className={styles.labelsCol} aria-hidden="true">
            <div className={styles.labelTopGap}>[SPECIFICATION AUDIT]</div>
            <div className={styles.labelCell}>Discipline Profile</div>
            <div className={styles.labelCell}>Dimensions</div>
            <div className={styles.labelCell}>Net Packaged Weight</div>
            <div className={styles.labelCell}>BOM Specimens</div>
            <div className={styles.labelCell}>Availability</div>
            <div className={styles.labelCell} style={{ borderBottom: 'none' }}>Acquisition</div>
          </div>

          {/* Kit 1 */}
          {renderKitCol(kit1, char1)}

          {/* Kit 2 */}
          {renderKitCol(kit2, char2)}
        </div>
      </div>
    </section>
  );
};
