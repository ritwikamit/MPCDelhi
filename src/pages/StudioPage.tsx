import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';

interface StudioPageProps {
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
  onBackToHome: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  onOpenBooking,
  onOpenGallery,
  onBackToHome,
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      title: 'Capturing the True Nature',
      tagline: 'Bringing life into even the simplest of subjects',
      description: 'My effort goes into capturing the true nature of animate or inanimate objects. We do not manufacture artificial poses; we honor genuine human moments, family warmth, and the spontaneous magic of your celebration.',
      highlights: ['Candid emotional anticipation', 'Vedic ritual reverence', 'Unstaged laughter & family glances'],
    },
    {
      num: '02',
      title: 'Uncloaking Inner Aesthetics',
      tagline: 'Masterful color grading, natural skin tones & texture',
      description: 'Every image is individually developed with meticulous attention to detail. We enhance the rich colors of handcrafted lehengas, jewelry textures, and atmospheric ambient venue lighting while keeping skin tones authentic.',
      highlights: ['Custom Delhi palace LUTs', 'Micro-texture fabric preservation', 'True-to-life non-destructive development'],
    },
    {
      num: '03',
      title: 'Carefully Planned Execution',
      tagline: 'Flawless timelines so your celebration goes off without a hitch',
      description: 'With over a decade of experience shooting in diverse venues and destination palaces across India and globally, every timeline, multi-camera angle, and lighting rig is planned with military precision.',
      highlights: ['Dual-redundant multi-camera crews', 'Weather & golden hour contingency', 'Instant on-site data backup vaults'],
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F5] text-[#3F2305] font-sans">
      {/* 
        Distinct Landscape Hero Background Fading from Side Edges
        Uses expansive sunset palace landscape photograph
      */}
      <PageHero
        landscapeImage="/MPCDelhi/Landscape/imgi_132_2000_63b414456e98f.jpg"
        badge="STUDIO ETHOS · DELHI NCR"
        title="The Studio Philosophy"
        subtitle="Where true emotion meets timeless imagery..."
        description="Preserving real laughter, sacred vows, and destination grandeur across Delhi NCR, Udaipur, Jaipur, and global destinations with unmatched aesthetic reverence."
        onBackToHome={onBackToHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
        >
          <span>Schedule Studio Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </PageHero>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 py-20 sm:py-28">
        {/* Core Pillars */}
        <div className="pb-20 border-b border-[#DFD7BF]">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
              OUR THREE GUIDING PILLARS
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#3F2305]">
              Artistry Rooted in Authentic Emotion
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.num}
                className="p-8 rounded-3xl bg-[#F2EAD3]/60 border border-[#DFD7BF] hover:border-[#3F2305] hover:bg-[#F2EAD3] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="font-['Urbanist'] text-4xl font-light text-[#3F2305]/60 block">
                    {pillar.num}
                  </span>
                  <h3 className="font-['Urbanist'] text-2xl font-medium text-[#3F2305]">
                    {pillar.title}
                  </h3>
                  <p className="font-['Alex_Brush'] text-xl text-[#3F2305]">
                    {pillar.tagline}
                  </p>
                  <p className="text-xs sm:text-sm font-light text-[#3F2305]/85 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#DFD7BF]/60 space-y-2">
                  {pillar.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-[#3F2305]/90 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3F2305] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delhi Studio Visit & Consultation */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#3F2305]/70">
                <MapPin className="w-3.5 h-3.5 text-[#3F2305]" />
                <span>VISIT OUR DELHI CREATIVE SUITE</span>
              </div>
              <h3 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#3F2305]">
                Experience Physical Albums & 4K Cinema Screenings
              </h3>
              <p className="text-sm font-light text-[#3F2305]/85 leading-relaxed">
                We welcome couples and families to our private preview lounge in Delhi NCR. Review genuine leather and archival silk wedding albums, preview uncut 4K footage on calibrated screens, and design a customized timeline with director Nagender Kumar over artisan coffee.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-[#3F2305] text-[#F5F5F5] hover:bg-[#3F2305]/90 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Reserve Studio Preview Slot</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-[#3F2305] text-[#F5F5F5] border border-[#DFD7BF]/30 shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#DFD7BF]">
                  STUDIO HIGHLIGHTS
                </span>
                <h4 className="font-['Urbanist'] text-2xl font-light">
                  My Photo Club Delhi
                </h4>
              </div>

              <div className="space-y-4 text-xs font-light text-[#F5F5F5]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#DFD7BF] shrink-0 mt-0.5" />
                  <span>Serving South Delhi, Chhatarpur Farmhouses, Gurugram, Noida, and International Palace Destinations</span>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-4 h-4 text-[#DFD7BF] shrink-0 mt-0.5" />
                  <span>Private by-appointment consultations with director Nagender Kumar</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#DFD7BF] shrink-0 mt-0.5" />
                  <span>Full archival album material samples & color proofing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
