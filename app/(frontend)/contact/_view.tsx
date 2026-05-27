'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TIERS,
  tierMeta,
  tourTiers,
  type Destination,
  type SiteContent,
  type Tier,
} from '@/lib/types';

/* ─────────── motion presets ─────────── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function ContactView({
  destinations,
  siteContent,
}: {
  destinations: Destination[];
  siteContent: SiteContent;
}) {
  const contactRows = [
    siteContent.studioAddress && { k: 'Studio', v: siteContent.studioAddress },
    siteContent.studioEmail && { k: 'Email', v: siteContent.studioEmail },
    siteContent.studioPhone && { k: 'Phone', v: siteContent.studioPhone },
  ].filter(Boolean) as { k: string; v: string }[];
  const [destinationSlug, setDestinationSlug] = useState<string | null>(null);
  const [tourSlug, setTourSlug] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const destination = destinationSlug
    ? destinations.find((d) => d.slug === destinationSlug) ?? null
    : null;
  const tour = useMemo(
    () => destination?.tours.find((t) => t.slug === tourSlug) ?? null,
    [destination, tourSlug],
  );

  const scrollToStep = (id: string) => {
    if (typeof window === 'undefined') return;
    // Wait for layout/transitions to settle before scrolling.
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 96; // leave space for sticky header
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 280);
  };

  const onPickDestination = (slug: string) => {
    if (slug === destinationSlug) return;
    setDestinationSlug(slug);
    setTourSlug(null);
    setTier(null);
    scrollToStep('step-tour');
  };

  const onPickTour = (slug: string) => {
    if (slug === tourSlug) return;
    setTourSlug(slug);
    setTier(null);
    scrollToStep('step-tier');
  };

  const onPickTier = (t: Tier) => {
    if (t === tier) return;
    setTier(t);
    scrollToStep('step-details');
  };

  const summary = [
    destination?.name,
    tour?.title,
    tier,
  ].filter(Boolean) as string[];

  const ready = Boolean(destination && tour && tier);

  return (
    <main className="bg-white">
      {/* ═════════════ HEADER ═════════════ */}
      <section className="px-6 pt-32 pb-12 lg:px-10 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-24"
          >
            <div className="space-y-7">
              <motion.div variants={reveal} className="flex items-center gap-5">
                <span className="h-px w-12 bg-[#F58220]" />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                  Inquire now · Configurator
                </span>
              </motion.div>
              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.045em] text-neutral-950"
              >
                <span className="block font-light">Plan your</span>
                <span className="block font-bold text-[#F58220]">trip.</span>
              </motion.h1>
            </div>
            <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-neutral-600">
              Select your destination, itinerary, and tier. Share your dates, and a Travel Designer
              will respond personally within 24 hours. Pure expertise — no templates, no call
              centres.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════ STEP 1 · DESTINATION ═════════════ */}
      <Section
        id="step-destination"
        index="01"
        label={destination ? `Destination · ${destination.name}` : 'Destination'}
        title={
          <>
            <span className="font-bold text-[#F58220]">Destinations</span>
          </>
        }
        active
        completed={!!destination}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => {
            const selected = d.slug === destinationSlug;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => onPickDestination(d.slug)}
                className={`group relative isolate overflow-hidden rounded-sm text-left transition ${
                  selected
                    ? 'ring-2 ring-[#F58220] ring-offset-2 ring-offset-white'
                    : 'ring-1 ring-neutral-200 hover:ring-neutral-400'
                }`}
                aria-pressed={selected}
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition duration-[1200ms] ease-out ${
                      selected ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition ${
                      selected
                        ? 'bg-gradient-to-t from-black/85 via-black/30 to-transparent'
                        : 'bg-gradient-to-t from-black/75 via-black/15 to-transparent'
                    }`}
                  />

                  {selected && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#F58220] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow">
                      ✓ Picked
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/70">
                      {d.region} · {d.tours.length} tours
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{d.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75 line-clamp-2">{d.tagline}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ═════════════ STEP 2 · TOUR ═════════════ */}
      <Section
        id="step-tour"
        index="02"
        label={tour ? `Tour · ${tour.title}` : destination ? `${destination.name} tours` : 'Tour'}
        title={
          <>
            <span className="font-light">Select</span>{' '}
            <span className="font-bold text-[#F58220]">Itinerary</span>
          </>
        }
        active={!!destination}
        completed={!!tour}
        emptyState={!destination && 'Select a destination first to see the itineraries we design there.'}
      >
        <AnimatePresence mode="wait">
          {destination && (
            <motion.div
              key={destination.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {destination.tours.map((t) => {
                const selected = t.slug === tourSlug;
                const tiers = tourTiers(t);
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => onPickTour(t.slug)}
                    className={`group relative isolate flex flex-col overflow-hidden rounded-sm bg-white text-left transition ${
                      selected
                        ? 'ring-2 ring-[#F58220] ring-offset-2 ring-offset-white'
                        : 'ring-1 ring-neutral-200 hover:ring-neutral-400'
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className={`object-cover transition duration-[1200ms] ease-out ${
                          selected ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                        <span className="rounded-full bg-black/40 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                          {t.category} · {t.duration}
                        </span>
                        {selected && (
                          <span className="rounded-full bg-[#F58220] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow">
                            ✓ Picked
                          </span>
                        )}
                      </div>

                      {/* Hover/active tier overlay */}
                      <div
                        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-12 transition duration-500 ease-out ${
                          selected
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                        }`}
                      >
                        <p className="text-[0.58rem] font-medium uppercase tracking-[0.4em] text-white/65">
                          Available in
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {tiers.map((x) => (
                            <span
                              key={x}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur"
                            >
                              <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                              {x}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3
                        className={`text-balance text-2xl font-light leading-[1.04] tracking-tight transition ${
                          selected ? 'text-[#F58220]' : 'text-neutral-950 group-hover:text-[#F58220]'
                        }`}
                      >
                        <span className="font-bold">{t.title}</span>
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{t.summary}</p>

                      <div className="mt-6 flex flex-wrap gap-3 border-t border-neutral-200 pt-5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-neutral-500">
                        <span>{t.pace}</span>
                        <span>·</span>
                        <span>{t.group}</span>
                        <span>·</span>
                        <span>{t.bestTime}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* ═════════════ STEP 3 · TIER ═════════════ */}
      <Section
        id="step-tier"
        index="03"
        label={tier ? `Tier · ${tier}` : 'Tier'}
        title={
          <>
            <span className="font-light">Select your</span>{' '}
            <span className="font-bold text-[#F58220]">Service Tier</span>
          </>
        }
        active={!!tour}
        completed={!!tier}
        emptyState={!tour && (destination
          ? 'Select an itinerary to see tier options.'
          : 'Select a destination and an itinerary to see tier options.')}
      >
        <AnimatePresence mode="wait">
          {tour && (
            <motion.div
              key={tour.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-3"
            >
              {TIERS.map((t, i) => {
                const selected = t === tier;
                const meta = tierMeta[t];
                const available = tourTiers(tour).includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={!available}
                    onClick={() => available && onPickTier(t)}
                    aria-pressed={selected}
                    className={`group flex h-full flex-col p-9 text-left transition ${
                      selected
                        ? 'bg-neutral-950 text-white'
                        : available
                          ? 'bg-white hover:bg-neutral-50'
                          : 'cursor-not-allowed bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[0.62rem] font-medium uppercase tracking-[0.4em] ${
                          selected ? 'text-[#F58220]' : 'text-neutral-500'
                        }`}
                      >
                        Tier · {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`inline-flex h-2 w-2 rounded-full ${
                          selected
                            ? 'bg-[#F58220] shadow-[0_0_12px_rgba(245,130,32,0.7)]'
                            : 'bg-neutral-300'
                        }`}
                      />
                    </div>

                    <h3
                      className={`mt-10 text-balance text-3xl font-bold leading-[1.04] tracking-tight ${
                        selected ? 'text-white' : ''
                      }`}
                    >
                      {meta.label}.
                    </h3>
                    <p
                      className={`mt-4 text-base leading-7 ${
                        selected ? 'text-white/85' : 'text-neutral-700'
                      }`}
                    >
                      {meta.tagline}
                    </p>
                    <p
                      className={`mt-7 text-sm leading-7 ${
                        selected ? 'text-white/65' : 'text-neutral-600'
                      }`}
                    >
                      {meta.description}
                    </p>

                    <div
                      className={`mt-auto flex items-center justify-between pt-10 ${
                        selected ? 'border-t border-white/10' : 'border-t border-neutral-200'
                      }`}
                    >
                      <span
                        className={`text-[0.62rem] font-medium uppercase tracking-[0.32em] ${
                          selected ? 'text-white/55' : 'text-neutral-500'
                        }`}
                      >
                        {meta.lodgeStyle}
                      </span>
                      {selected && (
                        <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
                          ✓ Picked
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* ═════════════ STEP 4 · TRIP DETAILS ═════════════ */}
      <Section
        id="step-details"
        index="04"
        label="Your details"
        title={
          <>
            <span className="font-bold text-[#F58220]">Inquire Now</span>
          </>
        }
        active
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (submitting) return;
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            setSubmitting(true);
            setSubmitMessage(null);
            try {
              const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  travellers: formData.get('travellers'),
                  dates: formData.get('dates'),
                  notes: formData.get('notes'),
                  destination: destination?.name ?? '',
                  tour: tour?.title ?? '',
                  tier: tier ?? '',
                  status: 'New',
                }),
              });
              if (!res.ok) throw new Error(`Submission failed (${res.status})`);
              setSubmitMessage(
                'Thank you. A Travel Designer will reply personally within 24 hours.',
              );
              (e.currentTarget as HTMLFormElement).reset();
              setDestinationSlug(null);
              setTourSlug(null);
              setTier(null);
            } catch (err) {
              console.error(err);
              setSubmitMessage(
                'Something went wrong — please email info@soulexpeditionsafrica.com directly.',
              );
            } finally {
              setSubmitting(false);
            }
          }}
          className="grid gap-6 rounded-sm border border-neutral-200/80 bg-white p-10 sm:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="Priya Raman" required />
            <Field label="Email" name="email" type="email" placeholder="priya@example.com" required />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Travellers" name="travellers" placeholder="2 adults" />
            <Field label="Preferred dates" name="dates" placeholder="Aug 2026 (flexible)" />
          </div>

          <label className="block">
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
              Anything else we should know
            </span>
            <textarea
              name="notes"
              rows={5}
              placeholder="What kind of trip would feel like a great gift to yourselves?"
              className="mt-3 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-5 py-4 text-base text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
            />
          </label>

          {/* Live summary */}
          <div className="mt-2 rounded-sm bg-neutral-50/80 p-6 ring-1 ring-neutral-200/80">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
              Your journey so far
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {summary.length === 0 && (
                <p className="text-sm leading-7 text-neutral-500">
                  Nothing picked yet — make a selection above and we'll summarise it here.
                </p>
              )}
              {summary.map((s, i) => (
                <span
                  key={s}
                  className={`inline-flex items-center gap-3 text-base ${
                    i === summary.length - 1 ? 'font-bold text-neutral-950' : 'font-light text-neutral-700'
                  }`}
                >
                  {i > 0 && <span className="text-neutral-300">·</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="max-w-sm text-sm leading-7 text-neutral-500">
              We reply personally within 24 hours. No mailing list. Ever.
            </p>
            <button
              type="submit"
              disabled={!ready || submitting}
              className={`inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] transition ${
                ready && !submitting
                  ? 'bg-[#F58220] text-white shadow-glow hover:bg-[#ff9d2e]'
                  : 'cursor-not-allowed bg-neutral-200 text-neutral-500'
              }`}
            >
              {submitting
                ? 'Sending…'
                : ready
                  ? 'Send enquiry →'
                  : 'Pick destination · tour · tier'}
            </button>
          </div>

          {submitMessage && (
            <div
              role="status"
              className="mt-2 rounded-sm bg-[#F58220]/10 px-5 py-4 text-sm leading-7 text-[#8a4e1f] ring-1 ring-[#F58220]/25"
            >
              {submitMessage}
            </div>
          )}
        </form>
      </Section>

      {/* ═════════════ CONTACT FALLBACK — only renders if any field is set ═════════════ */}
      {contactRows.length > 0 && (
        <section className="px-6 pb-32 lg:px-10">
          <div
            className={`mx-auto grid max-w-[1280px] gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-${Math.min(contactRows.length, 3)}`}
          >
            {contactRows.map((row) => (
              <div key={row.k} className="bg-white px-9 py-8">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                  {row.k}
                </p>
                <p className="mt-3 text-base font-medium text-neutral-950">{row.v}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* ────────────────────────────────────────────────
   Reusable section wrapper for each booking step
   ──────────────────────────────────────────────── */
function Section({
  id,
  index,
  label,
  title,
  children,
  active,
  completed,
  emptyState,
}: {
  id?: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  active: boolean;
  completed?: boolean;
  emptyState?: string | false | null;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 py-14 lg:px-10 lg:py-20 ${active ? '' : 'opacity-55'}`}
      aria-disabled={!active}
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 flex flex-col items-start justify-between gap-5 border-b border-neutral-200 pb-7 lg:flex-row lg:items-end"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span
                className={`text-[0.62rem] font-semibold uppercase tracking-[0.4em] ${
                  completed ? 'text-[#F58220]' : 'text-neutral-500'
                }`}
              >
                Step · {index}
              </span>
              {completed && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F58220]/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
                  ✓ Done
                </span>
              )}
            </div>
            <h2 className="text-balance text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.06] tracking-[-0.025em] text-neutral-950">
              {title}
            </h2>
          </div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
            {label}
          </p>
        </motion.header>

        {emptyState ? (
          <div className="rounded-sm border border-dashed border-neutral-300 bg-neutral-50/60 px-8 py-12 text-center">
            <p className="text-sm leading-7 text-neutral-500">{emptyState}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
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
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
        {label}
        {required && <span className="ml-1 text-[#F58220]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-3 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-5 py-4 text-base text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
      />
    </label>
  );
}
