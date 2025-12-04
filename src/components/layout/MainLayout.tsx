import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { PageType } from '../../types';

interface MainLayoutProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  children: ReactNode;
}

export function MainLayout({ currentPage, onPageChange, children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
