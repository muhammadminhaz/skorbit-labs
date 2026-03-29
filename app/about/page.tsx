"use client";

import Navbar from "@/components/Navbar";
import Introduction from "@/components/sections/Introduction";
import Footer from "@/components/sections/Footer";
import Philosophy from "@/components/sections/Philosophy";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-header-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white text-neutral-900 selection:bg-sky-100">
      <Navbar />
      
      {/* About Hero Section */}
      <section ref={headerRef} className="relative pt-40 pb-20 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto about-header-content">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full border-white/10 bg-white/5 text-sky-400">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            Driven by <br />
            <span className="text-sky-400 italic">Purpose.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Skorbit Labs is a creative powerhouse dedicated to building digital futures. We merge strategic thinking with technical excellence to deliver products that matter.
          </p>
        </div>
      </section>

      <Introduction />
      <Philosophy />
      
      <Footer />
    </main>
  );
}
