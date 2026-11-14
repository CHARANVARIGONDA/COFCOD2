import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 9rem)',
            fontWeight: 900,
            lineHeight: 0.8,
            color: 'var(--gold-bright)',
            marginBottom: '1rem',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '0 0 1rem 0',
          }}
        >
          SPECIMEN ROUTE NOT FOUND
        </h1>

        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The requested capsule or archetype document does not exist in the active COFOCO registry.
        </p>

        <Link to="/">
          <Button variant="primary">RETURN TO CATALOG →</Button>
        </Link>
      </div>
    </div>
  );
};
