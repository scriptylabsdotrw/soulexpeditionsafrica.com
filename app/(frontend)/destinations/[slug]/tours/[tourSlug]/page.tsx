import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTour, tourTiers } from '@/lib/data';
import TourBookingForm from '@/components/TourBookingForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string; tourSlug: string }> };
  const { slug, tourSlug } = await params;
  const result = await getTour(slug, tourSlug);
  if (!result) return { title: 'Tour · Soul Expeditions Africa' };
  return {
    title: `${result.tour.title} · ${result.destination.name} · Soul Expeditions Africa`,
    description: result.tour.summary,
  };
}

export default async function TourDetail(props: any) {
  const { params } = props as { params: Promise<{ slug: string; tourSlug: string }> };
  const { slug, tourSlug } = await params;
  const result = await getTour(slug, tourSlug);
  if (!result) notFound();
  const { destination: dest, tour } = result;

  const otherTours = dest.tours.filter((t) => t.slug !== tour.slug).slice(0, 3);
  const previewDays = tour.itinerary.slice(0, 3);
  const detailsHref = `/destinations/${dest.slug}/tours/${tour.slug}/details`;

  return (
    <main>
      {/* ════════════════ REVAMPED HERO ════════════════
          A single-screen, conversion-focused hero: the essentials and an
          itinerary glance on the left, a "Book This Tour" card on the right.
          Full detail lives on a dedicated page reached via "View More". */}
      <section className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={tour.image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
          {/* Stronger cinematic wash for a premium, legible hero */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 pb-14 pt-28 lg:grid-cols-[1fr_minmax(360px,400px)] lg:items-center lg:gap-14 lg:px-10 lg:pb-16 lg:pt-32">
          {/* ── Left ── */}
          <div className="text-white">
            <nav className="flex flex-wrap items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-white/65">
              <Link href="/destinations" className="transition hover:text-white">Destinations</Link>
              <span>·</span>
              <Link href={`/destinations/${dest.slug}`} className="transition hover:text-white">{dest.name}</Link>
            </nav>

            <span className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              {tour.category} · {dest.region}
            </span>

            <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.6vw,4.8rem)] font-light leading-[0.96] tracking-[-0.045em]">
              {tour.title}
            </h1>

            <p className="mt-5 max-w-xl text-balance text-lg leading-8 text-white/85">
              {tour.summary}
            </p>

            {/* Stat chips */}
            <div className="mt-7 flex flex-wrap gap-2.5 text-[0.66rem] uppercase tracking-[0.28em] text-white/85">
              <span className="rounded-full bg-[#F58220] px-4 py-2 font-semibold text-white shadow-glow">
                {tour.duration}
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">{tour.pace}</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">{tour.group}</span>
            </div>

            {/* Itinerary at a glance — connected Day 1–3 timeline */}
            {previewDays.length > 0 && (
              <div className="mt-9">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-white/55">
                  Itinerary at a glance
                </p>
                <ol className="mt-4 grid gap-y-4 sm:grid-cols-3 sm:gap-x-3">
                  {previewDays.map((day, i) => (
                    <li key={`${day.day}-${i}`} className="relative sm:pt-7">
                      {/* connector line (desktop) */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-3 top-[0.4rem] hidden h-px bg-white/20 sm:block ${
                          i < previewDays.length - 1 ? 'w-full' : 'w-0'
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 hidden h-6 w-6 items-center justify-center rounded-full bg-[#F58220] text-[0.6rem] font-bold text-white sm:flex"
                      >
                        {i + 1}
                      </span>
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#F58220]">
                        <span className="sm:hidden">{i + 1} · </span>{day.day || `Day ${i + 1}`}
                      </p>
                      <p className="mt-1.5 text-[0.95rem] font-light leading-snug text-white/90 line-clamp-2">
                        {day.title}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={detailsHref}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:bg-[#F58220] hover:text-white"
              >
                View More
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={`/destinations/${dest.slug}`}
                className="text-[0.64rem] uppercase tracking-[0.32em] text-white/65 transition hover:text-white"
              >
                Other {dest.name} tours →
              </Link>
            </div>
          </div>

          {/* ── Right: Book This Tour ── */}
          <TourBookingForm destinationName={dest.name} tourTitle={tour.title} />
        </div>
      </section>

      {/* ─────────── OTHER TOURS IN COUNTRY ─────────── */}
      {otherTours.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px] space-y-10">
            <div className="flex items-end justify-between gap-6">
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <h2 className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-light tracking-tight text-neutral-950">
                  Other tours in <span className="font-bold text-[#F58220]">{dest.name}</span>.
                </h2>
              </div>
              <Link
                href={`/destinations/${dest.slug}`}
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
