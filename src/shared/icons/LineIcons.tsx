// ============================================================================
// COFOCO Precision SVG Line Icons (currentColor)
// High-craft technical icons for BOM items, trust signals, and UI controls
// ============================================================================

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const IconBand: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <path d="M4 14c0 3 3.6 5 8 5s8-2 8-5" strokeDasharray="2 2" />
  </svg>
);

export const IconBlock: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

export const IconRoller: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="7" width="18" height="10" rx="4" />
    <line x1="8" y1="7" x2="8" y2="17" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="16" y1="7" x2="16" y2="17" />
  </svg>
);

export const IconTimer: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5" />
    <path d="M10 2h4" />
    <path d="m4 4 2 2" />
  </svg>
);

export const IconStrap: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M4 19 L16 7" />
    <circle cx="18" cy="5" r="3" />
    <path d="M8 21 L20 9" />
    <line x1="6" y1="20" x2="18" y2="8" strokeDasharray="2 2" />
  </svg>
);

export const IconBottle: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 2h6v3H9z" />
    <path d="M10 5v2.5L7 10v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V10l-3-2.5V5" />
    <line x1="7" y1="14" x2="17" y2="14" />
  </svg>
);

export const IconGrip: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="6" r="4" />
    <path d="M9 10 L6 20" />
    <path d="M15 10 L18 20" />
    <line x1="8" y1="16" x2="16" y2="16" strokeDasharray="2 2" />
  </svg>
);

export const IconMat: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <ellipse cx="6" cy="12" rx="3" ry="7" />
    <path d="M6 5 L18 5 C20 5 21 8 21 12 C21 16 20 19 18 19 L6 19" />
    <path d="M9 8 L18 8 M9 12 L18 12 M9 16 L18 16" strokeDasharray="2 2" />
  </svg>
);

export const IconTowel: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M4 6h16a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Z" />
    <path d="M4 10h16" />
    <path d="M8 10v10" />
  </svg>
);

export const IconCase: React.FC<IconProps> = ({ size = 20, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

// Trust strip icons
export const IconFreeShipping: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const IconTrial: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconEngineeredIndia: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 14.14 14.14" />
    <path d="m19.07 4.93-14.14 14.14" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const IconPlasticFree: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const BomItemIcon: React.FC<{
  iconName: string;
  size?: number | string;
  className?: string;
}> = ({ iconName, size = 20, className }) => {
  switch (iconName) {
    case 'band':
      return <IconBand size={size} className={className} />;
    case 'block':
      return <IconBlock size={size} className={className} />;
    case 'roller':
      return <IconRoller size={size} className={className} />;
    case 'timer':
      return <IconTimer size={size} className={className} />;
    case 'strap':
      return <IconStrap size={size} className={className} />;
    case 'bottle':
      return <IconBottle size={size} className={className} />;
    case 'grip':
      return <IconGrip size={size} className={className} />;
    case 'mat':
      return <IconMat size={size} className={className} />;
    case 'towel':
      return <IconTowel size={size} className={className} />;
    case 'case':
      return <IconCase size={size} className={className} />;
    default:
      return <IconBlock size={size} className={className} />;
  }
};
