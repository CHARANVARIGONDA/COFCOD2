import React, { useState } from 'react';
import { KITS, CHARACTERS } from '@cofoco/shared';
import { HeroSection } from '../../components/features/HeroSection/HeroSection';
import { KitCard } from '../../components/features/KitCard/KitCard';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<string>('all');

  const filteredKits =
    selectedChar === 'all'
      ? KITS
      : KITS.filter((k) => k.characterSlug === selectedChar);

  return (
    <>
      <HeroSection />

      {/* Equipment Capsules Catalog */}
      <section id="capsules" className={styles.capsulesSection} aria-label="Active Equipment Catalog">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.eyebrow}>CATALOG ARCHIVE // 08 PHYSICAL CAPSULES</div>
              <h2 className={styles.title}>ACTIVE EQUIPMENT SPECIMENS</h2>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={styles.filterBar} role="tablist" aria-label="Filter capsules by character archetype">
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedChar === 'all' ? styles.activeFilter : ''}`}
              onClick={() => setSelectedChar('all')}
            >
              ALL SPECIMENS ({KITS.length})
            </button>
            {CHARACTERS.map((c) => (
              <button
                key={c.slug}
                type="button"
                className={`${styles.filterBtn} ${selectedChar === c.slug ? styles.activeFilter : ''}`}
                onClick={() => setSelectedChar(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Grid of KitCards */}
          <div className={styles.capsulesGrid}>
            {filteredKits.map((kit, idx) => (
              <KitCard key={kit.id} kit={kit} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Manifesto */}
      <section id="manifesto" className={styles.manifestoSection} aria-label="Architectural Manifesto">
        <div className="container">
          <div className={styles.manifestoGrid}>
            <div>
              <div className={styles.eyebrow}>SYSTEM MANIFESTO // COFOCO PHILOSOPHY</div>
              <h2 className={styles.manifestoHeading}>
                STRICT FUNCTIONAL INTEGRITY.
                <br />
                <span style={{ color: 'var(--gold-bright)' }}>ZERO ORNAMENTAL EXTRAS.</span>
              </h2>
              <p className={styles.manifestoText}>
                We refuse the marketing clutter of modern fitness. We believe physical conditioning is sacred, tactile, and rooted in uncompromising load.
              </p>
            </div>

            <div className={styles.pillarsList}>
              <div className={styles.pillarRow}>
                <span className={styles.pillarIndex}>[01]</span>
                <div>
                  <h3 className={styles.pillarTitle}>SPECIMEN PURITY OVER FASHION</h3>
                  <p className={styles.pillarDesc}>
                    Top-grain bridle leather, aircraft billet aluminum, and renewable bark cork. Materials chosen for tensile strength and honest patina rather than seasonal color trends.
                  </p>
                </div>
              </div>

              <div className={styles.pillarRow}>
                <span className={styles.pillarIndex}>[02]</span>
                <div>
                  <h3 className={styles.pillarTitle}>MYTHIC ARCHETYPE CALIBRATION</h3>
                  <p className={styles.pillarDesc}>
                    Six distinct neuromuscular movement cultures. Equipment built specifically for pre-dawn velocity, maximal axial load, solitary grit, or deep restorative decompression.
                  </p>
                </div>
              </div>

              <div className={styles.pillarRow}>
                <span className={styles.pillarIndex}>[03]</span>
                <div>
                  <h3 className={styles.pillarTitle}>COMPLETE BOM DISCLOSURE</h3>
                  <p className={styles.pillarDesc}>
                    Every component, fastener, tension rating, and material source is audited and disclosed upfront in our technical Bill of Materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
