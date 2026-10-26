"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import createGlobe, { type Globe } from "cobe";

// Where the team works from. One point per country (its main city), joined by arcs.
const PLACES = [
  { id: "sa", label: "Saudi Arabia", location: [24.7136, 46.6753] },
  { id: "bd", label: "Bangladesh", location: [23.8103, 90.4125] },
  { id: "au", label: "Australia", location: [-33.8688, 151.2093] },
] as const satisfies readonly { id: string; label: string; location: [number, number] }[];

const CYAN: [number, number, number] = [126 / 255, 227 / 255, 1];
const BLUE: [number, number, number] = [47 / 255, 155 / 255, 224 / 255];

// Starts facing the three countries (centred near 100°E), then spins.
const START_PHI = Math.PI - ((100 * Math.PI) / 180 - Math.PI / 2);
const SPEED = 0.0025;

// Spinning cobe globe (WebGL, ~5 kB) with the team's countries marked and connected. Pauses off screen,
// holds still under prefers-reduced-motion. Labels follow the markers via CSS anchor positioning
// (cobe exposes --cobe-{id}); browsers without it just show the globe.
export default function TeamGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = wrap.offsetWidth;
    let phi = START_PHI;
    let visible = false;
    let raf = 0;
    let globe: Globe;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.16, 0.2, 0.26],
        markerColor: CYAN,
        glowColor: [0.12, 0.28, 0.42],
        markers: PLACES.map((p) => ({ id: p.id, location: p.location, size: 0.06 })),
        arcs: [
          { id: "sa-bd", from: PLACES[0].location, to: PLACES[1].location },
          { id: "bd-au", from: PLACES[1].location, to: PLACES[2].location },
          { id: "sa-au", from: PLACES[0].location, to: PLACES[2].location },
        ],
        arcColor: BLUE,
        arcWidth: 0.6,
        arcHeight: 0.25,
        markerElevation: 0.02,
      });
    } catch {
      return; // No WebGL: the section reads fine without the globe
    }

    const tick = () => {
      if (!reduce) phi += SPEED;
      globe.update({ phi });
      if (visible && !reduce) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    const ro = new ResizeObserver(() => {
      size = wrap.offsetWidth;
      globe.update({ width: size * dpr, height: size * dpr });
    });
    io.observe(wrap);
    ro.observe(wrap);
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <canvas
        ref={canvasRef}
        aria-label="A globe connecting Saudi Arabia, Bangladesh and Australia"
        role="img"
        className="size-full opacity-0 transition-opacity duration-1000"
      />
      {PLACES.map((p) => (
        <span
          key={p.id}
          aria-hidden
          className="pointer-events-none absolute mb-2 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-xs whitespace-nowrap text-white/90 backdrop-blur-sm transition-[opacity,filter] duration-300"
          style={
            {
              positionAnchor: `--cobe-${p.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              opacity: `var(--cobe-visible-${p.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${p.id}, 0)) * 6px))`,
            } as CSSProperties
          }
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
