import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider, CompareProvider } from '@cofoco/shared';
import { Layout } from './components/layout/Layout/Layout';

// Pages
import { HomePage } from './pages/HomePage/HomePage';
import { CharacterPage } from './pages/CharacterPage/CharacterPage';
import { KitDetailPage } from './pages/KitDetailPage/KitDetailPage';
import { ComparePage } from './pages/ComparePage/ComparePage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage/OrderConfirmationPage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { AnalyticsPage } from './pages/AnalyticsPage/AnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <CompareProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters/:slug" element={<CharacterPage />} />
            <Route path="/kits/:slug" element={<KitDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderConfirmationPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CompareProvider>
    </CartProvider>
  );
};
