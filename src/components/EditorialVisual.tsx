import React, { useState } from 'react';
import { HeroPhoto } from '../types';
import { Camera } from 'lucide-react';

interface EditorialVisualProps {
  photo: HeroPhoto;
  className?: string;
  showOverlay?: boolean;
}

export const EditorialVisual: React.FC<EditorialVisualProps> = ({
  photo,
  className = '',
  showOverlay = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative overflow-hidden group select-none bg-neutral-900 ${className} font-sans`}>
      {/* Real High-Resolution Editorial Photograph */}
      {!imgError && photo.imageUrl ? (
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            referrerPolicy="no-referrer"
            loading="eager"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Clean subtle bottom gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
        </div>
      ) : (
        /* Fallback if image fails */
        <div 
          className="w-full h-full flex flex-col justify-end p-6 text-white"
          style={{ backgroundColor: photo.colorScheme.bg }}
        >
          <Camera className="w-8 h-8 mb-3 opacity-60" />
          <h4 className="font-['Urbanist'] text-lg font-light">{photo.title}</h4>
          <span className="text-xs opacity-75 font-sans">{photo.cameraInfo}</span>
        </div>
      )}

      {/* Subtle photographic film grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
        }}
      />

      {/* Hover Information Scrim & Production Credits (NO indexes) */}
      {showOverlay && (
        <div className="absolute inset-0 bg-neutral-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-neutral-300">
            <span className="text-amber-300 font-medium">{photo.discipline}</span>
            <span className="text-white/80 font-semibold tracking-wider">
              <span>INSPECT</span>
            </span>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-tight leading-snug font-['Urbanist'] mb-1">
              {photo.title}
            </h4>
            <p className="text-[11px] text-neutral-300 font-light line-clamp-1 mb-1">
              {photo.talent} · {photo.client}
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-sans text-neutral-400">
              <Camera className="w-2.5 h-2.5 text-neutral-500" />
              <span className="truncate">{photo.cameraInfo.split('·')[0]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
