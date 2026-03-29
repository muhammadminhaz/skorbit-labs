"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".intro-image", {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="introduction" 
      ref={sectionRef} 
      className="relative z-20 py-24 md:py-40 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="reveal-text overflow-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
                <span className="block">We are a design-led</span>
                <span className="block text-sky-500">innovation studio</span>
                <span className="block">for the digital age.</span>
              </h2>
            </div>
            
            <div className="mt-12 space-y-6 text-lg text-neutral-600 max-w-xl">
              <p>
                Founded on the belief that great design is the differentiator, Skorbit Labs combines high-end aesthetics with cutting-edge technology.
              </p>
              <p>
                We don't just build products; we craft experiences that resonate with users and drive meaningful growth for brands. Our approach is collaborative, transparent, and relentlessly focused on quality.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold text-neutral-900">50+</div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest mt-2 font-semibold">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-900">12+</div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest mt-2 font-semibold">Awards</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-900">99%</div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest mt-2 font-semibold">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 intro-image shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
                alt="Our Studio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
