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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2500", // Adjust length of scroll
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Initial state
    // Text starts blurred and invisible
    gsap.set(text, { opacity: 0, filter: "blur(20px)", scale: 0.9 });
    
    // Boxes start off-screen (centered in CSS, offset by x)
    gsap.set(box1, { x: "-120vw" }); 
    gsap.set(box2, { x: "120vw" });

    // Animation Sequence
    tl
      // 1. Text blurs in
      .to(text, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
      // 2. Boxes move across the screen
      // Box 1 moves from Left (-120vw) to Right (120vw)
      .to(box1, {
        x: "120vw",
        duration: 6,
        ease: "none", // Linear movement for smooth crossing
      }, "-=1") // Start slightly before text finishes appearing
      
      // Box 2 moves from Right (120vw) to Left (-120vw)
      .to(box2, {
        x: "-120vw",
        duration: 6,
        ease: "none",
      }, "<") // Start at same time as Box 1
      
      // 3. Text blurs out at the end
      .to(text, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.1,
        duration: 2,
      }, "-=2"); // Start fading out as boxes are leaving

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
