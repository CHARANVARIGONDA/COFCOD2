import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '1rem',
        zIndex: 9999,
        background: 'var(--gold)',
        color: '#000000',
        padding: '0.75rem 1.25rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        textTransform: 'uppercase',
      }}
      onFocus={(e) => (e.currentTarget.style.top = '1rem')}
      onBlur={(e) => (e.currentTarget.style.top = '-100px')}
    >
      Skip to main content
    </a>
  );
};
