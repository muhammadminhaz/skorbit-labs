"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import CtaLink from "@/components/CtaLink";
import { motionTokens } from "@/components/arc/motion-tokens";
import { FAQS } from "@/lib/faqs";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];

function Item({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  const reduce = useReducedMotion();
  return (
    <li className={`rounded-xl border transition-colors duration-300 ${open ? "border-[#7ee3ff]/30 bg-white/[0.04]" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-4 text-left md:px-6 md:py-5"
        >
          <span className={`text-base transition-colors md:text-lg ${open ? "text-white" : "text-white/85"}`}>{q}</span>
          <span
            aria-hidden
            className={`grid size-8 shrink-0 place-items-center rounded-full border transition-[rotate,color,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${open ? "rotate-45 border-[#7ee3ff]/50 text-[#7ee3ff]" : "border-white/15 text-white/70"}`}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      {/* Always mounted so every answer is in the server HTML; inert keeps closed answers out of tab order and the accessibility tree */}
      <motion.div
        id={id}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        // Reduced motion: fade only, height snaps (after the fade when closing)
        transition={reduce ? { duration: 0.35, ease, height: { duration: 0, delay: open ? 0 : 0.35 } } : { duration: 0.35, ease }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 leading-relaxed text-(--fg-muted) md:px-6 md:pb-6">{a}</p>
      </motion.div>
    </li>
  );
}

export default function FAQ() {
  // The contact section is on the same page only on home and /contact
  const pathname = usePathname();
  const contactHref = pathname === "/" || pathname === "/contact" ? "#contact" : "/contact";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="faq" className="relative border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <motion.div {...fadeUp()} className="mb-14 flex flex-col gap-4 md:mb-16">
          <h2 className="text-4xl leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-6xl">FAQ</h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
          {/* Mobile: questions first, help card after */}
          <motion.aside
            {...fadeUp(0.1)}
            className="relative order-2 flex min-h-72 flex-col justify-end gap-5 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(47,155,224,0.22),transparent_65%)] p-7 md:p-8 lg:order-1 lg:min-h-0"
          >
            <Image src="/images/dark_theme_logo.svg" alt="" width={374} height={455} className="pointer-events-none absolute -top-6 -right-6 h-56 w-auto opacity-25 md:h-72" />
            <div className="relative">
              <h3 className="mb-2 text-2xl tracking-[-0.01em] md:text-3xl">Still have questions?</h3>
              <p className="max-w-sm leading-relaxed text-(--fg-muted)">
                Can&apos;t find what you&apos;re looking for? Talk to the team and we&apos;ll get you a straight answer.
              </p>
            </div>
            <CtaLink href={contactHref} variant="secondary" className="relative self-start">Contact us</CtaLink>
          </motion.aside>

          <motion.ul {...fadeUp(0.2)} className="order-1 flex flex-col gap-3 lg:order-2">
            {FAQS.map((f, i) => (
              <Item key={f.q} {...f} id={`faq-${i}`} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
