import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
    };

    const handleResize = () => {
      if (!canvas) return;
      // Cap DPR to 1.25 to prevent lag on 4K/retina displays while retaining pristine smoothness
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = canvas.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();

    // 24 Color stops mirroring the heroGrad gradient across the width
    const paletteStops = [
      { r: 105, g: 10, b: 6 },   // 0: Deep Maroon / Crimson #690A06
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
      { r: 245, g: 245, b: 245 },// 23: Clean Off-White
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
      if (!isVisible) return; // Zero CPU/GPU burn when scrolled away

      time += 0.016;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 0. Base Solid Gradient: 100% solid, zero transparency
      const bgGrad = ctx.createLinearGradient(0, 0, width, 0);
      bgGrad.addColorStop(0, '#690A06');
      bgGrad.addColorStop(0.2, '#3F2305');
      bgGrad.addColorStop(0.55, '#DFD7BF');
      bgGrad.addColorStop(0.85, '#F2EAD3');
      bgGrad.addColorStop(1, '#F5F5F5');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Fluted wave columns
      const columnCount = Math.max(16, Math.min(24, Math.floor(width / 60)));
      const colWidth = width / columnCount;

      // 16 steps produce an ultra-smooth curve while cutting draw overhead by 50%
      const stepsY = 16;
      const stepH = height / stepsY;

      // START FROM c = -4 AND END AT columnCount + 4
      const minCol = -4;
      const maxCol = columnCount + 4;
      const seamPoints: Map<number, { x: number; y: number }[]> = new Map();

      for (let c = minCol; c <= maxCol; c++) {
        const points: { x: number; y: number }[] = [];
        const baseColX = c * colWidth;

        for (let s = 0; s <= stepsY; s++) {
          const y = s * stepH;
          const wave1 = Math.sin(y * 0.006 + time * 1.5 + c * 0.38) * 14;
          const wave2 = Math.cos(y * 0.014 - time * 1.0 + c * 0.22) * 7;
          const mouseDisplace = Math.sin((y / height) * Math.PI) * (mouse.x - 0.5) * 14;

          const x = baseColX + wave1 + wave2 + mouseDisplace;
          points.push({ x, y });
        }
        seamPoints.set(c, points);
      }

      // Draw each column with 3D cylindrical lighting
      for (let c = minCol; c < maxCol; c++) {
        const leftPoints = seamPoints.get(c)!;
        const rightPoints = seamPoints.get(c + 1)!;
        const normalizedRatio = Math.max(0, Math.min(1, (c + 0.5) / columnCount));
        const colColor = getPaletteColor(normalizedRatio);

        ctx.beginPath();
        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
        for (let s = 1; s <= stepsY; s++) {
          const prev = leftPoints[s - 1];
          const curr = leftPoints[s];
          const midX = (prev.x + curr.x) * 0.5;
          const midY = (prev.y + curr.y) * 0.5;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(leftPoints[stepsY].x, leftPoints[stepsY].y);
        ctx.lineTo(rightPoints[stepsY].x, rightPoints[stepsY].y);

        for (let s = stepsY - 1; s >= 0; s--) {
          const prev = rightPoints[s + 1];
          const curr = rightPoints[s];
          const midX = (prev.x + curr.x) * 0.5;
          const midY = (prev.y + curr.y) * 0.5;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(rightPoints[0].x, rightPoints[0].y);
        ctx.closePath();

        const sampleY = height * 0.5;
        const xLeft = leftPoints[Math.floor(stepsY * 0.5)].x;
        const xRight = rightPoints[Math.floor(stepsY * 0.5)].x;

        const foldGrad = ctx.createLinearGradient(xLeft, sampleY, xRight, sampleY);
        const cLight = `rgb(${Math.min(255, Math.floor(colColor.r * 1.15))}, ${Math.min(255, Math.floor(colColor.g * 1.15))}, ${Math.min(255, Math.floor(colColor.b * 1.15))})`;
        const cBase = `rgb(${colColor.r}, ${colColor.g}, ${colColor.b})`;
        const cShadow = `rgb(${Math.floor(colColor.r * 0.85)}, ${Math.floor(colColor.g * 0.85)}, ${Math.floor(colColor.b * 0.85)})`;

        foldGrad.addColorStop(0, cShadow);
        foldGrad.addColorStop(0.35, cLight);
        foldGrad.addColorStop(0.85, cBase);
        foldGrad.addColorStop(1, cShadow);

        ctx.fillStyle = foldGrad;
        ctx.fill();

        ctx.lineWidth = 0.75;
        ctx.strokeStyle = `rgba(0, 0, 0, ${normalizedRatio < 0.4 ? 0.28 : 0.1})`;
        ctx.stroke();
      }

      // Specular sheen
      const sheenX = ((Math.sin(time * 0.5) + 1) * 0.5) * (width * 1.3) - width * 0.15;
      const sheenGrad = ctx.createRadialGradient(
        sheenX,
        height * 0.45,
        10,
        sheenX,
        height * 0.45,
        width * 0.65
      );
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      sheenGrad.addColorStop(0.5, 'rgba(255, 245, 230, 0.04)');
      sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause loop when Hero is out of view (saves massive CPU & battery)
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-[#F5F5F5]/15 pointer-events-none" />
    </div>
  );
};
