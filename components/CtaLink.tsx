"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, type LucideIcon } from "lucide-react";
import { motionTokens } from "@/components/arc/motion-tokens";
import styles from "@/components/arc/button.module.css";

const MotionLink = motion.create(Link);

// Arc's Button renders a <button>; CTAs navigate, so this applies the same base styles and press spring to a Link
// (or to a submit button when there is no href).
// Effects live in globals.css (.cta-*): primary gets an orbiting border beam, pulse glow and a periodic shine;
// secondary is glass with a lit border and an arrow that swaps out on hover.
export default function CtaLink({ href, variant = "primary", icon: Icon = CalendarDays, className = "", children }: {
  href?: string;
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const primary = variant === "primary";
  const shared = {
    className: `group ${styles.button} ${styles[variant]} ${styles.lg} ${primary ? "cta-primary" : "cta-secondary"} ${className}`,
    whileHover: reduceMotion ? undefined : { scale: 1.03 },
    whileTap: reduceMotion ? undefined : { scale: 0.97 },
    transition: motionTokens.spring.snappy,
  };
  const inner = (
    <>
      {primary && <span aria-hidden className="cta-shine" />}
      <span className="relative inline-flex items-center gap-2.5">
        {primary && <Icon aria-hidden className="cta-cal size-[1.15em]" strokeWidth={2} />}
        {children}
        {!primary && (
          <span aria-hidden className="relative inline-grid size-[1.1em] overflow-hidden">
            <ArrowUpRight className="cta-arrow size-full" strokeWidth={2} />
            <ArrowUpRight className="cta-arrow cta-arrow-in size-full" strokeWidth={2} />
          </span>
        )}
      </span>
    </>
  );

  return href
    ? <MotionLink href={href} {...shared}>{inner}</MotionLink>
    : <motion.button type="submit" {...shared}>{inner}</motion.button>;
}
