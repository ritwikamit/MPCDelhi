import React, { useState, useMemo } from 'react';
import { HeroPhoto, LandscapeWork } from '../types';
import { HERO_PHOTOS, LANDSCAPE_WORKS } from '../data/agencyData';
import { X, Search, Maximize2, MapPin, ArrowLeft } from 'lucide-react';

interface DedicatedGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: HeroPhoto) => void;
  onSelectLandscape: (work: LandscapeWork) => void;
  onOpenBooking: () => void;
}

export const DedicatedGalleryModal: React.FC<DedicatedGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  onSelectLandscape,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Landscape' | 'Portrait' | 'Weddings' | 'Pre-Wedding' | 'Destination'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine items into unified gallery collection
  const allItems = useMemo(() => {
    const landscapes = LANDSCAPE_WORKS.map((w) => ({
      type: 'landscape' as const,
      id: w.id,
      title: w.title,
      category: w.category,
      location: w.location,
      venue: w.venue,
      imageUrl: w.imageUrl,
      cameraInfo: w.cameraInfo,
      raw: w,
    }));

    const portraits = HERO_PHOTOS.map((p) => ({
      type: 'portrait' as const,
      id: p.id,
      title: p.title,
      category: 'Portrait' as const,
      location: p.location,
      venue: p.client,
      imageUrl: p.imageUrl,
      cameraInfo: p.cameraInfo,
      raw: p,
    }));

    return [...landscapes, ...portraits];
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category filter
      if (activeTab === 'Landscape' && item.type !== 'landscape') return false;
      if (activeTab === 'Portrait' && item.type !== 'portrait') return false;
      if (activeTab === 'Weddings' && item.category !== 'Weddings') return false;
      if (activeTab === 'Pre-Wedding' && item.category !== 'Pre-Wedding') return false;
      if (activeTab === 'Destination' && item.category !== 'Destination') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.venue.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allItems, activeTab, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F5F5] overflow-y-auto animate-in fade-in duration-200 font-sans">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#F5F5F5]/95 backdrop-blur-md border-b border-[#DFD7BF] px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAD3] text-[#3F2305] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Landing Page</span>
          </button>

          <div className="h-6 w-[1px] bg-[#DFD7BF] hidden sm:block" />

          <div>
            <h1 className="font-['Urbanist'] text-lg sm:text-xl font-medium text-[#3F2305] tracking-tight">
              My Photo Club — Full Photography Archive
            </h1>
            <span className="text-[10px] font-sans text-[#3F2305]/70 uppercase tracking-widest hidden md:block font-medium">
              Photographed & Curated by Nagender Kumar · Delhi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 bg-[#3F2305] hover:bg-[#3F2305]/90 text-[#F5F5F5] rounded-full text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer font-semibold shadow-xs"
          >
            Book Shoot
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAD3] text-[#3F2305] transition-colors cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10">
        {/* Banner with Cursive Note */}
        <div className="mb-10 pb-8 border-b border-[#DFD7BF]">
          <span className="font-['Alex_Brush'] text-4xl sm:text-5xl text-[#3F2305] block mb-2">
            Bringing life into even the simplest of subjects...
          </span>
          <p className="font-['Urbanist'] text-2xl sm:text-3xl font-light text-[#3F2305] max-w-3xl leading-snug">
            Welcome to the complete dedicated photography archive featuring destination landscapes and royal portraits.
          </p>
          <p className="text-xs text-[#3F2305]/80 font-sans mt-2 font-normal">
            Captured across Delhi NCR, Udaipur, Jaipur, Jodhpur, Neemrana, Goa, and global destination venues.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F2EAD3] rounded-lg overflow-x-auto no-scrollbar border border-[#DFD7BF]">
            {(['All', 'Landscape', 'Portrait', 'Weddings', 'Pre-Wedding', 'Destination'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#3F2305] text-[#F5F5F5] shadow-xs'
                    : 'text-[#3F2305] hover:text-black'
                }`}
              >
                {tab === 'All'
                  ? `All Works (${allItems.length})`
                  : tab === 'Landscape'
                  ? `Landscapes (${LANDSCAPE_WORKS.length})`
                  : tab === 'Portrait'
                  ? `Portraits (${HERO_PHOTOS.length})`
                  : tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#3F2305]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by venue, city, ceremony..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-[#DFD7BF] text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F2305]/60 hover:text-[#3F2305] text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-sans text-[#3F2305]/70 mb-6 pb-2 border-b border-[#DFD7BF]/60 font-medium">
          <span>Showing {filteredItems.length} Photographs</span>
          <span className="hidden sm:inline">Click any photograph for high-resolution inspection</span>
        </div>

        {/* The Grid: Responsive Multi-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'landscape') {
                  onSelectLandscape(item.raw as LandscapeWork);
                } else {
                  onSelectPhoto(item.raw as HeroPhoto);
                }
              }}
              className="group relative rounded-xl overflow-hidden bg-[#3F2305] border border-[#DFD7BF] shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className={`w-full overflow-hidden relative ${item.type === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/10]'}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#3F2305]/80 backdrop-blur-xs rounded-full text-[10px] font-sans tracking-wider uppercase text-[#F2EAD3] border border-[#DFD7BF]/30 font-semibold">
                      {item.category}
                    </span>
                    <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-xs font-sans text-neutral-300">
                    <p className="truncate font-normal">{item.cameraInfo}</p>
                  </div>
                </div>

                {/* Badge showing type */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#3F2305]/70 backdrop-blur-xs rounded text-[9px] font-sans text-[#F2EAD3] uppercase tracking-widest border border-[#DFD7BF]/30 group-hover:opacity-0 transition-opacity font-semibold">
                  {item.type}
                </div>
              </div>

              {/* Caption Area */}
              <div className="p-4 bg-[#F5F5F5] flex flex-col justify-between flex-1 border-t border-[#DFD7BF]">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#3F2305]/70 mb-1 font-medium">
                    <MapPin className="w-3 h-3 text-[#3F2305] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <h4 className="font-['Urbanist'] text-base font-medium text-[#3F2305] leading-snug group-hover:underline transition-colors">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-[#DFD7BF]/60 flex items-center justify-between text-[11px] font-sans text-[#3F2305]/80">
                  <span className="truncate max-w-[70%]">{item.venue}</span>
                  <span className="text-[#3F2305] font-semibold group-hover:underline">Inspect →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[#3F2305]/70 text-sm font-sans mb-4">No photographs found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
              className="px-5 py-2 bg-[#3F2305] text-[#F5F5F5] rounded-full text-xs font-sans uppercase tracking-wider font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Booking CTA within Dedicated Gallery */}
        <div className="mt-16 p-8 rounded-2xl bg-[#3F2305] text-[#F5F5F5] border border-[#DFD7BF]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="font-['Alex_Brush'] text-3xl text-[#F2EAD3] block mb-1">
              Like what you see?
            </span>
            <h3 className="font-['Urbanist'] text-2xl font-light text-[#F5F5F5]">
              Book Nagender Kumar for Your Wedding or Event
            </h3>
            <p className="text-xs text-[#F5F5F5]/80 font-light">
              Customized packages planned carefully so your event goes off without a hitch.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-7 py-3 bg-[#F2EAD3] text-[#3F2305] hover:bg-[#DFD7BF] rounded-full text-xs font-sans uppercase tracking-wider font-semibold cursor-pointer shadow-lg shrink-0"
          >
            Request Booking Quote
          </button>
        </div>
      </div>
    </div>
  );
};
