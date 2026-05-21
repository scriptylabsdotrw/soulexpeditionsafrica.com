import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { expeditions, getExpedition } from '../data';

export function generateStaticParams() {
  return expeditions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const e = getExpedition(slug);
  if (!e) return { title: 'Expedition · Soul Expeditions Africa' };
  return {
    title: `${e.title} · Soul Expeditions Africa`,
    description: e.subtitle,
  };
}

export default async function ExpeditionDetail(props: any) {
  const { params } = props as { params: Promise<{ slug: string }> };
  const { slug } = await params;
  const e = getExpedition(slug);
  if (!e) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image
            src={e.hero}
            alt={e.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto flex min-h-[88svh] max-w-[1280px] flex-col justify-end px-6 pb-20 pt-36 text-white lg:px-10">
          <Link
            href="/expeditions"
            className="self-start text-[0.7rem] uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
          >
            ← All expeditions
          </Link>
          <p className="mt-8 inline-flex items-center gap-3 self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
            {e.location} · {e.duration}
          </p>
          <h1 className="mt-6 display-xl text-balance">{e.title}</h1>
          <p className="mt-6 max-w-2xl text-2xl leading-10 text-white/85">{e.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white backdrop-blur">
              {e.fromPrice}
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
            >
              Plan this journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-shell">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-7">
            <p className="eyebrow eyebrow-accent">Overview</p>
            <h2 className="display-lg text-balance text-slate-950">The story we’ll write together.</h2>
            <p className="text-lg leading-9 text-slate-700">{e.overview}</p>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-white p-9 shadow-soft">
            <p className="eyebrow eyebrow-accent">Inclusions</p>
            <ul className="mt-6 space-y-4 text-base leading-7 text-slate-800">
              {e.inclusions.map((i) => (
                <li key={i} className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-none last:pb-0">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#F58220]" />
                  {i}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Itinerary */}
      <section className="section-shell bg-[#0c0c0c] text-white">
        <div className="mx-auto max-w-[1280px] space-y-12">
          <div className="space-y-5">
            <p className="eyebrow text-[#F58220]">Itinerary</p>
            <h2 className="display-lg text-balance">Day by day, the route we’ve designed.</h2>
          </div>

          <ol className="space-y-6">
            {e.highlights.map((h, i) => (
              <li
                key={h.day}
                className="grid items-start gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur lg:grid-cols-[0.25fr_0.35fr_1fr] lg:gap-10"
              >
                <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[#F58220]">
                  {String(i + 1).padStart(2, '0')} · {h.day}
                </span>
                <h3 className="text-2xl font-semibold leading-tight">{h.title}</h3>
                <p className="text-base leading-8 text-white/75">{h.body}</p>
              </li>
            ))}
          </ol>

          <div className="relative isolate mt-6 overflow-hidden rounded-[2.5rem] bg-[#F58220]/10 p-12 ring-1 ring-[#F58220]/30">
            <div className="absolute -right-16 -top-12 h-60 w-60 rounded-full bg-[#F58220]/30 blur-3xl" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="eyebrow text-[#F58220]">When you’re ready</p>
                <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Tell us your dates. We’ll design the rest.
                </h3>
              </div>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white shadow-glow transition hover:bg-[#ff9d2e] lg:justify-self-end"
              >
                Plan {e.title} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
