"use client";

import React, { useRef, useState, useEffect } from "react";
import { Search, BarChart2, Code, Rocket } from "lucide-react";

interface ProcessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  mousePos: { x: number; y: number };
}

const ProcessCard = ({ title, description, icon, index, mousePos }: ProcessCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setLocalMousePos({
        x: mousePos.x - rect.left,
        y: mousePos.y - rect.top,
      });

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = mousePos.x - centerX;
      const distanceY = mousePos.y - centerY;
      
      // Subtle tilt effect
      const maxRotation = 3; 
      
      const rotateY = (distanceX / (window.innerWidth / 2)) * maxRotation;
      const rotateX = -(distanceY / (window.innerHeight / 2)) * maxRotation;

      setRotation({ x: rotateX, y: rotateY });
    }
  }, [mousePos]);

  return (
    <div
      ref={cardRef}
      className="relative group flex flex-col h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-transform duration-100 ease-out z-10"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {/* Border Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl z-20"
        style={{
          padding: '1px',
          background: `radial-gradient(600px circle at ${localMousePos.x}px ${localMousePos.y}px, rgba(96, 165, 250, 0.8), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Card Content */}
      <div className="relative z-10 p-8 flex flex-col h-full bg-gradient-to-br from-slate-900/90 via-blue-950/30 to-slate-900/90 text-white">
        <div className="mb-6 p-3 bg-blue-500/10 w-fit rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-colors duration-300">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
          {index + 1}. {title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
        
        {/* Decorative background element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-500" />
      </div>
    </div>
  );
};

export default function Process() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const processes = [
    {
      title: "Discovery",
      description: "We dive deep into your vision, understanding your goals, target audience, and market landscape to build a solid foundation.",
      icon: <Search size={28} />,
    },
    {
      title: "Analysis",
      description: "Our team architects the perfect solution, creating detailed roadmaps and technical specifications to ensure success.",
      icon: <BarChart2 size={28} />,
    },
    {
      title: "Development",
      description: "We bring designs to life with clean, scalable code, using cutting-edge technologies to build robust applications.",
      icon: <Code size={28} />,
    },
    {
      title: "Deployment",
      description: "Rigorous testing ensures a flawless launch. We handle the deployment process and provide ongoing support.",
      icon: <Rocket size={28} />,
    },
  ];

  return (
    <section 
      id="process" 
      className="relative z-20 min-h-screen py-20 flex flex-col justify-center bg-slate-950 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="w-full max-w-[95%] mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="mb-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-blue-500">Process</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A streamlined approach to turning your ideas into reality, from concept to launch.
          </p>
        </div>

        <div className="relative py-10">
          {/* Sine Wave SVG Connector - Desktop Only */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <mask id="cardMask">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  {/* Masking areas for cards - narrower to match card width */}
                  <rect x="5" y="20" width="15" height="60" fill="black" />
                  <rect x="30" y="0" width="15" height="60" fill="black" />
                  <rect x="55" y="40" width="15" height="60" fill="black" />
                  <rect x="80" y="20" width="15" height="60" fill="black" />
                </mask>
              </defs>
              
              <g mask="url(#cardMask)">
                {/* 
                  Path logic for sine wave connecting card centers:
                  Using numeric coordinates for viewBox 0 0 100 100
                  Card 1 Center: 12.5, 50
                  Card 2 Center: 37.5, 30 (Shifted up)
                  Card 3 Center: 62.5, 70 (Shifted down)
                  Card 4 Center: 87.5, 50
                */}
                
                {/* Base Line - Dim */}
                <path 
                  d="M 12.5 50 C 25 50, 25 30, 37.5 30 S 50 70, 62.5 70 S 75 50, 87.5 50" 
                  fill="none" 
                  stroke="#1e3a8a" 
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="opacity-30"
                />

                {/* Animated Glow Line - Solid Color */}
                <path 
                  d="M 12.5 50 C 25 50, 25 30, 37.5 30 S 50 70, 62.5 70 S 75 50, 87.5 50" 
                  fill="none" 
                  stroke="#60A5FA" 
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#line-glow)"
                  strokeDasharray="20 80"
                  strokeLinecap="round"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="2s" 
                    repeatCount="indefinite" 
                  />
                </path>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {processes.map((process, index) => (
              <div 
                key={index} 
                className={`relative h-full transition-transform duration-500 flex justify-center ${
                  index === 1 ? "lg:-translate-y-24" : 
                  index === 2 ? "lg:translate-y-24" : ""
                }`}
              >
                <div className="w-full max-w-90 h-full">
                  <ProcessCard
                    {...process}
                    index={index}
                    mousePos={mousePos}
                  />
                </div>
                
                {/* Connector Line (Mobile/Tablet) */}
                {index < processes.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -bottom-12 w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-blue-500/50 z-0 transform -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
