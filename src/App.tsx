import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { MarketDataPage } from './components/pages/MarketDataPage';
import { TransactionDataPage } from './components/pages/TransactionDataPage';
import { LongTermTagsPage } from './components/pages/LongTermTagsPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { APP_CONFIG } from './constants/navigation';
import type { PageType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(APP_CONFIG.defaultPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'market-data':
        return <MarketDataPage />;
      case 'transaction-data':
        return <TransactionDataPage />;
      case 'long-term-tags':
        return <LongTermTagsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <MarketDataPage />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}