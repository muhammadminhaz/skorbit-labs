"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
    { name: "Contact", href: "/contact", description: "Let's build something together" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  const curtainVariants: Variants = {
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

  const linkVariants: Variants = {
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[100px] animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
          </div>

          {/* Close button - Positioned to match the 9-dot trigger */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 md:top-10 z-[110] transition-all duration-500 ease-in-out">
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
              onClick={onClose}
              className="group relative w-14 h-14 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg"
            >
              <X className="text-white group-hover:rotate-90 transition-transform duration-500" size={24} />
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Menu Content */}
          <div className="relative flex-1 container mx-auto px-6 py-16 md:py-0 flex flex-col md:flex-row md:items-center overflow-hidden">
            {/* Main Links */}
            <div className="flex-1 space-y-2 md:space-y-4 md:py-8">
              <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest block mb-2">Navigation</span>
              <nav className="flex flex-col gap-1 md:gap-2">
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
                      <div className="flex items-baseline gap-3 md:gap-4 group">
                        <span className="text-white/20 text-xs font-mono group-hover:text-white/60 transition-colors">0{i + 1}</span>
                        <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500 flex items-center gap-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-50 to-blue-300">
                          {link.name}
                          <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-blue-300" size={32} />
                        </span>
                      </div>
                      <span className="ml-10 md:ml-16 text-white/40 text-xs md:text-base group-hover:text-white/70 transition-colors">
                        {link.description}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Sidebar info */}
            <div className="mt-8 md:mt-0 md:w-1/3 flex flex-row md:flex-col flex-wrap gap-8 md:gap-10 md:pl-12 md:border-l border-white/10 md:py-8">
              <motion.div custom={menuLinks.length} variants={linkVariants} className="flex-1 min-w-[140px]">
                <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest block mb-3">Connect</span>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
                        aria-label={social.name}
                      >
                        <Icon size={18} />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div custom={menuLinks.length + 1} variants={linkVariants} className="flex-1 min-w-[200px]">
                <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest block mb-2">Say Hello</span>
                <a href="mailto:hello@skorbitlabs.com" className="text-lg md:text-xl font-medium text-white hover:text-blue-300 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                  hello@skorbitlabs.com
                </a>
              </motion.div>

              <motion.div custom={menuLinks.length + 2} variants={linkVariants} className="hidden md:block">
                <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest block mb-2">Location</span>
                <address className="not-italic text-white/70 text-sm md:text-base">
                  123 Creative Street,<br />
                  Digital Valley, CA 90210
                </address>
              </motion.div>
            </div>
          </div>

          {/* Footer of curtain */}
          <div className="flex-shrink-0 p-8 md:p-12 flex justify-between items-center border-t border-white/5 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent">
             <span className="text-white/20 text-xs">© 2026 Skorbit Labs. All rights reserved.</span>
             <Link href="/" onClick={onClose} className="text-white/60 hover:text-blue-300 transition-colors text-sm font-bold tracking-tighter">
               SKORBIT LABS
             </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurtainMenu;
