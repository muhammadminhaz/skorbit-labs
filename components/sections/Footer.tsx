"use client";

import React, { useRef, useState, useEffect } from "react";

// The GlowBlock component has been simplified. It no longer contains internal wrappers
// that interfere with layout. It is now just a styled container.
interface GlowBlockProps {
  children: React.ReactNode;
  className?: string;
  mousePos: { x: number, y: number };
  containerHovered: boolean;
  glowColor?: string;
}

const GlowBlock = ({
  children,
  className = "",
  mousePos,
  containerHovered,
  glowColor = "rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)",
}: GlowBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const updateLocalMousePos = () => {
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect();
        setLocalMousePos({
          x: Math.round(mousePos.x - rect.left),
          y: Math.round(mousePos.y - rect.top),
        });
      }
    };

    const rafId = requestAnimationFrame(updateLocalMousePos);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos]);

  const shapeClass = "rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-xl rounded-bl-xl";

  return (
    <div
      ref={blockRef}
      className={`relative group bg-neutral-900/60 backdrop-blur-xl border border-white/10 overflow-hidden ${shapeClass} ${className}`}
    >
      {/* Border Glow Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${shapeClass}`}
        style={{
          opacity: containerHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(600px circle at ${localMousePos.x}px ${localMousePos.y}px, ${glowColor}, transparent 80%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />
      {/* Children are rendered directly. The z-index wrapper is now outside. */}
      {children}
    </div>
  );
};

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  };

  return (
      <section 
        id="footer" 
        className="relative z-20 min-h-screen bg-black p-4 md:p-8 flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          {/*
            GlowBlock is now the flex container. `justify-end` pushes its direct child to the bottom.
          */}
          <GlowBlock
              mousePos={mousePos}
              containerHovered={isHovered}
              className="w-full grow flex flex-col justify-end"
          >
              {/* 
                This wrapper handles z-index to appear above the glow effect, and padding.
                As a flex item, it will be pushed to the bottom of the GlowBlock.
              */}
              <div className="relative z-10 p-6 md:p-12">
                <div className="w-full overflow-hidden relative">
                    <h1 className="text-[13vw] leading-[1] font-bold text-white text-center tracking-tighter select-none opacity-90 whitespace-nowrap">
                        Skorbit Labs
                    </h1>
                </div>
              </div>
          </GlowBlock>
      </section>
  );
}
