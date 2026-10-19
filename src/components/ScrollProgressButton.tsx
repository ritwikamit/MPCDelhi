import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressButton: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      // Visible once scrolled more than 120px
      setIsVisible(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle calculations
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-20 right-4 sm:bottom-7 sm:right-7 z-40 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative group w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-[#F5F5F5]/95 backdrop-blur-md rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#DFD7BF] hover:scale-105 cursor-pointer active:scale-95"
      >
        {/* Animated Circular Progress Border Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 46 46"
        >
          {/* Subtle Background Track in palette #DFD7BF */}
          <circle
            cx="23"
            cy="23"
            r={radius}
            stroke="#DFD7BF"
            strokeWidth="2.5"
            fill="transparent"
          />

          {/* Filling Border that tracks page scroll dynamically in #3F2305 */}
          <circle
            cx="23"
            cy="23"
            r={radius}
            stroke="#3F2305"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 150ms ease-out',
            }}
          />
        </svg>

        {/* Center Up Arrow in #3F2305 */}
        <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#3F2305] transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
