'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

/* Trimmed shape of a Tour — only what the hero preview needs, so the
   server doesn't serialise full itineraries into the client bundle. */
export type TourPreview = {
  slug: string;
  title: string;
  duration: string;
  pace: string;
  group: string;
  category: string;
  summary: string;
  highlights: string[];
  bestTime: string;
};

type Props = {
  destinationSlug: string;
  destinationName: string;
  region: string;
  tagline: string;
  bestTime: string;
  highlights: string[];
  tours: TourPreview[];
};

const panel = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

export default function DestinationTourExplorer({
  destinationSlug,
  destinationName,
  region,
  tagline,
  bestTime,
  highlights,
  tours,
}: Props) {
  /* The tour being previewed. Set on hover or keyboard focus, and kept
     in place after the pointer leaves so the panel doesn't flicker. */
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = tours.find((t) => t.slug === activeSlug) ?? null;

  return (
    <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 pb-14 pt-28 lg:grid-cols-[minmax(340px,400px)_1fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-16 lg:pt-32">
      {/* ── Tours sidebar ── */}
      <aside className="order-2 rounded-2xl border border-white/15 bg-white/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:order-1 lg:p-7">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-neutral-950">
            {destinationName} Tours
          </p>
          <span className="text-[0.58rem] uppercase tracking-[0.28em] text-neutral-400">
            {String(tours.length).padStart(2, '0')} routes
          </span>
        </div>

        <ul className="mt-2 max-h-[42vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[46vh]">
          {tours.map((t, i) => {
            const isActive = t.slug === activeSlug;
            return (
              <li key={t.slug}>
                <Link
                  href={`/destinations/${destinationSlug}/tours/${t.slug}`}
                  onMouseEnter={() => setActiveSlug(t.slug)}
                  onFocus={() => setActiveSlug(t.slug)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex items-center gap-4 rounded-xl px-3 py-3 transition ${
                    isActive ? 'bg-[#F58220]/10' : 'hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className={`text-[0.6rem] font-semibold uppercase tracking-[0.28em] transition ${
                      isActive ? 'text-[#F58220]' : 'text-neutral-300'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[0.95rem] font-medium leading-snug transition ${
                        isActive ? 'text-[#F58220]' : 'text-neutral-900 group-hover:text-[#F58220]'
                      }`}
                    >
                      {t.title}
                    </span>
                    <span className="mt-0.5 block text-[0.72rem] text-neutral-500">
                      {t.duration} · {t.category}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex-none transition ${
                      isActive
                        ? 'translate-x-0.5 text-[#F58220]'
                        : 'text-neutral-300 group-hover:translate-x-0.5 group-hover:text-[#F58220]'
                    }`}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#F58220]"
        >
          Talk to a Travel Designer
          <span aria-hidden="true">→</span>
        </Link>
      </aside>

      {/* ── Right panel: destination essentials, or the previewed tour ── */}
      <div className="order-1 text-white lg:order-2">
        <AnimatePresence mode="wait">
          {active ? (
            /* ── Tour summary ── */
            <motion.div
              key={active.slug}
              variants={panel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="rounded-2xl border border-white/15 bg-neutral-950/55 p-7 backdrop-blur-md lg:p-9"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                  Tour summary
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSlug(null)}
                  className="text-[0.6rem] uppercase tracking-[0.28em] text-white/55 transition hover:text-white"
                >
                  Back to {destinationName} ×
                </button>
              </div>

              <h2 className="mt-5 text-balance text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.035em]">
                {active.title}
              </h2>

              <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/70">
                {[active.duration, active.pace, active.group, active.category].map((m, i) => (
                  <li key={m} className="flex items-center gap-3">
                    {i > 0 && <span className="text-white/25">·</span>}
                    {m}
                  </li>
                ))}
              </ul>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">{active.summary}</p>

              {active.highlights.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {active.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.72rem] leading-snug text-white/85 backdrop-blur"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/destinations/${destinationSlug}/tours/${active.slug}/details`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
                >
                  View detailed itinerary
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={`/destinations/${destinationSlug}/tours/${active.slug}`}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:border-[#F58220] hover:text-[#F58220]"
                >
                  Book this tour
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <p className="mt-5 text-[0.64rem] uppercase tracking-[0.32em] text-white/55">
                Best time · {active.bestTime || bestTime}
              </p>
            </motion.div>
          ) : (
            /* ── Destination essentials (default) ── */
            <motion.div key="destination" variants={panel} initial="hidden" animate="show" exit="exit">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
              >
                ← All destinations
              </Link>

              <p className="mt-7 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                {region}
              </p>

              <h1 className="mt-5 text-balance text-[clamp(2.6rem,6.5vw,5.4rem)] font-light leading-[0.95] tracking-[-0.04em]">
                {destinationName}
              </h1>

              <p className="mt-5 max-w-xl text-balance text-lg leading-8 text-white/85">{tagline}</p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.72rem] leading-snug text-white/85 backdrop-blur"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
                >
                  Plan your journey
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <span className="text-[0.64rem] uppercase tracking-[0.32em] text-white/65">
                  Best time · {bestTime}
                </span>
              </div>

              <p className="mt-7 text-[0.64rem] uppercase tracking-[0.28em] text-white/45">
                Hover a tour to preview it
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
