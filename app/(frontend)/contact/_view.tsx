'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from '@/components/DatePicker';
import type { Destination, SiteContent } from '@/lib/types';

/* Fallback hero backdrop. */
const CONTACT_HERO =
  'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=2400&q=85';

export default function ContactView({
  destinations,
  siteContent,
}: {
  destinations: Destination[];
  siteContent: SiteContent;
}) {
  const contactRows = [
    { k: 'Studio', v: siteContent.studioAddress || 'Kigali, Rwanda' },
    { k: 'Email', v: siteContent.studioEmail || 'info@soulexpeditionsafrica.com' },
    { k: 'Phone', v: siteContent.studioPhone || '+250 783 140 000' },
  ] as { k: string; v: string }[];

  /* Rotating travel backdrops — drawn from destination imagery, de-duplicated. */
  const slides = useMemo(() => {
    const imgs = destinations
      .flatMap((d) => [d.hero, d.image])
      .filter((src): src is string => Boolean(src));
    const unique = Array.from(new Set(imgs));
    return unique.length ? unique.slice(0, 6) : [CONTACT_HERO];
  }, [destinations]);

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  return (
    <main className="bg-white">
      <section className="relative isolate flex min-h-[calc(100svh-9rem)] items-center overflow-hidden text-white">
        {/* Rotating background */}
        <div className="absolute inset-0 -z-10">
          <AnimatePresence>
            <motion.div
              key={slides[slide]}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: 7, ease: 'linear' } }}
              className="absolute inset-0"
            >
              <Image
                src={slides[slide]}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 px-6 pb-10 pt-24 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-14 lg:px-10 lg:pb-8 lg:pt-10">
          {/* ── Left: minimal form ── */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-white/15 bg-white/95 p-5 text-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
                Plan your trip
              </p>
              <h2 className="mt-1.5 text-balance text-xl font-medium leading-tight tracking-tight text-neutral-950">
                Tell us a little, and we&apos;ll do the rest.
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  setSubmitting(true);
                  setSubmitMessage(null);
                  try {
                    // NOTE: persists to the Enquiries collection. Email/SMTP
                    // notification can be layered on later without changing this form.
                    const res = await fetch('/api/enquiries', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        dates: formData.get('dates'),
                        notes: formData.get('notes'),
                        status: 'New',
                      }),
                    });
                    if (!res.ok) throw new Error(`Submission failed (${res.status})`);
                    setSubmitMessage(
                      'Thank you. A Travel Designer will reply personally within 24 hours.',
                    );
                    form.reset();
                  } catch (err) {
                    console.error(err);
                    setSubmitMessage(
                      'Something went wrong — please email info@soulexpeditionsafrica.com directly.',
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="mt-4 grid gap-3"
              >
                <Field label="Full name" name="name" placeholder="Priya Raman" required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" placeholder="priya@example.com" required />
                  <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
                </div>
                <DatePicker label="Preferred travel date" name="dates" placeholder="Select a date" />

                <label className="block">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                    Message or request
                  </span>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Where would you love to go?"
                    className="mt-1.5 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-base text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
                  />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`mt-0.5 inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.2em] transition ${
                    submitting
                      ? 'cursor-not-allowed bg-neutral-200 text-neutral-500'
                      : 'bg-[#F58220] text-white shadow-glow hover:bg-[#ff9d2e]'
                  }`}
                >
                  {submitting ? 'Sending…' : 'Send enquiry →'}
                </button>

                {submitMessage && (
                  <div
                    role="status"
                    className="rounded-sm bg-[#F58220]/10 px-4 py-3 text-[0.85rem] leading-6 text-[#8a4e1f] ring-1 ring-[#F58220]/25"
                  >
                    {submitMessage}
                  </div>
                )}

                <p className="text-[0.8rem] leading-5 text-neutral-500">
                  We reply personally within 24 hours. No mailing list. Ever.
                </p>
              </form>
            </div>
          </div>

          {/* ── Right: brand message + contact details ── */}
          <div className="order-1 lg:order-2 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-6 inline-flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58220] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                </span>
                Contact us
              </p>
              <h1 className="text-balance text-[clamp(2.6rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.04em]">
                Let&apos;s plan your <span className="font-bold text-[#F58220]">journey.</span>
              </h1>
              <p className="mt-6 max-w-md text-balance text-lg leading-8 text-white/85">
                Share a few details and a Travel Designer replies personally — pure expertise, no
                templates, no call centres.
              </p>

              <ul className="mt-10 grid max-w-md gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-3">
                {contactRows.map((row) => (
                  <li key={row.k} className="bg-black/25 px-5 py-5 backdrop-blur-sm">
                    <p className="text-[0.56rem] font-medium uppercase tracking-[0.32em] text-white/60">
                      {row.k}
                    </p>
                    <p className="mt-2 text-[0.92rem] font-medium leading-6 text-white">{row.v}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ────────────────────────────────────────────────
   Reusable input field with consistent styling
   ──────────────────────────────────────────────── */
function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        {label}
        {required && <span className="ml-1 text-[#F58220]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-base text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
      />
    </label>
  );
}
