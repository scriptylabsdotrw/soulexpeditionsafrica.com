import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestination, getDestinations } from '@/lib/data';

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

  return (
    <main className="bg-white">
      {/* ─────────── COMPACT SPLIT HERO ───────────
          Left: the essentials (title, short intro, highlights, CTA).
          Right: scannable sidebar of available tours.
          Tuned to sit largely above the fold on desktop. */}
      <section className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={d.hero} alt={d.name} fill priority sizes="100vw" className="object-cover" />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 pb-14 pt-28 lg:grid-cols-[1fr_minmax(340px,400px)] lg:items-center lg:gap-14 lg:px-10 lg:pb-16 lg:pt-32">
          {/* ── Left: essentials ── */}
          <div className="text-white">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
            >
              ← All destinations
            </Link>

            <p className="mt-7 inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
              {d.region}
            </p>

            <h1 className="mt-5 text-balance text-[clamp(2.6rem,6.5vw,5.4rem)] font-light leading-[0.95] tracking-[-0.04em]">
              {d.name}
            </h1>

            <p className="mt-5 max-w-xl text-balance text-lg leading-8 text-white/85">
              {d.tagline}
            </p>

            {/* Key highlights — kept to three for a clean hero */}
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {d.highlights.slice(0, 3).map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.72rem] leading-snug text-white/85 backdrop-blur"
                >
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
              >
                Plan your journey
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-[0.64rem] uppercase tracking-[0.32em] text-white/65">
                Best time · {d.bestTime}
              </span>
            </div>
          </div>

          {/* ── Right: tours sidebar ── */}
          <aside className="rounded-2xl border border-white/15 bg-white/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-7">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-neutral-950">
                {d.name} Tours
              </p>
              <span className="text-[0.58rem] uppercase tracking-[0.28em] text-neutral-400">
                {String(d.tours.length).padStart(2, '0')} routes
              </span>
            </div>

            <ul className="mt-2 max-h-[42vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[46vh]">
              {d.tours.map((t, i) => (
                <li key={t.slug}>
                  <Link
                    href={`/destinations/${d.slug}/tours/${t.slug}`}
                    className="group flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-neutral-50"
                  >
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-neutral-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.95rem] font-medium leading-snug text-neutral-900 transition group-hover:text-[#F58220]">
                        {t.title}
                      </span>
                      <span className="mt-0.5 block text-[0.72rem] text-neutral-500">
                        {t.duration} · {t.category}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex-none text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-[#F58220]"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#F58220]"
            >
              Talk to a Travel Designer
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* ─────────── BREADCRUMB ─────────── */}
      <div className="border-b border-neutral-200/80 bg-neutral-50/60">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-6 py-4 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500 lg:px-10">
          <Link href="/destinations" className="transition hover:text-neutral-950">
            View our tours
          </Link>
          <span className="text-neutral-300">›</span>
          <span className="text-neutral-950">Luxury {d.name} Tours</span>
        </div>
      </div>

      {/* ─────────── ABOUT + HIGHLIGHTS (supporting, below fold) ─────────── */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="space-y-8">
            <header className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Country brief
              </p>
              <h2 className="text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                Luxury <span className="font-bold text-[#F58220]">{d.name}</span> Tours.
              </h2>
            </header>

            <div className="space-y-6 text-lg leading-9 text-neutral-700">
              <p>{d.description}</p>
            </div>

            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                Why {d.name}
              </p>
              <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {d.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-4 border-t border-neutral-200 py-4 text-base leading-7 text-neutral-800"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#F58220]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Supporting sidebar — key facts + lodges + spotlight image */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-neutral-200/80">
              {[
                { k: 'Best time', v: d.bestTime },
                { k: 'Region', v: d.region },
                { k: 'Tours', v: String(d.tours.length).padStart(2, '0') },
                { k: 'Lodges', v: String(d.signatureLodges.length).padStart(2, '0') },
              ].map((row) => (
                <li key={row.k} className="bg-white px-5 py-5">
                  <p className="text-[0.56rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                    {row.k}
                  </p>
                  <p className="mt-1.5 text-base font-medium text-neutral-950">{row.v}</p>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Signature lodges
              </p>
              <ul className="mt-4 space-y-px">
                {d.signatureLodges.slice(0, 5).map((l) => (
                  <li
                    key={l}
                    className="border-t border-neutral-200 py-3 text-[0.95rem] text-neutral-900 last:border-b"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-between rounded-full bg-[#F58220] px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
            >
              Start planning
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* ─────────── RELATED COUNTRIES ─────────── */}
      <section className="border-t border-neutral-200/80 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px] space-y-10">
          <div className="flex items-end justify-between">
            <h2 className="text-balance text-[clamp(1.8rem,4vw,2.8rem)] font-light tracking-tight text-neutral-950">
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
