import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNotice?: (msg: string) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  onSuccessNotice,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [discipline, setDiscipline] = useState('Wedding Photography');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [artistStatement, setArtistStatement] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !portfolioUrl) return;

    setIsSubmitted(true);
    if (onSuccessNotice) {
      onSuccessNotice(`Application for ${name} received. Nagender Kumar reviews submissions weekly.`);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setCity('');
    setPortfolioUrl('');
    setArtistStatement('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div 
        className="relative w-full max-w-xl bg-[#3F2305] text-[#F5F5F5] rounded-2xl border border-[#DFD7BF]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DFD7BF]/20">
          <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-[#DFD7BF] uppercase font-semibold">
            <span>MY PHOTO CLUB DELHI</span>
            <span>·</span>
            <span>COLLABORATIVE INQUIRIES</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#DFD7BF] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            aria-label="Close talent application"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#2d1803] border border-[#DFD7BF]/40 text-[#DFD7BF] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-['Urbanist'] text-2xl font-light text-[#F5F5F5] mb-2">
                  Portfolio Received
                </h3>
                <p className="text-xs sm:text-sm text-[#F5F5F5]/80 font-light leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="text-[#F2EAD3] font-medium">{name}</span>. Your submission in <span className="text-[#F2EAD3] font-medium">{discipline}</span> has been forwarded to Nagender Kumar.
                </p>
              </div>

              <div className="p-4 bg-[#2d1803] rounded-xl border border-[#DFD7BF]/30 text-xs font-sans text-[#DFD7BF] text-left space-y-1.5">
                <div>APPLICANT: {name}</div>
                <div>DISCIPLINE: {discipline} · {city || 'Delhi / Remote'}</div>
                <div>PORTFOLIO: {portfolioUrl}</div>
                <div className="text-[#F2EAD3]">RESPONSE: Within 3–5 Business Days</div>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#F2EAD3] hover:bg-[#DFD7BF] text-xs font-semibold uppercase tracking-wider text-[#3F2305] rounded-full transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-['Urbanist'] text-2xl sm:text-3xl font-light tracking-tight text-[#F5F5F5] mb-1">
                  Collaborate with My Photo Club
                </h3>
                <p className="text-xs text-[#F5F5F5]/70 font-light">
                  Cinematographers, second-shooters, colorists, and lighting artists working alongside Nagender Kumar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#DFD7BF] font-light block mb-1">Full Legal / Artist Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#DFD7BF] font-light block mb-1">Direct Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="maya@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#DFD7BF] font-light block mb-1">Primary Discipline *</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] focus:outline-none focus:border-[#DFD7BF]"
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Wedding Filmmaking & Cinematography">Wedding Filmmaking & Cinematography</option>
                    <option value="Fashion & Editorial Photography">Fashion & Editorial Photography</option>
                    <option value="Retouching & Color Grading">Retouching & Color Grading</option>
                    <option value="Drone / Aerial Operations">Drone / Aerial Operations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#DFD7BF] font-light block mb-1">Primary Home Base / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR, Jaipur, Mumbai..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#DFD7BF] font-light block mb-1">Portfolio or Instagram URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://instagram.com/... or yourportfolio.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF]"
                />
              </div>

              <div>
                <label className="text-xs text-[#DFD7BF] font-light block mb-1">Statement / Experience (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your gear, experience with destination weddings or ceremonies..."
                  value={artistStatement}
                  onChange={(e) => setArtistStatement(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#231201] border border-[#DFD7BF]/30 rounded-xl text-base sm:text-xs text-[#F5F5F5] placeholder:text-[#DFD7BF]/50 focus:outline-none focus:border-[#DFD7BF] resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#DFD7BF]/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#DFD7BF] hover:text-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F2EAD3] text-[#3F2305] hover:bg-[#DFD7BF] text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
