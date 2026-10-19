import React from 'react';
import { HeroPhoto } from '../types';
import { PhotoRibbon } from './PhotoRibbon';
import { HeroBackground } from './HeroBackground';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  photos: HeroPhoto[];
  onSelectPhoto: (photo: HeroPhoto) => void;
  onOpenGallery?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  photos,
  onSelectPhoto,
}) => {
  return (
    <section 
      id="home"
      className="relative w-full min-h-[calc(100svh-70px)] sm:min-h-[calc(100vh-80px)] flex flex-col justify-between pt-4 sm:pt-6 pb-6 sm:pb-10 overflow-hidden bg-gradient-to-r from-[#690A06] via-[#DFD7BF]/30 to-[#F5F5F5]"
    >
      {/* Pristine Animated 60FPS Fluted Wave Background with Zero Distortion */}
      <HeroBackground />

      {/* Subtle softening scrim to ensure perfect text legibility while retaining the rich pleated texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-[#F5F5F5]/25 pointer-events-none" />

      {/* Top Split: Left Manifesto Text (BOX REMOVED - Pure Editorial Typography) & Right "WHERE CREATIVITY" Headline */}
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pt-1 sm:pt-6">
        {/* Top Left Manifesto Copy - Box container completely removed, highly visible with warm palette & shadows */}
        <div className="max-w-[320px] sm:max-w-[380px] md:max-w-[440px] animate-in fade-in slide-in-from-left-4 duration-500">
          <span className="font-['Alex_Brush'] text-3xl sm:text-4xl md:text-[2.65rem] text-[#F2EAD3] block mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] tracking-wide leading-tight select-none">
            A treat for best click · by Nagender Kumar
          </span>
          <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.08em] uppercase leading-[1.5] text-[#F5F5F5] font-sans drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            AT MY PHOTO CLUB, WE'RE MORE THAN JUST A CREATIVE STUDIO; WE'RE DEDICATED TO EMPOWERING CELEBRATIONS THROUGH UNCOMPROMISING EDITORIAL MASTERY.
          </p>
          <div className="mt-3 h-[1.5px] w-16 bg-gradient-to-r from-[#DFD7BF] to-transparent" />
        </div>

        {/* Top Right Headline: "WHERE CREATIVITY" */}
        <div className="text-right animate-in fade-in slide-in-from-right-4 duration-500">
          <h1 className="font-['Urbanist'] font-light tracking-[-0.04em] text-[#3F2305] leading-[0.88] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] drop-shadow-xs">
            <span className="block">WHERE</span>
            <span className="block">CREATIVITY</span>
          </h1>
        </div>
      </div>

      {/* Center: The Constantly Moving Photo Loop (Real MPCDelhi Portrait Photos) */}
      <div className="relative z-10 w-full my-auto py-2 sm:py-0">
        <PhotoRibbon photos={photos} onSelectPhoto={onSelectPhoto} />
      </div>

      {/* Bottom Split: Left "SCROLL" & Right "MEETS OPPORTUNITY" Headline */}
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-14 flex items-end justify-between gap-4 sm:gap-6 pb-1 sm:pb-2">
        {/* Bottom Left "SCROLL" indicator */}
        <div className="pb-1 sm:pb-2">
          <a
            href="#stories"
            className="group flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#3F2305] bg-[#F5F5F5]/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#DFD7BF]/70 transition-all font-sans hover:bg-[#F2EAD3]"
          >
            <span>SCROLL</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
          </a>
        </div>

        {/* Bottom Right Headline: "MEETS OPPORTUNITY" */}
        <div className="text-right animate-in fade-in slide-in-from-right-4 duration-700">
          <h2 className="font-['Urbanist'] font-light tracking-[-0.04em] text-[#3F2305] leading-[0.88] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] drop-shadow-xs">
            <span className="block">MEETS</span>
            <span className="block">OPPORTUNITY</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
