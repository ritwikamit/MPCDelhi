import React from 'react';
import { HeroPhoto } from '../types';
import { EditorialVisual } from './EditorialVisual';

interface PhotoRibbonProps {
  photos: HeroPhoto[];
  onSelectPhoto: (photo: HeroPhoto) => void;
}

export const PhotoRibbon: React.FC<PhotoRibbonProps> = ({ photos, onSelectPhoto }) => {
  return (
    <div className="relative w-full overflow-hidden select-none my-3 sm:my-6 md:my-8 group">
      {/* Infinite Seamless Continuous Marquee Loop Track - GPU accelerated */}
      <div className="w-full overflow-hidden pointer-events-auto">
        <div
          className="flex w-max will-change-transform animate-marquee [transform:translateZ(0)]"
          style={{ animationDuration: '35s' }}
        >
          {/* Track 1 */}
          <div className="flex shrink-0">
            {photos.map((photo, idx) => (
              <div
                key={`track1-${photo.id}`}
                onClick={() => onSelectPhoto(photo)}
                className="relative shrink-0 w-[170px] xs:w-[190px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[330px] h-[300px] xs:h-[330px] sm:h-[400px] md:h-[450px] lg:h-[490px] cursor-pointer transition-transform duration-300 hover:scale-[1.01] hover:z-20 group/card"
              >
                <EditorialVisual 
                  photo={photo} 
                  className="w-full h-full" 
                  showOverlay={false} 
                  priority={idx < 2}
                />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-neutral-900/15 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Track 2 (Identical duplicate for seamless 100% infinite continuous loop) */}
          <div className="flex shrink-0" aria-hidden="true">
            {photos.map((photo) => (
              <div
                key={`track2-${photo.id}`}
                onClick={() => onSelectPhoto(photo)}
                className="relative shrink-0 w-[170px] xs:w-[190px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[330px] h-[300px] xs:h-[330px] sm:h-[400px] md:h-[450px] lg:h-[490px] cursor-pointer transition-transform duration-300 hover:scale-[1.01] hover:z-20 group/card"
              >
                <EditorialVisual 
                  photo={photo} 
                  className="w-full h-full" 
                  showOverlay={false} 
                  priority={false}
                />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-neutral-900/15 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
