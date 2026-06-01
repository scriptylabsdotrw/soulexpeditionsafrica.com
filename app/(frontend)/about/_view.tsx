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

/* ──────────────────────────────────────────────────────────────
   DEFAULT COPY — used as fallbacks when the CMS fields are empty,
   so the page always reads as a finished story.
   ────────────────────────────────────────────────────────────── */
const DEFAULT_MANIFESTO =
  'We are a Kigali-born travel studio designing private, unhurried journeys across East Africa — the kind measured in stories rather than stops. A great expedition should feel less like a tour and more like being let in on a secret by someone who calls this place home.';

const DEFAULT_STUDIO_BLURB =
  'Our studio sits in the heart of Kigali — one of Africa’s safest, cleanest, and most welcoming capitals. It is where every itinerary is drawn by hand, and where you are always welcome for a coffee before you fly.';

const STORY_PARAGRAPHS = [
  'Soul Expeditions Africa began in 2018 with a simple conviction: that the way the world travelled through Africa rarely did the continent justice. Too many journeys skimmed the surface — a checklist of animals, a blur of transfers, a guide reading from a script. We set out to build the opposite.',
  'From a small office in Kigali, we started designing trips the way we would for family: led by guides who grew up tracking these forests, staying in places chosen for their soul rather than their star-rating, and always leaving room for the unplanned afternoon that becomes the story you tell for years.',
  'Today we craft private expeditions across Rwanda, Uganda, Tanzania, Kenya and beyond — but we remain, at heart, a Rwandan studio. We answer our own phones. We know our lodges by first name. And we still believe the finest journeys are designed one quiet conversation at a time.',
];

