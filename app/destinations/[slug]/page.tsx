import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinations, getDestination, tourTiers } from '../data';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata(props: any) {
  const { params } = props as { params: { slug: string } };
  const d = getDestination(params.slug);
  if (!d) return { title: 'Destination · Soul Expeditions Africa' };
  return {
    title: `${d.name} · Soul Expeditions Africa`,
    description: d.description,
  };
}

export default function DestinationDetail(props: any) {
  const { params } = props as { params: { slug: string } };
  const d = getDestination(params.slug);
  if (!d) notFound();

  return (
    <main>
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

      {/* ─────────── OVERVIEW + LODGES ─────────── */}
      <section className="px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-24">
          <div className="space-y-10">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                Country brief
              </span>
            </div>
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
              A privately held country brief.
            </h2>
            <p className="text-lg leading-9 text-neutral-700">{d.description}</p>

            <ul className="space-y-px pt-6">
              {d.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-5 border-t border-neutral-200 py-5 last:border-b text-base leading-8 text-neutral-800"
                >
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#F58220]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
              Signature lodges
            </p>
            <ul className="mt-6 space-y-px">
              {d.signatureLodges.map((l) => (
                <li
                  key={l}
                  className="flex items-center justify-between border-t border-neutral-200 py-4 text-base text-neutral-900 last:border-b"
                >
                  <span>{l}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.3em] text-neutral-400">
                    Curated
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm bg-neutral-950 p-8 text-white">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#F58220]">When ready</p>
              <h3 className="mt-4 text-2xl font-light leading-tight">
                Plan a private journey through {d.name}.
              </h3>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-[#F58220] transition hover:text-white"
              >
                Start planning →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ─────────── TOURS ─────────── */}
      <section className="bg-neutral-50/70 px-6 py-32 lg:px-10 lg:py-40" id="tours">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  {d.tours.length} curated tours · privately designed
                </p>
                <h2 className="mt-4 text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
                  Tours in <span className="italic text-[#F58220]">{d.name}</span>.
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">
              Each tour is a starting point — bring us your dates and we will privately tune the
              route, lodges, and pace around the way you travel.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2">
            {d.tours.map((t, i) => {
              const tiers = tourTiers(t);
              return (
                <li key={t.slug} className="bg-white">
                  <Link
                    href={`/destinations/${d.slug}/tours/${t.slug}`}
                    className="group flex h-full flex-col"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                      />
                      {/* Top meta strip */}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                        <span className="rounded-full bg-black/35 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                          {String(i + 1).padStart(2, '0')} · {t.category}
                        </span>
                        <span className="rounded-full bg-black/35 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                          {t.duration}
                        </span>
                      </div>

                      {/* Hover tier reveal — slides up from the bottom of the image */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-6 pb-6 pt-12 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/65">
                          Available in
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tiers.map((tier) => (
                            <span
                              key={tier}
                              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                              {tier}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-9">
                      <h3 className="text-balance text-3xl font-light leading-[1.04] tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                        {t.title}
                      </h3>
                      <p className="mt-5 text-base leading-7 text-neutral-600">{t.summary}</p>

                      {/* Always-visible tier indicator row */}
                      <div className="mt-7 flex items-center gap-3 border-t border-neutral-200 pt-5">
                        <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                          Tiers
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {tiers.map((tier) => (
                            <span
                              key={tier}
                              className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-neutral-700 transition group-hover:border-[#F58220]/30 group-hover:text-[#F58220]"
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      </div>

                      <dl className="mt-5 grid grid-cols-3 gap-x-4 text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                        <div>
                          <dt>Pace</dt>
                          <dd className="mt-2 text-sm font-medium text-neutral-900">{t.pace}</dd>
                        </div>
                        <div>
                          <dt>Group</dt>
                          <dd className="mt-2 text-sm font-medium text-neutral-900">{t.group}</dd>
                        </div>
                        <div>
                          <dt>Best time</dt>
                          <dd className="mt-2 text-sm font-medium text-neutral-900">{t.bestTime}</dd>
                        </div>
                      </dl>

                      <span className="mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition group-hover:text-[#F58220]">
                        Discover the tour
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

      {/* ─────────── RELATED COUNTRIES ─────────── */}
      <section className="px-6 py-32 lg:px-10 lg:py-40">
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
            {destinations
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
