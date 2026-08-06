/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MagazineProvider, useMagazine } from './context/MagazineContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { CategoryHubPage } from './pages/CategoryHubPage';
import { JournalPage } from './pages/JournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { AdvertisePage } from './pages/AdvertisePage';
import { NewsletterPage } from './pages/NewsletterPage';
import { ContactPage } from './pages/ContactPage';
import { SubscribePage } from './pages/SubscribePage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPath } = useMagazine();

  const renderRoute = () => {
    if (currentPath === '/admin') return <AdminPage />;

    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    if (currentPath === '/automotive') return <CategoryHubPage categorySlug="automotive" />;
    if (currentPath === '/aviation-travel') return <CategoryHubPage categorySlug="aviation-travel" />;
    if (currentPath === '/watches-jewelry') return <CategoryHubPage categorySlug="watches-jewelry" />;
    if (currentPath === '/fashion-style') return <CategoryHubPage categorySlug="fashion-style" />;
    if (currentPath === '/hospitality-hotels') return <CategoryHubPage categorySlug="hospitality-hotels" />;
    if (currentPath === '/fine-dining-spirits') return <CategoryHubPage categorySlug="fine-dining-spirits" />;
    if (currentPath === '/business-entrepreneurs') return <CategoryHubPage categorySlug="business-entrepreneurs" />;
    if (currentPath === '/real-estate-home-design') return <CategoryHubPage categorySlug="real-estate-home-design" />;

    if (currentPath === '/journal') return <JournalPage initialCategorySlug="all" />;
    if (currentPath.startsWith('/journal/')) {
      const catSlug = currentPath.replace('/journal/', '');
      return <JournalPage initialCategorySlug={catSlug} />;
    }

    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      return <ArticleDetailPage articleSlug={slug} />;
    }

    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/advertise') return <AdvertisePage />;
    if (currentPath === '/newsletter') return <NewsletterPage />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/subscribe') return <SubscribePage />;

    // Fallback to Home
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717] selection:bg-[#c9a227] selection:text-white">
      <Header />
      <main className="flex-grow">
        {renderRoute()}
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal />
      <SavedArticlesDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <MagazineProvider>
      <AppContent />
    </MagazineProvider>
  );
}
