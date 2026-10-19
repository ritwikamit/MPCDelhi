import React, { useEffect, useRef } from 'react';

export const FireBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Floating light embers (soft glowing out-of-focus orbs of firelight)
    interface LightEmber {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      life: number;
      maxLife: number;
      hue: number;
      brightness: number;
      swayFreq: number;
      swayAmp: number;
      swayOffset: number;
    }

    const emberCount = 42;
    const embers: LightEmber[] = [];

    const createLightEmber = (bottomOnly = true): LightEmber => {
      const maxLife = 80 + Math.random() * 120;
      return {
        x: Math.random() * width,
        y: bottomOnly ? height - Math.random() * 25 : Math.random() * height,
        radius: 2.0 + Math.random() * 4.5,
        speedY: 0.6 + Math.random() * 1.6,
        life: bottomOnly ? 0 : Math.random() * maxLife,
        maxLife,
        hue: 18 + Math.random() * 28, // Golden yellow to bright fiery amber-orange
        brightness: 75 + Math.random() * 25,
        swayFreq: 0.015 + Math.random() * 0.025,
        swayAmp: 1.5 + Math.random() * 2.8,
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

      // Authentic firelight flicker with rich dynamic pulse
      const f1 = Math.sin(time * 3.4) * 0.15;
      const f2 = Math.sin(time * 6.8) * 0.08;
      const f3 = Math.cos(time * 1.6) * 0.1;
      const fireIntensity = Math.max(0.85, Math.min(1.4, 1.05 + f1 + f2 + f3));

      ctx.globalCompositeOperation = 'screen';

      // 1. Core Glowing Fire Hearth: Radiant, vibrant, hot light pools across the base
      const lightPoolCount = Math.max(4, Math.floor(width / 200));
      for (let i = 0; i < lightPoolCount; i++) {
        const posX = (width / (lightPoolCount + 1)) * (i + 1) + Math.sin(time * 2.0 + i * 1.8) * 45;
        const posY = height - 10 + Math.cos(time * 2.4 + i) * 18;
        const glowRadius = (200 + Math.sin(time * 2.8 + i * 2.1) * 50) * fireIntensity;

        // Multi-tier luminous firelight bloom
        const firelight = ctx.createRadialGradient(posX, posY, 0, posX, posY, glowRadius);
        firelight.addColorStop(0, `rgba(255, 210, 80, ${0.75 * fireIntensity})`);   // White-hot golden center
        firelight.addColorStop(0.2, `rgba(255, 145, 20, ${0.58 * fireIntensity})`); // Intense amber gold
        firelight.addColorStop(0.45, `rgba(240, 75, 10, ${0.38 * fireIntensity})`); // Fiery warm orange
        firelight.addColorStop(0.75, `rgba(175, 30, 5, ${0.16 * fireIntensity})`);  // Deep ruby glow
        firelight.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = firelight;
        ctx.beginPath();
        ctx.arc(posX, posY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Rising Warm Firelight Waves (Broad atmospheric ambient wash)
      const ambientWash = ctx.createLinearGradient(0, height, 0, height - 340);
      ambientWash.addColorStop(0, `rgba(255, 120, 20, ${0.55 * fireIntensity})`);
      ambientWash.addColorStop(0.3, `rgba(220, 65, 10, ${0.35 * fireIntensity})`);
      ambientWash.addColorStop(0.65, `rgba(130, 25, 5, ${0.18 * fireIntensity})`);
      ambientWash.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = ambientWash;
      ctx.fillRect(0, height - 340, width, 340);

      // 3. Floating Luminous Firelight Bokeh Orbs & Embers
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
          alpha = Math.max(0, 1 - Math.pow(progress, 1.25));
        }

        // Intense glowing bokeh corona
        const coronaR = e.radius * 4.5;
        const emberGlow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, coronaR);
        emberGlow.addColorStop(0, `hsla(${e.hue + 5}, 100%, 85%, ${alpha * 0.9 * fireIntensity})`);
        emberGlow.addColorStop(0.35, `hsla(${e.hue}, 100%, 65%, ${alpha * 0.55 * fireIntensity})`);
        emberGlow.addColorStop(0.7, `hsla(${e.hue - 12}, 100%, 45%, ${alpha * 0.22 * fireIntensity})`);
        emberGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = emberGlow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, coronaR, 0, Math.PI * 2);
        ctx.fill();

        // Hot pinpoint center
        ctx.fillStyle = `rgba(255, 255, 230, ${alpha * 0.85 * fireIntensity})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();

        if (e.life >= e.maxLife || e.y < height * 0.1) {
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
