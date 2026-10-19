import React, { useState, useEffect } from 'react';
import { STUDIO_LOCATIONS } from '../data/agencyData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onSuccessNotice?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessNotice }) => {
  const [messageName, setMessageName] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePhone, setMessagePhone] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Live Studio Clocks
  const [localTimes, setLocalTimes] = useState<{ [city: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const times: { [city: string]: string } = {};
      STUDIO_LOCATIONS.forEach((loc) => {
        try {
          const formatter = new Intl.DateTimeFormat([], {
            timeZone: loc.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          times[loc.city] = formatter.format(new Date());
        } catch {
          times[loc.city] = '12:00:00';
        }
      });
      setLocalTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageEmail || !messageName) return;

    setIsSent(true);
    if (onSuccessNotice) {
      onSuccessNotice(`Message dispatched from ${messageName}. Nagender Kumar will contact you directly.`);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterDone(true);
    if (onSuccessNotice) {
      onSuccessNotice(`Subscribed ${newsletterEmail} to My Photo Club Stories & Wedding Insights.`);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#3F2305] text-[#F5F5F5] py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#DFD7BF]/30 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-10 border-b border-[#DFD7BF]/20">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#DFD7BF] uppercase block mb-3 font-semibold">
              HEADQUARTERS & CONTACT · DELHI
            </span>
            <h2 className="font-['Urbanist'] text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5]">
              My Photo Club Studio
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#F5F5F5]/80 font-light leading-relaxed">
            Based in Delhi and available for luxury weddings and destination assignments across Rajasthan, Goa, and international venues.
          </p>
        </div>

        {/* Global Studio Locations with Live Local Clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {STUDIO_LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="bg-[#2d1803] border border-[#DFD7BF]/30 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-sans text-[#DFD7BF] mb-4 pb-3 border-b border-[#DFD7BF]/20">
                  <span className="uppercase tracking-wider font-semibold">{loc.region}</span>
                  <div className="flex items-center gap-1.5 text-[#F2EAD3] font-sans tabular-nums font-medium">
                    <Clock className="w-3 h-3 text-[#DFD7BF]" />
                    <span>{localTimes[loc.city] || '--:--'}</span>
                  </div>
                </div>

                <h3 className="font-['Urbanist'] text-xl sm:text-2xl font-light text-[#F5F5F5] mb-2">
                  {loc.city}
                </h3>
                <p className="text-xs text-[#F5F5F5]/70 font-light mb-4 leading-relaxed">
                  {loc.address}
                </p>
              </div>

              <div className="space-y-1 text-xs font-sans text-[#DFD7BF] pt-3 border-t border-[#DFD7BF]/20">
                <div className="text-[#F2EAD3] font-medium">{loc.contact}</div>
                <div className="text-[#DFD7BF]/90 text-[11px]">{loc.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Newsletter Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-[#DFD7BF]/20">
          {/* Direct Message Form (Left 7 cols) */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#DFD7BF] uppercase block mb-3 font-semibold">
              DIRECT INQUIRY
            </span>
            <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light text-[#F5F5F5] mb-6">
              Connect with Nagender
            </h3>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-[#2d1803] border border-[#DFD7BF]/30 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-[#DFD7BF] mx-auto" />
                <h4 className="font-['Urbanist'] text-xl font-light text-[#F5F5F5]">
                  Message Dispatched
                </h4>
                <p className="text-xs text-[#F5F5F5]/80 max-w-sm mx-auto">
                  Thank you, {messageName}. Nagender Kumar will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-sans text-[#F2EAD3] underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#DFD7BF] font-normal block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohini Sen"
                      value={messageName}
                      onChange={(e) => setMessageName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#231201] border border-[#DFD7BF]/40 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#DFD7BF] font-normal block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohini@example.com"
                      value={messageEmail}
                      onChange={(e) => setMessageEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#231201] border border-[#DFD7BF]/40 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#DFD7BF] font-normal block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={messagePhone}
                    onChange={(e) => setMessagePhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#231201] border border-[#DFD7BF]/40 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#DFD7BF] font-normal block mb-1">Message / Event Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the dates, venue destination, ceremonies, or package requirements..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-3 bg-[#231201] border border-[#DFD7BF]/40 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#F2EAD3] text-[#3F2305] hover:bg-[#DFD7BF] text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Studio Insights & General Desks (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6 lg:border-l lg:border-[#DFD7BF]/20">
            {/* The Monograph Subscription */}
            <div>
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#DFD7BF] uppercase block mb-3 font-semibold">
                PHOTO STORIES & WEDDING TIPS
              </span>
              <h4 className="font-['Urbanist'] text-xl font-light text-[#F5F5F5] mb-2">
                My Photo Club Insights
              </h4>
              <p className="text-xs text-[#F5F5F5]/70 font-light mb-4 leading-relaxed">
                Receive inspiration from recent palace weddings, lighting tips for ceremonies, and seasonal package announcements.
              </p>

              {newsletterDone ? (
                <div className="p-4 bg-[#2d1803] rounded-xl border border-[#DFD7BF]/30 text-xs text-[#F2EAD3] flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#DFD7BF] shrink-0" />
                  <span>Thank you for subscribing to My Photo Club Stories.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-3 bg-[#231201] border border-[#DFD7BF]/40 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] font-sans"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#F2EAD3] hover:bg-[#DFD7BF] text-xs font-semibold uppercase tracking-wider text-[#3F2305] rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Direct Email Desks */}
            <div className="pt-6 border-t border-[#DFD7BF]/20 space-y-3 font-sans">
              <span className="text-[10px] font-sans tracking-widest text-[#DFD7BF] uppercase block font-semibold">
                DIRECT CONTACT DESKS
              </span>
              <div className="space-y-2 text-xs text-[#F5F5F5]/80">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Weddings & Pre-Weddings:</span>
                  <a href="mailto:weddings@myphotoclub.in" className="text-[#F2EAD3] hover:underline font-medium">
                    weddings@myphotoclub.in
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Maternity & Baby Shoots:</span>
                  <a href="mailto:portraits@myphotoclub.in" className="text-[#F2EAD3] hover:underline font-medium">
                    portraits@myphotoclub.in
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Corporate & Fashion:</span>
                  <a href="mailto:corporate@myphotoclub.in" className="text-[#F2EAD3] hover:underline font-medium">
                    corporate@myphotoclub.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
