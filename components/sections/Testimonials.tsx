"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Skorbit Labs transformed our digital presence with a stunning new website. Their team was professional, creative, and delivered beyond our expectations. We've seen a significant increase in user engagement since the launch.",
        name: "Alex Johnson",
        title: "CEO of InnovateX",
    },
    {
        quote: "The mobile app developed by Skorbit Labs has been a game-changer for our business. The intuitive design and seamless performance have received amazing feedback from our users. Their technical expertise is top-notch.",
        name: "Samantha Lee",
        title: "Founder of MobileFirst",
    },
    {
        quote: "Working with Skorbit Labs felt like having a true technology partner. They understood our complex requirements for an AI-driven analytics platform and delivered a solution that has provided us with invaluable insights.",
        name: "Michael Chen",
        title: "Head of Data Science at InsightfulData",
    },
    {
        quote: "From concept to deployment, the Skorbit Labs team was exceptional. They are masters of their craft, combining beautiful design with robust engineering to create a product that we are incredibly proud of.",
        name: "Emily Rodriguez",
        title: "Marketing Director at BrandBoost",
    },
    {
        quote: "The attention to detail and commitment to quality from Skorbit Labs is unparalleled. They took our vision and turned it into a reality that exceeded all our goals. I can't recommend them enough.",
        name: "David Miller",
        title: "Product Manager at NextGen Solutions",
    },
    {
        quote: "Our new e-commerce platform is faster, more reliable, and easier to manage thanks to the incredible work of the Skorbit Labs team. They are true professionals and a pleasure to work with.",
        name: "Jessica Williams",
        title: "Owner of The Chic Boutique",
    }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: -200, y: -200 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group"
            style={{
                background: `
                    radial-gradient(
                        circle at ${mousePosition.x}px ${mousePosition.y}px,
                        rgba(56, 189, 248, 0.15),
                        transparent 25%
                    ),
                    rgba(255, 255, 255, 0.02)
                `
            }}
        >
            <div className="relative z-10">
                <p className="text-lg text-neutral-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                    <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-sky-400 text-sm font-medium">{testimonial.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative z-20 py-32 bg-neutral-950 text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] mix-blend-lighten animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-[150px] mix-blend-lighten animate-pulse animation-delay-4000" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mb-20 text-center mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/60 mb-6">
                        Testimonials
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        Hear what our clients have to say about their experience partnering with Skorbit Labs to bring their ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
