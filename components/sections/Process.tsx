"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { Check } from "lucide-react";
import { motionTokens } from "@/components/arc/motion-tokens";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];
const CYAN = "#7ee3ff";
const BLUE = "#2f9be0";

// Plays `to` once when scrolled into view; under reduced motion it starts at `to`.
function useReveal() {
  const reduce = useReducedMotion();
  return (from: TargetAndTransition, to: TargetAndTransition, transition: Transition = {}) => ({
    initial: reduce ? to : from,
    whileInView: to,
    viewport: { once: true, margin: "-15% 0px" },
    transition: { duration: 0.7, ease, ...transition },
  });
}

// ---------- Step visuals (illustrative mockups, built in code) ----------

function BriefVisual() {
  const reveal = useReveal();
  const rows = ["Business goals", "Target audience", "Market & competitors", "Roadmap"];
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0e131a] p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-white/80">Project brief</span>
          <span className="rounded-full bg-[#2f9be0]/15 px-2 py-0.5 text-[10px] text-[#7ee3ff]">Discovery</span>
        </div>
        <ul className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <motion.li
              key={row}
              {...reveal({ opacity: 0, x: -12 }, { opacity: 1, x: 0 }, { delay: 0.15 + i * 0.15 })}
              className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/70"
            >
              <motion.span
                {...reveal({ scale: 0 }, { scale: 1 }, { delay: 0.35 + i * 0.15, type: "spring", bounce: 0.5, duration: 0.5 })}
                className="grid size-4 place-items-center rounded-full bg-[#7ee3ff] text-[#07080b]"
              >
                <Check className="size-2.5" strokeWidth={3} />
              </motion.span>
              {row}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WireframeVisual() {
  const reveal = useReveal();
  const stats = [["Visitors", "7,030"], ["Sign-ups", "2,529"], ["Active", "980"]];
  const bars = [38, 55, 30, 70, 48, 85, 62, 92];
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-white/15" />)}
        <span className="ml-2 h-2 w-24 rounded-full bg-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map(([label, value], i) => (
          <motion.div
            key={label}
            {...reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 }, { delay: 0.1 + i * 0.1 })}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
          >
            <div className="text-[10px] text-white/45">{label}</div>
            <div className="text-sm text-white tabular-nums">{value}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            {...reveal({ scaleY: 0 }, { scaleY: 1 }, { delay: 0.35 + i * 0.06 })}
            style={{ height: `${h}%` }}
            className={`flex-1 origin-bottom rounded-sm ${i === bars.length - 1 ? "bg-[#7ee3ff]" : "bg-[#2f9be0]/45"}`}
          />
        ))}
      </div>
    </div>
  );
}

function CodeVisual() {
  const reveal = useReveal();
  const lines: [number, string][] = [
    [0, "export async function launch() {"],
    [1, "const build = await compile(app);"],
    [1, "await test(build, { coverage: true });"],
    [1, "await deploy(build, \"production\");"],
    [1, "return monitor(build);"],
    [0, "}"],
  ];
  return (
    <div className="relative flex h-full flex-col p-5">
      <div className="mb-2 flex items-center justify-between rounded-md bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/45">
        <span>src/launch.ts</span>
        <span className="text-[#7ee3ff]">main</span>
      </div>
      <pre className="flex-1 overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14] p-3 font-mono text-[11px] leading-relaxed">
        {lines.map(([indent, code], i) => (
          <motion.div key={i} {...reveal({ opacity: 0 }, { opacity: 1 }, { delay: 0.1 + i * 0.18, duration: 0.3 })} className="flex gap-3">
            <span className="w-3 text-right text-white/25 select-none">{i + 1}</span>
            <span className="text-white/75" style={{ paddingLeft: indent * 16 }}>
              {code.split(/(\bawait\b|\bexport\b|\basync\b|\bfunction\b|\bconst\b|\breturn\b|"[^"]*")/).map((part, k) =>
                /^(await|export|async|function|const|return)$/.test(part) ? <span key={k} className="text-[#7ee3ff]">{part}</span>
                : part.startsWith('"') ? <span key={k} className="text-[#f6c177]">{part}</span>
                : part,
              )}
            </span>
          </motion.div>
        ))}
      </pre>
      <motion.span
        {...reveal({ opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0 }, { delay: 1.3, type: "spring", bounce: 0.4, duration: 0.6 })}
        className="absolute right-8 bottom-9 rounded-full border border-[#7ee3ff]/40 bg-[#07080b]/90 px-3.5 py-1.5 font-mono text-xs text-[#7ee3ff] shadow-[0_0_24px_-6px_rgba(126,227,255,0.7)] backdrop-blur-sm"
      >
        {"< Deploy >"}
      </motion.span>
    </div>
  );
}

