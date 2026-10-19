import React, { useState, useEffect } from 'react';
import { HERO_PHOTOS, LANDSCAPE_WORKS } from './data/agencyData';
import { HeroPhoto, LandscapeWork } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LandscapeSection } from './components/LandscapeSection';
import { StudioSection } from './components/StudioSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { DedicatedGalleryModal } from './components/DedicatedGalleryModal';
import { JoinModal } from './components/JoinModal';
import { ScrollProgressButton } from './components/ScrollProgressButton';
import { LoadingScreen } from './components/LoadingScreen';
import { MobileQuickNav } from './components/MobileQuickNav';
import { FounderPage } from './pages/FounderPage';
import { ServicesPage } from './pages/ServicesPage';
import { StudioPage } from './pages/StudioPage';
import { CheckCircle2, X } from 'lucide-react';

type AnyMediaItem = 
  | { type: 'portrait'; data: HeroPhoto }
  | { type: 'landscape'; data: LandscapeWork };

export type PageId = 'home' | 'founder' | 'services' | 'studio';

export default function App() {
  // Page routing state
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Modal states
  const [selectedItem, setSelectedItem] = useState<AnyMediaItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [prefilledTalent, setPrefilledTalent] = useState<string>('');
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and synchronize with browser hash history
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'founder') {
        setCurrentPage('founder');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'services-page' || hash === 'packages') {
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'studio-page' || hash === 'philosophy') {
        setCurrentPage('studio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'stories' || hash === 'services' || hash === 'contact' || hash === 'book') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setCurrentPage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId, sectionId?: string) => {
    if (page === currentPage) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${sectionId}`);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', sectionId ? `#${sectionId}` : '#');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.history.pushState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleOpenBooking = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const bookElem = document.getElementById('book');
        if (bookElem) bookElem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const bookElem = document.getElementById('book');
      if (bookElem) bookElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const contactElem = document.getElementById('contact');
        if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build unified item list for Lightbox navigation
  const allMediaItems: AnyMediaItem[] = [
    ...HERO_PHOTOS.map((p) => ({ type: 'portrait' as const, data: p })),
    ...LANDSCAPE_WORKS.map((w) => ({ type: 'landscape' as const, data: w })),
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#3F2305] selection:bg-[#3F2305] selection:text-[#F5F5F5] flex flex-col font-sans pb-16 sm:pb-0">
      {/* Editorial Loading Screen with Palette Logo */}
      <LoadingScreen />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#3F2305] text-[#F5F5F5] px-5 py-3 rounded-xl border border-[#DFD7BF]/60 shadow-2xl flex items-center gap-3 text-xs max-w-md animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#DFD7BF] shrink-0" />
          <span className="flex-1 font-light">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#DFD7BF] hover:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 
        Top Bar Header:
        - Prioritized necessary menus (HOME, FOUNDER, STORIES, SERVICES, CONTACT)
        - "MORE" dropdown for remaining sections
        - Live animated nav indicator on scroll
      */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section with extra wavy maroon bar and zero white bleed */}
            <HeroSection
              photos={HERO_PHOTOS}
              onSelectPhoto={(photo) => setSelectedItem({ type: 'portrait', data: photo })}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />

            {/* Note: Founder Section is moved to its own dedicated page (FounderPage) */}

            {/* Signature Landscape Stories & Destination Nuptials */}
            <LandscapeSection
              onSelectLandscape={(work) => setSelectedItem({ type: 'landscape', data: work })}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />

            {/* Studio Teaser Section */}
            <StudioSection onOpenBooking={handleOpenBooking} />

            {/* Services & Packages Showcase */}
            <ServicesSection onOpenBooking={handleOpenBooking} />

            {/* Booking & Scoping Section */}
            <BookingSection
              initialTalentName={prefilledTalent}
              onSuccessNotice={showToast}
            />

            {/* Delhi Studio Headquarters & Contact Form */}
            <ContactSection onSuccessNotice={showToast} />
          </div>
        )}

        {/* Dedicated Founder Page */}
        {currentPage === 'founder' && (
          <div className="animate-in fade-in duration-300">
            <FounderPage
              onOpenBooking={handleOpenBooking}
              onOpenGallery={() => setIsGalleryOpen(true)}
              onBackToHome={() => handleNavigate('home', 'home')}
            />
          </div>
        )}

        {/* Dedicated Services Page */}
        {currentPage === 'services' && (
          <div className="animate-in fade-in duration-300">
            <ServicesPage
              onOpenBooking={handleOpenBooking}
              onBackToHome={() => handleNavigate('home', 'home')}
            />
          </div>
        )}

        {/* Dedicated Studio & Philosophy Page */}
        {currentPage === 'studio' && (
          <div className="animate-in fade-in duration-300">
            <StudioPage
              onOpenBooking={handleOpenBooking}
              onOpenGallery={() => setIsGalleryOpen(true)}
              onBackToHome={() => handleNavigate('home', 'home')}
            />
          </div>
        )}
      </main>

      {/* Dark Lucid Transparent Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Dedicated Full Photo Gallery Modal */}
      <DedicatedGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPhoto={(photo) => setSelectedItem({ type: 'portrait', data: photo })}
        onSelectLandscape={(work) => setSelectedItem({ type: 'landscape', data: work })}
        onOpenBooking={() => {
          setIsGalleryOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Full-Screen High-Resolution Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        allItems={allMediaItems}
        onClose={() => setSelectedItem(null)}
        onSelectItem={(item) => setSelectedItem(item)}
        onOpenBooking={() => {
          setSelectedItem(null);
          handleOpenBooking();
        }}
      />

      {/* Collaborative Team Inquiries Drawer */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSuccessNotice={showToast}
      />

      {/* Floating Scroll-to-Top Button */}
      <ScrollProgressButton />

      {/* Mobile Quick Navigation Bar */}
      <MobileQuickNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />
    </div>
  );
}
