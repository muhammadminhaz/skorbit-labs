"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate, type Variants } from "framer-motion";
import { Sparkles, Globe, Smartphone, BarChart3, TrendingUp, Users, CalendarCheck, KeyRound } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;
const steps = ["Strategy", "Design", "Build", "Launch", "Grow"];
const STEP_GAP = 0.32;
const bars = [38, 52, 44, 68, 60, 82, 74, 96];
const prompt = "Which products run out this week?";

const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, delay: i * 0.08, ease } }),
};
const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease } },
});

const cardClass =
  "relative overflow-hidden rounded-3xl border border-white/[0.07] transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/15";

function CardHead({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{body}</p>
    </div>
  );
}

/* One team: a progress line runs through the stages and each one switches on as it is reached. */
function Pipeline() {
  return (
    <div className="relative">
      <div className="absolute left-[10%] right-[10%] top-[11px] h-px bg-white/10" />
      <motion.div
        className="absolute left-[10%] right-[10%] top-[11px] h-px bg-sky-400 origin-left"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: STEP_GAP * (steps.length - 1), delay: 0.5, ease: "linear" } } }}
      />
      <ol className="relative grid grid-cols-5">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center gap-3">
            <motion.span
              className="grid place-items-center w-[23px] h-[23px] rounded-full border"
              variants={{
                hidden: { backgroundColor: "#0b1118", borderColor: "rgba(255,255,255,0.15)", scale: 1 },
                show: {
                  backgroundColor: "#38bdf8",
                  borderColor: "#38bdf8",
                  scale: [1, 1.25, 1],
                  transition: { delay: 0.5 + i * STEP_GAP, duration: 0.45 },
                },
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b1118]" />
            </motion.span>
            <motion.span
              className="text-[11px] sm:text-sm font-medium font-label"
              variants={{ hidden: { color: "#737373" }, show: { color: "#e0f2fe", transition: { delay: 0.5 + i * STEP_GAP, duration: 0.3 } } }}
            >
              {step}
            </motion.span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* AI: a question types itself, then a grounded answer arrives. */
function AiChat() {
  const typeStart = 0.5;
  const perChar = 0.025;
  const answerAt = typeStart + prompt.length * perChar + 0.3;
  return (
    <div className="flex flex-col gap-2.5 text-sm">
      <div className="self-end max-w-[90%] rounded-2xl rounded-br-md bg-white/[0.06] border border-white/10 px-4 py-2.5 text-neutral-200">
        {prompt.split("").map((ch, i) => (
          <motion.span key={i} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: typeStart + i * perChar, duration: 0.01 } } }}>
            {ch}
          </motion.span>
        ))}
      </div>
      <motion.div
        variants={fadeUp(answerAt)}
        className="self-start w-full max-w-[90%] rounded-2xl rounded-bl-md bg-sky-400/[0.08] border border-sky-400/20 px-4 py-3 flex flex-col gap-2"
      >
        {[
          ["Rice 5 kg", "3 days left"],
          ["Eggs, tray of 30", "5 days left"],
        ].map(([item, left], i) => (
          <motion.div key={item} variants={fadeUp(answerAt + 0.2 + i * 0.15)} className="flex justify-between gap-4 text-sky-100">
            <span>{item}</span>
            <span className="text-sky-300 font-label">{left}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* Web: the page assembles and the performance score counts up. */
function BrowserScore({ reduceMotion }: { reduceMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const score = useMotionValue(reduceMotion ? 100 : 0);
  const rounded = useTransform(score, (v) => Math.round(v));
  const ring = useTransform(score, (v) => v / 100);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(score, 100, { duration: 1.6, delay: 0.6, ease });
    return () => controls.stop();
  }, [inView, reduceMotion, score]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="flex-1 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
        <div className="flex gap-1 px-3 py-2 border-b border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
        <div className="p-3 flex flex-col gap-1.5">
          {[70, 45, 90, 60].map((w, i) => (
            <motion.span
              key={i}
              className="h-1.5 rounded-full bg-white/15 origin-left"
              style={{ width: `${w}%` }}
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.5 + i * 0.12, duration: 0.6, ease } } }}
            />
          ))}
        </div>
      </div>
      <div className="relative w-16 h-16 shrink-0" aria-label="Performance score 100">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <motion.circle cx="32" cy="32" r="27" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" style={{ pathLength: ring }} />
        </svg>
        <motion.span className="absolute inset-0 grid place-items-center text-base font-semibold text-white font-label">{rounded}</motion.span>
      </div>
    </div>
  );
}

/* Mobile: two platforms slide in from opposite sides and meet on one codebase. */
function Phones() {
  const phone = "w-14 h-24 rounded-[14px] border-2 border-white/20 bg-[#0b1118] p-1.5 flex flex-col gap-1";
  const screen = (
    <>
      <span className="h-1 w-5 mx-auto rounded-full bg-white/20" />
      <span className="flex-1 rounded-md bg-sky-400/20" />
      <span className="h-2 rounded bg-white/10" />
    </>
  );
  return (
    <div className="flex items-end justify-center gap-3">
      <motion.div className="flex flex-col items-center gap-2" variants={{ hidden: { x: -40, opacity: 0, rotate: -8 }, show: { x: 0, opacity: 1, rotate: -4, transition: { delay: 0.5, duration: 0.8, ease } } }}>
        <div className={phone}>{screen}</div>
        <span className="text-xs text-neutral-500 font-label">iOS</span>
      </motion.div>
      <motion.span
        className="mb-12 px-2.5 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-[11px] font-semibold text-sky-300 font-label whitespace-nowrap"
        variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay: 1.2, type: "spring", stiffness: 400, damping: 18 } } }}
      >
        1 codebase
      </motion.span>
      <motion.div className="flex flex-col items-center gap-2" variants={{ hidden: { x: 40, opacity: 0, rotate: 8 }, show: { x: 0, opacity: 1, rotate: 4, transition: { delay: 0.5, duration: 0.8, ease } } }}>
        <div className={phone}>{screen}</div>
        <span className="text-xs text-neutral-500 font-label">Android</span>
      </motion.div>
    </div>
  );
}

