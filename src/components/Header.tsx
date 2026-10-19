import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Sparkles, BookOpen, Film, Image, Briefcase, Phone, Award } from 'lucide-react';

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

  // Primary necessary nav items visible in order
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
          ? 'bg-[#F5F5F5]/90 backdrop-blur-xl border-b border-[#DFD7BF] shadow-sm py-2.5 sm:py-3' 
          : 'bg-[#F5F5F5]/75 backdrop-blur-md border-b border-[#DFD7BF]/60 py-3.5 sm:py-4'
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
          Desktop Nav Menus with Live Nav Scroll Animation
          Order: HOME | FOUNDER | STORIES | SERVICES | CONTACT | MORE ▼
        */}
        <nav 
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1.5 xl:gap-2 p-1 rounded-full bg-[#DFD7BF]/30 border border-[#DFD7BF]/60 text-[11px] xl:text-[12px] font-medium tracking-[0.15em] uppercase text-[#3F2305]/80 relative"
        >
          {primaryNavItems.map((item) => {
            const isActive = 
              (currentPage === 'home' && activeNav === item.id) ||
              (currentPage === item.id);

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                  isActive
                    ? 'text-[#F5F5F5] shadow-xs'
                    : 'text-[#3F2305]/80 hover:text-[#3F2305] hover:bg-black/[0.03]'
                }`}
              >
                {/* Live Animated Background Pill */}
                {isActive && (
                  <span 
                    className="absolute inset-0 rounded-full bg-[#3F2305] -z-10 animate-in fade-in zoom-in-95 duration-200 shadow-sm"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DFD7BF] animate-pulse" />}
                </span>
              </button>
            );
          })}

          {/* "MORE" Dropdown Menu for Auxiliary Sections */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer font-semibold ${
                moreDropdownOpen || currentPage === 'studio'
                  ? 'bg-[#3F2305]/10 text-[#3F2305]'
                  : 'text-[#3F2305]/80 hover:text-[#3F2305] hover:bg-black/[0.03]'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-haspopup="true"
            >
              <span>MORE</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  moreDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Content */}
            {moreDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#F5F5F5]/95 backdrop-blur-2xl border border-[#DFD7BF] shadow-2xl py-3 px-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-widest text-[#3F2305]/50 font-bold border-b border-[#DFD7BF]/60 mb-1">
                  Additional Spaces
                </div>

                {/* Studio & Philosophy */}
                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    onNavigate('studio');
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs tracking-wider transition-colors cursor-pointer ${
                    currentPage === 'studio' 
                      ? 'bg-[#3F2305] text-[#F5F5F5] font-semibold' 
                      : 'text-[#3F2305] hover:bg-[#F2EAD3]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#DFD7BF] shrink-0" />
                  <div>
                    <div className="font-semibold">Studio & Philosophy</div>
                    <div className="text-[10px] opacity-75">3 Pillars of craftsmanship</div>
                  </div>
                </button>

                {/* Full Photo Archive */}
                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    if (onOpenGallery) onOpenGallery();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs tracking-wider text-[#3F2305] hover:bg-[#F2EAD3] transition-colors cursor-pointer"
                >
                  <Image className="w-4 h-4 text-[#DFD7BF] shrink-0" />
                  <div>
                    <div className="font-semibold">Full Photo Archive</div>
                    <div className="text-[10px] opacity-75">Complete wedding collections</div>
                  </div>
                </button>

                {/* Join the Team */}
                {onOpenJoin && (
                  <button
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      onOpenJoin();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs tracking-wider text-[#3F2305] hover:bg-[#F2EAD3] transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#DFD7BF] shrink-0" />
                    <div>
                      <div className="font-semibold">Join Our Team</div>
                      <div className="text-[10px] opacity-75">Careers & second shooter casting</div>
                    </div>
                  </button>
                )}

                {/* Book Consultation */}
                <div className="pt-2 mt-1 border-t border-[#DFD7BF]/60">
                  <button
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs tracking-wider bg-[#3F2305] text-[#F5F5F5] font-semibold hover:bg-[#3F2305]/90 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Book a Shoot</span>
                    <Phone className="w-3.5 h-3.5" />
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
        <div className="lg:hidden w-full bg-[#F5F5F5] border-b border-[#DFD7BF] px-6 py-6 space-y-6 animate-in fade-in duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Primary Necessary Navigation */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3F2305]/60 font-bold block mb-2">
              Primary Menus
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
                    <span className="w-2 h-2 rounded-full bg-[#DFD7BF]" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* More Menu (Additional Pages) */}
          <div className="space-y-1 pt-2 border-t border-[#DFD7BF]/60">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3F2305]/60 font-bold block mb-2">
              More Spaces
            </span>
            <div className="space-y-1 text-xs font-medium text-[#3F2305]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('studio');
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#3F2305]/70" />
                <span>Studio & Philosophy</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenGallery) onOpenGallery();
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] flex items-center gap-2.5"
              >
                <Image className="w-4 h-4 text-[#3F2305]/70" />
                <span>Full Photo Archive</span>
              </button>
              {onOpenJoin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoin();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#F2EAD3] flex items-center gap-2.5"
                >
                  <Briefcase className="w-4 h-4 text-[#3F2305]/70" />
                  <span>Join Our Team</span>
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
