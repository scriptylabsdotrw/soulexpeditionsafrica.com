import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  allTourParams,
  getDestination,
  getTour,
  tierMeta,
  tourTiers,
  tourIncludes,
  tourExcludes,
} from '../../../data';
import Icon from '@/components/Icon';

export function generateStaticParams() {
  return allTourParams().map(({ slug, tourSlug }) => ({ slug, tourSlug }));
}

export function generateMetadata(props: any) {
  const { params } = props as { params: { slug: string; tourSlug: string } };
  const tour = getTour(params.slug, params.tourSlug);
  const dest = getDestination(params.slug);
  if (!tour || !dest) return { title: 'Tour · Soul Expeditions Africa' };
  return {
    title: `${tour.title} · ${dest.name} · Soul Expeditions Africa`,
    description: tour.summary,
  };
}

export default function TourDetail(props: any) {
  const { params } = props as { params: { slug: string; tourSlug: string } };
  const dest = getDestination(params.slug);
  const tour = getTour(params.slug, params.tourSlug);
  if (!dest || !tour) notFound();

  const otherTours = dest.tours.filter((t) => t.slug !== tour.slug).slice(0, 3);
  const tiers = tourTiers(tour);
  const includes = tourIncludes(tour);
  const excludes = tourExcludes(tour);

  return (
    <main>
      {/* ─────────── HERO ─────────── */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto flex min-h-[82svh] max-w-[1280px] flex-col justify-end px-6 pb-20 pt-36 text-white lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.4em] text-white/70">
            <Link href="/destinations" className="transition hover:text-white">
              Destinations
            </Link>
            <span>·</span>
            <Link href={`/destinations/${dest.slug}`} className="transition hover:text-white">
              {dest.name}
            </Link>
            <span>·</span>
            <span className="text-white/55">{tour.category}</span>
          </nav>

          <p className="mt-8 inline-flex items-center gap-3 self-start text-[0.65rem] uppercase tracking-[0.4em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
            {tour.duration} · {tour.pace} · {tour.group}
          </p>

          <h1 className="mt-6 text-balance text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.96] tracking-[-0.04em]">
            {tour.title}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-2xl leading-10 text-white/85">
            {tour.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
            >
              Plan this tour
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={`/destinations/${dest.slug}#tours`}
              className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white backdrop-blur transition hover:border-white/45"
            >
              Other {dest.name} tours
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── META RIBBON ─────────── */}
      <section className="border-y border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <ul className="hairline-grid grid grid-cols-2 sm:grid-cols-4">
            {[
              { k: 'Duration', v: tour.duration },
              { k: 'Pace', v: tour.pace },
              { k: 'Group', v: tour.group },
              { k: 'Best time', v: tour.bestTime },
            ].map((m) => (
              <li key={m.k} className="px-6 py-8 text-center sm:py-10">
                <p className="text-[0.62rem] uppercase tracking-[0.35em] text-neutral-500">{m.k}</p>
                <p className="mt-3 text-xl font-light tracking-tight text-neutral-950">{m.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── TIERS ─────────── */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px] space-y-12">
          <div className="flex items-end justify-between gap-6 border-b border-neutral-200 pb-7">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Three ways · pick your tier
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  <span className="font-bold">Available</span>{' '}
                  <span className="font-light">in three tiers.</span>
                </h2>
              </div>
            </div>
            <Link
              href={`/contact?destination=${dest.slug}&tour=${tour.slug}`}
              className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition hover:text-[#F58220] sm:inline"
            >
              Configure your journey →
            </Link>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-3">
            {tiers.map((tier, i) => {
              const meta = tierMeta[tier];
              return (
                <li
                  key={tier}
                  className={`group flex h-full flex-col bg-white p-9 transition hover:bg-neutral-50 ${
                    i === 0 ? 'lg:bg-neutral-950 lg:text-white lg:hover:bg-neutral-900' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[0.62rem] font-medium uppercase tracking-[0.4em] ${
                        i === 0 ? 'lg:text-[#F58220]' : 'text-[#F58220]'
                      }`}
                    >
                      Tier · {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${
                        i === 0
                          ? 'bg-[#F58220] shadow-[0_0_12px_rgba(245,130,32,0.6)]'
                          : 'bg-neutral-300'
                      }`}
                    />
                  </div>

                  <h3
                    className={`mt-10 text-balance text-3xl font-bold leading-[1.04] tracking-tight ${
                      i === 0 ? 'lg:text-white' : 'text-neutral-950'
                    }`}
                  >
                    {meta.label}.
                  </h3>
                  <p
                    className={`mt-4 text-base leading-7 ${
                      i === 0 ? 'lg:text-white/80' : 'text-neutral-700'
                    }`}
                  >
                    {meta.tagline}
                  </p>

                  <p
                    className={`mt-8 text-sm leading-7 ${
                      i === 0 ? 'lg:text-white/65' : 'text-neutral-600'
                    }`}
                  >
                    {meta.description}
                  </p>

                  <div
                    className={`mt-auto flex items-center justify-between pt-10 ${
                      i === 0 ? 'lg:border-t lg:border-white/10' : 'border-t border-neutral-200'
                    }`}
                  >
                    <span
                      className={`text-[0.62rem] font-medium uppercase tracking-[0.32em] ${
                        i === 0 ? 'lg:text-white/55' : 'text-neutral-500'
                      } pt-5`}
                    >
                      {meta.lodgeStyle}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────── OVERVIEW + HIGHLIGHTS ─────────── */}
      <section className="px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-24">
          <div className="space-y-9">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                The tour
              </span>
            </div>
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
              What this route is about.
            </h2>
            <p className="text-lg leading-9 text-neutral-700">{tour.description}</p>

            <div className="rounded-sm border border-neutral-200 bg-white p-8">
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#F58220]">
                Privately designed
              </p>
              <p className="mt-4 text-base leading-8 text-neutral-700">
                This is a starting point. Bring us your dates and we will privately tune the route,
                lodges, and pace around the way you travel — nothing here is fixed in stone.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">Highlights</p>
            <ul className="mt-6 space-y-px">
              {tour.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-4 border-t border-neutral-200 py-4 text-base text-neutral-800 last:border-b"
                >
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#F58220]" />
                  <span className="leading-8">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm bg-neutral-950 p-8 text-white">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">
                When you’re ready
              </p>
              <h3 className="mt-4 text-2xl font-light leading-tight">
                Tell us your dates. We’ll design the rest.
              </h3>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#F58220] transition hover:text-white"
              >
                Plan {tour.title} →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ─────────── INCLUDES & EXCLUDES ─────────── */}
      <section className="bg-neutral-50/70 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px] space-y-12">
          <div className="flex items-start gap-5 border-b border-neutral-200 pb-7">
            <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                The fine print
              </p>
              <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-neutral-950">
                <span className="font-bold">Includes</span>{' '}
                <span className="font-light">& excludes.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-2">
            {/* INCLUDES */}
            <div className="bg-white p-9 lg:p-11">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F58220] text-white">
                  <Icon name="check" className="h-4 w-4" weight={2.5} />
                </span>
                <div>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                    What's included
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">In every tier</p>
                </div>
              </div>

              <ul className="mt-9 grid gap-px overflow-hidden rounded-sm bg-neutral-200/70 sm:grid-cols-2">
                {includes.map((perk) => (
                  <li
                    key={perk.label}
                    className="group flex items-start gap-4 bg-white p-5 transition hover:bg-[#F58220]/5"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 flex-none items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-neutral-800 transition group-hover:border-[#F58220] group-hover:bg-white group-hover:text-[#F58220]">
                      <Icon name={perk.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm leading-6 text-neutral-800">{perk.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUDES */}
            <div className="bg-white p-9 lg:p-11">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <Icon name="x" className="h-4 w-4" weight={2.5} />
                </span>
                <div>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-neutral-700">
                    Not included
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">Plan separately or add-on</p>
                </div>
              </div>

              <ul className="mt-9 grid gap-px overflow-hidden rounded-sm bg-neutral-200/70 sm:grid-cols-2">
                {excludes.map((perk) => (
                  <li
                    key={perk.label}
                    className="group flex items-start gap-4 bg-white p-5 transition hover:bg-neutral-100"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 flex-none items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-neutral-500 transition group-hover:border-neutral-400 group-hover:text-neutral-800">
                      <Icon name={perk.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm leading-6 text-neutral-700">{perk.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── OTHER TOURS IN COUNTRY ─────────── */}
      {otherTours.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-32 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <div className="flex items-end justify-between gap-6">
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <h2 className="text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-light tracking-tight text-neutral-950">
                  Other tours in <span className="font-bold text-[#F58220]">{dest.name}</span>.
                </h2>
              </div>
              <Link
                href={`/destinations/${dest.slug}#tours`}
                className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-[#F58220] sm:inline"
              >
                All {dest.name} tours →
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 md:grid-cols-3">
              {otherTours.map((t) => {
                const tTiers = tourTiers(t);
                return (
                  <li key={t.slug} className="bg-white">
                    <Link
                      href={`/destinations/${dest.slug}/tours/${t.slug}`}
                      className="group flex h-full flex-col"
                    >
                      <div className="relative aspect-[5/4] w-full overflow-hidden">
                        <Image
                          src={t.image}
                          alt={t.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                          <span className="rounded-full bg-black/35 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {t.category}
                          </span>
                          <span className="rounded-full bg-black/35 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {t.duration}
                          </span>
                        </div>

                        {/* Hover tier overlay */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-10 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-[0.58rem] font-medium uppercase tracking-[0.4em] text-white/65">
                            Available in
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {tTiers.map((tier) => (
                              <span
                                key={tier}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur"
                              >
                                <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                                {tier}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-balance text-2xl font-light leading-tight tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                          {t.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-neutral-600">{t.summary}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition group-hover:text-[#F58220]">
                          Discover
                          <span className="transition group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
