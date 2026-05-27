import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllThemeSlugs,
  getTourTheme,
  getTourThemes,
  getTours,
  getToursByTheme,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getAllThemeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const c = await getTourTheme(slug);
  if (!c) return { title: 'Tours · Soul Expeditions Africa' };
  return {
    title: `${c.title} · ${c.group} · Soul Expeditions Africa`,
    description: c.description,
  };
}

export default async function ToursCollectionPage(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const collection = await getTourTheme(slug);
  if (!collection) notFound();

  const allThemes = await getTourThemes();
  const siblings = allThemes.filter(
    (t) => t.group === collection.group && t.slug !== collection.slug,
  );

  /* Tours linked to this theme by admin. Falls back to a curated selection of
     destination tours if no theme tagging exists yet. */
  let tours = await getToursByTheme(collection.id);
  if (tours.length === 0) {
    tours = (await getTours()).slice(0, 6);
  }

  return (
    <main className="bg-white">
      {/* ─────────── HERO ─────────── */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          {collection.hero && (
            <Image
              src={collection.hero}
              alt={collection.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto flex min-h-[78svh] max-w-[1280px] flex-col justify-end px-6 pb-20 pt-36 text-white lg:px-10">
          <Link
            href="/"
            className="self-start text-[0.7rem] uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
          >
            ← All tours
          </Link>
          <p className="mt-8 inline-flex items-center gap-3 self-start text-[0.65rem] uppercase tracking-[0.4em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
            {collection.group}
          </p>
          <h1 className="mt-6 text-balance text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.04em]">
            {collection.title}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-2xl leading-10 text-white/85">
            {collection.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-white/75">
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
              {tours.length} curated tours
            </span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
              Privately designed
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── BRIEF ─────────── */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-24">
          <div className="space-y-10">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                Collection brief
              </span>
            </div>
            <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950">
              {collection.title} —{' '}
              <span className="font-bold text-[#F58220]">
                designed our way.
              </span>
            </h2>
            <p className="text-lg leading-9 text-neutral-700">
              {collection.description}
            </p>
          </div>

          <aside className="rounded-sm border border-neutral-200 bg-neutral-50 p-8 lg:p-10">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
              Begin
            </p>
            <h3 className="mt-4 text-balance text-2xl font-light tracking-tight text-neutral-950">
              Want a {collection.title.toLowerCase()} journey designed to your
              dates?
            </h3>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Every tour here is privately customised — guides, dates, lodge
              tier, and pace. Let us know what you have in mind.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#F58220] px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#ff9d2e]"
            >
              Inquire Now
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* ─────────── TOURS GRID ─────────── */}
      <section className="bg-neutral-50/70 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px] space-y-12">
          <header className="flex flex-col items-start justify-between gap-5 border-b border-neutral-300 pb-7 lg:flex-row lg:items-end">
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Tours · {String(tours.length).padStart(2, '0')}
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                <span className="font-bold">Curated</span>{' '}
                <span className="font-light">routes.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">
              Each tour is a starting point. We re-design every itinerary around
              your dates, group, and pace.
            </p>
          </header>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={
                    t.destinationSlug
                      ? `/destinations/${t.destinationSlug}/tours/${t.slug}`
                      : '/contact'
                  }
                  className="group relative isolate flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-neutral-200 transition hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-[1400ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-[0.55rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                      {String(i + 1).padStart(2, '0')} · {t.pace}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-7">
                    <div className="flex items-center justify-between text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                      <span>{t.destinationName ?? '—'}</span>
                      <span>{t.duration}</span>
                    </div>
                    <h3 className="text-balance text-2xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                      {t.title}
                    </h3>
                    <p className="text-sm leading-7 text-neutral-600">
                      {t.summary}
                    </p>
                    <ul className="space-y-px pt-2">
                      {t.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 border-t border-neutral-100 py-2 text-[0.78rem] leading-6 text-neutral-700 first:border-t-0"
                        >
                          <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-[#F58220]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:gap-3">
                      Enquire about this tour
                      <span
                        aria-hidden="true"
                        className="transition group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── SIBLING COLLECTIONS ─────────── */}
      {siblings.length > 0 && (
        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px] space-y-10">
            <header className="flex items-end justify-between gap-6 border-b border-neutral-200 pb-7">
              <div className="space-y-3">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                  Also in {collection.group}
                </p>
                <h2 className="text-balance text-[clamp(2rem,4.2vw,3.2rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                  <span className="font-light">Other</span>{' '}
                  <span className="font-bold">{collection.group.toLowerCase()}</span>{' '}
                  <span className="font-light">routes.</span>
                </h2>
              </div>
            </header>

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/tours/${s.slug}`}
                    className="group relative block overflow-hidden rounded-sm bg-neutral-950"
                  >
                    <div className="relative aspect-[16/10]">
                      {s.image && (
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover opacity-80 transition duration-[1400ms] ease-out group-hover:scale-105 group-hover:opacity-95"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/70">
                          {s.group}
                        </p>
                        <h3 className="mt-2 text-balance text-2xl font-light tracking-tight transition group-hover:text-[#F58220]">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─────────── CTA ─────────── */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-sm bg-neutral-950 px-10 py-20 text-white shadow-deep sm:px-16">
          <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-40" aria-hidden />
          <div className="glow-orb -right-32 top-0 opacity-25" aria-hidden />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-end">
            <div className="space-y-7">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Begin
              </p>
              <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.035em]">
                <span className="font-light">Tell us what you have in mind.</span>
                <br />
                <span className="font-bold text-[#F58220]">
                  We will design the rest.
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
