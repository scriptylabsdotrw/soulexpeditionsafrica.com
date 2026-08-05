'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Destination } from '@/shared/lib/types';

export default function DestinationsView({
  destinations,
}: {
  destinations: Destination[];
}) {
  /* This page complements our dedicated Rwanda experience with the three
     neighbouring East African destinations we currently feature. */
  const countryOrder = ['kenya', 'tanzania', 'uganda'];
  const ordered = destinations
    .filter((destination) => countryOrder.includes(destination.slug))
    .sort((a, b) => countryOrder.indexOf(a.slug) - countryOrder.indexOf(b.slug));

  return (
    <main className="bg-white">
      {/* ════════════ HEADING + TILES — single row on desktop, no scroll ════════════ */}
      <section className="px-6 pb-12 pt-28 lg:px-10 lg:pb-10 lg:pt-16">
        <div className="mx-auto max-w-[1280px]">
          {/* Heading */}
          <div className="flex items-center gap-4 border-b border-neutral-200 pb-5">
            <span className="inline-block h-px w-10 flex-none bg-[#F58220]" />
            <h1 className="text-balance text-[clamp(1.8rem,3.4vw,2.8rem)] font-light tracking-tight text-neutral-950">
              Other <span className="font-bold text-[#F58220]">East African Countries</span>
            </h1>
          </div>

          {/* The three cards share the complete-card click and hover treatment. */}
          <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:mt-8 lg:gap-7">
            {ordered.map((d, i) => (
              <CountryTile key={d.slug} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="bg-neutral-950 px-6 py-10 text-white lg:px-10 lg:py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <p className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
              <span className="inline-block h-px w-10 bg-[#F58220]" />
              Not sure where to start?
            </p>
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Pick a country. <span className="font-bold text-[#F58220]">We&rsquo;ll design the rest.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-fit flex-none items-center gap-3 rounded-full bg-[#F58220] px-9 py-4 text-[0.86rem] font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition hover:bg-white hover:text-neutral-950"
          >
            Talk to a Travel Designer
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   CountryTile — compact image-forward tile (fits 6-up in one row)
   ───────────────────────────────────────────── */
function CountryTile({
  d,
  index,
}: {
  d: Destination;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative isolate block aspect-[5/4] overflow-hidden rounded-2xl shadow-[0_12px_34px_rgba(0,0,0,0.16)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(0,0,0,0.26)] sm:aspect-[4/5] lg:aspect-[4/3]"
      >
        {d.image && (
          <Image
            src={d.image}
            alt={d.name}
            fill
            sizes="(min-width: 1024px) 410px, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition duration-[1600ms] ease-out group-hover:scale-[1.07]"
          />
        )}

        {/* Gradient for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition duration-500 group-hover:from-black/90" />

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 text-white lg:p-4">
          <h3 className="text-lg font-bold leading-tight tracking-tight lg:text-xl">
            {d.name}
          </h3>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/85 transition group-hover:text-[#F58220]">
            {d.tours.length} tours
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
