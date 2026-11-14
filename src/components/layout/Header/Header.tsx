import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@cofoco/shared';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { itemCount, toggleDrawer } = useCart();
  const location = useLocation();

  const navItems = [
    { label: 'ARCHETYPES', path: '/#archetypes' },
    { label: 'CAPSULES', path: '/#capsules' },
    { label: 'COMPARE', path: '/compare' },
    { label: 'OPERATIONS', path: '/admin' },
    { label: 'ANALYTICS', path: '/analytics' },
  ];

  return (
    <header className={styles.headerWrapper} role="banner">
      <nav className={styles.pillNav} aria-label="Main Navigation">
        {/* Brand Group */}
        <Link to="/" className={styles.brandGroup} aria-label="COFOCO Home">
          <span className={styles.brandName}>COFOCO</span>
          <span className={styles.brandTagline}>MODEL 2</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive =
              item.path.startsWith('/#')
                ? location.pathname === '/' && location.hash === item.path.replace('/', '')
                : location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Golden Bag Button matching Design 1 pill luxury */}
        <button
          type="button"
          className={styles.bagButton}
          onClick={toggleDrawer}
          aria-label={`Open shopping bag with ${itemCount} items`}
        >
          <span className={styles.bagText}>BAG</span>
          <span className={`${styles.bagCountPill} tabular`}>{itemCount}</span>
        </button>
      </nav>
    </header>
  );
};
