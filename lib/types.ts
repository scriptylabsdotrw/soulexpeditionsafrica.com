/* ────────────────────────────────────────────────────────────
   Shared types + UI helpers. Importable from both server and client.
   ──────────────────────────────────────────────────────────── */

export type Tier = 'Luxury' | 'Mid range' | 'Budget';
export const TIERS = ['Luxury', 'Mid range', 'Budget'] as const;

export type ItineraryDay = {
  day: string;
  title: string;
  body: string;
};

export type Tour = {
  id: number | string;
  slug: string;
  title: string;
  duration: string;
  pace: 'Easy' | 'Moderate' | 'Active' | 'Expedition';
  group: string;
  category: 'Wildlife' | 'Cultural' | 'Adventure' | 'Coast' | 'Trekking';
  summary: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  bestTime: string;
  tiers: Tier[];
  image: string;
  destinationSlug?: string;
  destinationName?: string;
};

export type Destination = {
  id: number | string;
  slug: string;
  name: string;
  tagline: string;
  region: string;
  bestTime: string;
  image: string;
  hero: string;
  description: string;
  highlights: string[];
  signatureLodges: string[];
  tours: Tour[];
};

export type TourTheme = {
  id: number | string;
  slug: string;
  title: string;
  group: 'Special Interest' | 'Groups';
  tagline: string;
  description: string;
  image: string;
  hero: string;
};

export type JournalPost = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  body: unknown;
};

export type Testimonial = {
  id: number | string;
  quote: string;
  attribution: string;
  context: string;
  image: string;
  featured: boolean;
};

export type Partner = {
  id: number | string;
  name: string;
  logo: string;
  url: string;
};

export type PressFeature = {
  id: number | string;
  name: string;
  url: string;
};

export type Principle = {
  id: number | string;
  number: string;
  title: string;
  body: string;
  group: 'home' | 'about' | 'both';
};

export type Milestone = {
  id: number | string;
  year: string;
  title: string;
  body: string;
};

export type SiteContent = {
  /* Hero images (per-page background) */
  homeHeroImage: string;
  aboutHeroImage: string;
  visitRwandaHeroImage: string;
  /* Home hero stats */
  foundedYear: string;
  countries: string;
  travellersHosted: string;
  curatedLodges: string;
  /* Visit Rwanda stats */
  mountainGorillas: string;
  gorillaFamilies: string;
  nationalParks: string;
  hills: string;
  /* Studio contact */
  studioAddress: string;
  studioEmail: string;
  studioPhone: string;
  studioHours: string;
  studioMapsUrl: string;
  /* About copy */
  aboutManifesto: string;
  studioBlurb: string;
};

/* ─────────── Tier metadata (UI-only, not in DB) ─────────── */

export const tierMeta: Record<
  Tier,
  { label: string; tagline: string; description: string; lodgeStyle: string }
> = {
  Luxury: {
    label: 'Luxury',
    tagline: 'The finest forest and bush lodges, hosted end-to-end.',
    description:
      'Singita, Bisate, One&Only-level lodges. Private vehicles, private guides, private chef moments. Helicopter transfers where they belong. Designed without compromise.',
    lodgeStyle: 'Singita · Bisate · One&Only',
  },
  'Mid range': {
    label: 'Mid range',
    tagline: 'Premium boutique camps, lighter logistics, same expert guides.',
    description:
      'Beautiful boutique camps and lodges with strong character. Shared light-aircraft transfers, private vehicles in-park, the same world-class guides — at a more considered spend.',
    lodgeStyle: 'Wilderness · Asilia · Sanctuary',
  },
  Budget: {
    label: 'Budget',
    tagline: 'Owner-led design at a measured spend.',
    description:
      'Excellent mid-tier lodges chosen by hand, smart group sharing where possible, simpler logistics, and the same people guiding you. Nothing about the wildlife or the care is reduced.',
    lodgeStyle: 'Boutique · Group-friendly',
  },
};

export const tourTiers = (t: Tour): readonly Tier[] =>
  t.tiers && t.tiers.length ? t.tiers : (TIERS as unknown as Tier[]);
