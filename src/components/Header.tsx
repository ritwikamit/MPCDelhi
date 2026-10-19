import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'founder' | 'services' | 'studio';
  onNavigate: (page: 'home' | 'founder' | 'services' | 'studio', sectionId?: string) => void;
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
  onOpenJoin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenGallery,
  onOpenJoin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('home');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live scroll listener: tracks header blur transition & active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // If we are on a dedicated subpage, active nav is that page
      if (currentPage !== 'home') {
        setActiveNav(currentPage);
        return;
      }

      // If on Home page, track live scroll sections
      const sections = ['contact', 'services', 'stories', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Primary necessary nav items in clean minimal order
  const primaryNavItems = [
    { id: 'home', label: 'HOME', action: () => onNavigate('home', 'home') },
    { id: 'founder', label: 'FOUNDER', action: () => onNavigate('founder') },
    { id: 'stories', label: 'STORIES', action: () => onNavigate('home', 'stories') },
    { id: 'services', label: 'SERVICES', action: () => onNavigate('services') },
    { id: 'contact', label: 'CONTACT', action: () => onNavigate('home', 'contact') },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F5F5F5]/90 backdrop-blur-xl border-b border-[#DFD7BF] shadow-xs py-3' 
          : 'bg-[#F5F5F5]/80 backdrop-blur-md border-b border-[#DFD7BF]/60 py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-10 lg:px-14 flex items-center justify-between gap-4 sm:gap-8">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home', 'home')}
          className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity cursor-pointer group text-left"
          aria-label="My Photo Club Home"
        >
          <img
            src="/logo-dark.png"
            alt="My Photo Club - A Treat For Best Click"
            className="h-9 sm:h-10 w-auto object-contain block drop-shadow-xs transition-transform duration-300 group-hover:scale-102"
          />
        </button>

        {/* 
          Minimal Editorial Desktop Navigation with Live Scroll Indicator
          Order: HOME · FOUNDER · STORIES · SERVICES · CONTACT · MORE
        */}
        <nav 
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] xl:text-[12px] font-medium tracking-[0.16em] uppercase text-[#3F2305]/70"
        >
          {primaryNavItems.map((item) => {
            const isActive = 
              (currentPage === 'home' && activeNav === item.id) ||
              (currentPage === item.id);

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`relative py-1 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#3F2305] font-bold'
                    : 'hover:text-[#3F2305]'
                }`}
              >
                <span>{item.label}</span>
                {/* Minimal animated underline indicator */}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#3F2305] rounded-full animate-in fade-in zoom-in-75 duration-200" />
                )}
              </button>
            );
          })}

          {/* Minimal "MORE" Dropdown (Zero Icons, Pure Typography) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 py-1 transition-all duration-300 cursor-pointer ${
                moreDropdownOpen || currentPage === 'studio'
                  ? 'text-[#3F2305] font-bold'
                  : 'hover:text-[#3F2305]'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-haspopup="true"
            >
              <span>MORE</span>
              <ChevronDown 
                className={`w-3 h-3 transition-transform duration-200 ${
                  moreDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
              {currentPage === 'studio' && (
                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#3F2305] rounded-full" />
              )}
            </button>

            {/* Minimal Dropdown Panel without icons */}
            {moreDropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-xl bg-[#F5F5F5]/95 backdrop-blur-2xl border border-[#DFD7BF] shadow-xl py-2 px-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                {/* Studio & Philosophy */}
                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    onNavigate('studio');
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-[11px] tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                    currentPage === 'studio'
                      ? 'bg-[#3F2305] text-[#F5F5F5] font-semibold'
                      : 'text-[#3F2305]/85 hover:bg-[#DFD7BF]/40 hover:text-[#3F2305]'
                  }`}
                >
                  Studio & Philosophy
                </button>

                {/* Full Photo Archive */}
                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    if (onOpenGallery) onOpenGallery();
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-[11px] tracking-[0.14em] uppercase text-[#3F2305]/85 hover:bg-[#DFD7BF]/40 hover:text-[#3F2305] transition-colors cursor-pointer"
                >
                  Full Photo Archive
                </button>

                {/* Join the Team */}
                {onOpenJoin && (
                  <button
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      onOpenJoin();
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg text-[11px] tracking-[0.14em] uppercase text-[#3F2305]/85 hover:bg-[#DFD7BF]/40 hover:text-[#3F2305] transition-colors cursor-pointer"
                  >
                    Join Our Team
                  </button>
                )}

                {/* Book Consultation */}
                <div className="pt-1.5 mt-1 border-t border-[#DFD7BF]/60">
                  <button
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg text-[11px] tracking-[0.14em] uppercase font-semibold text-[#3F2305] hover:bg-[#3F2305] hover:text-[#F5F5F5] transition-all cursor-pointer"
                  >
                    Book A Shoot
                  </button>
                </div>
              </div>
            )}
          </div>
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
        <div className="lg:hidden w-full bg-[#F5F5F5] border-b border-[#DFD7BF] px-6 py-6 space-y-6 animate-in fade-in duration-200 shadow-xl max-h-[85vh] overflow-y-auto font-sans">
          {/* Primary Navigation */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3F2305]/50 font-bold block mb-2">
              Menu
            </span>
            <nav className="flex flex-col gap-1 text-xs font-semibold tracking-wider uppercase text-[#3F2305]">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    item.action();
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center justify-between ${
                    (currentPage === 'home' && activeNav === item.id) || (currentPage === item.id)
                      ? 'bg-[#3F2305] text-[#F5F5F5]'
                      : 'hover:bg-[#F2EAD3]'
                  }`}
                >
                  <span>{item.label}</span>
                  {((currentPage === 'home' && activeNav === item.id) || (currentPage === item.id)) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFD7BF]" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* More Spaces (Icon-free minimal list) */}
          <div className="space-y-1 pt-2 border-t border-[#DFD7BF]/60">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3F2305]/50 font-bold block mb-2">
              More
            </span>
            <div className="space-y-1 text-xs font-medium text-[#3F2305]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('studio');
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] uppercase tracking-wider text-[11px]"
              >
                Studio & Philosophy
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenGallery) onOpenGallery();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] uppercase tracking-wider text-[11px]"
              >
                Full Photo Archive
              </button>
              {onOpenJoin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoin();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] uppercase tracking-wider text-[11px]"
                >
                  Join Our Team
                </button>
              )}
            </div>
          </div>

          {/* Direct CTA Buttons */}
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
