"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

interface CurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurtainMenu = ({ isOpen, onClose }: CurtainMenuProps) => {
  const menuLinks = [
    { name: "Home", href: "/", description: "Back to the beginning" },
    { name: "Work", href: "/work", description: "Selected projects & case studies" },
    { name: "About", href: "/about", description: "Our philosophy and story" },
    { name: "Services", href: "/services", description: "Design, Development, Strategy" },
    { name: "Testimonials", href: "/testimonials", description: "What our clients say" },
    { name: "Contact", href: "/contact", description: "Let's build something together" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={20} />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
    { name: "GitHub", icon: <Github size={20} />, href: "#" },
  ];

  const curtainVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        when: "afterChildren",
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        when: "beforeChildren",
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={curtainVariants}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-red-600/10 rounded-full blur-[100px]" />
          </div>

          {/* Close button */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 z-[110]">
            <button
              onClick={onClose}
              className="group relative p-4 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <X className="text-white group-hover:rotate-90 transition-transform duration-500" size={24} />
            </button>
          </div>

          {/* Menu Content */}
          <div className="relative flex-1 flex flex-col md:flex-row container mx-auto px-6 py-20 md:py-0 md:items-center overflow-y-auto md:overflow-y-visible">
            {/* Main Links */}
            <div className="flex-1 space-y-4 md:space-y-6">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-widest block mb-4">Navigation</span>
              <nav className="flex flex-col gap-2">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="inline-flex flex-col"
                    >
                      <div className="flex items-baseline gap-4 group">
                        <span className="text-white/20 text-sm font-mono group-hover:text-white/60 transition-colors">0{i + 1}</span>
                        <span className="text-4xl md:text-7xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500 flex items-center gap-4">
                          {link.name}
                          <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" size={40} />
                        </span>
                      </div>
                      <span className="ml-12 md:ml-20 text-white/40 text-sm md:text-lg group-hover:text-white/70 transition-colors">
                        {link.description}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Sidebar info */}
            <div className="mt-12 md:mt-0 md:w-1/3 flex flex-col gap-12 md:pl-12 md:border-l border-white/10">
              <motion.div custom={6} variants={linkVariants}>
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest block mb-4">Connect</span>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div custom={7} variants={linkVariants}>
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest block mb-4">Say Hello</span>
                <a href="mailto:hello@skorbitlabs.com" className="text-xl md:text-2xl font-medium text-white hover:text-blue-400 transition-colors">
                  hello@skorbitlabs.com
                </a>
              </motion.div>

              <motion.div custom={8} variants={linkVariants}>
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest block mb-4">Location</span>
                <address className="not-italic text-white/70 text-base md:text-lg">
                  123 Creative Street,<br />
                  Digital Valley, CA 90210
                </address>
              </motion.div>
            </div>
          </div>

          {/* Footer of curtain */}
          <div className="p-8 md:p-12 flex justify-between items-center border-t border-white/5">
             <span className="text-white/20 text-xs">© 2026 Skorbit Labs. All rights reserved.</span>
             <Link href="/" onClick={onClose} className="text-white/60 hover:text-white transition-colors text-sm font-bold tracking-tighter">
               SKORBIT LABS
             </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurtainMenu;
