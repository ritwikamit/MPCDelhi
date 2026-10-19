import React from 'react';
import { Home, Image, User, Calendar } from 'lucide-react';

interface MobileQuickNavProps {
  currentPage: 'home' | 'founder' | 'services' | 'studio';
  onNavigate: (page: 'home' | 'founder' | 'services' | 'studio', sectionId?: string) => void;
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
}

export const MobileQuickNav: React.FC<MobileQuickNavProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hi Nagender Kumar, I would like to inquire about a wedding or photography shoot with My Photo Club!'
  )}`;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#F5F5F5]/95 backdrop-blur-xl border-t border-[#DFD7BF] px-3 py-2 flex items-center justify-around shadow-2xl font-sans"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Home */}
      <button
        onClick={() => onNavigate('home', 'home')}
        className={`flex flex-col items-center gap-1 active:scale-95 transition-transform p-1.5 cursor-pointer ${
          currentPage === 'home' ? 'text-[#3F2305] font-bold' : 'text-[#3F2305]/70'
        }`}
        aria-label="Go to Home"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] tracking-wider uppercase">Home</span>
      </button>

      {/* Stories / Gallery */}
      <button
        onClick={() => onNavigate('home', 'stories')}
        className="flex flex-col items-center gap-1 text-[#3F2305]/70 hover:text-[#3F2305] active:scale-95 transition-transform p-1.5 cursor-pointer"
        aria-label="View Stories"
      >
        <Image className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider uppercase">Stories</span>
      </button>

      {/* WhatsApp Quick Action (Center Highlight) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center -mt-5 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 ring-4 ring-[#F5F5F5] group-hover:scale-105 active:scale-95 transition-transform">
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.201-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.3.301-.501.1-.201.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.232-.244-.588-.492-.508-.676-.517-.175-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.029-1.053 2.508 0 1.48 1.078 2.909 1.229 3.11.15.2 2.121 3.238 5.138 4.542.718.311 1.278.497 1.716.637.721.23 1.377.198 1.896.12.578-.088 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.94.557 3.754 1.522 5.29L2 22l4.856-1.516c1.478.887 3.208 1.402 5.184 1.402 5.524 0 10.012-4.488 10.012-10.012C22.052 6.488 17.564 2 12.04 2zm0 18.243c-1.67 0-3.218-.494-4.526-1.348l-.325-.209-3.08.962.986-2.996-.231-.341c-.96-1.417-1.474-3.093-1.474-4.839 0-4.57 3.719-8.289 8.289-8.289 4.57 0 8.289 3.719 8.289 8.289 0 4.57-3.719 8.289-8.289 8.289z" />
          </svg>
        </div>
        <span className="text-[9px] font-bold tracking-wider uppercase text-[#25D366] mt-0.5">
          WhatsApp
        </span>
      </a>

      {/* Dedicated Founder Page */}
      <button
        onClick={() => onNavigate('founder')}
        className={`flex flex-col items-center gap-1 active:scale-95 transition-transform p-1.5 cursor-pointer ${
          currentPage === 'founder' ? 'text-[#3F2305] font-bold' : 'text-[#3F2305]/70'
        }`}
        aria-label="About Founder"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] tracking-wider uppercase">Founder</span>
      </button>

      {/* Book */}
      <button
        onClick={onOpenBooking}
        className="flex flex-col items-center gap-1 text-[#3F2305]/70 hover:text-[#3F2305] active:scale-95 transition-transform p-1.5 cursor-pointer"
        aria-label="Book Shoot"
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider uppercase">Book</span>
      </button>
    </nav>
  );
};
