import React, { useState, useMemo } from 'react';
import { Talent } from '../types';
import { TALENTS_ROSTER } from '../data/agencyData';
import { TalentModal } from './TalentModal';
import { Search, ArrowUpRight, Check, MapPin } from 'lucide-react';

interface TalentsSectionProps {
  onBookTalent: (talent: Talent) => void;
}

export const TalentsSection: React.FC<TalentsSectionProps> = ({ onBookTalent }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTalentModal, setActiveTalentModal] = useState<Talent | null>(null);

  const disciplines = [
    'All',
    'Creative Direction',
    'Photography',
    'Fashion & Styling',
    'Motion & CGI',
    'Spatial & Set Design',
  ];

  const filteredTalents = useMemo(() => {
    return TALENTS_ROSTER.filter((talent) => {
      const matchesDiscipline =
        selectedDiscipline === 'All' || talent.discipline === selectedDiscipline;
      const matchesSearch =
        talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.clients.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        talent.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDiscipline && matchesSearch;
    });
  }, [selectedDiscipline, searchQuery]);

  return (
    <section id="talents" className="w-full bg-[#f7f7f6] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto">
        {/* Header & Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
              CURATED TALENTS ROSTER
            </span>
            <h2 className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-neutral-950">
              The Creators
            </h2>
          </div>

          <p className="max-w-md text-sm text-neutral-600 font-light leading-relaxed">
            Representing a selective global collective of visual directors, image-makers, and spatial designers commissioned by premier cultural and luxury brands.
          </p>
        </div>

        {/* Filter Controls Bar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-200">
          {/* Segmented discipline buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 rounded-lg">
            {disciplines.map((discipline) => (
              <button
                key={discipline}
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedDiscipline === discipline
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-black hover:bg-neutral-300/50'
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by artist, brand, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-md text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>
        </div>

        {/* Talents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="group bg-white rounded-lg border border-neutral-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Talent Realistic Photographic Portrait */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={talent.avatarUrl}
                    alt={talent.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Location & Status Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="flex items-center gap-1 font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-amber-300" />
                      {talent.location.split(',')[0]}
                    </span>
                    <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-emerald-400">
                      {talent.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Name & Discipline */}
                  <h3 className="font-['Urbanist'] text-2xl font-light tracking-tight text-neutral-950 mb-1 group-hover:text-black">
                    {talent.name}
                  </h3>
                  <span className="text-xs text-neutral-500 font-light block mb-4">
                    {talent.discipline}
                  </span>

                  {/* Short Bio */}
                  <p className="text-xs text-neutral-600 font-light line-clamp-2 leading-relaxed mb-4">
                    {talent.bio}
                  </p>

                  {/* Client tags */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                      Key Brand Commissions
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-700">
                      {talent.clients.slice(0, 3).map((client) => (
                        <span key={client} className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-800">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveTalentModal(talent)}
                  className="text-xs font-semibold tracking-wider uppercase text-neutral-700 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View Book</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onBookTalent(talent)}
                  className="px-3.5 py-1.5 bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer"
                >
                  Quick Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-neutral-200">
            <p className="text-sm text-neutral-500 font-light mb-3">
              No talents match your query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedDiscipline('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-900 underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Talent Detail Modal */}
      {activeTalentModal && (
        <TalentModal
          talent={activeTalentModal}
          onClose={() => setActiveTalentModal(null)}
          onBookTalent={(talent) => {
            setActiveTalentModal(null);
            onBookTalent(talent);
          }}
        />
      )}
    </section>
  );
};