/* Data: bars grow, then the one that needs action gets called out. */
function Bars() {
  const last = bars.length - 1;
  return (
    <div className="relative pt-9">
      <motion.span
        className="absolute top-0 right-0 px-2.5 py-1 rounded-full bg-sky-400 text-[11px] font-semibold text-neutral-950 font-label whitespace-nowrap"
        variants={{ hidden: { opacity: 0, y: 8, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.5 + bars.length * 0.07 + 0.3, type: "spring", stiffness: 400, damping: 20 } } }}
      >
        Restock now
      </motion.span>
      <div aria-hidden className="flex items-end gap-1.5 h-24">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={`w-3 sm:w-3.5 rounded-t-sm origin-bottom ${i === last ? "bg-sky-300" : "bg-sky-500/35"}`}
            style={{ height: `${h}%` }}
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { delay: 0.5 + i * 0.07, duration: 0.7, ease } } }}
          />
        ))}
      </div>
    </div>
  );
}

/* Growth: the trend line draws after launch and keeps climbing. */
function GrowthLine() {
  const d = "M0 70 L25 62 L50 66 L75 48 L100 52 L125 30 L160 10";
  return (
    <svg aria-hidden viewBox="0 -6 166 90" className="w-40 h-20">
      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L160 80 L0 80 Z`}
        fill="url(#growth-fill)"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.5, duration: 0.6 } } }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="rgb(125 211 252)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay: 0.5, duration: 1.2, ease: "easeInOut" } } }}
      />
      <motion.circle
        cx="160"
        cy="10"
        r="4"
        fill="rgb(125 211 252)"
        variants={{ hidden: { scale: 0 }, show: { scale: [0, 1.6, 1], transition: { delay: 1.7, duration: 0.5 } } }}
      />
    </svg>
  );
}

export default function Capabilities() {
  const reduceMotion = useReducedMotion();
  const inView = {
    initial: reduceMotion ? ("show" as const) : ("hidden" as const),
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <section id="capabilities" className="relative z-20 py-24 md:py-32 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div {...inView} variants={fadeUp(0)} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-sky-400 font-label">Capabilities</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-blue-50 to-blue-300 max-w-2xl">
              Everything a product needs, under one roof
            </h2>
          </div>
          <p className="text-lg text-neutral-400 max-w-sm md:text-right">
            Strategy, design, engineering and growth in one senior team. Brief us once and we ship end to end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.article {...inView} variants={card} custom={0} className={`${cardClass} bg-[#0b1118] md:col-span-2 lg:row-span-2 p-7 md:p-10 flex flex-col justify-between gap-10`}>
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-sky-400 font-label">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                End to end
              </span>
              <h3 className="text-2xl md:text-4xl font-semibold text-white leading-tight max-w-md">One team from first sketch to scale</h3>
              <p className="text-neutral-400 leading-relaxed max-w-md">
                No handoffs between agencies. The people who scope your product are the people who build and ship it.
              </p>
            </div>

            <Pipeline />

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
              {[
                { icon: Users, label: "Senior people only" },
                { icon: CalendarCheck, label: "Weekly demos" },
                { icon: KeyRound, label: "You own the code" },
              ].map(({ icon: Icon, label }, i) => (
                <motion.li key={label} variants={fadeUp(0.5 + STEP_GAP * steps.length + i * 0.12)} className="flex items-center gap-2.5 text-sm text-neutral-300">
                  <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                  {label}
                </motion.li>
              ))}
            </ul>
          </motion.article>

          <motion.article {...inView} variants={card} custom={1} className={`${cardClass} bg-[#0f0f12] md:col-span-2 p-7 md:p-8 grid sm:grid-cols-2 gap-6 items-center`}>
            <CardHead icon={Sparkles} title="AI that earns its place" body="Assistants, search and automation built on your own data, with guardrails and costs you can predict." />
            <AiChat />
          </motion.article>

          <motion.article {...inView} variants={card} custom={2} className={`${cardClass} bg-[#0f0f12] p-7 md:p-8 flex flex-col justify-between gap-6`}>
            <CardHead icon={Globe} title="Web platforms" body="Fast, accessible web apps and dashboards." />
            <BrowserScore reduceMotion={reduceMotion} />
          </motion.article>

          <motion.article {...inView} variants={card} custom={3} className={`${cardClass} bg-[#0f0f12] p-7 md:p-8 flex flex-col justify-between gap-6`}>
            <CardHead icon={Smartphone} title="Mobile apps" body="Native feel on iOS and Android from one codebase." />
            <Phones />
          </motion.article>

          <motion.article {...inView} variants={card} custom={4} className={`${cardClass} bg-[#0f0f12] md:col-span-2 p-7 md:p-8 grid sm:grid-cols-[1fr_auto] items-end gap-6`}>
            <CardHead icon={BarChart3} title="Data you can act on" body="Dashboards and reports that turn sales and usage into a clear next step." />
            <Bars />
          </motion.article>

          <motion.article {...inView} variants={card} custom={5} className={`${cardClass} bg-[#0f0f12] md:col-span-2 p-7 md:p-8 grid sm:grid-cols-[1fr_auto] items-end gap-6`}>
            <CardHead icon={TrendingUp} title="Launch and growth" body="SEO, analytics and campaigns that keep momentum going after launch day." />
            <GrowthLine />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
