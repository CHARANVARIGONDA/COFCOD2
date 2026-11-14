// ============================================================================
// COFOCO Character Vector Emblems (SVG currentColor)
// Mythic character iconography crafted for high-contrast presentation
// ============================================================================

import React from 'react';

interface EmblemProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const GandivaBowEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Arjun: The Master Archer's Gandiva Bow & Arrow of Infinite Focus */}
    <path
      d="M16 10 C 38 12, 46 24, 46 32 C 46 40, 38 52, 16 54"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line x1="16" y1="10" x2="16" y2="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Central Arrow */}
    <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M48 24 L56 32 L48 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
  </svg>
);

export const GadaMaceEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Bheema: The Great Gada Mace of Irresistible Momentum */}
    <rect x="29" y="24" width="6" height="34" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    {/* Mace Head: Fluted Sphere */}
    <circle cx="32" cy="18" r="12" stroke="currentColor" strokeWidth="2.5" />
    <line x1="20" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="2" />
    <line x1="32" y1="6" x2="32" y2="30" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="6" r="3" fill="currentColor" />
    <path d="M26 12 L38 24 M38 12 L26 24" stroke="currentColor" strokeWidth="1.5" />
    {/* Pommel */}
    <circle cx="32" cy="58" r="3.5" fill="currentColor" />
  </svg>
);

export const KavachaSunEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Karna: Kavacha Armor & Unforgiving Sun Radiance */}
    <polygon
      points="32,8 52,18 48,46 32,56 16,46 12,18"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.15"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
    {/* Solar Rays */}
    <line x1="32" y1="18" x2="32" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="43" x2="32" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="32" x2="21" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="43" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
  </svg>
);

export const LotusChasmEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Sita: Earth Root, Chasm & Resilient Lotus Petals */}
    <path
      d="M32 54 C32 40, 14 36, 14 26 C14 18, 24 16, 32 26 C40 16, 50 18, 50 26 C50 36, 32 40, 32 54 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.15"
      strokeLinejoin="round"
    />
    <path d="M32 26 C32 18, 28 10, 32 6 C36 10, 32 18, 32 26 Z" fill="currentColor" />
    <line x1="8" y1="54" x2="56" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="58" x2="48" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SacredFireEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Draupadi: The Sacred Yajna Fire of Pure Will */}
    <path
      d="M32 8 C36 20, 48 24, 48 38 C48 48, 41 56, 32 56 C23 56, 16 48, 16 38 C16 28, 26 22, 28 16 C30 22, 34 24, 32 8 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.2"
      strokeLinejoin="round"
    />
    <path
      d="M32 32 C35 38, 40 40, 40 45 C40 49, 36 52, 32 52 C28 52, 24 49, 24 45 C24 41, 29 38, 32 32 Z"
      fill="currentColor"
    />
  </svg>
);

export const BanyanTreeEmblem: React.FC<EmblemProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Savitri: The Ancient Banyan Tree of Unyielding Continuity */}
    <path
      d="M32 56 L32 34 M26 56 L26 40 M38 56 L38 40"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M12 34 C12 22, 20 12, 32 12 C44 12, 52 22, 52 34 C52 40, 48 44, 42 44 C38 44, 36 40, 32 40 C28 40, 26 44, 22 44 C16 44, 12 40, 12 34 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.15"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="24" r="4" fill="currentColor" />
  </svg>
);

export const CharacterEmblem: React.FC<{
  characterSlug: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ characterSlug, size = 28, className, style }) => {
  switch (characterSlug) {
    case 'arjun':
      return <GandivaBowEmblem size={size} className={className} style={style} />;
    case 'bheema':
      return <GadaMaceEmblem size={size} className={className} style={style} />;
    case 'karna':
      return <KavachaSunEmblem size={size} className={className} style={style} />;
    case 'sita':
      return <LotusChasmEmblem size={size} className={className} style={style} />;
    case 'draupadi':
      return <SacredFireEmblem size={size} className={className} style={style} />;
    case 'savitri':
      return <BanyanTreeEmblem size={size} className={className} style={style} />;
    default:
      return null;
  }
};
