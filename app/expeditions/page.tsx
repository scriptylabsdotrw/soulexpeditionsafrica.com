'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { expeditions } from './data';
import { TIERS } from '../destinations/data';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function ExpeditionsPage() {
  const totalDays = expeditions.reduce((sum, e) => {
    const days = parseInt(e.duration, 10);
    return sum + (isNaN(days) ? 0 : days);
  }, 0);

  const heroStats = [
    { value: '04', label: 'Signatures' },
    { value: String(totalDays), label: 'Days · combined' },
    { value: '03', label: 'Tiers per route' },
    { value: 'Year-round', label: 'Privately designed' },
  ];

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
                  Signature expeditions · Index
                </span>
              </motion.div>
              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.94] tracking-[-0.045em] text-neutral-950"
              >
                <span className="block font-light">Four ways</span>
                <span className="block font-bold text-[#F58220]">to feel Africa.</span>
              </motion.h1>
            </div>
            <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-neutral-600">
              These four signature routes are our most requested foundations. Each is privately
              designed, owner-led, and shaped — start to finish — around your pace, the season, and
              the wildlife calendar.
            </motion.p>
          </motion.div>

          {/* Stats ribbon */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mt-20 grid grid-cols-2 overflow-hidden rounded-sm border border-neutral-200/80 sm:grid-cols-4"
          >
            {heroStats.map((s, i) => (
              <li
                key={s.label}
                className={`px-6 py-9 ${i > 0 ? 'sm:border-l border-neutral-200/80' : ''} ${
                  i >= 2 ? 'border-t sm:border-t-0' : ''
                } ${i === 1 ? 'border-l border-neutral-200/80' : ''}`}
              >
                <p className="text-4xl font-light tracking-tight text-neutral-950 sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.35em] text-neutral-500">
                  {s.label}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ═════════════ EXPEDITIONS — Editorial alternating spreads ═════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px] space-y-24 lg:space-y-32">
          {expeditions.map((exp, i) => (
            <motion.article
              key={exp.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="group grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
            >
              <Link
                href={`/expeditions/${exp.slug}`}
                className={`relative isolate block aspect-[4/5] overflow-hidden rounded-sm shadow-deep ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover transition duration-[1800ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition group-hover:from-black/75" />

                {/* Top badges */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="rounded-full bg-black/40 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                    {String(i + 1).padStart(2, '0')} · Signature
                  </span>
                  <span className="rounded-full bg-black/40 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                    {exp.duration}
                  </span>
                </div>

                {/* Hover tier overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-6 pt-12 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/65">
                    Available in
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TIERS.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Content column */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#F58220]">
                    {String(i + 1).padStart(2, '0')} / 04
                  </span>
                  <span className="h-3 w-px bg-neutral-300" />
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                    {exp.location}
                  </span>
                </div>

                <h2 className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[0.96] tracking-[-0.04em] text-neutral-950">
                  <span className="font-bold">{exp.title}.</span>
                </h2>

                <p className="max-w-lg text-lg leading-9 text-neutral-600">{exp.subtitle}</p>

                {/* Meta hairline grid */}
                <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-neutral-200/80">
                  {[
                    { k: 'Duration', v: exp.duration },
                    { k: 'Region', v: exp.location.split(' · ')[0] },
                    { k: 'Pace', v: 'Privately tuned' },
                  ].map((row) => (
                    <li key={row.k} className="bg-white px-5 py-5">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        {row.k}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-neutral-950">{row.v}</p>
                    </li>
                  ))}
                </ul>

                {/* Always-visible tier row */}
                <div className="flex items-center gap-3 border-t border-neutral-200 pt-5">
                  <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    Tiers
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {TIERS.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-neutral-700 transition group-hover:border-[#F58220]/30 group-hover:text-[#F58220]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href={`/expeditions/${exp.slug}`}
                    className="group/btn inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#F58220]"
                  >
                    Explore the route
                    <span className="transition group-hover/btn:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-neutral-400"
                  >
                    Tailor this journey
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═════════════ CTA ═════════════ */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-sm bg-neutral-950 px-10 py-20 text-white shadow-deep sm:px-16">
          <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-40" aria-hidden />
          <div className="glow-orb -right-32 top-0 opacity-25" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-end"
          >
            <div className="space-y-7">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Begin
              </p>
              <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.035em]">
                <span className="font-light">Pick a route.</span>
                <br />
                <span className="font-bold text-[#F58220]">We’ll design the rest.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                Configure your journey
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/destinations"
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#F58220]"
              >
                <span className="relative pb-1">
                  Browse countries
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/30 transition group-hover:bg-[#F58220]" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
