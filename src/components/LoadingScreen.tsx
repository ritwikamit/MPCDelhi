import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show splash briefly, then fade out smoothly
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1100);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading application"
      className={`fixed inset-0 w-screen h-screen z-[99999] flex flex-col items-center justify-center bg-[#F5F5F5] transition-opacity duration-500 ease-out font-sans select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle warm center glow */}
      <div className="absolute w-80 h-80 rounded-full bg-[#DFD7BF]/30 blur-3xl pointer-events-none animate-pulse" />

      {/* Pure, Simple Content: Just Logo and Loading... */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Brand Logo */}
        <div className="mb-6 transform transition-transform duration-700 hover:scale-105">
          <img
            src="/logo-dark.png"
            alt="My Photo Club Logo"
            className="h-16 sm:h-20 w-auto object-contain block drop-shadow-xs"
          />
        </div>

        {/* Loading text with animated pulse */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#3F2305]/75 font-semibold">
          <span>Loading</span>
          <span className="inline-flex">
            <span className="animate-[bounce_1s_infinite_100ms]">.</span>
            <span className="animate-[bounce_1s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1s_infinite_300ms]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};
