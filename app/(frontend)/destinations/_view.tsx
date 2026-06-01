'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Destination } from '@/lib/types';

/* ───────── motion ───────── */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* Fallback hero image used only when no destination has a hero set. */
const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=2400&q=85';

export default function DestinationsView({
  destinations,
}: {
  destinations: Destination[];
}) {
  /* East Africa shown first, with Rwanda always featured at the top of that section. */
  const eastAfrica = destinations
    .filter((d) => d.region === 'East Africa')
    .sort((a, b) => {
      if (a.slug === 'rwanda') return -1;
      if (b.slug === 'rwanda') return 1;
      return a.name.localeCompare(b.name);
    });
  const elsewhere = destinations.filter((d) => d.region !== 'East Africa');

  const totalTours = destinations.reduce((sum, d) => sum + d.tours.length, 0);
  const totalLodges = destinations.reduce((sum, d) => sum + d.signatureLodges.length, 0);

  const featured = eastAfrica[0];
  const eastAfricaRest = eastAfrica.slice(1);

  const heroStats = [
    { value: String(destinations.length).padStart(2, '0'), label: 'Countries' },
    { value: String(totalTours), label: 'Curated tours' },
    { value: String(totalLodges), label: 'Signature lodges' },
    { value: '2018', label: 'Founded · Kigali' },
  ];

  const heroImage =
    featured?.hero || destinations.find((d) => d.hero || d.image)?.hero || FALLBACK_HERO;

  return (
    <main className="bg-white">
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt="Across the wild heart of East Africa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-36 lg:px-10 lg:pb-16">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
            <motion.div variants={reveal} className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58220] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              </span>
              <span>Destinations · Index</span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.94] tracking-[-0.045em]"
            >
              <span className="block font-light">Six countries.</span>
              <span className="block font-bold text-[#F58220]">One way to travel.</span>
            </motion.h1>

            <motion.p variants={reveal} className="mt-9 max-w-xl text-balance text-lg leading-9 text-white/85">
              We work where we know — deeply. These countries are home to our guides, designers, and
              host communities. Every itinerary moves at the pace of the landscape, not the calendar.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════ STAT RIBBON ═════════════ */}
      <section className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="hairline-grid grid grid-cols-2 sm:grid-cols-4"
          >
            {heroStats.map((s) => (
              <li key={s.label} className="group px-6 py-9 text-center sm:py-10">
                <p className="text-4xl font-light tracking-tight text-neutral-950 transition duration-300 group-hover:text-[#F58220] sm:text-5xl">
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

      {/* ═════════════ EAST AFRICA — Region 01 ═════════════ */}
      {featured && (
        <section className="px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="flex flex-col items-start justify-between gap-5 border-b border-neutral-200 pb-7 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Region · 01
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                  <span className="font-bold">East</span> <span className="font-light">Africa</span>
                </h2>
              </div>
              <div className="flex items-center gap-6 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                <span>{eastAfrica.length} countries</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>{eastAfrica.reduce((s, d) => s + d.tours.length, 0)} tours</span>
              </div>
            </motion.header>

            {/* Featured Rwanda — split card */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/destinations/${featured.slug}`}
                className="group block overflow-hidden rounded-sm border border-neutral-200/80"
              >
                <article className="grid lg:grid-cols-[1.35fr_1fr]">
                  <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
                    {featured.hero && (
                      <Image
                        src={featured.hero}
                        alt={featured.name}
                        fill
                        priority
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="object-cover transition duration-[1800ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                      Featured · The studio HQ
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-neutral-950 p-10 text-white lg:p-14">
                    <div className="space-y-7">
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                        East Africa · {featured.tours.length} tours
                      </p>
                      <h3 className="text-balance text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[0.94] tracking-[-0.04em]">
                        {featured.name}.
                      </h3>
                      <p className="max-w-md text-lg leading-9 text-white/75">{featured.tagline}</p>
                    </div>

                    <div className="mt-10 space-y-6">
                      <ul className="space-y-px">
                        {featured.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-4 border-t border-white/10 py-3 text-sm leading-7 text-white/80 last:border-b"
                          >
                            <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#F58220]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <span className="inline-flex items-center gap-3 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:text-white">
                        Discover {featured.name}
                        <span className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>

            {/* East Africa — remaining countries */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eastAfricaRest.map((d, i) => (
                <DestinationCard key={d.slug} d={d} index={i + 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ BEYOND EAST AFRICA — Region 02 ═════════════ */}
      {elsewhere.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="flex flex-col items-start justify-between gap-5 border-b border-neutral-300 pb-7 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Region · 02
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                  <span className="font-bold">Beyond</span>{' '}
                  <span className="font-light">East Africa</span>
                </h2>
              </div>
              <div className="flex items-center gap-6 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                <span>{elsewhere.length} countries</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>{elsewhere.reduce((s, d) => s + d.tours.length, 0)} tours</span>
              </div>
            </motion.header>

            <div className="grid gap-6 lg:grid-cols-2">
              {elsewhere.map((d, i) => (
                <DestinationCard key={d.slug} d={d} index={i + 5} wide />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ INDEX LIST ═════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                  Quick index
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  All destinations.
                </h2>
              </div>
            </div>
          </motion.header>

          <ul className="divide-y divide-neutral-200">
            {destinations.map((d, i) => (
              <motion.li
                key={d.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
              >
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group grid items-center gap-6 py-8 transition lg:grid-cols-[0.45fr_2fr_1.4fr_1fr_0.7fr_auto] lg:py-10"
                >
                  <span className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-neutral-400 transition group-hover:text-[#F58220]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-balance text-3xl tracking-tight text-neutral-950 transition group-hover:text-[#F58220] lg:text-4xl">
                    <span className="font-light">{d.name}</span>
                  </h3>

                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.region}
                  </p>

                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.tours.length} tours
                  </p>

                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.bestTime}
                  </p>

                  <div className="relative ml-auto hidden h-20 w-28 overflow-hidden rounded-sm opacity-0 transition duration-500 group-hover:opacity-100 lg:block">
                    {d.image && (
                      <Image src={d.image} alt={d.name} fill sizes="112px" className="object-cover" />
                    )}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════ CTA — cinematic full-bleed ═════════════ */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[620px]">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={heroImage}
            alt="The wild heart of East Africa"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/35" />
        </motion.div>

        <div className="relative w-full px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              variants={stagger}
              className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
            >
              <div className="space-y-7">
                <motion.p variants={reveal} className="flex items-center gap-4 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  Begin your journey
                </motion.p>
                <motion.h2
                  variants={reveal}
                  className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
                >
                  <span className="font-light">Pick a country.</span>{' '}
                  <span className="font-bold text-[#F58220]">We’ll design the rest.</span>
                </motion.h2>
              </div>

              <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
                >
                  Inquire Now
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/visit-rwanda"
                  className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/85 transition hover:border-[#F58220] hover:text-[#F58220]"
                >
                  Visit Rwanda
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   DestinationCard — portrait card for grids
   ───────────────────────────────────────────── */
function DestinationCard({
  d,
  index,
  wide = false,
}: {
  d: Destination;
  index: number;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative isolate block overflow-hidden rounded-sm bg-neutral-950"
      >
        <div className={`relative w-full overflow-hidden ${wide ? 'aspect-[16/11]' : 'aspect-[4/5]'}`}>
          {d.image && (
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
              className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition group-hover:from-black/90" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 lg:p-6">
            <span className="rounded-full bg-black/35 px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
              {String(index).padStart(2, '0')} · {d.region}
            </span>
            <span className="rounded-full bg-black/35 px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
              {d.tours.length} tours
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9">
            <h3 className="text-balance text-[clamp(2.2rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.03em]">
              <span className="font-bold">{d.name}</span>
            </h3>
            <p className="mt-3 max-w-md text-base leading-7 text-white/80">{d.tagline}</p>

            <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5">
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white/65">
                {d.bestTime}
              </span>
              <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:text-white">
                Discover
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
