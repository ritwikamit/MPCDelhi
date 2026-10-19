import React, { useState } from 'react';
import { AGENCY_SERVICES } from '../data/agencyData';
import { ChevronDown, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="services" className="w-full bg-[#3F2305] text-[#F5F5F5] py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF]/30 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-10 border-b border-[#DFD7BF]/20">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#DFD7BF] uppercase block mb-3 font-semibold">
              MY PHOTO CLUB CAPABILITIES · DELHI
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5]">
              Services & Packages
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#F5F5F5]/80 font-light leading-relaxed">
            From multi-day royal wedding celebrations and destination pre-weddings to intimate maternity portraits and commercial fashion lookbooks.
          </p>
        </div>

        {/* Numbered Human Editorial Services List */}
        <div className="space-y-4">
          {AGENCY_SERVICES.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={service.number}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#2d1803] border-[#DFD7BF]/60 shadow-xl'
                    : 'bg-[#2d1803]/60 border-[#DFD7BF]/25 hover:border-[#DFD7BF]/40'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                  className="w-full text-left px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-sans text-xs sm:text-sm text-[#DFD7BF] font-bold tracking-wider">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-['Urbanist'] text-lg sm:text-2xl font-light tracking-tight text-[#F5F5F5] mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F5F5F5]/75 font-light line-clamp-1 sm:line-clamp-none">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:inline-block text-[11px] font-sans text-[#DFD7BF] font-medium">
                      {service.leadTime}
                    </span>
                    <div className={`p-2 rounded-full bg-[#3F2305] text-[#F2EAD3] border border-[#DFD7BF]/30 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-[#DFD7BF]/20 text-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                      {/* Left: Detailed Overview */}
                      <div className="lg:col-span-7 space-y-5">
                        <p className="text-[#F5F5F5]/85 font-light leading-relaxed text-xs sm:text-sm">
                          {service.description}
                        </p>

                        <div>
                          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] block mb-3 font-semibold">
                            CORE DELIVERABLES
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.deliverables.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-xs text-[#F2EAD3] font-light">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#DFD7BF] shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Case Benchmark & Action */}
                      <div className="lg:col-span-5 flex flex-col justify-between bg-[#231201] p-5 sm:p-6 rounded-xl border border-[#DFD7BF]/30">
                        <div className="mb-6">
                          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#DFD7BF] block mb-2 font-semibold">
                            SIGNATURE ASSIGNMENT
                          </span>
                          <div className="text-sm font-semibold text-[#F5F5F5] font-['Urbanist'] mb-1">
                            {service.caseStudy.client}
                          </div>
                          <p className="text-xs text-[#F5F5F5]/70 font-light">
                            {service.caseStudy.outcome}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#DFD7BF]/20">
                          <div className="flex items-center gap-1.5 text-xs font-sans text-[#DFD7BF] font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Lead: {service.leadTime}</span>
                          </div>

                          <button
                            onClick={onOpenBooking}
                            className="px-5 py-2.5 bg-[#F2EAD3] text-[#3F2305] hover:bg-[#DFD7BF] text-xs font-semibold tracking-wider uppercase rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                          >
                            <span>Book Package</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
