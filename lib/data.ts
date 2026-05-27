/* ────────────────────────────────────────────────────────────
   DATA ACCESS LAYER — Server-only helpers that read from Payload
   and shape rows into the lightweight types the UI consumes.

   Pure types and UI helpers live in `lib/types.ts` (importable from
   client components). This file is server-only.
   ──────────────────────────────────────────────────────────── */

import 'server-only';
import { getPayloadClient } from './payload';
import type {
  Destination,
  ItineraryDay,
  JournalPost,
  Milestone,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  Testimonial,
  Tier,
  Tour,
  TourTheme,
} from './types';

export type {
  Destination,
  ItineraryDay,
  JournalPost,
  Milestone,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  Testimonial,
  Tier,
  Tour,
  TourTheme,
} from './types';
export { TIERS, tierMeta, tourTiers } from './types';

/* ─────────── Row → UI shape mappers ─────────── */

const arr = <T extends { id: string | number }>(v: T[] | undefined | null): T[] =>
  Array.isArray(v) ? v : [];

const mediaUrl = (v: unknown): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && v !== null && 'url' in v) {
    const url = (v as { url?: string }).url;
    return url ?? '';
  }
  return '';
};

const mapTourRow = (t: any): Tour => ({
  id: t.id,
  slug: t.slug,
  title: t.title,
  duration: t.duration ?? '',
  pace: t.pace ?? 'Moderate',
  group: t.group ?? 'Private',
  category: t.category ?? 'Wildlife',
  summary: t.summary ?? '',
  description: t.description ?? '',
  bestTime: t.bestTime ?? '',
  highlights: arr<{ id: string | number; text: string }>(t.highlights).map((h) => h.text),
  itinerary: arr<{ id: string | number; day: string; title: string; body: string }>(
    t.itinerary,
  ).map((d) => ({ day: d.day, title: d.title, body: d.body })),
  tiers: (t.tiers && t.tiers.length ? t.tiers : ['Luxury', 'Mid range', 'Budget']) as Tier[],
  image: mediaUrl(t.image) || t.imageUrl || '',
  destinationSlug:
    typeof t.destination === 'object' && t.destination !== null
      ? (t.destination as { slug?: string }).slug
      : undefined,
  destinationName:
    typeof t.destination === 'object' && t.destination !== null
      ? (t.destination as { name?: string }).name
      : undefined,
});

const mapDestinationRow = (d: any, tours: Tour[] = []): Destination => ({
  id: d.id,
  slug: d.slug,
  name: d.name,
  tagline: d.tagline ?? '',
  region: d.region ?? '',
  bestTime: d.bestTime ?? '',
  description: d.description ?? '',
  highlights: arr<{ id: string | number; text: string }>(d.highlights).map((h) => h.text),
  signatureLodges: arr<{ id: string | number; name: string }>(d.signatureLodges).map(
    (l) => l.name,
  ),
  image: mediaUrl(d.image) || d.imageUrl || '',
  hero: mediaUrl(d.hero) || d.heroUrl || d.imageUrl || '',
  tours,
});

const mapThemeRow = (t: any): TourTheme => ({
  id: t.id,
  slug: t.slug,
  title: t.title,
  group: t.group,
  tagline: t.tagline ?? '',
  description: t.description ?? '',
  image: mediaUrl(t.image) || t.imageUrl || '',
  hero: mediaUrl(t.hero) || t.heroUrl || t.imageUrl || '',
});

const mapJournalRow = (a: any): JournalPost => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt ?? '',
  category: a.category ?? '',
  author: a.author ?? '',
  publishedAt: a.publishedAt ?? '',
  readTime: a.readTime ?? '',
  image: mediaUrl(a.image) || a.imageUrl || '',
  body: a.body ?? null,
});

/* ─────────── Public read API ─────────── */

export const getDestinations = async (): Promise<Destination[]> => {
  const payload = await getPayloadClient();
  const destResult = await payload.find({
    collection: 'destinations',
    limit: 100,
    sort: 'name',
  });

  const tourResult = await payload.find({
    collection: 'tours',
    limit: 500,
    sort: 'title',
    depth: 1,
  });
  const toursByDestination = new Map<string | number, Tour[]>();
  for (const tour of tourResult.docs) {
    const destRef = (tour as any).destination;
    const destId =
      typeof destRef === 'object' && destRef !== null ? destRef.id : destRef;
    const list = toursByDestination.get(destId) ?? [];
    list.push(mapTourRow(tour));
    toursByDestination.set(destId, list);
  }

  return destResult.docs.map((d) =>
    mapDestinationRow(d, toursByDestination.get(d.id) ?? []),
  );
};

export const getDestination = async (
  slug: string,
): Promise<Destination | null> => {
  const payload = await getPayloadClient();
  const destResult = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const dest = destResult.docs[0];
  if (!dest) return null;

  const tourResult = await payload.find({
    collection: 'tours',
    where: { destination: { equals: dest.id } },
    limit: 200,
    sort: 'title',
    depth: 1,
  });
  return mapDestinationRow(dest, tourResult.docs.map(mapTourRow));
};

export const getAllDestinationSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'destinations',
    limit: 100,
    select: { slug: true },
  });
  return result.docs.map((d) => (d as { slug: string }).slug);
};

