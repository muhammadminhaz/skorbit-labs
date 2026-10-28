"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";
import CtaLink from "@/components/CtaLink";
import { motionTokens } from "@/components/arc/motion-tokens";
import { SERVICES, type Service } from "@/lib/services";
import { CONTACT_EMAIL } from "@/lib/site";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter an email we can reply to.";
  if (message.trim().length < 10) errors.message = "A sentence or two about the project helps us reply properly.";
  return errors;
}

// ponytail: no backend yet, so a valid form opens the visitor's email app pre-filled (mailto).
// Swap for a POST to a route handler + email provider when one is set up.
function buildMailto(name: string, email: string, message: string, services: Service[]) {
  const subject = `New project enquiry from ${name.trim()}`;
  const body = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    services.length ? `Interested in: ${services.join(", ")}` : "",
    "",
    message.trim(),
  ].filter((line, i) => line || i > 2).join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#7ee3ff]/60 focus:bg-white/[0.05] aria-[invalid=true]:border-red-400/60";

function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? <p id={id} className="mt-2 text-sm text-red-300">{text}</p> : null;
}

// asPage: the /contact page, where the heading is the page's h1 and sits below the navbar.
export default function Contact({ asPage = false }: { asPage?: boolean }) {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.8, delay, ease },
  });

  const toggleService = (s: Service) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(name, email, message);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    window.location.href = buildMailto(name, email, message, services);
    setSent(true);
  };

  // Clear a field's error as soon as the user edits it
  const edit = (field: Field, set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    set(e.target.value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className={`relative isolate px-4 md:px-8 ${asPage ? "" : "border-t border-white/10"}`}>
      {/* Same top tint as PageHero */}
      {asPage && <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(47,155,224,0.14)_0%,rgba(47,155,224,0.04)_45%,transparent_80%)]" />}
      <div className={`mx-auto grid max-w-7xl gap-14 px-6 md:px-12 ${asPage ? "pt-56 pb-24 md:pt-48 md:pb-32" : "py-24 md:py-32"} lg:grid-cols-[5fr_7fr] lg:gap-20`}>
        <motion.div {...fadeUp()} className="flex flex-col gap-6">
          {asPage
            ? <h1 className="text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-8xl">Contact</h1>
            : <h2 className="text-4xl leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-6xl">Contact</h2>}
          <p className="max-w-md text-lg leading-relaxed text-(--fg-muted) text-pretty">
            Have a project in mind or need guidance? Reach out and let&apos;s explore how we can help bring your idea to life.
          </p>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-8">
            <span className="text-xs tracking-[0.2em] text-white/45 uppercase">Email</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex w-fit items-center gap-2.5 text-lg text-white transition-colors hover:text-[#7ee3ff]">
              <Mail aria-hidden className="size-5 text-[#7ee3ff]" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] md:p-10"
        >
          {sent ? (
            <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center gap-5">
              <span className="grid size-12 place-items-center rounded-full bg-[#7ee3ff] text-[#07080b]">
                <Check className="size-6" strokeWidth={2.5} />
              </span>
              <h3 className="text-3xl tracking-[-0.02em]">Almost there.</h3>
              <p className="max-w-md leading-relaxed text-(--fg-muted)">
                Your email app should be open with your message ready to send. Nothing opened? Write to us directly at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7ee3ff] underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>.
              </p>
              <button type="button" onClick={() => setSent(false)} className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                Edit your message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm text-white/70">Name</label>
                  <input id="contact-name" name="name" autoComplete="name" value={name} onChange={edit("name", setName)} placeholder="Your name"
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} className={inputClass} />
                  <FieldError id="contact-name-error" text={errors.name} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-white/70">Email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={email} onChange={edit("email", setEmail)} placeholder="you@company.com"
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} className={inputClass} />
                  <FieldError id="contact-email-error" text={errors.email} />
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm text-white/70">What can we help with? <span className="text-white/40">(optional)</span></legend>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => {
                    const on = services.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleService(s)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                          on ? "border-[#7ee3ff]/60 bg-[#2f9be0]/15 text-[#7ee3ff]" : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {on && <Check aria-hidden className="size-3.5" strokeWidth={2.5} />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm text-white/70">Message</label>
                <textarea id="contact-message" name="message" rows={5} value={message} onChange={edit("message", setMessage)}
                  placeholder="Tell us about your project, goals and timeline."
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} className={`${inputClass} resize-none`} />
                <FieldError id="contact-message-error" text={errors.message} />
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/40">
                  We reply within one business day. Please check{" "}
                  <Link href="/standards" className="text-white/60 underline underline-offset-4 transition-colors hover:text-[#7ee3ff]">the work we take on</Link>.
                </p>
                <CtaLink icon={Send}>Send request</CtaLink>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
