import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestination, getDestinations, tourTiers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) return { title: 'Destination · Soul Expeditions Africa' };
  return {
    title: `Luxury ${d.name} Tours · Soul Expeditions Africa`,
    description: d.description,
  };
}

export default async function DestinationDetail(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) notFound();
  const allDestinations = await getDestinations();

  const features = [
    `${d.name}'s finest lodges, camps and houses — owner-led, hand-picked`,
    'Your own private guide and 4×4, including all transfers and bush flights',
    'Personalised itinerary planning by designers who travel the country every season',
    'Local contacts and partner offices across East Africa',
    'Internal transportation — light aircraft, helicopters, and private 4×4',
    'Restaurant reservations, host introductions, and exclusive access to local experts',
  ];

  return (
    <main className="bg-white">
      {/* ─────────── HERO ─────────── */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src={d.hero} alt={d.name} fill priority sizes="100vw" className="object-cover" />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto flex min-h-[78svh] max-w-[1280px] flex-col justify-end px-6 pb-20 pt-36 text-white lg:px-10">
          <Link
            href="/destinations"
            className="self-start text-[0.7rem] uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
          >
            ← All destinations
          </Link>
          <p className="mt-8 inline-flex items-center gap-3 self-start text-[0.65rem] uppercase tracking-[0.4em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
            {d.region}
          </p>
          <h1 className="mt-6 text-balance text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.04em]">
            {d.name}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-2xl leading-10 text-white/85">{d.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-white/75">
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
              Best time · {d.bestTime}
            </span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
              {d.tours.length} curated tours
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── BREADCRUMB ─────────── */}
      <div className="border-b border-neutral-200/80 bg-neutral-50/60">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-6 py-5 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500 lg:px-10">
          <Link href="/destinations" className="transition hover:text-neutral-950">
            View our tours
          </Link>
          <span className="text-neutral-300">›</span>
          <span className="text-neutral-950">Luxury {d.name} Tours</span>
        </div>
      </div>

      {/* ─────────── CONTENT — SIDEBAR + MAIN ─────────── */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[280px_1fr] lg:gap-16 xl:grid-cols-[300px_1fr] xl:gap-20">
          {/* ────── SIDEBAR ────── */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-start gap-4 border-l-2 border-[#F58220] pl-5">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-950">
                  {d.name} Tours
                </p>
                <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.32em] text-neutral-400">
                  {String(d.tours.length).padStart(2, '0')} curated routes
                </p>
              </div>
            </div>

            <ul className="mt-9 space-y-7">
              {d.tours.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/destinations/${d.slug}/tours/${t.slug}`}
                    className="group block"
                  >
                    <h3 className="text-[0.95rem] font-medium leading-snug text-[#8a4e1f] underline decoration-[#c19773]/45 decoration-1 underline-offset-[5px] transition group-hover:text-[#F58220] group-hover:decoration-[#F58220]">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 text-[0.72rem] text-neutral-500">
                      ({t.duration})
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-neutral-600">
                      {t.highlights.slice(0, 3).join(', ')}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sidebar mini CTA */}
            <div className="mt-12 border-t border-neutral-200 pt-8">
              <p className="text-[0.58rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                Not sure which to pick?
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#F58220] underline-offset-4 hover:underline"
              >
                Talk to a Travel Designer
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Sidebar spotlight image */}
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white">
                {d.region}
              </p>
            </div>
          </aside>

          {/* ────── MAIN ────── */}
          <div className="space-y-16 lg:space-y-20">
            {/* Title block */}
            <header className="space-y-6">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Country brief · Index 01
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
                Luxury <span className="font-bold text-[#F58220]">{d.name}</span> Tours.
              </h2>
            </header>

            {/* Description */}
            <div className="space-y-7 text-lg leading-9 text-neutral-700">
              <p>{d.description}</p>
              <p>
                Our guides in {d.name} are the best in the country — quietly, never at performance.
                Every itinerary moves at the pace of the landscape, not the calendar, and a Travel
                Designer remains your single point of contact from first sketch to final transfer.
              </p>
            </div>

            {/* Highlights list */}
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                Why {d.name}
              </p>
              <ul className="mt-6 space-y-px">
                {d.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-5 border-t border-neutral-200 py-5 text-base leading-8 text-neutral-800 last:border-b"
                  >
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#F58220]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature bullets — what's included */}
            <div className="rounded-sm bg-neutral-50/80 p-9 ring-1 ring-neutral-200/80 lg:p-12">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                What every tour includes
              </p>
              <h3 className="mt-4 text-balance text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-tight text-neutral-950">
                Our private {d.name} tours feature:
              </h3>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-x-10">
                {features.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[0.95rem] leading-7 text-neutral-700"
                  >
                    <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#F58220]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour cards — horizontal cards for browsing */}
            <div>
              <div className="flex flex-col items-start justify-between gap-4 border-b border-neutral-200 pb-6 lg:flex-row lg:items-end">
                <div>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                    All routes
                  </p>
                  <h3 className="mt-3 text-balance text-[clamp(1.8rem,3.4vw,2.6rem)] font-light tracking-tight text-neutral-950">
                    Explore each <span className="italic text-[#F58220]">{d.name}</span> tour.
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-7 text-neutral-600">
                  Each route is a starting point — bring us your dates and we will tune the lodges,
                  pace, and order around the way you travel.
                </p>
              </div>

              <ul className="mt-8 space-y-5">
                {d.tours.map((t, i) => {
                  const tiers = tourTiers(t);
                  return (
                    <li key={t.slug}>
                      <Link
                        href={`/destinations/${d.slug}/tours/${t.slug}`}
                        className="group grid items-stretch overflow-hidden rounded-sm bg-white ring-1 ring-neutral-200 transition hover:ring-[#F58220] sm:grid-cols-[220px_1fr]"
                      >
                        <div className="relative aspect-[4/3] sm:aspect-auto">
                          <Image
                            src={t.image}
                            alt={t.title}
                            fill
                            sizes="(min-width: 640px) 220px, 100vw"
                            className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                          />
                          <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                            {String(i + 1).padStart(2, '0')} · {t.category}
                          </span>
                        </div>
                        <div className="flex flex-col gap-4 p-7">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                            <span>{t.duration}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{t.pace}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{t.group}</span>
                          </div>
                          <h4 className="text-balance text-2xl font-light leading-tight tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                            {t.title}
                          </h4>
                          <p className="text-sm leading-7 text-neutral-600 line-clamp-2">
                            {t.summary}
                          </p>
                          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-4">
                            <span className="text-[0.58rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                              Tiers
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {tiers.map((tier) => (
                                <span
                                  key={tier}
                                  className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-neutral-700 transition group-hover:border-[#F58220]/30 group-hover:text-[#F58220]"
                                >
                                  {tier}
                                </span>
                              ))}
                            </div>
                            <span className="ml-auto inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:translate-x-1">
                              Open route
                              <span aria-hidden="true">→</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Key info ribbon */}
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-4">
              {[
                { k: 'Best time', v: d.bestTime },
                { k: 'Region', v: d.region },
                { k: 'Tours', v: String(d.tours.length).padStart(2, '0') },
                { k: 'Signature lodges', v: String(d.signatureLodges.length).padStart(2, '0') },
              ].map((row) => (
                <li key={row.k} className="bg-white px-6 py-6">
                  <p className="text-[0.58rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {row.k}
                  </p>
                  <p className="mt-2 text-base font-medium text-neutral-950">{row.v}</p>
                </li>
              ))}
            </ul>

            {/* Signature lodges */}
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Signature lodges & camps
              </p>
              <ul className="mt-6 space-y-px">
                {d.signatureLodges.map((l) => (
                  <li
                    key={l}
                    className="flex items-center justify-between border-t border-neutral-200 py-4 text-base text-neutral-900 last:border-b"
                  >
                    <span>{l}</span>
                    <span className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-neutral-400">
                      Curated
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="relative isolate overflow-hidden rounded-sm bg-neutral-950 p-10 text-white lg:p-14">
              <div className="glow-orb -left-24 top-1/2 -translate-y-1/2 opacity-40" aria-hidden />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-end">
                <div className="space-y-5">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                    When ready
                  </p>
                  <h3 className="text-balance text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-tight">
                    A private journey through{' '}
                    <span className="font-bold text-[#F58220]">{d.name}</span>, designed personally.
                  </h3>
                  <p className="max-w-md text-sm leading-7 text-white/70">
                    All tours are private and tuned to your interests, dates, and pace. A Travel
                    Designer responds within 24 hours — no templates, no call centres.
                  </p>
                </div>
                <div className="flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
                  >
                    Inquire Now
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── RELATED COUNTRIES ─────────── */}
      <section className="border-t border-neutral-200/80 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px] space-y-12">
          <div className="flex items-end justify-between">
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.2rem)] font-light tracking-tight text-neutral-950">
              More countries.
            </h2>
            <Link
              href="/destinations"
              className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 transition hover:text-[#F58220] sm:inline"
            >
              All destinations →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {allDestinations
              .filter((x) => x.slug !== d.slug)
              .slice(0, 3)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/destinations/${x.slug}`}
                  className="group relative isolate aspect-[4/5] overflow-hidden rounded-sm"
                >
                  <Image
                    src={x.image}
                    alt={x.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/75">
                      {x.region}
                    </p>
                    <h3 className="mt-2 text-3xl font-light tracking-tight">{x.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
