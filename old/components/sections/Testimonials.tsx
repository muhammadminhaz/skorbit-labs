"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    return (
        <div
            className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
        >
            <div className="relative z-10">
                <p className="text-lg text-neutral-300 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-8">
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sky-400 text-sm font-medium">{testimonial.title}</p>
                </div>
            </div>
        </div>
    );
};

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title and text
            gsap.from([titleRef.current, textRef.current], {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            });

            // Animate testimonial cards
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
                        }
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} className="relative z-20 py-32 bg-neutral-950 text-white overflow-hidden">
            <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 30% 30%, rgba(37,99,235,0.12), transparent 70%), radial-gradient(ellipse 50% 40% at 75% 75%, rgba(2,132,199,0.12), transparent 70%)" }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mb-20 text-center mx-auto">
                    <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-blue-50 to-blue-300 mb-6">
                        Testimonials
                    </h2>
                    <p ref={textRef} className="text-xl text-neutral-400 max-w-3xl mx-auto">
                        Hear what our clients have to say about their experience partnering with Skorbit Labs to bring their ideas to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} ref={el => { cardsRef.current[index] = el; }}>
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
