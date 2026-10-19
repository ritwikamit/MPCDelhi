import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Camera } from 'lucide-react';

interface StudioSectionProps {
  onOpenBooking: () => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ onOpenBooking }) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      title: 'Capturing the True Nature',
      excerpt: 'Bringing life into even the simplest of subjects — preserving real laughter, raw tears, and sacred vows.',
      details: 'My effort goes into capturing the true nature of animate or inanimate objects. We do not manufacture artificial poses; we honor genuine human moments, family warmth, and the spontaneous magic of your celebration.',
    },
    {
      num: '02',
      title: 'Uncloaking Inner Aesthetics',
      excerpt: 'Masterful color grading, natural skin tones, and texture-preserving fine-art retouching.',
      details: 'Every image is individually developed with meticulous attention to detail. We enhance the rich colors of handcrafted lehengas, jewelry textures, and atmospheric ambient venue lighting while keeping skin tones authentic.',
    },
    {
      num: '03',
      title: 'Carefully Planned Execution',
      excerpt: 'Comprehensive packages designed so your wedding and event goes off without a hitch.',
      details: 'With over a decade of experience shooting in diverse venues and destination palaces across India and globally, every timeline, multi-camera angle, and lighting rig is planned with military precision.',
    },
  ];

  return (
    <section id="studio" className="w-full bg-[#F5F5F5] text-[#3F2305] py-20 sm:py-28 px-4 sm:px-10 lg:px-14 font-sans border-t border-[#DFD7BF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#DFD7BF]">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-3 font-semibold">
              THE STUDIO PHILOSOPHY · MY PHOTO CLUB
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight max-w-2xl text-[#3F2305]">
              Where true emotion meets timeless imagery.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm font-light text-[#3F2305]/80 leading-relaxed">
              Based in Delhi, My Photo Club is especially for wedding shoots, wedding filmmaking, pre-weddings, maternity, fashion, and corporate stories — preserving your legacy with unmatched visual elegance.
            </p>
          </div>
        </div>

        {/* Quantified Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-12 sm:py-16 border-b border-[#DFD7BF]">
          <div>
            <div className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-[#3F2305] tabular-nums mb-1">
              500+
            </div>
            <div className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#3F2305]/70 font-semibold">
              Weddings & Events Covered
            </div>
          </div>
          <div>
            <div className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-[#3F2305] tabular-nums mb-1">
              12+
            </div>
            <div className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#3F2305]/70 font-semibold">
              Years of Experience
            </div>
          </div>
          <div>
            <div className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-[#3F2305] tabular-nums mb-1">
              100%
            </div>
            <div className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#3F2305]/70 font-semibold">
              Carefully Planned Delivery
            </div>
          </div>
          <div>
            <div className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-[#3F2305] tabular-nums mb-1">
              34+
            </div>
            <div className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#3F2305]/70 font-semibold">
              Curated Masterworks
            </div>
          </div>
        </div>

        {/* 3 Pillars Editorial Accordion */}
        <div className="py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#3F2305]/70 font-semibold">
              THE THREE ARTISTIC PILLARS
            </span>
            <button
              onClick={onOpenBooking}
              className="text-xs font-sans tracking-wide text-[#3F2305] hover:opacity-75 flex items-center gap-1 cursor-pointer font-semibold underline underline-offset-4"
            >
              <span>Commission A Shoot</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.num}
                onClick={() => setActivePillar(idx)}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activePillar === idx
                    ? 'bg-[#F2EAD3] border-[#DFD7BF] shadow-lg'
                    : 'bg-[#F5F5F5] border-[#DFD7BF] hover:bg-[#F2EAD3]/50'
                }`}
              >
                <div>
                  <div className="text-[12px] font-sans text-[#3F2305]/60 mb-4 sm:mb-6 font-bold">
                    /{pillar.num}
                  </div>
                  <h3 className="font-['Urbanist'] text-xl sm:text-2xl font-light text-[#3F2305] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3F2305]/80 font-light leading-relaxed mb-4">
                    {pillar.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DFD7BF]">
                  <p className="text-xs text-[#3F2305]/70 font-light leading-relaxed">
                    {pillar.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
