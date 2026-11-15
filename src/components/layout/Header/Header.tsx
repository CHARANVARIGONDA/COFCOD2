import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@cofoco/shared';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { itemCount, toggleDrawer } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'ARCHETYPES', path: '/#archetypes', tag: '06 DISCIPLINES' },
    { label: 'CAPSULES', path: '/#capsules', tag: 'SPECIMENS' },
    { label: 'COMPARE', path: '/compare', tag: 'MATRIX' },
    { label: 'OPERATIONS', path: '/admin', tag: 'PORTAL' },
    { label: 'ANALYTICS', path: '/analytics', tag: 'LIVE BI' },
  ];

  return (
    <>
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

          {/* Action Group: Golden Bag Button + 3-Bar Hamburger */}
          <div className={styles.actionGroup}>
            <button
              type="button"
              className={styles.bagButton}
              onClick={toggleDrawer}
              aria-label={`Open shopping bag with ${itemCount} items`}
            >
              <span className={styles.bagText}>BAG</span>
              <span className={`${styles.bagCountPill} tabular`}>{itemCount}</span>
            </button>

            {/* 3-Bar Mobile Hamburger Menu Button */}
            <button
              type="button"
              className={`${styles.hamburgerBtn} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </nav>
      </header>

      {/* Luxury Full-Screen Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileOverlayHeader}>
            <div className={styles.brandGroup}>
              <span className={styles.brandName}>COFOCO</span>
              <span className={styles.brandTagline}>MODEL 2</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className={styles.mobileMenuList}>
            <Link
              to="/"
              className={`${styles.mobileMenuItem} ${location.pathname === '/' && !location.hash ? styles.mobileMenuActive : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.mobileMenuLeft}>
                <span className={styles.mobileMenuIndex}>01</span>
                <span className={styles.mobileMenuLabel}>HOME</span>
              </div>
              <span className={styles.mobileMenuTag}>SANCTUARY</span>
            </Link>

            {navItems.map((item, idx) => {
              const isActive =
                item.path.startsWith('/#')
                  ? location.pathname === '/' && location.hash === item.path.replace('/', '')
                  : location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`${styles.mobileMenuItem} ${isActive ? styles.mobileMenuActive : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={styles.mobileMenuLeft}>
                    <span className={styles.mobileMenuIndex}>0{idx + 2}</span>
                    <span className={styles.mobileMenuLabel}>{item.label}</span>
                  </div>
                  <span className={styles.mobileMenuTag}>{item.tag}</span>
                </Link>
              );
            })}
          </div>

          <div className={styles.mobileOverlayFooter}>
            <button
              type="button"
              className={styles.mobileBagCta}
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleDrawer();
              }}
            >
              <span>OPEN EQUIPMENT BAG</span>
              <span className={styles.mobileBagCount}>{itemCount} ITEMS</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
