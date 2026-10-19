import React, { useState } from 'react';
import { LandscapeWork } from '../types';
import { LANDSCAPE_WORKS } from '../data/agencyData';
import { MapPin, ArrowRight, Eye } from 'lucide-react';

interface LandscapeSectionProps {
  onSelectLandscape: (work: LandscapeWork) => void;
  onOpenGallery: () => void;
}

export const LandscapeSection: React.FC<LandscapeSectionProps> = ({
  onSelectLandscape,
  onOpenGallery,
}) => {
  const [filter, setFilter] = useState<'All' | 'Weddings' | 'Pre-Wedding' | 'Destination'>('All');

  const featuredWorks = LANDSCAPE_WORKS.filter((work) => {
    if (filter === 'All') return work.featuredOnHome || true;
    return work.category === filter;
  }).slice(0, 8); // Top 8 featured stories on landing page

  return (
    <section id="stories" className="w-full bg-[#F2EAD3]/40 py-20 sm:py-32 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-3 font-semibold">
              SIGNATURE LANDSCAPES & DESTINATION WEDDINGS
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#3F2305]">
              Moments & Palaces
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Tabs in Palette */}
            <div className="flex items-center gap-1.5 p-1 bg-[#DFD7BF]/50 rounded-full border border-[#DFD7BF]">
              {(['All', 'Weddings', 'Pre-Wedding', 'Destination'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    filter === cat
                      ? 'bg-[#3F2305] text-[#F5F5F5] shadow-xs'
                      : 'text-[#3F2305] hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Link to Dedicated Full Gallery */}
            <button
              onClick={onOpenGallery}
              className="px-5 py-2 bg-[#3F2305] text-[#F5F5F5] hover:bg-[#3F2305]/90 rounded-full text-xs font-sans tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-xs font-semibold"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Landscape Grid (Masonry & Bento Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {featuredWorks.map((work, idx) => {
            const colSpan =
              idx === 0 || idx === 3
                ? 'lg:col-span-8 aspect-[16/9]'
                : idx === 1 || idx === 2
                ? 'lg:col-span-4 aspect-[4/3]'
                : 'lg:col-span-6 aspect-[16/10]';

            return (
              <div
                key={work.id}
                onClick={() => onSelectLandscape(work)}
                className={`relative group rounded-2xl overflow-hidden bg-[#3F2305] border border-[#DFD7BF] shadow-md cursor-pointer transition-all duration-300 hover:shadow-2xl ${colSpan}`}
              >
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Badge at top right */}
                <div className="absolute top-4 right-4 flex items-center px-3 py-1 bg-[#3F2305]/80 backdrop-blur-md rounded-full text-[10px] font-sans tracking-wider uppercase text-[#F2EAD3] border border-[#DFD7BF]/30 font-semibold">
                  <span>{work.category}</span>
                </div>

                {/* Information at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-[#DFD7BF] font-sans mb-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F2EAD3] shrink-0" />
                    <span>{work.venue} · {work.location}</span>
                  </div>

                  <h3 className="font-['Urbanist'] text-lg sm:text-2xl font-light text-[#F5F5F5] leading-tight mb-2 group-hover:text-[#F2EAD3] transition-colors">
                    {work.title}
                  </h3>

                  <p className="text-xs text-[#F5F5F5]/80 line-clamp-2 font-light leading-relaxed mb-3">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[11px] font-sans text-[#DFD7BF]">
                    <span className="truncate max-w-[70%] font-normal">{work.cameraInfo}</span>
                    <span className="flex items-center gap-1 text-[#F2EAD3] group-hover:translate-x-1 transition-transform font-medium">
                      <Eye className="w-3.5 h-3.5" /> View Story
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner to Open Full Gallery */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#3F2305] text-[#F5F5F5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#DFD7BF]/40">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-[#F2EAD3] block">
              Experience the full visual archive...
            </span>
            <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light text-[#F5F5F5]">
              Explore the Complete Destination & Wedding Archive
            </h3>
            <p className="text-xs text-[#DFD7BF] max-w-xl font-light">
              Browse the curated portfolio of royal wedding ceremonies, heritage fort celebrations, and bridal monographs with high-resolution inspection.
            </p>
          </div>

          <button
            onClick={onOpenGallery}
            className="px-8 py-3.5 bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] rounded-full text-xs font-sans uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shrink-0 transition-transform hover:scale-105 shadow-lg"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
