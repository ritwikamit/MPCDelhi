import React from 'react';
import { PageHero } from '../components/PageHero';
import { 
  Camera, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle 
} from 'lucide-react';

interface FounderPageProps {
  onOpenBooking: () => void;
  onOpenGallery?: () => void;
  onBackToHome: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({
  onOpenBooking,
  onOpenGallery,
  onBackToHome,
}) => {
  const specialties = [
    { 
      title: 'Royal Wedding Shoots & Cinema', 
      desc: 'Cinematic storytelling capturing raw emotion, Vedic rituals, royal barat processions, and family bonds.',
      badge: 'Signature Craft'
    },
    { 
      title: 'Pre-Wedding Destination Romance', 
      desc: 'Tailored destination sessions from Rajasthan lake forts to serene coastal beaches and heritage monuments.',
      badge: 'Bespoke'
    },
    { 
      title: 'Fine-Art Maternity & Baby Shoots', 
      desc: 'Gentle, timeless portraits celebrating motherhood, newborn purity, and growing family legacies.',
      badge: 'Studio & Daylight'
    },
    { 
      title: 'Couture Fashion & Editorial', 
      desc: 'High-concept lighting, couture styling, and meticulous skin-tone-preserving aesthetic polish.',
      badge: 'Commercial'
    },
    { 
      title: 'Corporate & Brand Storytelling', 
      desc: 'Executive portraits, brand lookbooks, and high-level corporate conclaves covered with editorial prestige.',
      badge: 'Executive'
    },
  ];

  const gearItems = [
    { category: 'Flagship Cameras', items: 'Sony Alpha 1 (50.1 MP 8K), Canon EOS R5, Fujifilm GFX 100 II Medium Format' },
    { category: 'Master Glass', items: 'Sony G Master 85mm f/1.4, 70-200mm f/2.8 II, Canon RF 50mm f/1.2L, 15-35mm f/2.8L' },
    { category: 'Lighting & Modifiers', items: 'Profoto B10X Plus High-Speed Synchro, Westcott Softboxes, Warm Atmospheric Gels' },
    { category: 'Stabilization & Cinema', items: 'DJI Ronin RS3 Pro, Tilta Nucleus Follow Focus, 10-Bit 4:2:2 DCI 4K Color Grading' },
  ];

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hi Nagender Kumar, I came across your founder page on My Photo Club and would love to consult with you directly for an upcoming wedding/shoot!'
  )}`;

  return (
    <div className="w-full bg-[#F5F5F5] text-[#3F2305] font-sans">
      {/* 
        Distinct Landscape Hero Background Fading from Side Edges
        Uses royal destination palace photograph
      */}
      <PageHero
        landscapeImage="/MPCDelhi/Landscape/imgi_121_2000_63b413e412a9f.jpg"
        badge="THE VISIONARY & FOUNDER"
        title="Nagender Kumar"
        subtitle="Bringing life into even the simplest of subjects..."
        description="Director and Lead Photographer at My Photo Club. Master of authentic bridal emotions, heritage palace ceremonies, and timeless fine-art portraiture based in Delhi NCR."
        onBackToHome={onBackToHome}
      >
        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-full bg-[#F2EAD3] hover:bg-[#DFD7BF] text-[#3F2305] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
        >
          <span>Book Personal Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {onOpenGallery && (
          <button
            onClick={onOpenGallery}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F5F5] border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md"
          >
            <span>View Full Archive</span>
          </button>
        )}
      </PageHero>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 py-20 sm:py-28">
        {/* Profile Card & Genesis Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#DFD7BF]">
          {/* Left Column: Founder Photo & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-sm relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#3F2305] via-[#DFD7BF] to-[#F2EAD3] rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-[#2d1803] border-2 border-[#DFD7BF] shadow-2xl aspect-[380/420]">
                <img
                  src="/founder_cropped.png"
                  alt="Nagender Kumar - Lead Wedding Photographer Delhi"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                />
                
                {/* Photo Caption Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#DFD7BF] font-semibold block">
                      FOUNDER & LEAD ARTIST
                    </span>
                    <span className="text-xs font-medium">Nagender Kumar</span>
                  </div>
                  <span className="text-[10px] text-white/70 font-mono">EST. 2014</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="w-full max-w-sm mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F2EAD3]/60 border border-[#DFD7BF] text-center">
                <span className="font-['Urbanist'] text-3xl font-light text-[#3F2305] block">10+</span>
                <span className="text-[10px] uppercase tracking-wider text-[#3F2305]/75 font-semibold">Years of Craft</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F2EAD3]/60 border border-[#DFD7BF] text-center">
                <span className="font-['Urbanist'] text-3xl font-light text-[#3F2305] block">500+</span>
                <span className="text-[10px] uppercase tracking-wider text-[#3F2305]/75 font-semibold">Weddings Covered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Manifesto & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#3F2305]/70 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#3F2305]" />
                <span>BASED IN DELHI NCR · WORLDWIDE DESTINATIONS</span>
              </div>
              <h2 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#3F2305] leading-tight">
                "A wedding is not a set of staged poses; it is an unrepeatable family heirloom."
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base font-light text-[#3F2305]/85 leading-relaxed">
              <p>
                My effort goes into capturing the true nature of animate or inanimate objects. Whether documenting a sacred pheras ceremony in Delhi, an opulent sunset barat at Jagmandir Island Palace in Udaipur, or quiet moments of contemplation as the bride dons her family Kundan necklace, I strive to make the viewer feel the heartbeat of that exact second.
              </p>
              <p>
                I established <strong className="font-semibold text-[#3F2305]">My Photo Club</strong> with a distinct philosophy: no rushed templates, no synthetic color filters, and no mechanical staging. Every couple and family receives our undivided creative direction, multi-cam synchronization, and artisanal retouching.
              </p>
            </div>

            {/* Philosophy Pillars in Warm Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#DFD7BF]/30 border border-[#DFD7BF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#3F2305]">
                  <Sparkles className="w-4 h-4" />
                  <span>Sublime Color Science</span>
                </div>
                <p className="text-xs font-light text-[#3F2305]/80 leading-relaxed">
                  Natural skin tones preserved while elevating rich wedding vermilions, raw silks, and jewel-toned lehengas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#DFD7BF]/30 border border-[#DFD7BF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#3F2305]">
                  <Compass className="w-4 h-4" />
                  <span>Unobtrusive Precision</span>
                </div>
                <p className="text-xs font-light text-[#3F2305]/80 leading-relaxed">
                  Shooting from the heart of the action without obstructing sacred Vedic rituals or personal family moments.
                </p>
              </div>
            </div>

            {/* Direct Connect Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Nagender on WhatsApp</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#3F2305] hover:bg-[#3F2305]/90 text-[#F5F5F5] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-95 inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule a Studio Meeting</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Specialties Grid */}
        <div className="py-20 border-b border-[#DFD7BF]">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
              SIGNATURE SPECIALTIES
            </span>
            <h3 className="font-['Urbanist'] text-3xl sm:text-4xl font-light tracking-tight text-[#3F2305]">
              Core Disciplines Directed by Nagender Kumar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#F2EAD3]/50 border border-[#DFD7BF] hover:border-[#3F2305] hover:bg-[#F2EAD3] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-[#3F2305]/60">0{idx + 1}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#3F2305] bg-[#DFD7BF]/70 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-['Urbanist'] text-xl font-medium text-[#3F2305] mb-2 group-hover:text-black">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-light text-[#3F2305]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#DFD7BF]/50 flex items-center justify-between text-xs font-semibold text-[#3F2305]">
                  <span>Explore this format</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Master's Camera Bag & Cinema Rig */}
        <div className="py-20">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#3F2305]/70 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>THE CRAFT & GEAR</span>
            </div>
            <h3 className="font-['Urbanist'] text-3xl sm:text-4xl font-light tracking-tight text-[#3F2305]">
              World-Class Equipment for Flawless Reliability
            </h3>
            <p className="text-sm font-light text-[#3F2305]/80 mt-2">
              Every shoot is safeguarded with dual redundant memory card recording, calibrated prime lenses, and bespoke atmospheric lighting to guarantee failure-free coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gearItems.map((gear, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#DFD7BF] shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3F2305]">
                  <ShieldCheck className="w-4 h-4 text-[#3F2305]" />
                  <span>{gear.category}</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-[#3F2305]/90 leading-relaxed">
                  {gear.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
