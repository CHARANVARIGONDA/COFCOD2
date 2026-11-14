import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  getCharacterBySlug,
  getKitsByCharacter,
  CHARACTERS,
  CharacterEmblem,
} from '@cofoco/shared';
import { KitCard } from '../../components/features/KitCard/KitCard';
import styles from './CharacterPage.module.css';

export const CharacterPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const character = slug ? getCharacterBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!character) {
    return <Navigate to="/404" replace />;
  }

  const kits = getKitsByCharacter(character.slug);
  const otherCharacters = CHARACTERS.filter((c) => c.slug !== character.slug);

  return (
    <>
      {/* Stark Architectural Header (No Background Image) */}
      <section
        className={styles.charHeader}
        style={
          {
            '--char-accent': character.color,
            '--char-text-accent': character.textAccent,
          } as React.CSSProperties
        }
      >
        <div className="container">
          <div className={styles.topBreadcrumb}>
            <Link to="/#archetypes">← ARCHETYPES ARCHIVE</Link> // {character.slug.toUpperCase()} SPECIFICATION
          </div>

          <div className={styles.headerGrid}>
            <div>
              <div className={styles.emblemBadge}>
                <CharacterEmblem characterSlug={character.slug} size={32} />
              </div>

              <h1 className={styles.name}>{character.name}</h1>
              <div className={styles.title}>{character.title}</div>

              <blockquote className={styles.cueQuote}>
                "{character.cue}"
              </blockquote>
            </div>

            {/* Side Technical Profile Box */}
            <div className={styles.sideSpecBox}>
              <div className={styles.sideHeading}>ARCHETYPE AUDIT DATA</div>

              <div className={styles.specRow}>
                <span className={styles.specLabel}>PRIMARY DISCIPLINE</span>
                <span className={styles.specVal}>{character.discipline}</span>
              </div>

              <div className={styles.specRow}>
                <span className={styles.specLabel}>MOVEMENT SIGNATURE</span>
                <span className={styles.specVal}>{character.archetype}</span>
              </div>

              <div className={styles.specRow}>
                <span className={styles.specLabel}>EQUIPMENT CAPSULES ALLOCATED</span>
                <span className={styles.specVal}>{kits.length} Dedicated Capsules</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Routine Protocol Breakdown */}
      <section className={styles.storySection} aria-label="Mythic & Routine Protocol">
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <h2 className={styles.colHeading}>THE MYTHIC ANCHOR</h2>
              <p className={styles.bodyText}>{character.mythicContext}</p>
            </div>

            <div>
              <h2 className={styles.colHeading}>DAILY NEUROMUSCULAR PROTOCOL</h2>
              <p className={styles.bodyText}>{character.routineDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Linked Capsules Catalog */}
      <section className={styles.capsulesSection} aria-label={`${character.name} Capsules`}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            {character.name} CAPSULES ({kits.length})
          </h2>

          <div className={styles.capsulesGrid}>
            {kits.map((kit, idx) => (
              <KitCard key={kit.id} kit={kit} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Companion Archetypes Directory */}
      <section className={styles.directorySection} aria-label="Other Archetypes">
        <div className="container">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.1em' }}>
            EXPLORE COMPANION ARCHETYPES
          </div>

          <div className={styles.directoryGrid}>
            {otherCharacters.map((other) => (
              <Link key={other.slug} to={`/characters/${other.slug}`} className={styles.dirCard}>
                <div className={styles.dirName}>{other.name}</div>
                <div className={styles.dirTitle}>{other.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
