"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/components/arc/motion-tokens";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];

// The sections' fade-up on scroll, as a wrapper so server-rendered pages can use it.
export default function Reveal({ delay = 0, className, children }: { delay?: number; className?: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
