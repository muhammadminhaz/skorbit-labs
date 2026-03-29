"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-info > *", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".contact-form", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative py-24 md:py-40 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="contact-info">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-8">
              Let's build <br />
              <span className="text-sky-500 italic">something great.</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-12 max-w-md">
              Have a project in mind? We'd love to hear about it. Reach out and let's start a conversation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <Mail className="text-sky-600" size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-1">Email</div>
                  <a href="mailto:hello@skorbitlabs.com" className="text-xl font-medium text-neutral-900 hover:text-sky-600 transition-colors">
                    hello@skorbitlabs.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <Phone className="text-sky-600" size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-1">Phone</div>
                  <a href="tel:+11234567890" className="text-xl font-medium text-neutral-900 hover:text-sky-600 transition-colors">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <MapPin className="text-sky-600" size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-1">Office</div>
                  <address className="not-italic text-xl font-medium text-neutral-900">
                    123 Creative Street,<br />
                    Digital Valley, CA 90210
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-100">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-neutral-900">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe"
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-neutral-900">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-neutral-900">Subject</label>
                <select 
                  id="subject"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none"
                >
                  <option>New Project</option>
                  <option>Partnership</option>
                  <option>Career</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-neutral-900">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
