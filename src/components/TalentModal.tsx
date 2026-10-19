import React from 'react';
import { Talent } from '../types';
import { X, Award, CheckCircle2, MapPin, Briefcase, Calendar } from 'lucide-react';

interface TalentModalProps {
  talent: Talent | null;
  onClose: () => void;
  onBookTalent: (talent: Talent) => void;
}

export const TalentModal: React.FC<TalentModalProps> = ({
  talent,
  onClose,
  onBookTalent,
}) => {
  if (!talent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#171717] text-white rounded-xl border border-neutral-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              TALENT MONOGRAPH
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-medium">
              {talent.discipline}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close talent monograph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
          {/* Header & Bio with Portrait Photo */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={talent.avatarUrl}
                alt={talent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-2">
                <h2 className="font-['Urbanist'] text-3xl sm:text-4xl font-light tracking-tight text-white">
                  {talent.name}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{talent.location}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-emerald-400">{talent.status}</span>
                </div>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {talent.bio}
              </p>
            </div>
          </div>

          {/* Current Assignment / Signature Campaign Highlight */}
          <div className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase mb-2">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>Signature Campaign Spotlight</span>
            </div>
            <div className="text-lg font-medium text-white font-['Urbanist'] mb-1">
              {talent.featuredWork}
            </div>
            <p className="text-xs text-neutral-400">
              Recent Focus: {talent.recentCampaign} · Commercial & Editorial Representation
            </p>
          </div>

          {/* Key Clients & Brand Partners */}
          <div>
            <div className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-3">
              SELECT COMMERCIAL & EDITORIAL CLIENTS
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {talent.clients.map((client) => (
                <span
                  key={client}
                  className="px-3 py-1.5 bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-md font-mono"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Awards & Distinctions */}
          <div>
            <div className="text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-3">
              HONORS & INSTITUTIONAL EXHIBITIONS
            </div>
            <div className="space-y-2">
              {talent.awards.map((award) => (
                <div key={award} className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 sm:px-8 py-5 border-t border-neutral-800 bg-neutral-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400">
            <span>COMMERCIAL TIER: </span>
            <span className="text-white font-semibold">{talent.rates}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTalent(talent);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs tracking-wider uppercase rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Talent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
