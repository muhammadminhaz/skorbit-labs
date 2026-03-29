"use client";

import Navbar from "@/components/Navbar";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Footer from "@/components/sections/Footer";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header-content > *", {
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
      
      {/* Services Hero Section */}
      <section ref={headerRef} className="relative pt-40 pb-20 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[140px]" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto services-header-content">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full border-white/10 bg-white/5 text-sky-400">
            Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            Full Spectrum <br />
            <span className="text-sky-400">Solutions.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            From initial strategy to final deployment and scale, we provide the expertise needed to navigate the complexities of modern digital landscapes.
          </p>
        </div>
      </section>

      <Services />
      <Process />
      
      <Footer />
    </main>
  );
}
