"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const services = [
  {
    id: "01",
    title: "AI Integration",
    description: "Leverage the power of artificial intelligence to automate processes, enhance decision-making, and create personalized experiences for your users.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Web Development",
    description: "Build scalable, high-performance web applications with modern frameworks. We focus on responsive design, SEO optimization, and seamless user experiences.",
    image: "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Mobile App Development",
    description: "Create native and cross-platform mobile apps that engage users on the go. From concept to launch, we deliver robust solutions for iOS and Android.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Data Analytics",
    description: "Turn raw data into actionable insights. Our analytics solutions help you understand user behavior, optimize performance, and drive business growth.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Digital Marketing",
    description: "Amplify your brand's reach with data-driven marketing strategies. We specialize in SEO, content marketing, and paid advertising to maximize ROI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  }
];

function ServiceItem({ service, index }: { service: typeof services[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-neutral-800 cursor-default overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
      >
          <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-start justify-between gap-8">
            {/* Content */}
            <div className="flex items-start flex-1">
                <div className="flex flex-col gap-4 w-full max-w-3xl">
                    <motion.h3
                        className="text-3xl md:text-5xl lg:text-6xl font-bold"
                        animate={isHovered ? {
                            backgroundImage: "linear-gradient(90deg, #3b82f6, #7dd3fc, #3b82f6)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            backgroundPosition: ["0%", "200%"]
                        } : {
                            backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff, #ffffff)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "#ffffff",
                            backgroundPosition: "0%"
                        }}
                        transition={{
                            backgroundPosition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            color: { duration: 0.2 }
                        }}
                    >
                        {service.title}
                    </motion.h3>
                    
                    {/* Description - Directly under header */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            height: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0
                        }}
                        className="overflow-hidden"
                    >
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-lg text-neutral-300 leading-relaxed pt-2 font-medium"
                        >
                            {service.description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Arrow */}
            <motion.div
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-full border border-neutral-700 text-white group-hover:border-sky-400 group-hover:text-sky-400 transition-colors mt-2 shrink-0 bg-black/20 backdrop-blur-sm"
            >
                <ArrowRight className="w-6 h-6" />
            </motion.div>
        </div>
      </div>
    </div>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    return (
        <motion.div
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Link 
                ref={ref}
                href={href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className="group/btn relative overflow-hidden rounded-full bg-white px-8 py-4 font-medium text-black transition-colors inline-block cursor-pointer"
            >
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">{children}</span>
                <motion.div 
                    className="absolute inset-0 bg-sky-400 z-0"
                    initial={{ clipPath: "circle(0% at 0% 0%)" }}
                    animate={{ clipPath: isHovered ? "circle(150% at 0% 0%)" : "circle(0% at 0% 0%)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            </Link>
        </motion.div>
    );
}

function DiscoverItem() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group sticky bottom-0 z-30 bg-neutral-950 border-t border-neutral-800 cursor-default overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
      >
          <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
              alt="Discover"
              className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-start justify-between gap-8">
            {/* Content */}
            <div className="flex items-start flex-1">
                <div className="flex flex-col gap-4 w-full">
                    <motion.h3
                        className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl"
                        animate={isHovered ? {
                            backgroundImage: "linear-gradient(90deg, #3b82f6, #7dd3fc, #3b82f6)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            backgroundPosition: ["0%", "200%"]
                        } : {
                            backgroundImage: "linear-gradient(90deg, #ffffff, #ffffff, #ffffff)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "#ffffff",
                            backgroundPosition: "0%"
                        }}
                        transition={{
                            backgroundPosition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            color: { duration: 0.2 }
                        }}
                    >
                        Discover all capabilities
                    </motion.h3>
                    
                    {/* Button - Centered */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            height: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0
                        }}
                        className="overflow-hidden w-full flex justify-center"
                    >
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ 
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="pt-6"
                        >
                            <MagneticButton href="/services">
                                What we do
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Icon */}
            <motion.div
                className="p-2 rounded-full border border-neutral-700 text-white group-hover:border-sky-400 group-hover:text-sky-400 transition-colors mt-2 shrink-0 bg-black/20 backdrop-blur-sm relative w-10 h-10 flex items-center justify-center"
            >
                <Plus className={`w-6 h-6 absolute transition-all duration-300 ${isHovered ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <Minus className={`w-6 h-6 absolute transition-all duration-300 ${isHovered ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
            </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Title Animation
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
            },
            y: 50,
            opacity: 0,
            duration: 1
        });

        // Staggered List Animation
        const items = containerRef.current?.children;
        if (items) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative z-20 min-h-screen py-32 bg-neutral-950 text-white flex flex-col justify-center">
      <div className="container mx-auto px-4 mb-20">
        <div ref={titleRef} className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 mb-6">
                Our Expertise
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl">
                We combine strategy, design, and technology to build digital products that transform businesses.
            </p>
        </div>
      </div>

      <div ref={containerRef} className="w-full border-b border-neutral-800">
          {services.map((service, index) => (
              <ServiceItem key={service.id} service={service} index={index} />
          ))}
          
          <DiscoverItem />
      </div>
    </section>
  );
}
