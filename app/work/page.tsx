"use client";

import Navbar from "@/components/Navbar";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WorkPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header-content > *", {
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
    <main className="bg-neutral-950 text-white selection:bg-sky-500/30">
      <Navbar />
      
      {/* Work Hero Section */}
      <section ref={headerRef} className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto work-header-content">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full border-white/10 bg-white/5 text-sky-400"
          >
            Portfolio
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Selected <br />
            <span className="text-sky-400">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            We partner with forward-thinking companies to build digital products that challenge the status quo and deliver measurable results.
          </p>
        </div>
      </section>

      <FeaturedWork />
      
      <Footer />
    </main>
  );
}
