import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDestination } from '@/external/lib/data';
import DestinationTourExplorer from '@/external/components/DestinationTourExplorer';

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

  /* Only the fields the hero preview needs — keeps full itineraries
     and pricing tiers out of the client bundle. */
  const tourPreviews = d.tours.map((t) => ({
    slug: t.slug,
    title: t.title,
    duration: t.duration,
    pace: t.pace,
    group: t.group,
    category: t.category,
    summary: t.summary,
    highlights: t.highlights.slice(0, 3),
    bestTime: t.bestTime,
  }));

  return (
    <main className="bg-white">
      {/* ─────────── COMPACT SPLIT HERO ───────────
          Left: scannable sidebar of available tours.
          Right: destination essentials, swapping to a summary of whichever
          tour is hovered or focused — with a route through to its full
          itinerary. Tuned to sit largely above the fold on desktop. */}
      <section className="relative isolate flex min-h-[calc(100svh-14rem)] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={d.hero} alt={d.name} fill priority sizes="100vw" className="object-cover" />
          <div className="hero-overlay" />
        </div>

        <DestinationTourExplorer
          destinationSlug={d.slug}
          destinationName={d.name}
          region={d.region}
          tagline={d.tagline}
          bestTime={d.bestTime}
          highlights={d.highlights}
          tours={tourPreviews}
        />
      </section>
    </main>
  );
}
