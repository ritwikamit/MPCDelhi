import React, { useEffect } from 'react';
import { HeroPhoto, LandscapeWork } from '../types';
import { X, ChevronLeft, ChevronRight, Calendar, Camera, MapPin } from 'lucide-react';

type AnyMediaItem = 
  | { type: 'portrait'; data: HeroPhoto }
  | { type: 'landscape'; data: LandscapeWork };

interface LightboxModalProps {
  item: AnyMediaItem | null;
  allItems: AnyMediaItem[];
  onClose: () => void;
  onSelectItem: (item: AnyMediaItem) => void;
  onOpenBooking: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  allItems,
  onClose,
  onSelectItem,
  onOpenBooking,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!item) return;
      const currentIndex = allItems.findIndex((it) => 
        (it.type === item.type && it.data.id === item.data.id)
      );
      if (currentIndex === -1) return;
      if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + allItems.length) % allItems.length;
        onSelectItem(allItems[prevIdx]);
      }
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % allItems.length;
        onSelectItem(allItems[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, allItems, onClose, onSelectItem]);

  if (!item) return null;

  const currentIndex = allItems.findIndex(
    (it) => it.type === item.type && it.data.id === item.data.id
  );
  const prevItem = allItems[(currentIndex - 1 + allItems.length) % allItems.length];
  const nextItem = allItems[(currentIndex + 1) % allItems.length];

  const title = item.data.title;
  const imageUrl = item.data.imageUrl;
  const cameraInfo = item.data.cameraInfo;
  const description = item.data.description;
  const location = item.data.location;
  const venue = item.type === 'landscape' ? item.data.venue : item.data.client;
  const category = item.type === 'landscape' ? item.data.category : item.data.discipline;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 font-sans"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#3F2305] text-[#F5F5F5] rounded-2xl border border-[#DFD7BF]/50 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/60 text-[#F5F5F5] hover:bg-black/90 transition-colors cursor-pointer"
          aria-label="Close inspection lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame (Left) */}
        <div className="relative md:w-3/5 h-[340px] sm:h-[440px] md:h-auto min-h-[380px] bg-black/80 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain max-h-[85vh]"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() => onSelectItem(prevItem)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectItem(nextItem)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter pill */}
          <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-[#3F2305]/85 backdrop-blur-xs rounded text-[10px] font-sans tracking-widest text-[#F2EAD3] uppercase font-semibold border border-[#DFD7BF]/30">
            {currentIndex + 1} / {allItems.length} · {item.type.toUpperCase()}
          </div>
        </div>

        {/* Details Side (Right) */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#3F2305]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] text-[#DFD7BF] uppercase mb-2 font-semibold">
                <span className="text-[#F2EAD3] font-semibold">{category}</span>
                <span>·</span>
                <span>CURATED ARCHIVE</span>
              </div>
              <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light tracking-tight text-[#F5F5F5] mb-1">
                {title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#DFD7BF] font-sans mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{venue} · {location}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F5F5]/85 font-light leading-relaxed">
              {description}
            </p>

            {/* Shoot Production Details */}
            <div className="space-y-3 pt-4 border-t border-[#DFD7BF]/20 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#DFD7BF]">
                <span className="text-[#DFD7BF]/70 font-medium">PHOTOGRAPHER:</span>
                <span className="text-[#F5F5F5] font-semibold">Nagender Kumar</span>
              </div>

              <div className="flex items-center gap-2 text-[#DFD7BF]">
                <span className="text-[#DFD7BF]/70 font-medium">STUDIO:</span>
                <span className="text-[#F5F5F5]">My Photo Club (Delhi)</span>
              </div>

              <div className="flex items-start gap-2 text-[#DFD7BF]">
                <Camera className="w-3.5 h-3.5 text-[#DFD7BF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#DFD7BF]/70 font-medium">EXIF / GEAR:</span>
                  <span className="text-[#F5F5F5]/90 block text-[11px] mt-0.5 font-normal">{cameraInfo}</span>
                </div>
              </div>
            </div>

            {/* Philosophy Note */}
            <div className="p-4 rounded-xl bg-[#2d1803] border border-[#DFD7BF]/30 space-y-2">
              <span className="font-['Alex_Brush'] text-2xl text-[#F2EAD3] block">
                Uncloaking the inner aesthetic
              </span>
              <p className="font-['Caveat'] text-lg text-[#F5F5F5]/90 leading-snug">
                "My effort goes into capturing the true nature of the animate or inanimate objects and then retouching the images to uncloak their inner aesthetic."
              </p>
              <span className="text-[10px] font-sans uppercase text-[#DFD7BF] block font-semibold tracking-wider">
                — Nagender Kumar, Lead Photographer
              </span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-6 border-t border-[#DFD7BF]/20 mt-6 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-[#DFD7BF] hover:text-[#F5F5F5] transition-colors cursor-pointer font-medium"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2.5 bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] font-semibold text-xs tracking-wider uppercase rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Style</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
