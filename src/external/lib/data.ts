/* ────────────────────────────────────────────────────────────
   DATA ACCESS LAYER — Server-only helpers that read from Payload
   and shape rows into the lightweight types the UI consumes.

   Pure types and UI helpers live in `lib/types.ts` (importable from
   client components). This file is server-only.
   ──────────────────────────────────────────────────────────── */

import 'server-only';
import { getPayloadClient } from '@/shared/lib/payload';
import type {
  Destination,
  ItineraryDay,
  JournalPost,
  Milestone,
  NavGroup,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  Testimonial,
  Tier,
  Tour,
  TourTheme,
  VisitRwandaContent,
} from '@/shared/lib/types';

export type {
  Fact,
  Pillar,
  Place,
  PlaceCategory,
  Season,
  VisitRwandaContent,
} from '@/shared/lib/types';

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
} from '@/shared/lib/types';
export type {
  FeaturedCard,
  HeaderNavItem,
  NavGroup,
  NavLink,
  SocialLink,
  SocialPlatform,
} from '@/shared/lib/types';
export {
  TIERS,
  formatDate,
  journalCategories,
  tierMeta,
  tourTiers,
} from '@/shared/lib/types';

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
  featured: Boolean(t.featured),
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
  tag: a.tag ?? '',
  author: a.author ?? '',
  authorRole: a.authorRole ?? '',
  publishedAt: a.publishedAt ?? '',
  readTime: a.readTime ?? '',
  image: mediaUrl(a.image) || a.imageUrl || '',
  featured: Boolean(a.featured),
  pullQuote: a.pullQuote?.quote
    ? {
        quote: a.pullQuote.quote,
        attribution: a.pullQuote.attribution ?? '',
      }
    : null,
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

/**
 * Tours flagged `featured` for the homepage row. Falls back to the first few
 * tours so the section never renders empty on a fresh install.
 */
export const getFeaturedTours = async (limit = 4): Promise<Tour[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tours',
    where: { featured: { equals: true } },
    limit,
    sort: 'title',
    depth: 1,
  });
  if (result.docs.length > 0) return result.docs.map(mapTourRow);

  const fallback = await payload.find({
    collection: 'tours',
    limit,
    sort: 'title',
    depth: 1,
  });
  return fallback.docs.map(mapTourRow);
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

/**
 * Tour themes shaped into header mega-menu columns — one column per theme
 * group, in the order the groups first appear. Adding a theme in the admin
 * adds it to the menu automatically.
 */
export const getThemeNavGroups = async (): Promise<NavGroup[]> => {
  const themes = await getTourThemes();
  const byGroup = new Map<string, NavGroup>();

  for (const t of themes) {
    if (!t.group) continue;
    const existing = byGroup.get(t.group) ?? { title: t.group, links: [] };
    existing.links.push({ label: t.title, href: `/tours/${t.slug}` });
    byGroup.set(t.group, existing);
  }

  return [...byGroup.values()];
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

export const getAllJournalSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'journal',
    limit: 200,
    select: { slug: true },
  });
  return result.docs.map((d) => (d as { slug: string }).slug);
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

/* ─────────── Visit Rwanda global ─────────── */

const textList = (v: unknown): string[] =>
  arr<any>(v as any[])
    .map((b) => b.text ?? '')
    .filter(Boolean);

export const getVisitRwandaContent = async (): Promise<VisitRwandaContent> => {
  const payload = await getPayloadClient();
  const r = (await payload.findGlobal({ slug: 'visit-rwanda' })) as any;

  return {
    placeCategories: arr<any>(r?.placeCategories).map((c) => ({
      eyebrow: c.eyebrow ?? '',
      title: c.title ?? '',
      tagline: c.tagline ?? '',
      description: c.description ?? '',
      image: mediaUrl(c.image) || c.imageUrl || '',
      alt: c.alt ?? '',
      places: arr<any>(c.places).map((p) => ({
        name: p.name ?? '',
        location: p.location ?? '',
        note: p.note ?? '',
      })),
    })),
    pillars: arr<any>(r?.pillars).map((p) => ({
      eyebrow: p.eyebrow ?? '',
      title: p.title ?? '',
      body: p.body ?? '',
      bullets: textList(p.bullets),
      image: mediaUrl(p.image) || p.imageUrl || '',
      alt: p.alt ?? '',
    })),
    facts: arr<any>(r?.facts)
      .filter((f) => f.label && f.value)
      .map((f) => ({ label: f.label, value: f.value })),
    seasons: arr<any>(r?.seasons).map((s) => ({
      span: s.span ?? '',
      name: s.name ?? '',
      body: s.body ?? '',
      best: textList(s.best),
    })),
  };
};

