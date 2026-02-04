"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Basic smooth scroll setup or Lenis integration would go here
    // For now, we'll just ensure GSAP ScrollTrigger is updated
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <div ref={contentRef}>{children}</div>;
}
