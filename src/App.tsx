import React, { useState } from 'react';
import { HERO_PHOTOS, LANDSCAPE_WORKS } from './data/agencyData';
import { HeroPhoto, LandscapeWork } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FounderSection } from './components/FounderSection';
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
import { CheckCircle2, X } from 'lucide-react';

type AnyMediaItem = 
  | { type: 'portrait'; data: HeroPhoto }
  | { type: 'landscape'; data: LandscapeWork };

export default function App() {
  // Modal states
  const [selectedItem, setSelectedItem] = useState<AnyMediaItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [prefilledTalent, setPrefilledTalent] = useState<string>('');
  
  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleOpenBooking = () => {
    const bookElem = document.getElementById('book');
    if (bookElem) {
      bookElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
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

      {/* Top Bar Header with completely backgroundless palette logo */}
      <Header
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenBooking={handleOpenBooking}
        onOpenContact={handleOpenContact}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Hero Section with fluid silk animated background (zero cylinders/stripes) */}
      <HeroSection
        photos={HERO_PHOTOS}
        onSelectPhoto={(photo) => setSelectedItem({ type: 'portrait', data: photo })}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Founder Profile & Story: Nagender Kumar with small sharp cropped photo and cursive text */}
      <FounderSection 
        onOpenBooking={handleOpenBooking} 
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Landscape Stories Section: Real landscape photos from MPCDelhi/Landscape */}
      <LandscapeSection
        onSelectLandscape={(work) => setSelectedItem({ type: 'landscape', data: work })}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Studio Philosophy & Quantitative Metrics */}
      <StudioSection onOpenBooking={handleOpenBooking} />

      {/* Services & Carefully Planned Packages */}
      <ServicesSection onOpenBooking={handleOpenBooking} />

      {/* Interactive Project Scoping & Booking Engine */}
      <BookingSection
        initialTalentName={prefilledTalent}
        onSuccessNotice={showToast}
      />

      {/* Delhi Headquarters & Studio Hubs */}
      <ContactSection onSuccessNotice={showToast} />

      {/* Clean Redesigned Footer with Dark Transparent Fire Glow (zero cylinders/pill badges) */}
      <Footer
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Dedicated Gallery Page Modal (All 25 Landscapes + 9 Portraits) */}
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

      {/* Collaborative Team / Inquiries Drawer */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSuccessNotice={showToast}
      />

      {/* Floating Scroll-to-Top Button with Dynamic Circular Fill Progress */}
      <ScrollProgressButton />

      {/* Constant Mobile Quick Nav Bar with WhatsApp Action */}
      <MobileQuickNav
        onOpenBooking={handleOpenBooking}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />
    </div>
  );
}