const DEFAULT_PRINCIPLES: Principle[] = [
  {
    id: 'p1',
    number: '01',
    title: 'Owner-led, always',
    body: 'You plan with the people who carry the risk and the reputation — never a call centre. The person who designs your journey is the person who answers when it matters most.',
    group: 'about',
  },
  {
    id: 'p2',
    number: '02',
    title: 'Local first',
    body: 'Our guides, drivers and fixers are East African. The money you spend stays close to the ground it is spent on — in the communities that make these places worth visiting.',
    group: 'about',
  },
  {
    id: 'p3',
    number: '03',
    title: 'Quietly luxurious',
    body: 'We measure luxury in space, time and access — not gold taps. A private tracker, an empty viewpoint, a dinner that runs long because no one is rushing you anywhere.',
    group: 'about',
  },
  {
    id: 'p4',
    number: '04',
    title: 'Light on the land',
    body: 'We work only with lodges and parks that protect what they show you. Tourism should leave the gorillas, the plains and the people better off for our having come.',
    group: 'about',
  },
];

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '2018',
    title: 'Founded in Kigali',
    body: 'Soul Expeditions Africa opens its doors with one guide, a borrowed Land Cruiser, and a stubborn belief in slower, deeper travel.',
  },
  {
    id: 'm2',
    year: '2020',
    title: 'Through the quiet years',
    body: 'When the world stopped moving, we stayed close to our guides and lodges — and came through it with deeper roots than ever.',
  },
  {
    id: 'm3',
    year: '2022',
    title: 'Beyond the borders',
    body: 'Our journeys expand across the East African Community — Uganda, Kenya, Tanzania and the islands of Zanzibar.',
  },
  {
    id: 'm4',
    year: '2024',
    title: 'A thousand stories in',
    body: 'Having hosted travellers from six continents, we remain owner-led, Kigali-based, and proudly Rwandan.',
  },
];

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
  /* Derive runtime values from DB content, with finished-copy fallbacks */
  const numbersRaw = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
    siteContent.travellersHosted && { value: siteContent.travellersHosted, label: 'Travellers hosted' },
  ].filter(Boolean) as { value: string; label: string }[];

  const numbers =
    numbersRaw.length > 0
      ? numbersRaw
      : [
          { value: '2018', label: 'Founded · Kigali' },
          { value: '6', label: 'African countries' },
          { value: '40+', label: 'Curated lodges' },
          { value: '1,000+', label: 'Travellers hosted' },
        ];

  const manifesto = siteContent.aboutManifesto || DEFAULT_MANIFESTO;
  const studioBlurb = siteContent.studioBlurb || DEFAULT_STUDIO_BLURB;
  const principlesList = principles.length > 0 ? principles : DEFAULT_PRINCIPLES;
  const milestonesList = milestones.length > 0 ? milestones : DEFAULT_MILESTONES;

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
              Founded in Kigali in 2018 and owner-led from the ground up. We are a small studio of
              guides, conservationists and designers — quietly opinionated about wildlife, place,
              and how a journey should feel.
            </motion.p>

            {/* Bottom meta strip */}
            <motion.div
              variants={reveal}
              className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-7 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-white/55 sm:flex-row sm:items-center"
            >
              <span>Owner-led · Based in Rwanda</span>
              <span className="hidden h-px w-12 bg-white/20 sm:block" aria-hidden />
              <span className="flex items-center gap-3 text-white/65">
                <span>Scroll</span>
                <span className="scroll-cue h-8" aria-hidden />
              </span>
            </motion.div>
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
              className={`hairline-grid grid grid-cols-2 ${
                numbers.length >= 4
                  ? 'sm:grid-cols-4'
                  : numbers.length === 3
                    ? 'sm:grid-cols-3'
                    : 'sm:grid-cols-2'
              }`}
            >
              {numbers.map((n) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="group px-6 py-10 text-center sm:py-12"
                >
                  <p className="text-4xl font-light tracking-tight text-neutral-950 transition duration-300 group-hover:text-[#F58220] sm:text-5xl">
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
          MANIFESTO — oversized statement of intent
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24" id="manifesto">
        <div className="mx-auto max-w-[1080px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              variants={reveal}
              className="mb-9 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.4em] text-neutral-500"
            >
              <span className="h-px w-10 bg-[#F58220]" />
              Index · 01 — The studio
              <span className="h-px w-10 bg-[#F58220]" />
            </motion.div>

            <motion.p
              variants={reveal}
              className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
            >
              <span className="font-serif text-[#F58220]">“</span>
              {manifesto}
              <span className="font-serif text-[#F58220]">”</span>
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-10 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500"
            >
              <span className="h-px w-8 bg-neutral-300" />
              Soul Expeditions Africa · Kigali
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          OUR STORY — narrative origin
         ═════════════════════════════════════════════════════════ */}
      <section className="border-t border-neutral-200/70 px-6 py-16 lg:px-10 lg:py-24" id="story">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <div className="flex items-center gap-5">
                <span className="inline-block h-px w-10 bg-[#F58220]" />
                <span className="text-[0.62rem] uppercase tracking-[0.4em] text-neutral-500">
                  Index · 02 — Our story
                </span>
              </div>
              <h2 className="mt-7 text-balance text-[clamp(2.1rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                How a love letter to Rwanda
                <br />
                <span className="font-bold text-[#F58220]">became a travel studio.</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="space-y-7"
            >
              {STORY_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  variants={reveal}
                  className={`text-lg leading-9 ${i === 0 ? 'text-neutral-900' : 'text-neutral-600'}`}
                >
                  {para}
                </motion.p>
              ))}

              <motion.figure
                variants={reveal}
                className="mt-4 border-l-2 border-[#F58220] pl-6"
              >
                <blockquote className="text-balance text-2xl font-light leading-[1.3] tracking-tight text-neutral-950">
                  We do not sell trips. We design the few weeks of someone’s year that they will
                  never stop talking about.
                </blockquote>
              </motion.figure>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          PRINCIPLES — what we will not compromise on
         ═════════════════════════════════════════════════════════ */}
      {principlesList.length > 0 && (
        <section className="bg-neutral-950 px-6 py-16 text-white lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-5">
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                    Index · 03 — Principles
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
                {principlesList.map((p, i) => (
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
      {milestonesList.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-16 lg:px-10 lg:py-24">
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
                  Index · 04 — Milestones
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

            <ol className="relative ml-1 border-l border-neutral-200 pl-8 lg:pl-14">
              {milestonesList.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.75, delay: i * 0.05, ease: 'easeOut' }}
                  className="group relative pb-12 last:pb-0"
                >
                  {/* Node on the rail */}
                  <span
                    aria-hidden
                    className="absolute top-1.5 h-3 w-3 -translate-x-[calc(2rem+1px+0.375rem)] rounded-full border-2 border-[#F58220] bg-white transition duration-300 group-hover:scale-125 group-hover:bg-[#F58220] lg:-translate-x-[calc(3.5rem+1px+0.375rem)]"
                  />
                  <div className="grid items-start gap-2 lg:grid-cols-[0.22fr_1fr] lg:gap-10">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#F58220]">
                      {m.year}
                    </span>
                    <div>
                      <h3 className="text-balance text-2xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#F58220] lg:text-3xl">
                        {m.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">{m.body}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          STUDIO HQ
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="group relative isolate aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={IMG.kigali}
              alt="Kigali, Rwanda"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover transition duration-[1500ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" /> Kigali · Rwanda
            </div>
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
            <p className="text-lg leading-9 text-neutral-700">{studioBlurb}</p>

            <ul className="grid gap-x-8 gap-y-5 pt-4 sm:grid-cols-2">
              {[
                { k: 'Studio', v: siteContent.studioAddress || 'Kigali, Rwanda' },
                { k: 'Email', v: siteContent.studioEmail || 'info@soulexpeditionsafrica.com' },
                { k: 'Phone', v: siteContent.studioPhone || '+250 783 140 000' },
                { k: 'Hours', v: siteContent.studioHours || 'Mon – Sat · 08:00 – 18:00 CAT' },
              ].filter((row) => Boolean(row.v)).map((row) => (
                <li key={row.k} className="border-t border-neutral-200 pt-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                    {row.k}
                  </p>
                  <p className="mt-2 text-base text-neutral-900">{row.v}</p>
                </li>
              ))}
            </ul>

            {siteContent.studioMapsUrl && (
              <a
                href={siteContent.studioMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-neutral-200 bg-white px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#F58220] hover:text-[#F58220]"
              >
                Get directions
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CTA — cinematic full-bleed close
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[620px]">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={siteContent.aboutHeroImage || IMG.hero}
            alt="Rwanda's hills at dusk"
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
                <motion.p
                  variants={reveal}
                  className="flex items-center gap-4 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]"
                >
                  <span className="inline-block h-px w-10 bg-[#F58220]" />
                  Begin your journey
                </motion.p>
                <motion.h2
                  variants={reveal}
                  className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
                >
                  <span className="font-light">Tell us what you have in mind.</span>{' '}
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
