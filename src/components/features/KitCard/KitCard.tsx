import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Kit } from '@cofoco/shared';
import { useCart, useCompare, getCharacterBySlug } from '@cofoco/shared';
import { Badge } from '../../ui/Badge/Badge';
import { Price } from '../../ui/Price/Price';
import styles from './KitCard.module.css';

interface KitCardProps {
  kit: Kit;
  index: number;
}

export const KitCard: React.FC<KitCardProps> = ({ kit, index }) => {
  const { addItem } = useCart();
  const { toggleKit, isInCompare } = useCompare();
  const [showBom, setShowBom] = useState(false);

  const character = getCharacterBySlug(kit.characterSlug);
  const selectedVariant = kit.variants[0];
  const inCompare = isInCompare(kit.slug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (kit.status === 'out_of_stock') return;

    addItem({
      kitId: kit.id,
      variantId: selectedVariant.id,
      kitSlug: kit.slug,
      characterSlug: kit.characterSlug,
      name: kit.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      maxStock: selectedVariant.stockCount,
      image: kit.primaryImage,
    });
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <article
      className={styles.card}
      style={
        {
          '--char-text-accent': character?.textAccent || 'var(--gold)',
        } as React.CSSProperties
      }
    >
      <div className={styles.imageFrame}>
        <Link to={`/kits/${kit.slug}`} tabIndex={-1}>
          <img src={kit.primaryImage} alt={kit.name} className={styles.image} loading="lazy" />
        </Link>

        <span className={styles.specimenTag}>SPECIMEN // {formattedIndex}</span>

        <button
          type="button"
          className={`${styles.compareBtn} ${inCompare ? styles.compareActive : ''}`}
          onClick={() => toggleKit(kit.slug)}
          aria-label={`${inCompare ? 'Remove from' : 'Add to'} compare`}
        >
          {inCompare ? '✓ COMPARING' : '+ COMPARE'}
        </button>
      </div>

      <div className={styles.body}>
        <div>
          <div className={styles.metaBar}>
            <span className={styles.charLabel}>
              {character?.name} // {character?.discipline.split('//')[0].trim()}
            </span>
            <span className={styles.specsBrief}>
              {kit.weight} // {kit.bom.length} PCS
            </span>
          </div>

          <Link to={`/kits/${kit.slug}`}>
            <h3 className={styles.title}>{kit.name}</h3>
          </Link>
          <p className={styles.tagline}>{kit.tagline}</p>
        </div>

        <div className={styles.footerSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Price price={kit.price} mrp={kit.mrp} showGstNote={true} />
            {kit.status === 'low_stock' && <Badge variant="lowStock">LOW // {kit.stockCount}</Badge>}
            {kit.status === 'pre_order' && <Badge variant="preOrder">PRE-ORDER</Badge>}
            {kit.status === 'out_of_stock' && <Badge variant="outOfStock">WAITLIST</Badge>}
          </div>

          <button
            type="button"
            className={styles.inspectBomBtn}
            onClick={() => setShowBom(!showBom)}
            aria-label="Inspect Bill of Materials"
          >
            {showBom ? '▲ HIDE SPECIFICATIONS' : '▼ INSPECT BOM (' + kit.bom.length + ' SPECIMENS)'}
          </button>

          {showBom && (
            <div className={styles.bomInlineBox}>
              {kit.bom.map((b) => (
                <div key={b.id} className={styles.bomInlineItem}>
                  <span>{b.qty}x {b.name}</span>
                  <span style={{ color: 'var(--gold-bright)' }}>{b.material}</span>
                </div>
              ))}
            </div>
          )}

          {kit.status === 'out_of_stock' ? (
            <button className={styles.actionBtn} disabled>
              WAITLIST // SOLD OUT
            </button>
          ) : kit.status === 'pre_order' ? (
            <button className={styles.actionBtn} onClick={handleAddToCart}>
              PRE-ORDER // SHIPS IN 10 DAYS
            </button>
          ) : (
            <button className={styles.actionBtn} onClick={handleAddToCart}>
              ADD TO BAG +
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
