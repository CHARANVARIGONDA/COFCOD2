import React from 'react';
import { Link } from 'react-router-dom';
import { CHARACTERS, APP_CONFIG } from '@cofoco/shared';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        {/* Architectural 4-Column Trust Grid */}
        <div className={styles.trustGrid}>
          <div className={styles.trustCell}>
            <span className={styles.trustIndex}>[SPEC 01]</span>
            <h3 className={styles.trustTitle}>NATIONWIDE EXPRESS</h3>
            <p className={styles.trustDesc}>
              Priority air dispatch on all capsule orders over ₹999 across Indian pin codes.
            </p>
          </div>

          <div className={styles.trustCell}>
            <span className={styles.trustIndex}>[SPEC 02]</span>
            <h3 className={styles.trustTitle}>30-DAY TRIAL SANCTUARY</h3>
            <p className={styles.trustDesc}>
              Full tactile return guarantee. If the gear fails your daily ritual, return for a prompt refund.
            </p>
          </div>

          <div className={styles.trustCell}>
            <span className={styles.trustIndex}>[SPEC 03]</span>
            <h3 className={styles.trustTitle}>LOCAL MACHINING</h3>
            <p className={styles.trustDesc}>
              Cold-machined alloys, bridle leather, and natural cork engineered and inspected in India.
            </p>
          </div>

          <div className={styles.trustCell}>
            <span className={styles.trustIndex}>[SPEC 04]</span>
            <h3 className={styles.trustTitle}>ZERO PLASTIC HOUSING</h3>
            <p className={styles.trustDesc}>
              All capsules wrapped strictly in unbleached organic cotton canvas and recycled kraft rolls.
            </p>
          </div>
        </div>

        {/* Directory Grid */}
        <div className={styles.directoryGrid}>
          <div>
            <div className={styles.brandTitle}>COFOCO</div>
            <p className={styles.brandDesc}>
              Conscious Form Company. Physical training implements calibrated to ancient mythic archetypes. No ornamental extras. Strict functional utility.
            </p>
          </div>

          <div>
            <div className={styles.colHeader}>ARCHETYPES (06)</div>
            <ul className={styles.linkList}>
              {CHARACTERS.map((c) => (
                <li key={c.slug}>
                  <Link to={`/characters/${c.slug}`} className={styles.link}>
                    {c.name} // {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.colHeader}>SYSTEM SPECS</div>
            <ul className={styles.linkList}>
              <li>
                <Link to="/#capsules" className={styles.link}>
                  Active Capsules Catalog
                </Link>
              </li>
              <li>
                <Link to="/compare" className={styles.link}>
                  Dual Specification Matrix
                </Link>
              </li>
              <li>
                <a href="#manifesto" className={styles.link}>
                  Architectural Manifesto
                </a>
              </li>
              <li>
                <a href={`mailto:${APP_CONFIG.supportEmail}`} className={styles.link}>
                  Concierge Support Desk
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className={styles.colHeader}>INTERNAL ENGINES (P0)</div>
            <ul className={styles.linkList}>
              <li>
                <Link to="/admin" className={styles.link} style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>
                  ⚡ Operations Station (OP01-05)
                </Link>
              </li>
              <li>
                <Link to="/analytics" className={styles.link} style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>
                  📊 Founder Analytics (AN01-03)
                </Link>
              </li>
              <li className={styles.link} style={{ color: '#888', fontSize: '0.75rem' }}>
                Hardware TOTP MFA Secured
              </li>
            </ul>
          </div>

          <div>
            <div className={styles.colHeader}>LOCATIONS</div>
            <ul className={styles.linkList}>
              <li className={styles.link}>Bengaluru // Mumbai // Delhi</li>
              <li className={styles.link}>{APP_CONFIG.contactPhone}</li>
              <li>
                <a href={APP_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Instagram Registry ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div>© {new Date().getFullYear()} Conscious Form Company. Architectural Edition. All rights reserved.</div>
          <div>Strictly verified tax-inclusive INR pricing. Demo simulation.</div>
        </div>
      </div>
    </footer>
  );
};
