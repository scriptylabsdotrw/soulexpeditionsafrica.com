import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTour, tierMeta, tourTiers } from '@/lib/data';
import TourItinerary from '@/components/TourItinerary';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string; tourSlug: string }> };
  const { slug, tourSlug } = await params;
  const result = await getTour(slug, tourSlug);
  if (!result) return { title: 'Tour details · Soul Expeditions Africa' };
  return {
    title: `${result.tour.title} — Full Itinerary · ${result.destination.name} · Soul Expeditions Africa`,
    description: result.tour.summary,
  };
}

export default async function TourDetailsPage(props: any) {
  const { params } = props as { params: Promise<{ slug: string; tourSlug: string }> };
  const { slug, tourSlug } = await params;
  const result = await getTour(slug, tourSlug);
  if (!result) notFound();
  const { destination: dest, tour } = result;
  const tiers = tourTiers(tour);
  const tourHref = `/destinations/${dest.slug}/tours/${tour.slug}`;

  return (
    <main className="bg-white">
      {/* ─────────── COMPACT PAGE HEADER ─────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={tour.image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
          <div className="hero-overlay" />
        </div>
        <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-28 text-white lg:px-10 lg:pb-14 lg:pt-32">
          <nav className="flex flex-wrap items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-white/70">
            <Link href="/destinations" className="transition hover:text-white">
              Destinations
            </Link>
            <span>·</span>
            <Link href={`/destinations/${dest.slug}`} className="transition hover:text-white">
              {dest.name}
            </Link>
            <span>·</span>
            <Link href={tourHref} className="transition hover:text-white">
              {tour.title}
            </Link>
            <span>·</span>
            <span className="text-white/55">Full itinerary</span>
          </nav>

          <p className="mt-7 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
            The complete journey
          </p>
          <h1 className="mt-4 text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[0.98] tracking-[-0.04em]">
            {tour.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2.5 text-[0.66rem] uppercase tracking-[0.28em] text-white/85">
            <span className="rounded-full bg-[#F58220] px-4 py-2 font-semibold text-white">{tour.duration}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">{tour.pace}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">{tour.group}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">Best · {tour.bestTime}</span>
          </div>
        </div>
      </section>

      {/* ─────────── OVERVIEW + HIGHLIGHTS ─────────── */}
      <section className="px-6 py-10 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-20">
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">The tour</span>
            </div>
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
              What this route is about.
            </h2>
            <p className="text-lg leading-9 text-neutral-700">{tour.description}</p>

            <div className="rounded-sm border border-neutral-200 bg-white p-8">
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#F58220]">Privately designed</p>
              <p className="mt-4 text-base leading-8 text-neutral-700">
                This is a starting point. Bring us your dates and we will privately tune the route,
                lodges, and pace around the way you travel — nothing here is fixed in stone.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
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
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">When you&rsquo;re ready</p>
              <h3 className="mt-4 text-2xl font-light leading-tight">Tell us your dates. We&rsquo;ll design the rest.</h3>
              <Link
                href={tourHref}
                className="mt-6 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#F58220] transition hover:text-white"
              >
                Book {tour.title} →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ─────────── TIERS ─────────── */}
      <section className="px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1280px] space-y-10">
          <div className="flex items-end justify-between gap-6 border-b border-neutral-200 pb-7">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Three ways · pick your tier
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  <span className="font-bold">Available</span> <span className="font-light">in three tiers.</span>
                </h2>
              </div>
            </div>
            <Link
              href={tourHref}
              className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition hover:text-[#F58220] sm:inline"
            >
              Book this journey →
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
                        i === 0 ? 'bg-[#F58220] shadow-[0_0_12px_rgba(245,130,32,0.6)]' : 'bg-neutral-300'
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
                  <p className={`mt-4 text-base leading-7 ${i === 0 ? 'lg:text-white/80' : 'text-neutral-700'}`}>
                    {meta.tagline}
                  </p>
                  <p className={`mt-8 text-sm leading-7 ${i === 0 ? 'lg:text-white/65' : 'text-neutral-600'}`}>
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

      {/* ─────────── DAY-BY-DAY ITINERARY ─────────── */}
      <TourItinerary days={tour.itinerary} duration={tour.duration} />

      {/* ─────────── CLOSING CTA ─────────── */}
      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative isolate overflow-hidden rounded-sm bg-neutral-950 p-10 text-white lg:p-14">
            <div className="glow-orb -left-24 top-1/2 -translate-y-1/2 opacity-40" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-end">
              <div className="space-y-5">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">Ready when you are</p>
                <h3 className="text-balance text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-tight">
                  Book <span className="font-bold text-[#F58220]">{tour.title}</span>, tuned to your dates.
                </h3>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href={tourHref}
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
                >
                  Book this tour
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
