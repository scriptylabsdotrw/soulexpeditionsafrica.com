'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Milestone, Principle, SiteContent } from '@/lib/types';

type AboutViewProps = {
  siteContent: SiteContent;
  principles: Principle[];
  milestones: Milestone[];
};

/* Hero + Kigali photo URLs (kept as fallbacks; can later be moved to Media). */
const u = (id: string, fpY = 0.5, fpX = 0.5, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}`;

const IMG = {
  hero: u('photo-1551357141-f73a8402ceb3', 0.5, 0.5, 2400),
  kigali: u('photo-1687986261123-b17f08f2796c', 0.5),
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function AboutView({
  siteContent,
  principles,
  milestones,
}: AboutViewProps) {
  /* Derive runtime values from DB content */
  const numbers = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
    siteContent.travellersHosted && { value: siteContent.travellersHosted, label: 'Travellers hosted' },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteContent.aboutHeroImage || IMG.hero}
            alt="An aerial view of Rwanda's thousand hills"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-36 text-white lg:px-10 lg:pb-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58220] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              </span>
              <span>Kigali · Rwanda</span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="max-w-4xl text-balance text-[clamp(2.8rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em]"
            >
              <span className="block font-light">A studio for</span>
              <span className="block font-bold text-[#F58220]">soulful African journeys.</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-10 max-w-2xl text-balance text-xl leading-9 text-white/85 lg:text-2xl lg:leading-10"
            >
              Founded in Kigali in 2018. Owner-led, in country. Quietly opinionated about
              wildlife, design, and how a holiday should feel.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          NUMBERS RIBBON — only renders when any stat is set in admin
         ═════════════════════════════════════════════════════════ */}
      {numbers.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <ul
              className={`hairline-grid grid grid-cols-2 sm:grid-cols-${Math.min(numbers.length, 4)}`}
            >
              {numbers.map((n) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="px-6 py-10 text-center sm:py-12"
                >
                  <p className="text-4xl font-light tracking-tight text-neutral-950 sm:text-5xl">
                    {n.value}
                  </p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                    {n.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          MANIFESTO — only renders when set in SiteContent global
         ═════════════════════════════════════════════════════════ */}
      {siteContent.aboutManifesto && (
        <section className="px-6 py-20 lg:px-10 lg:py-32" id="manifesto">
          <div className="mx-auto max-w-[1180px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid gap-14 lg:grid-cols-[0.32fr_1fr] lg:gap-20"
            >
              <motion.div variants={reveal} className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  Index · 01
                  <br />
                  The studio
                </span>
              </motion.div>

              <motion.p
                variants={reveal}
                className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
              >
                {siteContent.aboutManifesto}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          PRINCIPLES — only renders when set in admin
         ═════════════════════════════════════════════════════════ */}
      {principles.length > 0 && (
        <section className="bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-5">
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                    Index · 02 — Principles
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
                    transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
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

      {/* TEAM section removed — populate `TeamMembers` collection later and re-add. */}

      {/* ═════════════════════════════════════════════════════════
          TIMELINE — only renders when milestones exist in admin
         ═════════════════════════════════════════════════════════ */}
      {milestones.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Index · 04 — Story
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                  Written <span className="font-bold">by hand.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-neutral-600">
                A short history of the studio — small enough to read in a minute, careful enough to
                keep.
              </p>
            </motion.header>

            <ol className="space-y-px">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.75, delay: i * 0.05, ease: 'easeOut' }}
                  className="grid items-start gap-6 border-t border-neutral-200 py-7 last:border-b lg:grid-cols-[0.18fr_0.32fr_1fr] lg:gap-10"
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#F58220]">
                    {m.year}
                  </span>
                  <h3 className="text-balance text-2xl font-light tracking-tight text-neutral-950 lg:text-3xl">
                    {m.title}
                  </h3>
                  <p className="text-base leading-7 text-neutral-600">{m.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          STUDIO HQ
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={IMG.kigali}
              alt="Kigali, Rwanda"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
            className="space-y-9"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#F58220]">
              Index · 05 — Studio
            </p>
            <h2 className="text-balance text-[clamp(2.2rem,4.4vw,3.4rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
              Headquartered in <span className="font-bold">Kigali.</span>
            </h2>
            {siteContent.studioBlurb && (
              <p className="text-lg leading-9 text-neutral-700">{siteContent.studioBlurb}</p>
            )}

            <ul className="grid gap-x-8 gap-y-5 pt-4 sm:grid-cols-2">
              {[
                { k: 'Studio', v: siteContent.studioAddress },
                { k: 'Email', v: siteContent.studioEmail },
                { k: 'Phone', v: siteContent.studioPhone },
                { k: 'Hours', v: siteContent.studioHours },
              ].filter((row) => Boolean(row.v)).map((row) => (
                <li key={row.k} className="border-t border-neutral-200 pt-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                    {row.k}
                  </p>
                  <p className="mt-2 text-base text-neutral-900">{row.v}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CTA
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
        <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-50" aria-hidden />
        <div className="glow-orb -right-32 top-1/4 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={stagger}
            className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-8">
              <motion.p
                variants={reveal}
                className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]"
              >
                Begin
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">Tell us what you have in mind.</span>
                <br />
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
                href="/destinations"
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#F58220]"
              >
                <span className="relative pb-1">
                  Browse destinations
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/30 transition group-hover:bg-[#F58220]" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
