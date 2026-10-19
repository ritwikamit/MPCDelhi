import React, { useState } from 'react';
import { TALENTS_ROSTER } from '../data/agencyData';
import { CheckCircle2, Send, ShieldCheck } from 'lucide-react';

interface BookingSectionProps {
  initialTalentName?: string;
  onSuccessNotice?: (message: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialTalentName = '',
  onSuccessNotice,
}) => {
  const [projectType, setProjectType] = useState<string>('Wedding Shoot & Filmmaking');
  const [selectedTalent, setSelectedTalent] = useState<string>(initialTalentName || 'Nagender Kumar (Founder & Lead)');
  const [packageBracket, setPackageBracket] = useState<string>('Royal Wedding Complete Multi-Day Package');
  const [timeline, setTimeline] = useState<string>('Next 1–3 Months');
  
  // Client info form fields
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventCity, setEventCity] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');

  const projectTypes = [
    'Wedding Shoot & Filmmaking',
    'Pre-Wedding Destination Shoot',
    'Maternity & Baby Shoot',
    'Fashion Photography',
    'Corporate Photography',
  ];

  const packageOptions = [
    'Royal Wedding Complete Multi-Day Package',
    'Pre-Wedding Destination Story Package',
    'Maternity & Newborn Fine-Art Package',
    'Haute Couture & Bridal Fashion Session',
    'Corporate Executive & Commercial Coverage',
    'Custom Tailored Event Package',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) return;

    const generatedRef = `MPC-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(generatedRef);
    setIsSubmitted(true);
    if (onSuccessNotice) {
      onSuccessNotice(`Booking inquiry ${generatedRef} received! Nagender Kumar will contact you directly within 24h.`);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setProjectBrief('');
    setEventDate('');
    setEventCity('');
  };

  return (
    <section id="book" className="w-full bg-[#F2EAD3]/40 text-[#3F2305] py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF] font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#3F2305]/70 uppercase block mb-3 font-semibold">
            CAREFULLY PLANNED PACKAGES · MY PHOTO CLUB
          </span>
          <h2 className="font-['Urbanist'] text-3xl sm:text-5xl font-light tracking-tight text-[#3F2305] mb-3">
            Book Your Shoot or Event
          </h2>
          <p className="text-xs sm:text-sm text-[#3F2305]/80 font-light leading-relaxed">
            The packages I provide are carefully planned so that your event goes off without a hitch! Direct consultation with founder Nagender Kumar.
          </p>
        </div>

        {/* Booking Card in Palette */}
        <div className="bg-[#F5F5F5] border border-[#DFD7BF] rounded-2xl p-5 sm:p-10 shadow-xl">
          {isSubmitted ? (
            <div className="py-8 sm:py-12 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#F2EAD3] border border-[#DFD7BF] text-[#3F2305] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-sans tracking-widest text-[#3F2305]/80 uppercase block mb-1 font-semibold">
                  BOOKING INQUIRY REGISTERED
                </span>
                <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light text-[#3F2305] mb-2">
                  Reference #{refCode}
                </h3>
                <p className="text-xs sm:text-sm text-[#3F2305]/80 max-w-lg mx-auto font-light leading-relaxed">
                  Thank you, <span className="font-semibold text-[#3F2305]">{clientName}</span>. Your inquiry for <span className="font-semibold text-[#3F2305]">{projectType}</span> in {eventCity || 'Delhi NCR'} has been received by Nagender Kumar.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-[#F2EAD3] border border-[#DFD7BF] text-left text-xs space-y-2.5 text-[#3F2305] font-sans">
                <div className="flex justify-between">
                  <span className="text-[#3F2305]/70">CLIENT:</span>
                  <span className="font-medium text-[#3F2305]">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3F2305]/70">EMAIL:</span>
                  <span className="text-[#3F2305]">{clientEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3F2305]/70">PACKAGE:</span>
                  <span className="text-[#3F2305] font-semibold">{packageBracket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3F2305]/70">RESPONSE SLA:</span>
                  <span className="text-[#3F2305] font-semibold">Within 24 Hours</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#3F2305] hover:bg-[#3F2305]/90 text-xs font-semibold uppercase tracking-wider text-[#F5F5F5] rounded-full transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Step 1: Project Type */}
              <div>
                <label className="text-[11px] font-sans tracking-[0.2em] text-[#3F2305]/70 uppercase block mb-3 font-semibold">
                  01. SELECT PHOTOGRAPHY SERVICE
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer font-sans ${
                        projectType === type
                          ? 'bg-[#3F2305] text-[#F5F5F5] border-[#3F2305] font-semibold shadow-md'
                          : 'bg-[#FFFFFF] text-[#3F2305] border-[#DFD7BF] hover:bg-[#F2EAD3]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{type}</span>
                        {projectType === type && <CheckCircle2 className="w-3.5 h-3.5 text-[#DFD7BF]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Package Bracket & Lead */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-sans tracking-[0.2em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
                    02. DIRECTED BY
                  </label>
                  <select
                    value={selectedTalent}
                    onChange={(e) => setSelectedTalent(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] font-sans"
                  >
                    <option value="Nagender Kumar (Founder & Lead)">Nagender Kumar (Founder & Lead Photographer)</option>
                    {TALENTS_ROSTER.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} — {t.discipline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-sans tracking-[0.2em] text-[#3F2305]/70 uppercase block mb-2 font-semibold">
                    03. PREFERRED PACKAGE
                  </label>
                  <select
                    value={packageBracket}
                    onChange={(e) => setPackageBracket(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] font-sans"
                  >
                    {packageOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Event & Contact Details */}
              <div className="space-y-4 pt-2">
                <label className="text-[11px] font-sans tracking-[0.2em] text-[#3F2305]/70 uppercase block font-semibold">
                  04. EVENT & CLIENT DETAILS
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  <div>
                    <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Tentative Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Event Location / Venue</label>
                    <input
                      type="text"
                      placeholder="e.g. Udaipur Palace / Delhi NCR Farmhouse"
                      value={eventCity}
                      onChange={(e) => setEventCity(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#3F2305]/80 font-normal block mb-1">Event Notes or Vision</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your celebration, ceremonies, or any specific vision you'd like Nagender to capture..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#FFFFFF] border border-[#DFD7BF] rounded-xl text-base sm:text-xs text-[#3F2305] focus:outline-none focus:border-[#3F2305] transition-colors resize-none font-sans"
                  />
                </div>
              </div>

              {/* Submit Bar */}
              <div className="pt-4 border-t border-[#DFD7BF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#3F2305]/80 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#3F2305] shrink-0" />
                  <span>Carefully planned so your event goes off without a hitch.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#3F2305] hover:bg-[#3F2305]/90 text-[#F5F5F5] text-xs font-semibold tracking-wider uppercase rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Booking Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
