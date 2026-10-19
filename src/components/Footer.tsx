import React from 'react';
import { ArrowUp, MapPin, Heart } from 'lucide-react';
import { FireBackground } from './FireBackground';

interface FooterProps {
  onOpenJoin: () => void;
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenGallery }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full text-[#F5F5F5] pt-20 pb-16 px-6 sm:px-10 lg:px-14 border-t border-[#DFD7BF]/30 font-sans overflow-hidden">
      {/* Radiant Glowing Firelight Burning in the Background */}
      <FireBackground />

      {/* Translucent Blurry Glass Layer - Highly transparent, allowing the vivid firelight to shine through */}
      <div className="absolute inset-0 bg-[#060301]/30 backdrop-blur-xl pointer-events-none" />

      {/* Clean Editorial Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Brand Header Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-12 border-b border-[#DFD7BF]/20">
          <div className="space-y-3">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#DFD7BF] uppercase block font-semibold">
              MY PHOTO CLUB · DELHI
            </span>

            {/* Clean Backgroundless Palette Logo - Small but larger than header logo */}
            <img
              src="/logo-light.png"
              alt="My Photo Club Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain block hover:opacity-90 transition-opacity filter drop-shadow-md"
            />

            <p className="text-xs text-[#DFD7BF]/80 font-light">
              Directed by Nagender Kumar · Professional Wedding Photography & Filmmaking Studio
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right">
            {/* Elegant Cursive Thought */}
            <p className="font-['Alex_Brush'] text-3xl sm:text-4xl text-[#F2EAD3] leading-relaxed mb-2 drop-shadow-sm">
              Bringing life into even the simplest of subjects...
            </p>
            <p className="text-xs text-[#F5F5F5]/80 font-light leading-relaxed">
              Preserving real laughter, sacred vows, and destination grandeur across Udaipur, Jaipur, Goa, Delhi NCR, and international ceremonies.
            </p>
          </div>
        </div>

        {/* Clean Typographic Links Grid (No cylinders or capsules) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#DFD7BF]/20">
          {/* Col 1: Studio */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              STUDIO
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#F5F5F5]/80">
              <li>
                <a href="#studio" className="hover:text-[#F2EAD3] transition-colors">
                  Studio Philosophy
                </a>
              </li>
              <li>
                <a href="#founder" className="hover:text-[#F2EAD3] transition-colors">
                  About Nagender Kumar
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-[#F2EAD3] transition-colors">
                  Signature Stories
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenGallery}
                  className="hover:text-[#F2EAD3] transition-colors text-left uppercase cursor-pointer"
                >
                  Full Photo Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              EXPERTISE
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#F5F5F5]/80">
              <li>
                <a href="#services" className="hover:text-[#F2EAD3] transition-colors">
                  Royal Wedding Shoots
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F2EAD3] transition-colors">
                  Pre-Wedding Cinema
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F2EAD3] transition-colors">
                  Maternity & Baby Shoots
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F2EAD3] transition-colors">
                  Fashion & Commercial
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div className="space-y-3">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              DESTINATIONS
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#F5F5F5]/80">
              <li>Delhi NCR Farmhouses & Venues</li>
              <li>Udaipur & Lake Palaces</li>
              <li>Jaipur & Jodhpur Forts</li>
              <li>Goa Beachfront & Worldwide</li>
            </ul>
          </div>

          {/* Col 4: Consultation */}
          <div className="space-y-4">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] font-semibold block">
              COMMISSIONS
            </span>
            <p className="text-xs text-[#F5F5F5]/80 font-light leading-relaxed">
              Carefully planned packages so your celebration goes off without a hitch.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-sans uppercase tracking-wider transition-all duration-300 cursor-pointer font-semibold shadow-md active:scale-95"
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Quiet Editorial Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#DFD7BF]/80 font-medium">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MY PHOTO CLUB · BY NAGENDER KUMAR</span>
            <span>·</span>
            <span className="flex items-center gap-1 font-semibold text-[#F2EAD3]">
              <Heart className="w-3 h-3 fill-[#F2EAD3] text-[#F2EAD3]" /> A Treat For Best Click
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px] uppercase tracking-widest font-semibold text-[#DFD7BF]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
