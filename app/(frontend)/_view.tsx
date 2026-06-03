'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import type {
  JournalPost,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  Testimonial,
} from '@/lib/types';

type HomeViewProps = {
  siteContent: SiteContent;
  principles: Principle[];
  pressFeatures: PressFeature[];
  partners: Partner[];
  featuredTestimonial: Testimonial | null;
  journal: JournalPost[];
};

const formatDate = (iso: string) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/* ──────────────────────────────────────────────────────────────
   IMAGERY
   ────────────────────────────────────────────────────────────── */
const HERO_GORILLA =
  'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=2400&q=85';
const GORILLA_DETAIL =
  'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&w=1600&q=85';
const GUIDE_PORTRAIT =
  'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=1600&q=85';
const RWANDA_FOREST =
  'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1800&q=85';

/* Imagery for the Rwanda spotlight gallery — gorilla, intore culture, safari */
const RWANDA_GALLERY = {
  gorilla:
    'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1400&q=85',
  intore: '/images/uploads/intore.jpg',
  safari:
    'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1400&q=85',
};

const expeditions = [
  {
    slug: 'gorilla-trekking',
    title: 'Gorilla Trekking',
    location: 'Rwanda · Uganda',
    duration: '7 days',
    image: HERO_GORILLA,
    href: '/destinations/rwanda',
  },
  {
    slug: 'great-migration',
    title: 'Great Migration Safari',
    location: 'Serengeti · Maasai Mara',
    duration: '10 days',
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=85',
    href: '/destinations/tanzania',
  },
  {
    slug: 'cultural-heritage',
    title: 'Cultural Heritage Journey',
    location: 'Rwanda · Tanzania · Kenya',
    duration: '9 days',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=85',
    href: '/destinations/rwanda',
  },
  {
    slug: 'indian-ocean-escape',
    title: 'Indian Ocean Escape',
    location: 'Zanzibar · Lamu',
    duration: '8 days',
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1600&q=85',
    href: '/destinations/zanzibar',
  },
];