function GrowthVisual() {
  const reveal = useReveal();
  const path = "M 10 150 C 80 145, 120 130, 170 110 S 260 60, 300 22";
  return (
    <div className="relative h-full p-5">
      <svg viewBox="0 0 320 170" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 80, 120].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />)}
        <motion.path d={`${path} L 300 170 L 10 170 Z`} fill="url(#growth-fill)" {...reveal({ opacity: 0 }, { opacity: 1 }, { delay: 0.8, duration: 0.8 })} />
        <motion.path d={path} fill="none" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" {...reveal({ pathLength: 0 }, { pathLength: 1 }, { duration: 1.4, ease: "easeInOut" })} />
        <motion.circle cx="300" cy="22" r="6" fill={CYAN} {...reveal({ scale: 0 }, { scale: 1 }, { delay: 1.35, type: "spring", bounce: 0.5, duration: 0.5 })} />
        <motion.circle cx="300" cy="22" r="6" fill="none" stroke={CYAN} {...reveal({ scale: 1, opacity: 0 }, { scale: [1, 3], opacity: [0.8, 0] }, { delay: 1.5, duration: 1.6, repeat: Infinity, ease: "easeOut" })} />
      </svg>
      <motion.div
        {...reveal({ opacity: 0, y: 10 }, { opacity: 1, y: 0 }, { delay: 1.1 })}
        className="absolute top-6 left-6 rounded-lg border border-[#7ee3ff]/40 bg-[#07080b]/90 px-3 py-2 shadow-[0_0_24px_-8px_rgba(126,227,255,0.6)]"
      >
        <div className="text-sm text-[#7ee3ff] tabular-nums">Growth</div>
        <div className="text-[10px] text-white/50">Traffic · Leads · Revenue</div>
      </motion.div>
    </div>
  );
}

const STEPS = [
  {
    title: "Discovery & Strategy",
    body: "We dig into your goals, audience and market to build a clear roadmap before anything gets made.",
    Visual: BriefVisual,
  },
  {
    title: "Design & Prototyping",
    body: "Insights become user-focused designs and clickable prototypes you can test before a line of code.",
    Visual: WireframeVisual,
  },
  {
    title: "Development & Launch",
    body: "Clean, scalable code, tested thoroughly and launched without drama.",
    Visual: CodeVisual,
  },
  {
    title: "Growth & Optimization",
    body: "After launch we market, measure and refine, so your product keeps finding people and keeps growing.",
    Visual: GrowthVisual,
  },
];

export default function Process() {
  const reveal = useReveal();

  return (
    <section id="process" className="relative border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <motion.div {...reveal({ opacity: 0, y: 30 }, { opacity: 1, y: 0 })} className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <h2 className="mb-6 text-4xl leading-[1.1] tracking-[-0.02em] text-balance md:text-5xl lg:text-6xl">Process</h2>
          <p className="text-lg leading-relaxed text-(--fg-muted) text-pretty">
            A streamlined approach to turning your ideas into reality, from the first conversation to launch and the growth that follows.
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {STEPS.map(({ title, body, Visual }, i) => (
            <motion.li
              key={title}
              {...reveal({ opacity: 0, y: 40 }, { opacity: 1, y: 0 }, { delay: (i % 2) * 0.1 })}
              className="group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-2.5 transition-colors duration-500 hover:border-[#7ee3ff]/30"
            >
              <div className="relative h-60 overflow-hidden rounded-xl border border-white/[0.06] bg-[radial-gradient(ellipse_at_top,rgba(47,155,224,0.12),transparent_70%)] md:h-64">
                <Visual />
              </div>
              <div className="flex flex-col items-start gap-3 px-3.5 pt-5 pb-4">
                <span className="rounded-full border border-[#7ee3ff]/35 bg-[#2f9be0]/10 px-3 py-1 text-sm text-[#7ee3ff] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl tracking-[-0.01em] text-white">{title}</h3>
                <p className="max-w-md leading-relaxed text-(--fg-muted)">{body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
