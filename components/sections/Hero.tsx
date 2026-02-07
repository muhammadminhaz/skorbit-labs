"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container relative z-10 px-4 flex flex-col items-center text-center gap-8">
            {/* Status Chip */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm text-sm text-neutral-300"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open for projects
            </motion.div>

            {/* Heading */}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60"
            >
                From execution to distribution, we do it all
            </motion.h1>

            {/* Subheading */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
            >
                Eliminating friction between product creation, market entry, and growth
            </motion.p>

            {/* Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-6"
            >
                <Link 
                    href="/book" 
                    className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                    Book a Call
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                    href="/work" 
                    className="px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 text-white font-medium hover:bg-neutral-800 transition-colors"
                >
                    Explore Our Work
                </Link>
            </motion.div>
        </div>
    </section>
  );
}
