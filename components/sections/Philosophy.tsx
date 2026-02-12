"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;

    if (!section || !text || !box1 || !box2) return;

    // Initial state
    gsap.set(text, { opacity: 0, filter: "blur(20px)", scale: 0.9 });
    gsap.set(box1, { x: "-50vw", yPercent: 20, xPercent: -50 });
    gsap.set(box2, { x: "50vw", yPercent: -80, xPercent: 50 });

    const ctx = gsap.context(() => {
      const pinDistance = 2500; // Increased from 1000 to keep boxes moving longer while pinned
      const totalDistance = 4000; // Increased from 3000 to match the scale

      // 1. Pinning Logic
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
      });

      // 2. Pre-Pin Animation (Text Appearing)
      gsap.to(text, {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top top",
          scrub: true,
        },
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        ease: "power2.out",
      });

      // 3. Main Animation (Boxes Crossing & Text Exit)
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalDistance}`, 
          scrub: true,
        },
      });

      const boxDuration = 3;

      mainTl
        // Boxes move from edges to opposite sides
        .to(box1, {
          x: "100vw", 
          duration: boxDuration,
          ease: "none",
        }, 0)
        .to(box2, {
          x: "-100vw", 
          duration: boxDuration,
          ease: "none",
        }, 0);
        
      // Text fades out starting exactly when the pin ends
      // Calculate the time in the timeline corresponding to the pin end
      const fadeStartTime = (pinDistance / totalDistance) * boxDuration;

      mainTl.to(text, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.1,
        duration: 1,
      }, fadeStartTime);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden z-10"
    >
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-center leading-tight max-w-6xl px-4 bg-clip-text text-transparent bg-linear-to-b from-white to-white/50"
        >
          Bringing excellence into existence
        </h2>
      </div>

      {/* Container for Boxes - Centered */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none">
        
        {/* Box 1 - Inside Skorbit Labs - Z-Index 20 (Top) */}
        <div
          ref={box1Ref}
          className="absolute w-80 md:w-96 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl z-20"
        >
          <h3 className="text-2xl font-bold mb-2 text-white">Inside Skorbit Labs</h3>
          <div className="h-1 w-12 bg-purple-500 rounded-full mb-4" />
          <p className="text-neutral-200">
            We are a collective of innovators, pushing the boundaries of digital experiences through code and design.
          </p>
        </div>

        {/* Box 2 - About Ourselves - Z-Index 10 (Bottom) */}
        <div
          ref={box2Ref}
          className="absolute w-80 md:w-96 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl z-10"
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