/* ─────────── SiteContent global ─────────── */

export const getSiteContent = async (): Promise<SiteContent> => {
  const payload = await getPayloadClient();
  const result = (await payload.findGlobal({ slug: 'site-content' })) as any;

  const homeHeroSlides = arr<any>(result?.homeHeroSlides)
    .map((s) => ({
      src: mediaUrl(s.image) || s.imageUrl || '',
      place: s.place ?? '',
      country: s.country ?? '',
    }))
    .filter((s) => s.src);

  const homeGallery = arr<any>(result?.homeGallery)
    .map((g) => ({ src: mediaUrl(g.image) || g.imageUrl || '', alt: g.alt ?? '' }))
    .filter((g) => g.src);

  const socials = arr<any>(result?.socials)
    .filter((s) => s.platform && s.url)
    .map((s) => ({ platform: s.platform, url: s.url }));

  const headerNav = arr<any>(result?.headerNav)
    .filter((i) => i.label && (i.isMegaMenu || i.href))
    .map((i) => ({
      label: i.label,
      href: i.href ?? '',
      isMegaMenu: Boolean(i.isMegaMenu),
    }));

  const headerFeatured = arr<any>(result?.headerFeatured)
    .filter((c) => c.title && c.href)
    .map((c) => ({
      title: c.title === 'EAC Destinations' ? 'East African Community Destinations' : c.title,
      eyebrow: c.eyebrow ?? '',
      href: c.href,
      blurb: c.blurb ?? '',
    }));

  const footerGroups = arr<any>(result?.footerGroups)
    .map((g) => ({
      title: g.title ?? '',
      links: arr<any>(g.links)
        .filter((l) => l.label && l.href)
        .map((l) => ({ label: l.label, href: l.href })),
    }))
    .filter((g) => g.title && g.links.length > 0);

  return {
    /* Hero images: prefer uploaded Media, fall back to text URL */
    homeHeroImage: mediaUrl(result?.homeHeroImage) || result?.homeHeroImageUrl || '',
    homeHeroSlides,
    homeStoryImage: mediaUrl(result?.homeStoryImage) || result?.homeStoryImageUrl || '',
    homeGallery,
    homeCtaImage: mediaUrl(result?.homeCtaImage) || result?.homeCtaImageUrl || '',
    aboutHeroImage: mediaUrl(result?.aboutHeroImage) || result?.aboutHeroImageUrl || '',
    visitRwandaHeroImage:
      mediaUrl(result?.visitRwandaHeroImage) || result?.visitRwandaHeroImageUrl || '',
    contactHeroImage: mediaUrl(result?.contactHeroImage) || result?.contactHeroImageUrl || '',
    journalHeroImage: mediaUrl(result?.journalHeroImage) || result?.journalHeroImageUrl || '',
    /* Brand & footer */
    companyName: result?.companyName ?? '',
    footerBlurb: result?.footerBlurb ?? '',
    footerTagline: result?.footerTagline ?? '',
    /* Social & messaging */
    socialHandle: result?.socialHandle ?? '',
    socials,
    whatsappNumber: (result?.whatsappNumber ?? '').replace(/[^\d]/g, ''),
    whatsappMessage: result?.whatsappMessage ?? '',
    /* Navigation */
    headerNav,
    headerFeatured,
    footerGroups,
    /* Journal page copy */
    journalEyebrow: result?.journalEyebrow ?? '',
    journalHeadingLight: result?.journalHeadingLight ?? '',
    journalHeadingBold: result?.journalHeadingBold ?? '',
    journalIntro: result?.journalIntro ?? '',
    journalContributors: result?.journalContributors ?? '',
    journalCadence: result?.journalCadence ?? '',
    journalCtaEyebrow: result?.journalCtaEyebrow ?? '',
    journalCtaHeadingLight: result?.journalCtaHeadingLight ?? '',
    journalCtaHeadingBold: result?.journalCtaHeadingBold ?? '',
    journalCtaBody: result?.journalCtaBody ?? '',
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
    aboutStory: textList(result?.aboutStory),
    aboutStudioImage:
      mediaUrl(result?.aboutStudioImage) || result?.aboutStudioImageUrl || '',
  };
};
