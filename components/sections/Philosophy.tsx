"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;

    if (!section || !text || !box1 || !box2) return;

    // Initial state
    gsap.set(text, { opacity: 0, filter: "blur(20px)", scale: 0.9 });

    // Start with boxes just touching the edges of the screen
    // Box 1 (Left): Right edge at left screen edge
    gsap.set(box1, { x: "-50vw", yPercent: 20, xPercent: -50 });

    // Box 2 (Right): Left edge at right screen edge
    gsap.set(box2, { x: "50vw", yPercent: -80, xPercent: 50 });

    // 1. Pre-Pin Animation (Text Only)
    // Text starts appearing when section is halfway up
    gsap.to(text, {
      scrollTrigger: {
        trigger: section,
        start: "top 50%", 
        end: "top top",
        scrub: true,
      },
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      ease: "power2.out",
    });

    // 2. Main Animation (Boxes Crossing & Text Exit)
    // This timeline handles the movement and fading, driven by a long scroll distance
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000", // Total distance for the boxes to move off-screen
        scrub: true,
      },
    });

    // Boxes animation
    // They cross at 1/3 of the timeline (corresponding to the pin duration)
    mainTl
      .to(box1, {
        x: "100vw", // Move fully across to right
        duration: 3,
        ease: "none",
      }, 0)
      .to(box2, {
        x: "-100vw", // Move fully across to left
        duration: 3,
        ease: "none",
      }, 0)
      
      // Text fades out starting when they cross (at 1/3 of duration)
      .to(text, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.1,
        duration: 1,
      }, 1);

    // 3. Pinning Logic
    // Pin the section only until the boxes cross (1/3 of the total animation)
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=1000", // Matches the crossing point (1/3 of 3000)
      pin: true,
      pinSpacing: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden z-10"
    >
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-center leading-tight max-w-6xl px-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
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
