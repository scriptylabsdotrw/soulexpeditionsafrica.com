'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import type { Milestone, Principle, SiteContent } from '@/shared/lib/types';

type AboutViewProps = {
  siteContent: SiteContent;
  principles: Principle[];
  milestones: Milestone[];
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
  /* Everything below comes from Payload — empty fields hide their section. */
  const numbers = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
    siteContent.travellersHosted && {
      value: siteContent.travellersHosted,
      label: 'Travellers hosted',
    },
  ].filter(Boolean) as { value: string; label: string }[];

  const manifesto = siteContent.aboutManifesto;
  const principlesList = principles;
  const milestonesList = milestones;

  return (
    <main className="overflow-hidden bg-white">
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

      {/* Founder story: alternating portrait and safari imagery */}
      <section className="px-6 py-16 lg:px-10 lg:py-24" id="story">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="mx-auto mb-14 max-w-4xl text-center lg:mb-20"
          >
            <motion.p variants={reveal} className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#F58220]">
              Our story
            </motion.p>
            <motion.h1 variants={reveal} className="mt-6 text-balance text-[clamp(2.5rem,5.4vw,5rem)] font-light leading-[1.02] tracking-[-0.045em] text-neutral-950">
              Born from passion,
              <span className="block font-bold text-[#F58220]">built on resilience.</span>
            </motion.h1>
            <motion.p variants={reveal} className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-neutral-600">
              Soul Expeditions Africa was not created in a boardroom. It was born from a journey of resilience, unexpected mentorship, and an unwavering love for the land we call home.
            </motion.p>
          </motion.header>

          <div className="space-y-20 lg:space-y-28">
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
            >
              <motion.div key="media" variants={reveal} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 lg:sticky lg:top-28">
                <Image
                  src="/images/About Us/soul Expenditions.jpeg"
                  alt="The founders of Soul Expeditions Africa in Rwanda"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-24 text-white">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">Rwanda · The journey home</p>
                </div>
              </motion.div>

              <motion.div key="copy" variants={reveal} className="max-w-2xl space-y-10 lg:pt-5">
                <section>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">Chapter · 01</p>
                  <h2 className="mt-4 text-4xl font-light tracking-tight text-neutral-950">The Journey Home</h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-neutral-600 lg:text-lg lg:leading-9">
                    <p>In 1994, following the devastation of the Genocide against the Tutsi, our founder returned to Rwanda - the country of his roots - having been born and raised in Uganda. Facing immense personal hardship at just 15 years old after losing his mother, survival became the immediate priority. Guided by a natural instinct for warmth and service, he pursued short courses in hospitality to build a future step by step.</p>
                    <p>By 2009, that persistence earned him a role in one of Kigali's premier hotels. What began as a job quickly revealed a lifelong calling: connecting people to the heart of Rwanda.</p>
                  </div>
                </section>

                <section className="border-t border-neutral-200 pt-10">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">Chapter · 02</p>
                  <h2 className="mt-4 text-4xl font-light tracking-tight text-neutral-950">Believing in Potential</h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-neutral-600 lg:text-lg lg:leading-9">
                    <p>It was during these early years in Kigali that pivotal friendships reshaped everything. A key moment came through meeting Tom, an American lawyer who had made Rwanda his home. Tom saw potential that went far beyond the hardships of the past. When he asked what true passion looked like, the answer was clear: <em className="text-neutral-900">to showcase the extraordinary beauty, culture, and spirit of Rwanda to the world.</em></p>
                    <p>With Tom's encouragement, a one-man guiding service was born.</p>
                    <p>Soon after, Tom connected our founder with author Andrea Redmond, who needed local guiding expertise while co-authoring her book, <a href="https://www.google.com/books/edition/Rwanda_Inc/2_J5AAAAQBAJ" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#F58220] underline decoration-[#F58220]/35 underline-offset-4 transition hover:text-neutral-950">Rwanda, Inc.</a> - where our founder's story is featured as an example of Rwanda's rising entrepreneurial spirit. Deeply moved by his dedication, Andrea and Tom helped pave the way for an extraordinary opportunity: advanced training with Marriott International in Dubai.</p>
                  </div>
                </section>
              </motion.div>
            </motion.article>

            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
            >
              <motion.div key="copy" variants={reveal} className="max-w-2xl space-y-10 lg:pt-5">
                <section>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">Chapter · 03</p>
                  <h2 className="mt-4 text-4xl font-light tracking-tight text-neutral-950">Global Experience, Local Roots</h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-neutral-600 lg:text-lg lg:leading-9">
                    <p>Seven years in Dubai provided world-class training in luxury hospitality, guest experience, and high-end management. But the heart of the journey always remained in Rwanda.</p>
                    <p>In 2018, equipped with international expertise and a renewed vision, our founder returned home to marry the love of his life, Charity Ikirezi. Together, they launched their tour company - initially known as Mugisha Tours - which has naturally evolved into <strong className="font-semibold text-neutral-950">Soul Expeditions Africa.</strong></p>
                  </div>
                </section>

                <section className="rounded-3xl bg-neutral-950 p-8 text-white lg:p-10">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">Why travel with us?</p>
                  <h2 className="mt-4 text-3xl font-light tracking-tight">You become part of our ongoing story.</h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
                    <p>Today, Soul Expeditions Africa is the realization of a lifelong dream. We don't just arrange itineraries; we share the soul of East Africa.</p>
                    <p>Every journey we design carries the highest standards of luxury hospitality, combined with the deep, intimate knowledge of people who truly belong to this land.</p>
                    <p className="font-medium text-white">When you travel with us, you are not just a guest - you are part of our ongoing story.</p>
                  </div>
                </section>
              </motion.div>

              <motion.div key="media" variants={reveal} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 lg:sticky lg:top-28">
                <Image
                  src="/images/uploads/gorillaimage1.jpg"
                  alt="Mountain gorilla safari in Rwanda"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-24 text-white">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#F58220]">East Africa · Shared from the heart</p>
                </div>
              </motion.div>
            </motion.article>
          </div>
        </div>
      </section>
      {/* ═════════════════════════════════════════════════════════
          PRINCIPLES — what we will not compromise on
         ═════════════════════════════════════════════════════════ */}
      {principlesList.length > 0 && (
        <section className="bg-neutral-950 px-6 py-10 text-white lg:px-10 lg:py-16">
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
        <section className="bg-neutral-50/70 px-6 py-10 lg:px-10 lg:py-16">
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

    </main>
  );
}
