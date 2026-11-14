import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { CartDrawer } from '../CartDrawer/CartDrawer';
import { SkipLink } from '../../ui/SkipLink/SkipLink';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} style={{ outline: 'none', minHeight: '80vh' }}>
        {children}
      </main>
      <CartDrawer />
      <Footer />
    </>
  );
};
