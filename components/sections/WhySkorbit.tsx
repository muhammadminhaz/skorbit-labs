"use client";

import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const reasons = [
  {
    title: "Full-stack execution",
    body: "Strategy, design, development and launch. One team, zero handoffs. You brief us once; we deliver end to end.",
  },
  {
    title: "Speed without shortcuts",
    body: "Rapid delivery cycles with none of the usual agency drag. First versions ship fast, and keep getting better.",
  },
  {
    title: "Senior talent, directly",
    body: "Work with practitioners, not junior teams managed from afar. The people who pitch the work are the ones who ship it.",
  },
  {
    title: "Built to scale",
    body: "Products designed to grow with your ambitions, not need replacing. Every system we build is a foundation.",
  },
];

function ReasonCard({
  reason,
  index,
  reduceMotion,
}: {
  reason: (typeof reasons)[0];
  index: number;
  reduceMotion: boolean | null;
}) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Subtle fill glow that follows the cursor
  const fillGradient = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.07), transparent 60%)`;

  // Border spotlight
  const borderGradient = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.45), transparent 60%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const isFeatured = index === 0;

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col min-h-[300px] md:min-h-[360px] overflow-hidden ${
        isFeatured ? "bg-[#070d14]" : "bg-neutral-950"
      }`}
    >
      {/* Cursor fill glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: fillGradient }}
      />

      {/* Border spotlight (clip trick) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          padding: "1px",
          background: borderGradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      {/* Watermark ordinal — extreme right edge */}
      <span
        aria-hidden
        className="absolute -bottom-6 right-4 text-[9rem] font-bold leading-none select-none pointer-events-none text-white/[0.025] group-hover:text-sky-300/[0.06] transition-colors duration-700 z-0"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between h-full p-10 md:p-12 gap-8">

        {/* Top: featured sky-dot or plain spacer */}
        <div className="flex items-start justify-between">
          {isFeatured ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
              Flagship capability
            </span>
          ) : (
            <div />
          )}
          <ArrowUpRight
            className="w-4 h-4 text-neutral-700 group-hover:text-sky-400 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </div>

        {/* Bottom: accent line + title + body */}
        <div className="flex flex-col gap-4">
          {/* Animated expanding accent line */}
          <div className="relative h-px w-full overflow-hidden bg-white/[0.06]">
            <div className="absolute inset-y-0 left-0 w-full bg-sky-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-sky-50 transition-colors duration-300 leading-snug">
            {reason.title}
          </h3>

          <p className="text-neutral-500 text-sm md:text-base leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">
            {reason.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhySkorbit() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-skorbit"
      className="relative z-20 py-24 md:py-36 bg-neutral-950 text-white overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* Header: headline left, subtext bottom-right */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Built different,<br />by design.
          </h2>
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xs md:max-w-xs md:text-right">
            Not a vendor you manage. The team that ships your vision.
          </p>
        </motion.div>

        {/* 2x2 grid — 1px gap separator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]">
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>

      </div>
    </section>
  );
}
