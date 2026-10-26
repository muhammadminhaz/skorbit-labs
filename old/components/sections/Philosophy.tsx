"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const backgroundContainer = backgroundRef.current;
    const text = textRef.current;
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;

    if (!section || !backgroundContainer || !text || !box1 || !box2) return;

    const ctx = gsap.context(() => {
      const pinDistance = 1000;
      const totalDistance = 2000;

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        // Reset positions and initial states inside matchMedia
        gsap.set(text, { opacity: 0, scale: 0.92, y: 30 });
        
        if (isMobile) {
          gsap.set(box1, { left: "50%", x: 0, xPercent: -50, yPercent: -50, y: "-100vh" });
          gsap.set(box2, { left: "50%", x: 0, xPercent: -50, yPercent: -50, y: "100vh" });
        } else {
          gsap.set(box1, { left: "50%", x: "-20vw", y: "-70vh", xPercent: -50, yPercent: -50 });
          gsap.set(box2, { left: "50%", x: "20vw", y: "100vh", xPercent: -50, yPercent: -50 });
        }

        // A. Background state
        gsap.set(backgroundContainer, {
          width: "100%",
          height: "100%",
          opacity: 0.8,
          left: 0,
          top: 0,
          xPercent: 0,
          yPercent: 0,
          transformOrigin: "center center"
        });


        // 1. Pinning Logic
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
        });

        // Main Timeline
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalDistance}`, 
            scrub: true,
          },
        });

        // C. Header Text Appearance
        mainTl.to(text, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }) 

        // D. Box Movement
        mainTl.to(box1, {
          y: isMobile ? "120vh" : "200vh", 
          duration: 3,
          ease: "none",
        }, ">") 
        .to(box2, {
          y: isMobile ? "-120vh" : "-200vh", 
          duration: 3,
          ease: "none",
        }, "<")

        // E. Text Fade Out
        mainTl.to(text, {
          opacity: 0,
          scale: 1.06,
          y: -30,
          duration: 1,
        }, ">");

        return () => {};
      });

    }, sectionRef);

    // Sections below load as separate chunks; re-measure once the pin spacer exists.
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden z-10"
    >
      {/* Background Effects */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[200vw]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22), transparent 60%)" }} />
      </div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-center leading-tight max-w-6xl px-4 bg-clip-text text-transparent bg-linear-to-b from-white via-blue-100 to-blue-400 "
        >
          Bringing excellence into existence
        </h2>
      </div>

      {/* Container for Boxes - Centered */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-20">
        
        {/* Box 1 - Inside Skorbit Labs - Z-Index 20 (Top) */}
        <div
          ref={box1Ref}
          className="absolute w-[min(20rem,calc(100vw-2rem))] md:w-96 p-8 rounded-2xl bg-neutral-900/90 border border-white/15 shadow-2xl will-change-transform z-20"
        >
          <h3 className="text-2xl font-bold mb-2 text-white">Inside Skorbit Labs</h3>
          <div className="h-1 w-12 bg-sky-400 rounded-full mb-4" />
          <p className="text-neutral-200">
            We are a collective of innovators, pushing the boundaries of digital experiences through code and design.
          </p>
        </div>

        {/* Box 2 - About Ourselves - Z-Index 10 (Bottom) */}
        <div
          ref={box2Ref}
          className="absolute w-[min(20rem,calc(100vw-2rem))] md:w-96 p-8 rounded-2xl bg-neutral-900/90 border border-white/15 shadow-2xl will-change-transform z-10"
        >
          <h3 className="text-2xl font-bold mb-2 text-white">Our Essence</h3>
          <div className="h-1 w-12 bg-blue-500 rounded-full mb-4" />
          <p className="text-neutral-200">
            Driven by passion and precision, we transform abstract ideas into tangible, high-impact realities for our partners.
          </p>
        </div>
      </div>
    </section>
  );
}