/* ──────────────────────────────────────────────────────────────
   MOTION HELPERS
   ────────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
export default function HomeView({
  siteContent,
  principles,
  pressFeatures,
  partners,
  featuredTestimonial,
  journal,
}: HomeViewProps) {
  /* Derive runtime values from DB content */
  const stats = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.travellersHosted && { value: siteContent.travellersHosted, label: 'Travellers hosted' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
  ].filter(Boolean) as { value: string; label: string }[];

  /* Split partners into two rows for the marquee — only if any exist */
  const partnersRowOne = partners;
  const partnersRowTwo = [...partners].reverse();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  useEffect(() => {
    let rafId: number;
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true, lerp: 0.08 });
    const animate = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO — Cleaner editorial composition, weight-driven type
         ═════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative isolate flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden"
      >
        {/* Background image + parallax + Ken Burns */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <div className="ken-burns h-full w-full">
              <Image
                src={siteContent.homeHeroImage || HERO_GORILLA}
                alt="A silverback mountain gorilla beside a tree in Volcanoes National Park, Rwanda"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_40%]"
              />
            </div>
            <div className="hero-overlay" />
          </div>
        </motion.div>

        {/* Bottom composition — location pin is now an eyebrow above the headline */}
        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto max-w-[1280px] px-6 pb-10 lg:px-10 lg:pb-14">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-5xl text-white"
            >
              {/* Location pin — eyebrow */}
              <motion.div
                variants={reveal}
                className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85"
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58220] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F58220] shadow-[0_0_12px_rgba(245,130,32,0.8)]" />
                </span>
                <span>Volcanoes National Park · Rwanda</span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(3rem,9vw,8.4rem)] leading-[0.92] tracking-[-0.05em]"
              >
                <span className="block font-light">Crafting soulful</span>
                <span className="block font-light">African</span>
                <span className="block font-bold text-[#F58220]">expeditions.</span>
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-10 max-w-xl text-balance text-lg leading-9 text-white/80"
              >
                Bespoke gorilla treks. Curated journeys through the wild, the cultural, and the
                serene. From mountain gorillas to Indian Ocean shores, experience Africa through
                the eyes of local experts — since 2018.
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-7">
                <Link
                  href="/destinations"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:bg-[#F58220] hover:text-white"
                >
                  Select Destinations
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/90 transition hover:text-[#F58220]"
                >
                  <span className="relative pb-1">
                    Inquire Now
                    <span className="absolute -bottom-0 left-0 h-px w-full bg-white/40 transition group-hover:bg-[#F58220]" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom meta strip — full-width hairline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-7 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-white/55 sm:flex-row sm:items-center"
            >
              <span>Now booking · Seasons 2026 / 2027</span>

              <span className="hidden h-px w-12 bg-white/20 sm:block" aria-hidden />

              <span className="flex items-center gap-3 text-white/65">
                <span>Scroll</span>
                <span className="scroll-cue h-8" aria-hidden />
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          STAT RIBBON — only renders when any stat is set in admin
         ═════════════════════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <ul
              className={`hairline-grid grid grid-cols-2 ${
                stats.length >= 4
                  ? 'sm:grid-cols-4'
                  : stats.length === 3
                    ? 'sm:grid-cols-3'
                    : 'sm:grid-cols-2'
              }`}
            >
              {stats.map((s) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="group px-6 py-10 text-center sm:py-12"
                >
                  <p className="text-4xl font-light tracking-tight text-neutral-950 transition duration-300 group-hover:text-[#F58220] sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                    {s.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          RWANDA CULTURE — INTORE (full-bleed, sits right after hero)
         ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-neutral-950 text-white" id="about">
        <div className="grid items-stretch lg:grid-cols-2">
          {/* Image — Intore dancers */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate min-h-[440px] lg:min-h-[680px]"
          >
            <Image
              src="/images/uploads/intore.jpg"
              alt="Intore dancers performing Rwanda's traditional warrior dance"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Blend the image into the dark panel */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-neutral-950" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-white backdrop-blur lg:left-10 lg:top-10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" /> Intore · Living culture
            </div>
          </motion.div>

          {/* Text panel */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="flex flex-col justify-center gap-7 px-6 py-16 lg:px-16 lg:py-24"
          >
            <motion.div variants={reveal} className="flex items-center gap-5">
              <span className="inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                Index · 01 — Culture
              </span>
            </motion.div>

            <motion.h2
              variants={reveal}
              className="text-balance text-[clamp(2.2rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.03em]"
            >
              The dance of the
              <br />
              <span className="font-bold text-[#F58220]">chosen ones.</span>
            </motion.h2>

            <motion.p variants={reveal} className="max-w-xl text-lg leading-9 text-white/70">
              Long before the safari, there was the song. The{' '}
              <span className="text-white">Intore</span> — “the chosen ones” — are Rwanda’s
              warrior-dancers: grass-mane headdresses, stamping rhythms, and thunderous{' '}
              <span className="text-white">ingoma</span> drums that have carried the nation’s story
              for centuries. Every Soul journey makes room for an evening with them — because you
              cannot truly know a country until you have heard it keep time.
            </motion.p>

            <motion.ul variants={reveal} className="grid grid-cols-2 gap-x-8 gap-y-5 pt-2 sm:max-w-md">
              {[
                { k: 'Origin', v: 'Royal courts of Rwanda' },
                { k: 'Meaning', v: '“The chosen / the best”' },
                { k: 'Heart', v: 'Drums · dance · poetry' },
                { k: 'Where', v: 'Kigali · Nyanza · villages' },
              ].map((row) => (
                <li key={row.k} className="border-t border-white/12 pt-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/45">{row.k}</p>
                  <p className="mt-2 text-base text-white/90">{row.v}</p>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={reveal} className="pt-3">
              <Link
                href="/visit-rwanda"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:border-[#F58220] hover:text-[#F58220]"
              >
                Experience Rwandan culture
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          FEATURED EXPEDITION — Gorilla editorial spread
         ═════════════════════════════════════════════════════════ */}
      <section className="relative bg-neutral-50/70 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
          >
            <motion.div variants={reveal} className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  Featured · 01 / 04
                </span>
                <span className="h-px w-16 bg-neutral-200" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">
                  Signature
                </span>
              </div>
              <Link
                href="/destinations"
                className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-neutral-950 sm:inline"
              >
                All destinations →
              </Link>
            </motion.div>

            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <motion.div variants={reveal} className="relative isolate aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src={GORILLA_DETAIL}
                  alt="A young mountain gorilla looking through the canopy"
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.04]"
                />
                <div className="absolute left-7 top-7 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" /> Rwanda · Uganda
                </div>
              </motion.div>

              <motion.div variants={reveal} className="space-y-9">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  7 days · Bisate + Bwindi Lodge
                </p>
                <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.035em] text-neutral-950">
                  Gorilla Trekking,
                  <br />
                  in <span className="font-bold text-[#F58220]">two forests</span>.
                </h2>
                <p className="max-w-lg text-lg leading-9 text-neutral-600">
                  Two countries, two forests, two completely different ways of meeting the
                  gorillas — paired with the finest forest lodges in East Africa and led by guides
                  who have tracked these families for nearly two decades.
                </p>

                <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-3">
                  {[
                    { k: 'Permits', v: '02 included' },
                    { k: 'Lodge', v: 'Bisate' },
                    { k: 'From', v: '$8,600 / guest' },
                  ].map((row) => (
                    <li key={row.k} className="bg-white px-5 py-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.35em] text-neutral-500">
                        {row.k}
                      </p>
                      <p className="mt-2 text-base font-medium text-neutral-950">{row.v}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <Link
                    href="/destinations/rwanda/tours/volcanoes-gorilla-encounter"
                    className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#F58220]"
                  >
                    The route
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-700 underline-offset-4 hover:text-[#F58220] hover:underline"
                  >
                    Tailor this journey
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          EXPEDITIONS LIST — Editorial numbered list (not a grid)
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <h2 className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                <span className="font-bold">Four Signature</span>
                <br />
                <span className="font-light text-neutral-400">Encounters.</span>
              </h2>
            </div>
            <Link
              href="/destinations"
              className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-[#F58220] sm:inline"
            >
              See all →
            </Link>
          </div>

          <ul className="divide-y divide-neutral-200">
            {expeditions.map((exp, i) => (
              <motion.li
                key={exp.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
              >
                <Link
                  href={exp.href}
                  className="group grid items-center gap-6 py-8 transition lg:grid-cols-[0.6fr_2fr_1.3fr_1fr_auto] lg:py-10"
                >
                  <span className="text-[0.72rem] uppercase tracking-[0.4em] text-neutral-400 transition group-hover:text-[#F58220]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-balance text-3xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#F58220] lg:text-4xl">
                    {exp.title}
                  </h3>

                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-500">
                    {exp.location}
                  </p>

                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-500">
                    {exp.duration}
                  </p>

                  {/* Hover-revealed thumbnail */}
                  <div className="relative ml-auto hidden h-20 w-28 overflow-hidden rounded-sm opacity-0 transition duration-500 group-hover:opacity-100 lg:block">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          STUDIO PHILOSOPHY — only renders when principles exist in admin
         ═════════════════════════════════════════════════════════ */}
      {principles.length > 0 && (
        <section className="bg-neutral-950 px-6 py-16 text-white lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-5">
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                    Index · 02 — Philosophy
                  </span>
                </div>
                <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                  <span className="font-light">Quiet</span>
                  <br />
                  <span className="font-bold text-[#F58220]">commitments.</span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-8 text-white/65">
                  The things we will not compromise on, written down so we are held to them.
                </p>
              </div>

              <ol className="space-y-px">
                {principles.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.85, delay: i * 0.08, ease: 'easeOut' }}
                    className="border-t border-white/10 py-10 first:border-t-0 first:pt-0"
                  >
                    <div className="grid items-start gap-8 sm:grid-cols-[0.18fr_1fr]">
                      <span className="text-[0.7rem] uppercase tracking-[0.4em] text-[#F58220]">
                        {p.number}
                      </span>
                      <div>
                        <h3 className="text-balance text-3xl font-light leading-tight tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-base leading-8 text-white/70">{p.body}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          DESTINATION SPOTLIGHT — Rwanda
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 sm:grid-cols-5 sm:grid-rows-2"
            >
              {/* Gorilla — hero of the gallery */}
              <div className="relative isolate aspect-[4/5] overflow-hidden rounded-sm sm:col-span-3 sm:row-span-2 sm:aspect-auto">
                <Image
                  src={RWANDA_GALLERY.gorilla}
                  alt="A silverback mountain gorilla in Volcanoes National Park"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">
                    Spotlight country
                  </p>
                  <p className="mt-1.5 text-3xl font-light tracking-tight">Rwanda</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.32em] text-[#F58220]">
                    Gorillas · Volcanoes NP
                  </p>
                </div>
              </div>

              {/* Intore culture */}
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-sm sm:col-span-2 sm:aspect-auto">
                <Image
                  src={RWANDA_GALLERY.intore}
                  alt="Intore traditional Rwandan dancers"
                  fill
                  sizes="(min-width: 1024px) 260px, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[0.6rem] uppercase tracking-[0.32em] text-white">
                  Intore · Culture
                </p>
              </div>

              {/* Safari */}
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-sm sm:col-span-2 sm:aspect-auto">
                <Image
                  src={RWANDA_GALLERY.safari}
                  alt="Akagera plains safari in Rwanda"
                  fill
                  sizes="(min-width: 1024px) 260px, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[0.6rem] uppercase tracking-[0.32em] text-white">
                  Safari · Akagera
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="space-y-9"
            >
              <motion.p variants={reveal} className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                Index · 03 — Spotlight
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,4.8vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950"
              >
                The land of a thousand hills — and one thoroughly modern capital.
              </motion.h2>
              <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-neutral-600">
                We have based our studio in Kigali since 2018. Rwanda is the easiest country in
                Africa to enter, the safest country we work in, and home to mountain gorillas, lake
                villages, canopy walks, intore drummers, and a memorial that quietly rewrites what
                a country can do with its own story.
              </motion.p>

              <motion.ul variants={reveal} className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4">
                {[
                  { k: 'Best time', v: 'Jun – Sep · Dec – Feb' },
                  { k: 'Visa', v: 'On arrival · USD 50' },
                  { k: 'Lodge', v: 'Bisate · Singita Kwitonda' },
                  { k: 'Currency', v: 'RWF · USD accepted' },
                ].map((row) => (
                  <li key={row.k} className="border-t border-neutral-200 pt-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                      {row.k}
                    </p>
                    <p className="mt-2 text-base text-neutral-900">{row.v}</p>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={reveal} className="pt-4">
                <Link
                  href="/destinations/rwanda"
                  className="group inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#F58220] hover:text-[#F58220]"
                >
                  Discover Rwanda
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          GUEST STORY — only renders when a featured testimonial exists
         ═════════════════════════════════════════════════════════ */}
      {featuredTestimonial && (
        <section className="bg-neutral-50/70 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              {featuredTestimonial.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative isolate hidden aspect-[4/5] overflow-hidden rounded-sm lg:block"
                >
                  <Image
                    src={featuredTestimonial.image}
                    alt={featuredTestimonial.attribution}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                className="space-y-10"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">
                  Guest story
                </span>
                <blockquote className="text-balance text-[clamp(1.85rem,3.6vw,3.1rem)] font-light leading-[1.18] tracking-[-0.02em] text-neutral-950">
                  <span className="text-[#F58220]">“</span>
                  {featuredTestimonial.quote}
                  <span className="text-[#F58220]">.”</span>
                </blockquote>
                <figcaption className="flex items-center gap-5">
                  <span className="h-px w-10 bg-neutral-300" />
                  <div>
                    <p className="text-base font-medium text-neutral-950">
                      {featuredTestimonial.attribution}
                    </p>
                    {featuredTestimonial.context && (
                      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.32em] text-neutral-500">
                        {featuredTestimonial.context}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          PRESS — only renders when press features are added in admin
         ═════════════════════════════════════════════════════════ */}
      {pressFeatures.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-neutral-500 lg:max-w-[10ch]">
                As featured in
              </p>
              <div className="grid w-full flex-1 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                {pressFeatures.map((p) =>
                  p.url ? (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-500 transition hover:text-neutral-950"
                    >
                      {p.name}
                    </a>
                  ) : (
                    <span
                      key={p.id}
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-500"
                    >
                      {p.name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          JOURNAL — only renders when journal posts exist
         ═════════════════════════════════════════════════════════ */}
      {journal.length > 0 && (
        <section className="px-6 py-16 lg:px-10 lg:py-24" id="journal">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex items-end justify-between gap-8">
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <h2 className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  Field journal.
                </h2>
              </div>
              <Link
                href="/journal"
                className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-[#F58220] sm:inline"
              >
                All journal →
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-3">
              {journal.map((j, i) => (
                <motion.li
                  key={j.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                className="bg-white transition hover:bg-neutral-50"
              >
                <Link href={`/journal/${j.slug}`} className="group block p-10">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                    {j.category}
                  </p>
                  <h3 className="mt-9 text-balance text-2xl leading-[1.2] tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                    <span className="font-bold">{j.title}</span>
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-neutral-600 line-clamp-3">{j.excerpt}</p>
                  <div className="mt-10 flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    <span>
                      {formatDate(j.publishedAt)} · {j.readTime}
                    </span>
                    <span className="transition group-hover:translate-x-1 group-hover:text-[#F58220]">
                      Read →
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          PARTNERS — only renders when partners exist in admin
         ═════════════════════════════════════════════════════════ */}
      {partners.length > 0 && (
      <section className="border-y border-neutral-200/80 bg-neutral-50/60 py-16 lg:py-24">
        <div className="mx-auto mb-12 max-w-[1280px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Lodge & camp partners
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  <span className="font-bold">The finest names</span>{' '}
                  <span className="font-light">in African hospitality.</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">
              Twenty years of relationships with the lodges, camps, and houses that quietly raise
              the standard across the continent.
            </p>
          </motion.div>
        </div>

        {/* Row 1 — scrolls right-to-left */}
        <div className="marquee-row marquee-shell">
          <div className="marquee-track">
            {[...partnersRowOne, ...partnersRowOne, ...partnersRowOne].map((p, i) => (
              <span
                key={`r1-${p.name}-${i}`}
                className="inline-flex h-16 items-center px-8 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 lg:h-20 lg:px-10"
              >
                {p.logo && (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={240}
                    height={120}
                    className="h-full w-auto object-contain"
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls left-to-right (reverse) */}
        <div className="marquee-row marquee-shell mt-4">
          <div className="marquee-track-reverse">
            {[...partnersRowTwo, ...partnersRowTwo, ...partnersRowTwo].map((p, i) => (
              <span
                key={`r2-${p.name}-${i}`}
                className="inline-flex h-16 items-center px-8 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 lg:h-20 lg:px-10"
              >
                {p.logo && (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={240}
                    height={120}
                    className="h-full w-auto object-contain"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          FINAL CTA — Cinematic full-bleed close
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[720px]">
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={RWANDA_FOREST}
            alt="Mist over the forested hills of Rwanda at dusk"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/30" />
        </motion.div>

        <div className="relative w-full px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              variants={stagger}
              className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
            >
              <div className="space-y-7">
                <motion.p variants={reveal} className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  Begin your journey
                </motion.p>
                <motion.h2
                  variants={reveal}
                  className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
                >
                  <span className="font-light">When you’re ready, we’ll design the journey of a lifetime —</span>{' '}
                  <span className="font-bold text-[#F58220]">one quiet conversation at a time.</span>
                </motion.h2>

                <motion.div
                  variants={reveal}
                  className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[0.65rem] uppercase tracking-[0.32em] text-white/65"
                >
                  <a href="tel:+250783140000" className="transition hover:text-white">
                    +250 783 140 000
                  </a>
                  <span className="hidden h-px w-8 bg-white/25 sm:block" aria-hidden />
                  <a href="mailto:info@soulexpeditionsafrica.com" className="transition hover:text-white">
                    info@soulexpeditionsafrica.com
                  </a>
                  <span className="hidden h-px w-8 bg-white/25 sm:block" aria-hidden />
                  <span>Kigali · Rwanda</span>
                </motion.div>
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
                  href="/destinations"
                  className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/85 transition hover:border-[#F58220] hover:text-[#F58220]"
                >
                  Browse destinations
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
