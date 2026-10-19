import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 10;
        return Math.min(100, prev + step);
      });
    }, 100);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded();
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onLoaded) onLoaded();
        }, 300);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F5F5] transition-opacity duration-500 ease-out font-sans cursor-pointer ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient warm glow in center */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#DFD7BF]/30 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Palette Logo */}
        <div className="mb-6 transform transition-transform duration-700 ease-out hover:scale-105">
          <img
            src="/logo-dark.png"
            alt="My Photo Club Logo"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain block drop-shadow-xs"
          />
        </div>

        {/* Cursive Tagline */}
        <span className="font-['Alex_Brush'] text-2xl sm:text-3xl text-[#3F2305] block mb-2 select-none">
          A treat for best click · by Nagender Kumar
        </span>

        <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-[#3F2305]/70 font-semibold mb-8">
          Wedding Photography & Filmmaking Studio · Delhi
        </p>

        {/* Minimalist Progress Bar in Palette */}
        <div className="w-48 sm:w-56 h-[2px] bg-[#DFD7BF] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#3F2305] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[9px] font-sans tracking-widest text-[#3F2305]/50 uppercase mt-3">
          Loading Visual Archive
        </span>
      </div>
    </div>
  );
};
