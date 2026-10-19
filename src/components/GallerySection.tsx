import React, { useState } from 'react';
import { HeroPhoto } from '../types';
import { HERO_PHOTOS } from '../data/agencyData';
import { EditorialVisual } from './EditorialVisual';
import { Maximize2, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  onSelectPhoto: (photo: HeroPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectPhoto }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fashion' | 'editorial' | 'surreal'>('all');

  const filteredPhotos = HERO_PHOTOS.filter((photo) => {
    if (activeFilter === 'fashion') return photo.id === 'silhouette-kinetic' || photo.id === 'cyan-fashion-model' || photo.id === 'urban-motion-blur';
    if (activeFilter === 'editorial') return photo.id === 'yellow-knit-paper-mask' || photo.id === 'woman-terracotta-amber';
    if (activeFilter === 'surreal') return photo.id === 'mirror-reflection-red' || photo.id === 'melting-liquid-fingers';
    return true;
  });

  return (
    <section id="gallery" className="w-full bg-[#f7f7f6] py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">
              AI EDITORIAL PHOTOGRAPHY · SS26
            </span>
            <h2 className="font-['Urbanist'] text-4xl sm:text-6xl font-light tracking-tight text-neutral-950">
              Selected Works
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/80 rounded-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              All Works (07)
            </button>
            <button
              onClick={() => setActiveFilter('fashion')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === 'fashion'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Fashion & Kinetic
            </button>
            <button
              onClick={() => setActiveFilter('editorial')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === 'editorial'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Tactile Editorial
            </button>
            <button
              onClick={() => setActiveFilter('surreal')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === 'surreal'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Surrealist & Form
            </button>
          </div>
        </div>

        {/* Dynamic Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => {
            // First item spans 2 columns on desktop for dynamic bento rhythm
            const isMarquee = idx === 0 && activeFilter === 'all';
            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`relative group bg-neutral-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isMarquee ? 'lg:col-span-2 md:h-[460px]' : 'h-[400px] md:h-[460px]'
                }`}
              >
                <EditorialVisual photo={photo} className="w-full h-full" showOverlay={false} />

                {/* Subtle scrim & metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent p-6 flex flex-col justify-between text-white transition-opacity duration-300">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
                    <span className="text-amber-300">{photo.discipline}</span>
                    <span className="p-1.5 bg-neutral-900/60 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 block mb-1">
                      {photo.client}
                    </span>
                    <h3 className="font-['Urbanist'] text-2xl font-light tracking-tight mb-1 text-white">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light flex items-center gap-2">
                      <span>{photo.talent}</span>
                      <span>·</span>
                      <span>{photo.discipline}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
