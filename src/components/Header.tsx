import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenJoin: () => void;
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenGallery?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenGallery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F5F5]/95 backdrop-blur-md transition-colors duration-200 border-b border-[#DFD7BF] shadow-xs">
      <div className="w-full px-4 sm:px-10 lg:px-14 py-3.5 sm:py-4 flex items-center justify-between gap-6 sm:gap-8">
        {/* Brand Logo - Completely Backgroundless */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity"
        >
          <img
            src="/logo-dark.png"
            alt="My Photo Club - A Treat For Best Click"
            className="h-10 sm:h-11 w-auto object-contain block drop-shadow-xs"
          />
        </a>

        {/* Minimalist Nav Links in #3F2305 */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[12px] font-medium tracking-[0.15em] uppercase text-[#3F2305]/80">
          <a
            href="#studio"
            className="hover:text-[#3F2305] transition-colors hover:underline underline-offset-8"
          >
            STUDIO
          </a>
          <a
            href="#founder"
            className="hover:text-[#3F2305] transition-colors hover:underline underline-offset-8"
          >
            FOUNDER
          </a>
          <a
            href="#stories"
            className="hover:text-[#3F2305] transition-colors hover:underline underline-offset-8"
          >
            STORIES
          </a>
          <a
            href="#services"
            className="hover:text-[#3F2305] transition-colors hover:underline underline-offset-8"
          >
            SERVICES
          </a>
          <a
            href="#contact"
            className="hover:text-[#3F2305] transition-colors hover:underline underline-offset-8"
          >
            CONTACT
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 text-xs tracking-wider shrink-0 font-medium">
          <button
            onClick={onOpenGallery}
            className="px-4 py-2 rounded-full border border-[#DFD7BF] hover:border-[#3F2305] text-[#3F2305] bg-[#F2EAD3]/60 hover:bg-[#F2EAD3] transition-all text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
          >
            FULL GALLERY
          </button>
          <button
            onClick={onOpenBooking}
            className="px-4.5 py-2 rounded-full bg-[#3F2305] text-[#F5F5F5] hover:bg-[#3F2305]/90 transition-all text-[11px] uppercase tracking-wider font-semibold cursor-pointer shadow-xs active:scale-95"
          >
            BOOK SHOOT
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3F2305] hover:text-[#3F2305]/70 focus:outline-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#F5F5F5] border-b border-[#DFD7BF] px-6 py-6 space-y-5 animate-in fade-in duration-200 shadow-xl">
          <nav className="flex flex-col gap-4 text-xs font-semibold tracking-wider uppercase text-[#3F2305]">
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-black border-b border-[#DFD7BF]/60"
            >
              STUDIO
            </a>
            <a
              href="#founder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-black border-b border-[#DFD7BF]/60"
            >
              FOUNDER
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-black border-b border-[#DFD7BF]/60"
            >
              STORIES
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-black border-b border-[#DFD7BF]/60"
            >
              SERVICES
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-black border-b border-[#DFD7BF]/60"
            >
              CONTACT
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenGallery) onOpenGallery();
              }}
              className="w-full py-2.5 text-center text-xs uppercase tracking-wider rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] border border-[#DFD7BF] font-semibold cursor-pointer"
            >
              Full Gallery
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs uppercase tracking-wider rounded-full bg-[#3F2305] text-[#F5F5F5] font-semibold cursor-pointer"
            >
              Book Shoot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
