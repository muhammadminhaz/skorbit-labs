"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header-content > *", {
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
      
      {/* Contact Hero Section */}
      <section ref={headerRef} className="relative pt-40 pb-20 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto contact-header-content">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase border rounded-full border-white/10 bg-white/5 text-sky-400">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            Contact <br />
            <span className="text-sky-400 italic">Us.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Ready to start your next digital journey? We're here to help you bring your vision to life with precision and creativity.
          </p>
        </div>
      </section>

      <div className="min-h-screen flex flex-col">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
