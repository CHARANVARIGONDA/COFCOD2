import React from 'react';
import { Link } from 'react-router-dom';
import { CHARACTERS, CharacterEmblem, BRAND_IMAGES } from '@cofoco/shared';
import { Button } from '../../ui/Button/Button';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-label="Architectural Hero Overview">
      {/* Cinematic Gym Atmosphere Backdrop */}
      <div className={styles.heroBackdrop} aria-hidden="true">
        <img
          src={BRAND_IMAGES.homeHero}
          alt="COFOCO Heavy Gym Training Environment"
          className={styles.heroImage}
        />
        <div className={styles.heroGradientOverlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        {/* Top Technical Metadata Header */}
        <div className={styles.topBar}>
          <div className={styles.metadataPill}>
            <span className={styles.livePulse} />
            <span className={styles.indexCode}>DOCUMENT // COFOCO-ARCH-2026-V2</span>
          </div>
          <span className={styles.locationCode}>ENGINEERED IN INDIA // BENGALURU SANCTUARY</span>
        </div>

        {/* Main Confident Architectural Typography */}
        <div className={styles.mainTypographyBlock}>
          <h1 className={styles.headline}>
            RAW CAPACITY.
            <br />
            <span className={styles.goldAccent}>DELIBERATE LOAD.</span>
          </h1>

          <p className={styles.editorialSubline}>
            Character-calibrated equipment capsules and somatic restoration implements. Designed with strict structural utility, zero ornamental decoration, and unbending tactile fidelity.
          </p>

          <div className={styles.ctaRow}>
            <a href="#capsules">
              <Button variant="primary">VIEW SPECIMEN CATALOG ↓</Button>
            </a>
            <Link to="/compare">
              <Button variant="outline">SPECIFICATION MATRIX →</Button>
            </Link>
          </div>
        </div>

        {/* 6-Column Rich Interactive Character Archetypes Showcase */}
        <div className={styles.archetypesStrip} id="archetypes">
          <div className={styles.stripHeader}>
            <div className={styles.stripLabelGroup}>
              <span className={styles.stripBadge}>ROSTER CALIBRATION</span>
              <span className={styles.stripLabel}>06 CALIBRATED DISCIPLINES</span>
            </div>
            <span className={styles.stripSub}>HOVER TO INSPECT PROTOCOL SPECIFICATIONS</span>
          </div>

          <div className={styles.archetypesGrid}>
            {CHARACTERS.map((char, idx) => (
              <Link
                key={char.slug}
                to={`/characters/${char.slug}`}
                className={styles.archetypeCard}
                style={
                  {
                    '--char-accent': char.color,
                    '--char-text-accent': char.textAccent,
                    '--char-glow': char.glowColor || 'rgba(212, 175, 55, 0.35)',
                  } as React.CSSProperties
                }
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>[0{idx + 1}]</span>
                  <div className={styles.cardEmblem}>
                    <CharacterEmblem characterSlug={char.slug} size={28} />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{char.name}</div>
                  <div className={styles.cardTitle}>{char.title}</div>
                  <div className={styles.cardDiscipline}>
                    <span>{char.discipline.split('//')[0].trim()}</span>
                  </div>
                  <p className={styles.cardCue}>"{char.cue}"</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.exploreText}>INSPECT CAPSULE</span>
                  <span className={styles.exploreArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