export const getTours = async (): Promise<Tour[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tours',
    limit: 500,
    sort: 'title',
    depth: 1,
  });
  return result.docs.map(mapTourRow);
};

export const getTour = async (
  destinationSlug: string,
  tourSlug: string,
): Promise<{ destination: Destination; tour: Tour } | null> => {
  const dest = await getDestination(destinationSlug);
  if (!dest) return null;
  const tour = dest.tours.find((t) => t.slug === tourSlug);
  if (!tour) return null;
  return { destination: dest, tour };
};

export const getTourThemes = async (): Promise<TourTheme[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    limit: 50,
    sort: 'title',
  });
  return result.docs.map(mapThemeRow);
};

export const getTourTheme = async (
  slug: string,
): Promise<TourTheme | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ? mapThemeRow(result.docs[0]) : null;
};

export const getToursByTheme = async (
  themeId: number | string,
): Promise<Tour[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tours',
    where: { themes: { contains: themeId } },
    limit: 200,
    sort: 'title',
    depth: 1,
  });
  return result.docs.map(mapTourRow);
};

export const getAllThemeSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    limit: 50,
    select: { slug: true },
  });
  return result.docs.map((d) => (d as { slug: string }).slug);
};

export const getJournalPosts = async (): Promise<JournalPost[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'journal',
    limit: 100,
    sort: '-publishedAt',
  });
  return result.docs.map(mapJournalRow);
};

export const getJournalPost = async (
  slug: string,
): Promise<JournalPost | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'journal',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ? mapJournalRow(result.docs[0]) : null;
};

/* ─────────── Testimonials ─────────── */

const mapTestimonialRow = (t: any): Testimonial => ({
  id: t.id,
  quote: t.quote ?? '',
  attribution: t.attribution ?? '',
  context: t.context ?? '',
  image: mediaUrl(t.image),
  featured: Boolean(t.featured),
});

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'testimonials',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapTestimonialRow);
};

export const getFeaturedTestimonial = async (): Promise<Testimonial | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'testimonials',
    where: { featured: { equals: true } },
    limit: 1,
    sort: 'order',
  });
  return result.docs[0] ? mapTestimonialRow(result.docs[0]) : null;
};

/* ─────────── Partners ─────────── */

const mapPartnerRow = (p: any): Partner => ({
  id: p.id,
  name: p.name ?? '',
  logo: mediaUrl(p.logo) || p.logoUrl || '',
  url: p.url ?? '',
});

export const getPartners = async (): Promise<Partner[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'partners',
    limit: 100,
    sort: 'order',
  });
  return result.docs.map(mapPartnerRow);
};

/* ─────────── Press features ─────────── */

const mapPressRow = (p: any): PressFeature => ({
  id: p.id,
  name: p.name ?? '',
  url: p.url ?? '',
});

export const getPressFeatures = async (): Promise<PressFeature[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'press-features',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapPressRow);
};

/* ─────────── Principles ─────────── */

const mapPrincipleRow = (p: any): Principle => ({
  id: p.id,
  number: p.number ?? '',
  title: p.title ?? '',
  body: p.body ?? '',
  group: p.group ?? 'both',
});

export const getPrinciples = async (
  group?: 'home' | 'about',
): Promise<Principle[]> => {
  const payload = await getPayloadClient();
  const where = group
    ? { group: { in: [group, 'both'] } }
    : undefined;
  const result = await payload.find({
    collection: 'principles',
    where,
    limit: 20,
    sort: 'order',
  });
  return result.docs.map(mapPrincipleRow);
};

/* ─────────── Milestones ─────────── */

const mapMilestoneRow = (m: any): Milestone => ({
  id: m.id,
  year: m.year ?? '',
  title: m.title ?? '',
  body: m.body ?? '',
});

export const getMilestones = async (): Promise<Milestone[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'milestones',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapMilestoneRow);
};

/* ─────────── SiteContent global ─────────── */

export const getSiteContent = async (): Promise<SiteContent> => {
  const payload = await getPayloadClient();
  const result = (await payload.findGlobal({ slug: 'site-content' })) as any;
  return {
    /* Hero images: prefer uploaded Media, fall back to text URL */
    homeHeroImage: mediaUrl(result?.homeHeroImage) || result?.homeHeroImageUrl || '',
    aboutHeroImage: mediaUrl(result?.aboutHeroImage) || result?.aboutHeroImageUrl || '',
    visitRwandaHeroImage:
      mediaUrl(result?.visitRwandaHeroImage) || result?.visitRwandaHeroImageUrl || '',
    /* Stats */
    foundedYear: result?.foundedYear ?? '',
    countries: result?.countries ?? '',
    travellersHosted: result?.travellersHosted ?? '',
    curatedLodges: result?.curatedLodges ?? '',
    mountainGorillas: result?.mountainGorillas ?? '',
    gorillaFamilies: result?.gorillaFamilies ?? '',
    nationalParks: result?.nationalParks ?? '',
    hills: result?.hills ?? '',
    /* Studio */
    studioAddress: result?.studioAddress ?? '',
    studioEmail: result?.studioEmail ?? '',
    studioPhone: result?.studioPhone ?? '',
    studioHours: result?.studioHours ?? '',
    studioMapsUrl: result?.studioMapsUrl ?? '',
    /* About */
    aboutManifesto: result?.aboutManifesto ?? '',
    studioBlurb: result?.studioBlurb ?? '',
  };
};
