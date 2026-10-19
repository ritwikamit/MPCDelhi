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
    let isVisible = false;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    let time = 0;

    const render = () => {
      if (!isVisible) return; // Zero CPU/GPU burn when footer is not in viewport

      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Organic dynamic flame flicker and breathing pulse
      const f1 = Math.sin(time * 2.8) * 0.16;
      const f2 = Math.sin(time * 5.4) * 0.09;
      const f3 = Math.cos(time * 1.3) * 0.12;
      const fireIntensity = Math.max(0.85, Math.min(1.4, 1.1 + f1 + f2 + f3));

      ctx.globalCompositeOperation = 'screen';

      // 1. Broad Radiant Warm Firelight Wash Rising From Base
      const washHeight = Math.min(height, 420);
      const baseWash = ctx.createLinearGradient(0, height, 0, height - washHeight);
      baseWash.addColorStop(0, `rgba(255, 105, 15, ${0.48 * fireIntensity})`);
      baseWash.addColorStop(0.3, `rgba(225, 60, 8, ${0.32 * fireIntensity})`);
      baseWash.addColorStop(0.7, `rgba(145, 20, 4, ${0.14 * fireIntensity})`);
      baseWash.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = baseWash;
      ctx.fillRect(0, height - washHeight, width, washHeight);

      // 2. Core Ambient Hearth Light Pools
      const poolCount = Math.max(3, Math.floor(width / 220));
      for (let i = 0; i < poolCount; i++) {
        const posX = (width / (poolCount + 1)) * (i + 1) + Math.sin(time * 1.8 + i * 1.5) * 50;
        const posY = height - 10 + Math.cos(time * 2.2 + i) * 15;
        const glowRadius = (250 + Math.sin(time * 2.5 + i * 2.0) * 60) * fireIntensity;

        const hearthGlow = ctx.createRadialGradient(posX, posY, 0, posX, posY, glowRadius);
        hearthGlow.addColorStop(0, `rgba(255, 220, 100, ${0.72 * fireIntensity})`);
        hearthGlow.addColorStop(0.25, `rgba(255, 140, 20, ${0.52 * fireIntensity})`);
        hearthGlow.addColorStop(0.55, `rgba(230, 65, 10, ${0.28 * fireIntensity})`);
        hearthGlow.addColorStop(0.85, `rgba(160, 25, 5, ${0.10 * fireIntensity})`);
        hearthGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = hearthGlow;
        ctx.beginPath();
        ctx.arc(posX, posY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Ambient Corner Hearth Glows
      const leftGlow = ctx.createRadialGradient(0, height, 0, 0, height, 320 * fireIntensity);
      leftGlow.addColorStop(0, `rgba(255, 130, 20, ${0.5 * fireIntensity})`);
      leftGlow.addColorStop(0.6, `rgba(180, 30, 6, ${0.2 * fireIntensity})`);
      leftGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, height - 320, 320, 320);

      const rightGlow = ctx.createRadialGradient(width, height, 0, width, height, 320 * fireIntensity);
      rightGlow.addColorStop(0, `rgba(255, 130, 20, ${0.5 * fireIntensity})`);
      rightGlow.addColorStop(0.6, `rgba(180, 30, 6, ${0.2 * fireIntensity})`);
      rightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightGlow;
      ctx.fillRect(width - 320, height - 320, 320, 320);

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver so footer animation ONLY runs when footer is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
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
