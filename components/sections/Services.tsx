"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import CtaLink from "@/components/CtaLink";
import { motionTokens } from "@/components/arc/motion-tokens";
import { SERVICE_ROWS } from "@/lib/services";


const ease = [...motionTokens.ease.enter] as [number, number, number, number];

// Each card is a step lighter than the one before, so the stack reads as depth on the dark theme.
const SHADES = ["#0a0c11", "#0c1015", "#0e1319", "#10161d", "#121a22"];
const DISCOVER_SHADE = "#141d26";
// The old "Discover all capabilities" row's photo
const DISCOVER_IMAGE = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=75&w=1600&auto=format&fit=crop";

// Desktop stacking: card i sticks STACK_TOP + i * PEEK below the viewport top, so each later card
// slides over the earlier ones and leaves a PEEK-tall strip of each showing. Each card's header row is
// exactly PEEK tall, so a stacked strip always shows the full title and number. The closing card takes
// the next slot, so it lands under the stack instead of covering it, and then everything leaves together.
const STACK_TOP = 112; // clears the collapsed navbar
const PEEK = 96;
const CARD_H = 416; // lg card height (26rem); fixed so the exit math below holds

// Sticky cards are pushed out one by one, deepest bottom edge first, so on exit later cards would slide
// over earlier ones. Extending every card's margin box down to the same line (the closing card's bottom)
// makes the container push them all at once; a matching negative top margin on the next card cancels
// the extra space, so layout is unchanged. Needs a flex column (no margin collapsing).
// Clicking a stacked card pushes every later card down by EXPAND, revealing it in full.
const EXPAND = CARD_H - PEEK;

const stackMargins = (i: number, count: number) => ({
  marginTop: i === 0 ? 0 : -(count - i + 1) * PEEK, // cancels the previous card's marginBottom
  marginBottom: (count - i) * PEEK,
});

export default function Services() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  // Scrolling away restores the plain stack, so the exit math (stackMargins) is never fighting an expansion.
  // Small scrolls are ignored: focusing a card can scroll the page a few pixels, which must not undo Enter.
  const openedAt = useRef(0);
  useEffect(() => {
    if (expanded === null) return;
    openedAt.current = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - openedAt.current) > 120 && setExpanded(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  // Later cards slide down by EXPAND. A transform (not the sticky `top`) so it works while the stack rests
  // and while it is leaving, when the container end, not `top`, decides where cards sit.
  const shift = (i: number): React.CSSProperties =>
    expanded !== null && i > expanded ? { transform: `translateY(${EXPAND}px)` } : {};

  // Click (or Enter/Space) toggles a card open, desktop only and only once the stack has formed:
  // every card packed PEEK apart, wherever the stack currently sits (resting or leaving).
  const toggle = (i: number) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (expanded !== null) return setExpanded(expanded === i ? null : i);
    const cards = listRef.current?.children;
    const first = cards?.[0]?.getBoundingClientRect().top;
    const closing = cards?.[SERVICE_ROWS.length]?.getBoundingClientRect().top;
    if (first !== undefined && closing !== undefined && Math.abs(closing - first - SERVICE_ROWS.length * PEEK) < 2) setExpanded(i);
  };
  const fadeUp = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.8, ease },
  };

  return (
    <section id="services" className="relative overflow-clip border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-4xl px-6 pt-24 pb-16 md:px-12 md:pt-32 md:pb-20">
          <h2 className="mb-6 text-4xl tracking-[-0.02em] md:text-5xl lg:text-6xl">Services</h2>
          <p className="max-w-2xl text-xl leading-relaxed text-(--fg-muted)">
            We combine strategy, design and technology to build products, then market them so they reach the people they were made for.
          </p>
        </motion.div>

        <ol
          ref={listRef}
          className="flex flex-col"
        >
          {SERVICE_ROWS.map((service, i) => (
            <li
              key={service.title}
              className="border-t border-white/10 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.7)] lg:sticky lg:cursor-pointer lg:transition-transform lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                backgroundColor: SHADES[i],
                top: STACK_TOP + i * PEEK,
                ...shift(i),
                ...stackMargins(i, SERVICE_ROWS.length),
                "--peek": `${PEEK}px`,
                "--card-h": `${CARD_H}px`,
              } as React.CSSProperties}
            >
              {/* The whole card is clickable; the title's button is the keyboard and screen-reader control
                  (its click bubbles here), and the ring wraps the card while it has focus */}
              <article
                onClick={() => toggle(i)}
                className="grid gap-8 rounded-sm p-6 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-[#7ee3ff]/60 md:p-8 lg:h-(--card-h) lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-6 lg:pt-0 lg:pb-6 lg:pr-12">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 lg:mt-6 lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover brightness-[0.8] saturate-[0.85]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-[#2f9be0]/15 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col gap-6 lg:gap-2">
                  <div className="flex items-start justify-between gap-6 lg:h-(--peek) lg:items-center">
                    <h3 className={`text-3xl leading-tight tracking-[-0.02em] transition-colors duration-500 md:text-4xl lg:text-[2.75rem] ${expanded === i ? "text-[#7ee3ff]" : "text-white"}`}>
                      <button type="button" aria-expanded={expanded === i} className="text-left outline-none lg:cursor-pointer">
                        {service.title}
                      </button>
                    </h3>
                    <span className="text-3xl leading-none text-white/30 tabular-nums md:text-4xl lg:text-[2.75rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="max-w-xl text-lg leading-relaxed text-(--fg-muted)">{service.description}</p>
                </div>
              </article>
            </li>
          ))}

          {/* Closing card: takes the next slot in the stack */}
          <li
            className="border-t border-white/10 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.7)] lg:sticky lg:transition-transform lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              backgroundColor: DISCOVER_SHADE,
              top: STACK_TOP + SERVICE_ROWS.length * PEEK,
              ...shift(SERVICE_ROWS.length),
              ...stackMargins(SERVICE_ROWS.length, SERVICE_ROWS.length),
              "--card-h": `${CARD_H}px`,
            } as React.CSSProperties}
          >
            <div className="grid gap-8 p-6 pb-16 md:p-8 md:pb-20 lg:h-(--card-h) lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-6 lg:pt-0 lg:pb-6 lg:pr-12">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 lg:mt-6 lg:aspect-auto lg:min-h-[22rem]">
                <Image src={DISCOVER_IMAGE} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover brightness-[0.8] saturate-[0.85]" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-[#2f9be0]/15 via-transparent to-transparent" />
              </div>
              <motion.div {...fadeUp} className="flex flex-col items-start gap-10 lg:pt-5">
                <p className="max-w-2xl text-3xl leading-[1.2] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
                  Discover all our capabilities and how we turn ideas into products that <span className="text-[#7ee3ff]">grow.</span>
                </p>
                <CtaLink href="/services" variant="secondary">What we do</CtaLink>
              </motion.div>
            </div>
          </li>

          {/* Hold: keeps the finished stack in place for a stretch of scrolling (time to read and hover) before it all leaves together */}
          <li aria-hidden className="hidden h-[40vh] lg:block" />
        </ol>
      </div>
    </section>
  );
}
