"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";
import { Search, BarChart2, Code, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ProcessCard = ({ title, description, icon }: ProcessCardProps) => {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const gradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.6), transparent 40%)`;

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    return (
        <div
            onPointerMove={onPointerMove}
            onPointerLeave={() => { mouseX.set(-1000); mouseY.set(-1000); }}
            className="relative group flex flex-col h-full bg-slate-900/60 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden z-10"
        >
            {/* Border glow — driven by motion value, no re-renders */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl z-20"
                style={{
                    padding: "1px",
                    background: gradient,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                }}
            />

            <div className="relative z-10 p-6 flex flex-col h-full bg-linear-to-br from-slate-900/90 via-blue-950/30 to-slate-900/90 text-white">
                <div className="mb-6 p-3 bg-sky-500/20 w-fit rounded-lg text-sky-400 group-hover:text-sky-300 group-hover:bg-sky-500/30 transition-colors duration-300">
                    {icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-sky-300 transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {description}
                </p>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-600/15 rounded-full blur-3xl group-hover:bg-sky-600/25 transition-colors duration-500" />
            </div>
        </div>
    );
};

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        const ctx = gsap.context(() => {
            gsap.from([titleRef.current, textRef.current], {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
            });

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        opacity: 0,
                        y: 50,
                        duration: 0.6,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [reduceMotion]);

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
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="w-full max-w-[95%] mx-auto px-4 relative z-10" ref={containerRef}>
                <div className="mb-32 text-center">
                    <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-sky-50 to-sky-300 mb-6">
                        Our Process
                    </h2>
                    <p ref={textRef} className="text-slate-400 max-w-2xl mx-auto text-lg">
                        A streamlined approach to turning your ideas into reality, from concept to launch.
                    </p>
                </div>

                <div className="relative py-10">
                    {/* Sine wave connector — desktop only */}
                    <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <mask id="cardMask">
                                    <rect x="0" y="0" width="100" height="100" fill="white" />
                                    <rect x="2.5" y="20" width="20" height="60" fill="black" />
                                    <rect x="27.5" y="0" width="20" height="60" fill="black" />
                                    <rect x="52.5" y="40" width="20" height="60" fill="black" />
                                    <rect x="77.5" y="20" width="20" height="60" fill="black" />
                                </mask>
                            </defs>
                            <g mask="url(#cardMask)">
                                <path
                                    d="M 12.5 50 L 20 50 C 25 50, 25 30, 30 30 L 45 30 C 50 30, 50 70, 55 70 L 70 70 C 75 70, 75 50, 80 50 L 87.5 50"
                                    fill="none" stroke="#0c4a6e" strokeWidth="2" vectorEffect="non-scaling-stroke" className="opacity-30"
                                />
                                <path
                                    d="M 12.5 50 L 20 50 C 25 50, 25 30, 30 30 L 45 30 C 50 30, 50 70, 55 70 L 70 70 C 75 70, 75 50, 80 50 L 87.5 50"
                                    fill="none" stroke="#38bdf8" strokeWidth="3" vectorEffect="non-scaling-stroke"
                                    filter="url(#line-glow)" strokeDasharray="15 85" strokeLinecap="round" className="opacity-90"
                                >
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
                                </path>
                            </g>
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative z-10">
                        {processes.map((process, index) => (
                            <div
                                key={index}
                                className={`relative h-full transition-transform duration-500 flex justify-center ${
                                    index === 1 ? "lg:-translate-y-20" :
                                    index === 2 ? "lg:translate-y-20" : ""
                                }`}
                            >
                                <div className="w-full lg:w-[80%] h-full" ref={el => { cardsRef.current[index] = el; }}>
                                    <ProcessCard {...process} />
                                </div>
                                {index < processes.length - 1 && (
                                    <div className="lg:hidden absolute left-1/2 -bottom-12 w-px h-12 bg-linear-to-b from-sky-500/50 to-sky-500/50 z-0 -translate-x-1/2" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
