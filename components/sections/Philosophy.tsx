"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoRef.current;
    const text = textRef.current;
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;

    if (!section || !videoContainer || !text || !box1 || !box2) return;

    const ctx = gsap.context(() => {
      const pinDistance = 4000; 
      const totalDistance = 6000; 

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        // Reset positions and initial states inside matchMedia
        gsap.set(text, { opacity: 0, filter: "blur(20px)", scale: 0.9 });
        gsap.set(box1, { x: "-50vw", yPercent: 20, xPercent: -50 });
        gsap.set(box2, { x: "50vw", yPercent: -80, xPercent: 50 });

        // Initial state adjustments for landscape video
        if (isMobile) {
          gsap.set(videoContainer, { 
            width: "95vw", 
            height: "auto",
            aspectRatio: "16/9",
            borderRadius: "20px",
          });
        } else {
          gsap.set(videoContainer, { 
            width: "80vw", 
            height: "auto",
            aspectRatio: "16/9",
            borderRadius: "40px", 
          });
        }

        gsap.set(videoContainer, {
          opacity: 1,
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
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

        // A. Video Animation (Shrink)
        mainTl.to(videoContainer, {
          width: isMobile ? "70vw" : "50vw",
          borderRadius: isMobile ? "12px" : "24px",
          duration: 1,
          ease: "power2.inOut"
        })
        // B. Video Animation (Exit - Moving out of viewport)
        .to(videoContainer, {
          yPercent: -150, 
          opacity: 0,
          duration: 1,
          ease: "power2.in"
        })

        // C. Header Text Appearance (Starts when video is "50% gone" from viewport)
        // Since the video exit duration is 1, starting at the middle of it is 0.5 into it.
        // The previous step (shrink) took 1. The exit starts at 1. 
        // So we start the header at 1.5.
        .to(text, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, 1.5) 

        // D. Box Movement (Starts when video has fully left screen)
        // The video exit animation ends at duration 2 (1 for shrink + 1 for exit).
        .to(box1, {
          x: "100vw", 
          duration: 3,
          ease: "none",
        }, 2) 
        .to(box2, {
          x: "-100vw", 
          duration: 3,
          ease: "none",
        }, 2)

        // E. Text Fade Out
        .to(text, {
          opacity: 0,
          filter: "blur(20px)",
          scale: 1.1,
          duration: 1,
        }, ">");

        return () => {};
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden z-10"
    >
      {/* Video Background/Foreground Section */}
      <div 
        ref={videoRef}
        className="absolute z-30 flex items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover aspect-video"
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
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
