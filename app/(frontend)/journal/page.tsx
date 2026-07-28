'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { articles, CATEGORIES, formatDate, type JournalCategory } from './data';

/* ─────────── motion ─────────── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* Editorial hero / CTA backdrop — field-writing mood. */
const JOURNAL_HERO =
  'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2400&q=85';

type Filter = 'All' | JournalCategory;

export default function JournalPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const featured = useMemo(() => articles.find((a) => a.featured) ?? articles[0], []);
  const visible = useMemo(
    () => articles.filter((a) => (filter === 'All' ? true : a.category === filter)),
    [filter],
  );
  const rest = useMemo(() => visible.filter((a) => a.slug !== featured.slug), [visible, featured]);

  return (
    <main className="bg-white">
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative isolate flex min-h-[52svh] flex-col justify-end overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={JOURNAL_HERO}
            alt="A guide writing field notes in East Africa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-36 lg:px-10 lg:pb-16">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.div variants={reveal} className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F58220] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              </span>
              <span>Journal · Field writing</span>
            </motion.div>
            <motion.h1
              variants={reveal}
              className="text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.94] tracking-[-0.045em]"
            >
              <span className="block font-light">Long reads</span>
              <span className="block font-bold text-[#F58220]">from the field.</span>
            </motion.h1>
            <motion.p variants={reveal} className="mt-9 max-w-xl text-balance text-lg leading-9 text-white/85">
              Slow, hosted writing from our guides, conservationists, and design team. No
              clickbait, no listicles — the long form of how we actually work, and what the people
              we travel with notice in the bush.
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
            {[
              { value: String(articles.length).padStart(2, '0'), label: 'Long reads' },
              { value: String(CATEGORIES.length), label: 'Categories' },
              { value: '08', label: 'Field contributors' },
              { value: 'Monthly', label: 'Cadence' },
            ].map((s) => (
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

      {/* ═════════════ FEATURED ARTICLE ═════════════ */}
      {filter === 'All' && (
        <section className="px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/journal/${featured.slug}`}
                className="group block overflow-hidden rounded-sm border border-neutral-200/80"
              >
                <article className="grid lg:grid-cols-[1.35fr_1fr]">
                  <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="object-cover transition duration-[1800ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                      Featured · {featured.category}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-neutral-950 p-10 text-white lg:p-14">
                    <div className="space-y-7">
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                        {featured.tag ? `${featured.tag} · ` : ''}
                        {featured.readTime}
                      </p>
                      <h3 className="text-balance text-[clamp(2.4rem,4.4vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.03em]">
                        {featured.title}
                      </h3>
                      <p className="max-w-md text-lg leading-9 text-white/75">{featured.excerpt}</p>
                    </div>

                    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-7">
                      <div>
                        <p className="text-base font-medium text-white">{featured.author.name}</p>
                        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-white/55">
                          {featured.author.role} · {formatDate(featured.publishedAt)}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:text-white">
                        Read story
                        <span className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═════════════ FILTER BAR ═════════════ */}
      <section className="border-y border-neutral-200/80 bg-neutral-50/60">
        <div className="mx-auto max-w-[1280px] overflow-x-auto px-6 py-6 lg:px-10">
          <div className="flex min-w-max items-center gap-3">
            <span className="mr-3 hidden text-[0.6rem] font-medium uppercase tracking-[0.4em] text-neutral-500 sm:inline">
              Filter
            </span>
            {(['All', ...CATEGORIES] as Filter[]).map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.32em] transition ${
                    active
                      ? 'bg-neutral-950 text-white'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════ ARTICLES GRID ═════════════ */}
      <section className="px-6 py-10 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          <AnimatePresence mode="wait">
            {rest.length > 0 ? (
              <motion.ul
                key={filter}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 md:grid-cols-2 lg:grid-cols-3"
              >
                {rest.map((a) => (
                  <li key={a.slug} className="bg-white">
                    <Link href={`/journal/${a.slug}`} className="group flex h-full flex-col">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                          <span className="rounded-full bg-black/35 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {a.category}
                          </span>
                          <span className="rounded-full bg-black/35 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {a.readTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-8">
                        {a.tag && (
                          <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                            {a.tag}
                          </p>
                        )}
                        <h3 className="mt-5 text-balance text-2xl font-light leading-[1.18] tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                          <span className="font-bold">{a.title}</span>
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-neutral-600">{a.excerpt}</p>

                        <div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-6">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{a.author.name}</p>
                            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.32em] text-neutral-500">
                              {formatDate(a.publishedAt)}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition group-hover:text-[#F58220]">
                            Read
                            <span className="transition group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-sm border border-dashed border-neutral-300 bg-neutral-50/60 px-8 py-16 text-center"
              >
                <p className="text-sm leading-7 text-neutral-500">
                  Nothing in <span className="font-semibold text-neutral-900">{filter}</span> yet —
                  try another category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═════════════ NEWSLETTER CTA — cinematic full-bleed ═════════════ */}
      <section className="relative isolate flex min-h-[400px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[460px]">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={JOURNAL_HERO}
            alt="Field notes at dusk"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/40" />
        </motion.div>

        <div className="relative w-full px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-end"
          >
            <div className="space-y-7">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Field journal
              </p>
              <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.035em]">
                <span className="font-light">One long read,</span>
                <br />
                <span className="font-bold text-[#F58220]">first Tuesday of the month.</span>
              </h2>
              <p className="max-w-xl text-base leading-8 text-white/65">
                No promotions. No newsletter clutter. One quietly considered essay from the field,
                straight to your inbox.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you — you’ll get the next field read in your inbox.');
              }}
              className="flex w-full max-w-md flex-col gap-3 lg:items-end"
            >
              <label className="block w-full">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white/55">
                  Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-sm border border-white/15 bg-white/5 px-5 py-4 text-base text-white placeholder-white/30 outline-none transition focus:border-[#F58220] focus:bg-white/10"
                />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950 sm:w-fit"
              >
                Subscribe
                <span>→</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
