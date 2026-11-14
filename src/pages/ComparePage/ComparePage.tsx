import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompareMatrix } from '../../components/features/CompareMatrix/CompareMatrix';

export const ComparePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: 'clamp(40px, 6vw, 60px)', minHeight: '85vh' }}>
      <div className="container" style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/#capsules"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8125rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
          }}
        >
          ← RETURN TO EQUIPMENT CATALOG
        </Link>
      </div>

      <CompareMatrix />
    </div>
  );
};
