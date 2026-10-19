import React, { useEffect, useRef } from 'react';

export const FireBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Floating embers and fire particles
    interface LightEmber {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      life: number;
      maxLife: number;
      hue: number;
      swayFreq: number;
      swayAmp: number;
      swayOffset: number;
    }

    const emberCount = 55;
    const embers: LightEmber[] = [];

    const createLightEmber = (bottomOnly = true): LightEmber => {
      const maxLife = 90 + Math.random() * 140;
      return {
        x: Math.random() * (width || 1200),
        y: bottomOnly ? (height || 500) - Math.random() * 30 : Math.random() * (height || 500),
        radius: 2.2 + Math.random() * 4.8,
        speedY: 0.7 + Math.random() * 1.8,
        life: bottomOnly ? 0 : Math.random() * maxLife,
        maxLife,
        hue: 20 + Math.random() * 26, // Luminous golden amber to warm flame orange
        swayFreq: 0.015 + Math.random() * 0.025,
        swayAmp: 1.8 + Math.random() * 3.2,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < emberCount; i++) {
      embers.push(createLightEmber(false));
    }

    let time = 0;

    const render = () => {
      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      // Organic dynamic flame flicker
      const f1 = Math.sin(time * 3.2) * 0.16;
      const f2 = Math.sin(time * 6.5) * 0.09;
      const f3 = Math.cos(time * 1.5) * 0.12;
      const fireIntensity = Math.max(0.85, Math.min(1.45, 1.1 + f1 + f2 + f3));

      ctx.globalCompositeOperation = 'screen';

      // 1. Broad Radiant Warm Firelight Wash from Bottom
      const baseWash = ctx.createLinearGradient(0, height, 0, height - 380);
      baseWash.addColorStop(0, `rgba(255, 105, 15, ${0.52 * fireIntensity})`);   // Fiery orange base
      baseWash.addColorStop(0.25, `rgba(235, 65, 8, ${0.35 * fireIntensity})`);  // Deep amber
      baseWash.addColorStop(0.65, `rgba(160, 25, 4, ${0.16 * fireIntensity})`);  // Rich ruby glow
      baseWash.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = baseWash;
      ctx.fillRect(0, Math.max(0, height - 380), width, 380);

      // 2. Core Glowing Fire Hearths (Vibrant pulsating light pools across base)
      const poolCount = Math.max(4, Math.floor(width / 190));
      for (let i = 0; i < poolCount; i++) {
        const posX = (width / (poolCount + 1)) * (i + 1) + Math.sin(time * 2.1 + i * 1.7) * 48;
        const posY = height - 12 + Math.cos(time * 2.5 + i) * 16;
        const glowRadius = (220 + Math.sin(time * 2.8 + i * 2.2) * 55) * fireIntensity;

        const hearthGlow = ctx.createRadialGradient(posX, posY, 0, posX, posY, glowRadius);
        hearthGlow.addColorStop(0, `rgba(255, 230, 110, ${0.82 * fireIntensity})`); // White-gold core
        hearthGlow.addColorStop(0.18, `rgba(255, 155, 25, ${0.65 * fireIntensity})`);// Fiery amber
        hearthGlow.addColorStop(0.45, `rgba(240, 75, 12, ${0.42 * fireIntensity})`); // Vivid orange-red
        hearthGlow.addColorStop(0.75, `rgba(175, 30, 6, ${0.18 * fireIntensity})`);  // Ruby halo
        hearthGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = hearthGlow;
        ctx.beginPath();
        ctx.arc(posX, posY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Floating Luminous Fire Embers & Bokeh Orbs
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.y -= e.speedY;
        e.x += Math.sin(e.life * e.swayFreq + e.swayOffset) * e.swayAmp;

        const progress = e.life / e.maxLife;
        let alpha = 1;
        if (progress < 0.15) {
          alpha = progress / 0.15;
        } else {
          alpha = Math.max(0, 1 - Math.pow(progress, 1.2));
        }

        const coronaR = e.radius * 4.8;
        const emberGlow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, coronaR);
        emberGlow.addColorStop(0, `hsla(${e.hue + 8}, 100%, 88%, ${alpha * 0.95 * fireIntensity})`);
        emberGlow.addColorStop(0.32, `hsla(${e.hue}, 100%, 68%, ${alpha * 0.65 * fireIntensity})`);
        emberGlow.addColorStop(0.7, `hsla(${e.hue - 12}, 100%, 48%, ${alpha * 0.25 * fireIntensity})`);
        emberGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = emberGlow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, coronaR, 0, Math.PI * 2);
        ctx.fill();

        // Hot White-Gold Center Pinpoint
        ctx.fillStyle = `rgba(255, 255, 235, ${alpha * 0.9 * fireIntensity})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (e.life >= e.maxLife || e.y < height * 0.08) {
          embers[i] = createLightEmber(true);
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block"
      aria-hidden="true"
    />
  );
};
