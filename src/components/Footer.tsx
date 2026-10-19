import React from 'react';
import { ArrowUp, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { FireBackground } from './FireBackground';

interface FooterProps {
  onNavigate?: (page: 'home' | 'founder' | 'services' | 'studio', sectionId?: string) => void;
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
  onOpenJoin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenGallery,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'founder' | 'services' | 'studio', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full text-[#F5F5F5] pt-24 pb-16 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF]/20 font-sans overflow-hidden bg-[#080503]/80 backdrop-blur-xl">
      {/* 
        Transparent Dark Themed Footer with Radiant Living Fire Glow:
        FireBackground renders freely without any blocking dark overlays.
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FireBackground />
      </div>

      {/* Subtle top transition vignette to blend naturally into the page */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#080503]/60 to-transparent pointer-events-none z-0" />

      {/* Content Container (Layered above the living fire background) */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Brand & Mission Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#DFD7BF] uppercase font-semibold">
              <Sparkles className="w-3 h-3 text-[#DFD7BF]" />
              <span>MY PHOTO CLUB · DELHI NCR</span>
            </div>

            {/* Lucid Logo Display */}
            <div className="flex items-center gap-3">
              <img
                src="/logo-light.png"
                alt="My Photo Club Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain block hover:opacity-90 transition-opacity filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#DFD7BF]/90 font-light leading-relaxed">
              Directed by <strong className="text-[#F2EAD3] font-medium">Nagender Kumar</strong>. Uncompromising bridal portraiture, cinematic royal wedding films, and bespoke destination stories.
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right space-y-3">
            <p className="font-['Alex_Brush'] text-3xl sm:text-4xl text-[#F2EAD3] leading-relaxed drop-shadow-md">
              Bringing life into even the simplest of subjects...
            </p>
            <p className="text-xs text-[#F5F5F5]/80 font-light leading-relaxed">
              Serving Delhi NCR, Udaipur, Jaipur, Jodhpur, Goa, and worldwide palace destinations with complete dedication to authentic human moments.
            </p>
          </div>
        </div>

        {/* Lucid Transparent Cards Grid with Fire Glow shimmering through */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          {/* Card 1: Explore Spaces */}
          <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#DFD7BF]/40 hover:bg-black/50 transition-all duration-300 space-y-4 shadow-lg">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              EXPLORE
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#F5F5F5]/85">
              <li>
                <button
                  onClick={() => handleNav('home', 'home')}
                  className="hover:text-[#F2EAD3] transition-colors cursor-pointer text-left"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('founder')}
                  className="hover:text-[#F2EAD3] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>About Founder Nagender Kumar</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#DFD7BF]/20 text-[#DFD7BF]">Dedicated</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F2EAD3] transition-colors cursor-pointer text-left"
                >
                  Services & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('studio')}
                  className="hover:text-[#F2EAD3] transition-colors cursor-pointer text-left"
                >
                  The Studio & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGallery}
                  className="hover:text-[#F2EAD3] transition-colors cursor-pointer text-left uppercase"
                >
                  Full Photo Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Card 2: Specialties */}
          <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#DFD7BF]/40 hover:bg-black/50 transition-all duration-300 space-y-4 shadow-lg">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              SPECIALTIES
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#F5F5F5]/85">
              <li>Royal Wedding Ceremonies & Pheras</li>
              <li>Destination Pre-Wedding Cinema</li>
              <li>Fine-Art Maternity & Baby Shoots</li>
              <li>Couture Fashion & Bridal Lookbooks</li>
              <li>Corporate Leadership & Conclaves</li>
            </ul>
          </div>

          {/* Card 3: Destinations */}
          <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#DFD7BF]/40 hover:bg-black/50 transition-all duration-300 space-y-4 shadow-lg">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              DESTINATIONS
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#F5F5F5]/85">
              <li>Delhi NCR Farmhouses & Ballrooms</li>
              <li>Udaipur Lake Palaces & Jagmandir</li>
              <li>Jaipur & Jodhpur Heritage Forts</li>
              <li>Goa Beachfront & Worldwide Nuptials</li>
            </ul>
          </div>

          {/* Card 4: Commissions */}
          <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-[#DFD7BF]/30 hover:border-[#DFD7BF]/60 hover:bg-black/50 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
                COMMISSIONS
              </span>
              <p className="text-xs text-[#F5F5F5]/85 font-light leading-relaxed">
                We accept a limited number of destination and Delhi commissions annually to ensure devoted attention to each family.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-4 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer font-semibold shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Book Shoot / Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Editorial Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-[#DFD7BF]/80 font-medium">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} MY PHOTO CLUB · BY NAGENDER KUMAR</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1 font-semibold text-[#F2EAD3]">
              <Heart className="w-3 h-3 fill-[#F2EAD3] text-[#F2EAD3]" /> A Treat For Best Click
            </span>
            <span className="hidden sm:inline">·</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 hover:text-white transition-all cursor-pointer text-[11px] uppercase tracking-widest font-semibold text-[#DFD7BF] active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
