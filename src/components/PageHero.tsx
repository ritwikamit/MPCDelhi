import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  landscapeImage: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  onBackToHome?: () => void;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  landscapeImage,
  badge,
  title,
  subtitle,
  description,
  onBackToHome,
  children,
}) => {
  return (
    <div className="relative w-full min-h-[58vh] sm:min-h-[68vh] flex items-center justify-center overflow-hidden bg-[#0d0704] text-[#F5F5F5] pt-14 pb-16 px-4 sm:px-10 lg:px-14">
      {/* 
        Distinct Landscape Background Image that Fades From Side Edges:
        Using CSS linear-gradient mask + horizontal side vignette gradients
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <div 
          className="w-full h-full relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 10%, black 22%, black 78%, rgba(0,0,0,0.4) 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 10%, black 22%, black 78%, rgba(0,0,0,0.4) 90%, transparent 100%)',
          }}
        >
          <img
            src={landscapeImage}
            alt={title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Lucid Edge Fade Overlays (Left and Right Side Screens) */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-56 md:w-80 bg-gradient-to-r from-[#0d0704] via-[#0d0704]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-56 md:w-80 bg-gradient-to-l from-[#0d0704] via-[#0d0704]/90 to-transparent pointer-events-none" />

        {/* Top and Bottom Atmosphere Fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0d0704] via-[#0d0704]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0d0704] via-[#0d0704]/80 to-transparent pointer-events-none" />

        {/* Subtle Warm Amber Light Tint */}
        <div className="absolute inset-0 bg-[#3F2305]/20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Back Link if available */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#DFD7BF] hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all cursor-pointer group shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </button>
        )}

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#DFD7BF]/30 mb-5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#DFD7BF] animate-pulse" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#F2EAD3] font-semibold">
            {badge}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="font-['Urbanist'] text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5F5F5] mb-3 leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {title}
        </h1>

        {/* Subtitle if provided */}
        {subtitle && (
          <p className="font-['Alex_Brush'] text-2xl sm:text-3xl md:text-4xl text-[#F2EAD3] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {subtitle}
          </p>
        )}

        {/* Narrative Description */}
        <p className="max-w-2xl text-xs sm:text-sm md:text-base font-light text-[#F5F5F5]/85 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {description}
        </p>

        {/* Children (Action Buttons, Tags, etc.) */}
        {children && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
