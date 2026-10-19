import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
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

    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
    };

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
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();

    // 24 Color stops mirroring the heroGrad gradient across the width
    const paletteStops = [
      { r: 85, g: 6, b: 4 },     // Deep Maroon Anchor
      { r: 105, g: 10, b: 6 },   // 0: Deep Crimson #690A06
      { r: 112, g: 14, b: 8 },   // 1: Ruby Crimson #700E08
      { r: 110, g: 20, b: 12 },  // 2: Crimson-Walnut
      { r: 95, g: 25, b: 10 },   // 3: Warm Deep Walnut
      { r: 75, g: 30, b: 8 },    // 4: Deep Walnut #3F2305
      { r: 63, g: 35, b: 5 },    // 5: Rich Espresso #3F2305
      { r: 85, g: 45, b: 16 },   // 6: Walnut transition
      { r: 115, g: 70, b: 40 },  // 7: Warm Amber Walnut
      { r: 145, g: 105, b: 75 }, // 8: Sand-Walnut #91694B
      { r: 168, g: 130, b: 100 },// 9: Warm Sand Brown
      { r: 190, g: 160, b: 130 },// 10: Sand Stone
      { r: 205, g: 185, b: 155 },// 11: Sand Cream
      { r: 223, g: 215, b: 191 },// 12: Warm Sand Palette #DFD7BF
      { r: 228, g: 220, b: 198 },// 13: Sand-Cream transition
      { r: 235, g: 226, b: 204 },// 14: Cream #F2EAD3
      { r: 242, g: 234, b: 211 },// 15: Warm Cream Palette #F2EAD3
      { r: 240, g: 236, b: 220 },// 16: Cream-White
      { r: 242, g: 239, b: 228 },// 17: Soft Light Ivory
      { r: 245, g: 243, b: 236 },// 18: Off-White
      { r: 245, g: 245, b: 245 },// 19: Pure Off-White Palette #F5F5F5
      { r: 245, g: 245, b: 245 },// 20: Clean Off-White
      { r: 245, g: 245, b: 245 },// 21: Clean Off-White
      { r: 245, g: 245, b: 245 },// 22: Clean Off-White
    ];

    const getPaletteColor = (t: number) => {
      const clamped = Math.max(0, Math.min(1, t));
      const pos = clamped * (paletteStops.length - 1);
      const idx = Math.floor(pos);
      const frac = pos - idx;
      const c1 = paletteStops[idx];
      const c2 = paletteStops[Math.min(paletteStops.length - 1, idx + 1)];
      return {
        r: Math.round(c1.r + (c2.r - c1.r) * frac),
        g: Math.round(c1.g + (c2.g - c1.g) * frac),
        b: Math.round(c1.b + (c2.b - c1.b) * frac),
      };
    };

    let time = 0;

    const render = () => {
      time += 0.018; // Smooth wave flow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 0. Base deep maroon anchor on left to ensure 0% white gap ever appears
      const baseLeftGrad = ctx.createLinearGradient(0, 0, width * 0.25, 0);
      baseLeftGrad.addColorStop(0, '#420604');
      baseLeftGrad.addColorStop(0.5, '#690A06');
      baseLeftGrad.addColorStop(1, 'rgba(105, 10, 6, 0)');
      ctx.fillStyle = baseLeftGrad;
      ctx.fillRect(0, 0, width * 0.25, height);

      // Determine number of vertical fluted waves across the screen
      const columnCount = Math.max(18, Math.min(28, Math.floor(width / 55)));
      const colWidth = width / columnCount;

      const stepsY = 32;
      const stepH = height / stepsY;

      // START FROM c = -2 so the fluted waves extend well off the left screen edge!
      const minCol = -2;
      const maxCol = columnCount + 2;
      const seamPoints: Map<number, { x: number; y: number }[]> = new Map();

      for (let c = minCol; c <= maxCol; c++) {
        const points: { x: number; y: number }[] = [];
        const baseColX = c * colWidth;

        for (let s = 0; s <= stepsY; s++) {
          const y = s * stepH;

          // Harmonic wave formula for realistic fluid fabric ripples
          const wave1 = Math.sin(y * 0.006 + time * 1.6 + c * 0.38) * 14;
          const wave2 = Math.cos(y * 0.014 - time * 1.1 + c * 0.22) * 7;
          const wave3 = Math.sin(y * 0.02 + time * 0.8) * 3;
          const mouseDisplace = Math.sin((y / height) * Math.PI) * (mouse.x - 0.5) * 18;

          const x = baseColX + wave1 + wave2 + wave3 + mouseDisplace;
          points.push({ x, y });
        }
        seamPoints.set(c, points);
      }

      // Draw each fluted column with 3D cylindrical lighting & rich palette gradient
      for (let c = minCol; c < maxCol; c++) {
        const leftPoints = seamPoints.get(c)!;
        const rightPoints = seamPoints.get(c + 1)!;
        const normalizedRatio = Math.max(0, Math.min(1, (c + 0.5) / columnCount));
        const colColor = getPaletteColor(normalizedRatio);

        ctx.beginPath();
        // Trace left seam downwards
        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
        for (let s = 1; s <= stepsY; s++) {
          const prev = leftPoints[s - 1];
          const curr = leftPoints[s];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(leftPoints[stepsY].x, leftPoints[stepsY].y);

        // Trace bottom edge to right seam
        ctx.lineTo(rightPoints[stepsY].x, rightPoints[stepsY].y);

        // Trace right seam upwards
        for (let s = stepsY - 1; s >= 0; s--) {
          const prev = rightPoints[s + 1];
          const curr = rightPoints[s];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(rightPoints[0].x, rightPoints[0].y);
        ctx.closePath();

        // 3D Fluted Cylinder Lighting
        const sampleY = height * 0.5;
        const xLeft = leftPoints[Math.floor(stepsY / 2)].x;
        const xRight = rightPoints[Math.floor(stepsY / 2)].x;

        const foldGrad = ctx.createLinearGradient(xLeft, sampleY, xRight, sampleY);

        const highlightMult = 1.18;
        const shadowMult = 0.82;

        const cLight = `rgb(${Math.min(255, Math.floor(colColor.r * highlightMult))}, ${Math.min(255, Math.floor(colColor.g * highlightMult))}, ${Math.min(255, Math.floor(colColor.g * highlightMult))})`;
        const cBase = `rgb(${colColor.r}, ${colColor.g}, ${colColor.b})`;
        const cShadow = `rgb(${Math.floor(colColor.r * shadowMult)}, ${Math.floor(colColor.g * shadowMult)}, ${Math.floor(colColor.b * shadowMult)})`;

        foldGrad.addColorStop(0, cShadow);
        foldGrad.addColorStop(0.35, cLight);
        foldGrad.addColorStop(0.85, cBase);
        foldGrad.addColorStop(1, cShadow);

        ctx.fillStyle = foldGrad;
        ctx.fill();

        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(0, 0, 0, ${normalizedRatio < 0.4 ? 0.32 : 0.12})`;
        ctx.stroke();
      }

      // 1. EXTRA DISTINCT WAVY MAROON BAR ON THE LEFT SIDE OF THE SCREEN
      // Requested by user to eliminate white visibility and anchor the drapery
      const maroonBarWidth = Math.max(90, width * 0.11);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-10, 0);

      // Left edge stays anchored past screen (-10)
      ctx.lineTo(-10, height);

      // Bottom edge connects to right contour of the maroon bar
      const bottomWave = Math.sin(height * 0.007 + time * 1.5) * 16 + Math.cos(time * 0.9) * 8;
      ctx.lineTo(maroonBarWidth + bottomWave, height);

      // Curve upward along the undulating right boundary of the extra maroon bar
      for (let s = stepsY - 1; s >= 0; s--) {
        const y = s * stepH;
        const wave = Math.sin(y * 0.008 + time * 1.5) * 18 + Math.cos(y * 0.016 - time * 1.2) * 9;
        const x = maroonBarWidth + wave;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(-10, 0);
      ctx.closePath();

      // Rich 3D velvet maroon gradient
      const maroonGrad = ctx.createLinearGradient(0, height * 0.5, maroonBarWidth + 20, height * 0.5);
      maroonGrad.addColorStop(0, '#350402');      // Midnight Maroon
      maroonGrad.addColorStop(0.25, '#540805');   // Deep Burgundy
      maroonGrad.addColorStop(0.6, '#750e08');    // Rich Velvet Maroon
      maroonGrad.addColorStop(0.85, '#91160e');   // Luminous Crimson Crest
      maroonGrad.addColorStop(1, '#4a0805');      // Edge Shadow Seam

      ctx.fillStyle = maroonGrad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 6;
      ctx.fill();

      // Subtle gold-kissed inner sheen line along the crest of the extra wavy maroon bar
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(242, 234, 211, 0.28)';
      ctx.stroke();
      ctx.restore();

      // 2. Continuous Soft Specular Sheen Moving Across the Undulating Waves
      const sheenX = ((Math.sin(time * 0.6) + 1) / 2) * (width * 1.3) - width * 0.15;
      const sheenGrad = ctx.createRadialGradient(
        sheenX,
        height * 0.45,
        10,
        sheenX,
        height * 0.45,
        width * 0.65
      );
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      sheenGrad.addColorStop(0.4, 'rgba(255, 245, 230, 0.05)');
      sheenGrad.addColorStop(0.8, 'rgba(240, 230, 205, 0.01)');
      sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Warm Ambient Ruby Glow Pulse on Left Folds
      const rubyPulse = Math.sin(time * 1.4) * 0.08 + 0.18;
      const rubyGrad = ctx.createRadialGradient(width * 0.08, height * 0.35, 0, width * 0.08, height * 0.35, width * 0.45);
      rubyGrad.addColorStop(0, `rgba(180, 20, 10, ${rubyPulse})`);
      rubyGrad.addColorStop(0.65, 'rgba(63, 35, 5, 0.06)');
      rubyGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = rubyGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 
        High-Resolution Native Vector Wave Canvas with Extra Wavy Maroon Bar on Left:
        Guaranteed zero white bleed on the left edge with fluid harmonic drape.
      */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />

      {/* Static Left Edge Backup Scrim (Maroon Gradient Bar) to guarantee 100% solid opacity */}
      <div 
        className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-[#3b0503] via-[#5c0b07]/80 to-transparent pointer-events-none"
        aria-hidden="true" 
      />

      {/* Gentle Edge Scrim for Perfect Typography Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-[#F5F5F5]/15 pointer-events-none" />

      {/* Ultra-subtle fine-art tactile silk grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
};
