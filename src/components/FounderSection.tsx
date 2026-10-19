import React from 'react';
import { Camera, Heart, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { FOUNDER_INFO } from '../data/agencyData';

interface FounderSectionProps {
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenBooking, onOpenGallery }) => {
  const specialties = [
    { title: 'Wedding Shoots & Filmmaking', desc: 'Cinematic storytelling capturing raw emotion, rituals, and royal ceremonies.' },
    { title: 'Pre-Wedding Romance', desc: 'Tailored destination sessions from Rajasthan forts to coastal beaches.' },
    { title: 'Maternity & Baby Shoots', desc: 'Gentle, timeless portraits celebrating motherhood and newborn life.' },
    { title: 'Fashion Photography', desc: 'High-concept lighting, couture styling, and meticulous aesthetic polish.' },
    { title: 'Corporate Photography', desc: 'Executive branding, commercial campaigns, and high-level conclaves.' },
  ];

  return (
    <section id="founder" className="w-full bg-[#3F2305] text-[#F5F5F5] py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF]/30 relative overflow-hidden font-sans">
      {/* Subtle ambient lighting with warm palette tones */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#DFD7BF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#F2EAD3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Pre-Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 pb-8 border-b border-[#DFD7BF]/20">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#DFD7BF] uppercase block mb-2 font-semibold">
              MEET THE ARTIST BEHIND MY PHOTO CLUB
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#F5F5F5]">
              About the Founder
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans tracking-wide text-[#F2EAD3] bg-[#2d1803]/90 px-4 py-2 rounded-full border border-[#DFD7BF]/30 self-start sm:self-auto font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#DFD7BF]" />
            <span>BASED IN DELHI · AVAILABLE WORLDWIDE</span>
          </div>
        </div>

        {/* Founder Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Small, High-Density Crisp Founder Photo Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-56 sm:w-64 relative group">
              {/* Elegant Accent Rim Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#DFD7BF]/40 via-[#F2EAD3]/20 to-[#3F2305] rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Small Founder Photo Container - Clean portrait */}
              <div className="relative aspect-[380/415] rounded-xl overflow-hidden bg-[#2d1803] border border-[#DFD7BF]/60 shadow-2xl">
                <img
                  src="/founder_cropped.png"
                  alt="Nagender Kumar - Professional Wedding Photographer in Delhi"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-102"
                  loading="eager"
                />
              </div>
            </div>

            {/* Handwritten Cursive Signature */}
            <div className="mt-5 text-center">
              <span className="font-['Alex_Brush'] text-4xl sm:text-5xl text-[#F2EAD3] block tracking-wide select-none">
                Nagender Kumar
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#DFD7BF] block mt-1 font-semibold">
                Founder · My Photo Club Delhi
              </span>
            </div>
          </div>

          {/* Right: Narrative Biography, Cursive Pull-Quote & Services (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cursive Lead Headline */}
            <div>
              <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-[#DFD7BF] block mb-1">
                A treat for best click...
              </span>
              <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light text-[#F5F5F5] leading-snug">
                Professional Wedding Photographer in Delhi & Filmmaker
              </h3>
            </div>

            {/* Exact Founder Message */}
            <div className="space-y-4 text-sm sm:text-base text-[#F5F5F5]/90 font-light leading-relaxed">
              <p>
                This is <span className="text-[#F2EAD3] font-semibold">Nagender Kumar</span> professional Wedding Photographer in Delhi. <span className="text-[#F2EAD3] font-medium">My Photo Club</span> is especially for wedding shoots and wedding filmmaking studios — like pre-wedding, maternity, Baby Shoot, Fashion photography, Corporate photography, etc.
              </p>

              <p>
                After all the photography adventures over the years with experience shooting in different venues and destinations, I offer a handful of photography services to meet all types of personal and business needs. The packages I provide are carefully planned so that your event goes off without a hitch!
              </p>

              {/* Highlighted Cursive Pull-Quote Block in warm palette */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#2d1803]/80 border-l-4 border-[#DFD7BF] my-4 shadow-lg border-y border-r border-[#DFD7BF]/20">
                <p className="font-['Caveat'] text-2xl sm:text-3xl text-[#F2EAD3] font-normal leading-snug">
                  "If you spend some time checking the photo galleries, you will get a grasp of my skill of bringing life into even the simplest of subjects. My effort goes into capturing the true nature of the animate or inanimate objects and then retouching the images to uncloak their inner aesthetic."
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#DFD7BF] font-semibold">
                    — Nagender Kumar, Lead Visionary
                  </span>
                  {onOpenGallery && (
                    <button
                      onClick={onOpenGallery}
                      className="text-xs font-sans tracking-wide text-[#DFD7BF] hover:text-[#F2EAD3] underline underline-offset-4 cursor-pointer font-medium"
                    >
                      Explore Photo Galleries →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Specialties & Core Offerings */}
            <div className="pt-2">
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#DFD7BF] uppercase block mb-3 font-semibold">
                SERVICES & EXPERTISE AT MY PHOTO CLUB
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialties.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-[#2d1803]/70 border border-[#DFD7BF]/25 hover:border-[#DFD7BF]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#F2EAD3] mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFD7BF] shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-[#F5F5F5]/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3 bg-[#F2EAD3] text-[#3F2305] hover:bg-[#DFD7BF] font-semibold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <span>Book Shoot with Nagender</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenGallery}
                className="w-full sm:w-auto px-6 py-3 bg-[#2d1803] hover:bg-[#3F2305] text-[#F2EAD3] border border-[#DFD7BF]/40 font-semibold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse Dedicated Galleries</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
