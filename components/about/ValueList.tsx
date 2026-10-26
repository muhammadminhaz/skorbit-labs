"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { motionTokens } from "@/components/arc/motion-tokens";
import type { SplitItem } from "@/components/SplitSection";

// Large one-line titles split by hairlines; each opens to show what it means in practice.
// Mouse: hovering a row opens it, leaving the list closes it. Touch and keyboard: click toggles.
export default function ValueList({ items }: { items: SplitItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <ul className="border-b border-white/10" onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.title} className="border-t border-white/10" onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}>
            <h4>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className={`text-2xl leading-tight tracking-[-0.01em] transition-colors md:text-4xl ${isOpen ? "text-[#7ee3ff]" : "text-white group-hover:text-[#7ee3ff]"}`}>
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[rotate,color,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${isOpen ? "rotate-45 border-[#7ee3ff]/50 text-[#7ee3ff]" : "border-white/15 text-white/70"}`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={motionTokens.spring.smooth}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl pb-7 text-lg leading-relaxed text-(--fg-muted)">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
