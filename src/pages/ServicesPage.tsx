import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { AGENCY_SERVICES } from '../data/agencyData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Camera, 
  ChevronDown 
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: () => void;
  onBackToHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onBackToHome,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const deliverables = [
    { title: '4K Cinematic Teaser & Film', desc: 'Hand-edited 3–5 min trailer plus full 40–60 min documentary film with synchronized audio.' },
    { title: 'Signature Color-Graded Stills', desc: 'Every photo individually retouched with our custom Delhi palace LUTs preserving authentic skin tones.' },
    { title: 'Handcrafted Coffee Table Album', desc: 'Imported archival silk paper with metallic foil stamping and lay-flat binding.' },
    { title: 'Private Cloud Gallery & RAW Vault', desc: 'Instant password-protected link for family downloads across India and abroad.' },
  ];

  return (
    <div className="w-full bg-[#F5F5F5] text-[#3F2305] font-sans">
      {/* 
        Distinct Landscape Hero Background Fading from Side Edges
        Uses royal wedding mandap landscape photograph
      */}
      <PageHero
        landscapeImage="/MPCDelhi/Landscape/imgi_124_2000_63b4144437367.jpg"
        badge="CAPABILITIES & INVESTMENT"
        title="Services & Packages"
        subtitle="Uncompromising mastery for every royal celebration"
        description="Carefully planned wedding photography and cinematic filmmaking packages. Backed by redundant equipment, military-grade timeline coordination, and prompt delivery."
        onBackToHome={onBackToHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
        >
          <span>Request Custom Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </PageHero>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 py-20 sm:py-28">
        {/* Accordion Package List */}
        <div className="space-y-6 pb-20 border-b border-[#DFD7BF]">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
              BESPOKE COVERAGE OPTIONS
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#3F2305]">
              Tailored Tiers for Every Vision
            </h2>
          </div>

          <div className="space-y-4">
            {AGENCY_SERVICES.map((service, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={service.number}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#3F2305] text-[#F5F5F5] border-[#DFD7BF]/60 shadow-xl'
                      : 'bg-[#F2EAD3]/60 text-[#3F2305] border-[#DFD7BF] hover:border-[#3F2305]/60 hover:bg-[#F2EAD3]'
                  }`}
                >
                  {/* Header Button */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="w-full text-left px-6 sm:px-8 py-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className={`font-mono text-sm font-bold tracking-wider ${isExpanded ? 'text-[#DFD7BF]' : 'text-[#3F2305]'}`}>
                        {service.number}
                      </span>
                      <div>
                        <h3 className={`font-['Urbanist'] text-xl sm:text-2xl font-light tracking-tight mb-1 ${isExpanded ? 'text-[#F5F5F5]' : 'text-[#3F2305]'}`}>
                          {service.title}
                        </h3>
                        <p className={`text-xs sm:text-sm font-light ${isExpanded ? 'text-[#F5F5F5]/75' : 'text-[#3F2305]/75'}`}>
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase ${isExpanded ? 'bg-white/10 text-[#DFD7BF]' : 'bg-[#DFD7BF]/60 text-[#3F2305]'}`}>
                        {service.deliverableTimeline}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-[#DFD7BF]' : 'text-[#3F2305]'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10 animate-in fade-in duration-300 space-y-6">
                      <p className="text-sm font-light leading-relaxed text-[#F5F5F5]/90 max-w-3xl">
                        {service.fullDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F5]/85">
                            <CheckCircle2 className="w-4 h-4 text-[#DFD7BF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-[#DFD7BF] font-mono">
                          <Clock className="w-4 h-4" />
                          <span>Delivery: {service.deliverableTimeline}</span>
                        </div>
                        <button
                          onClick={onOpenBooking}
                          className="px-6 py-2.5 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
                        >
                          <span>Reserve This Package</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Deliverables Guarantee */}
        <div className="py-20">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
              THE MY PHOTO CLUB STANDARD
            </span>
            <h3 className="font-['Urbanist'] text-3xl sm:text-4xl font-light tracking-tight text-[#3F2305]">
              Guaranteed In Every Commission
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((del, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#F2EAD3]/60 border border-[#DFD7BF] space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#3F2305] text-[#F5F5F5] flex items-center justify-center font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <h4 className="font-['Urbanist'] text-lg font-medium text-[#3F2305]">
                  {del.title}
                </h4>
                <p className="text-xs font-light text-[#3F2305]/80 leading-relaxed">
                  {del.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
