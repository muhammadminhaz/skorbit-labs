"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Horizontal Slats Transition */}
      <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`slat-${pathname}-${i}`}
            className="flex-1 w-full bg-neutral-900/10 backdrop-blur-md border-y border-white/5"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              times: [0, 0.4, 0.6, 1],
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.05,
            }}
            style={{ originX: i % 2 === 0 ? 0 : 1 }}
          />
        ))}
      </div>

      {/* Content Animation */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
