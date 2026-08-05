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
  featured: boolean;
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
  tag: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  image: string;
  featured: boolean;
  pullQuote: { quote: string; attribution: string } | null;
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

export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'x'
  | 'linkedin';

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type HeaderNavItem = {
  label: string;
  href: string;
  isMegaMenu: boolean;
};

export type FeaturedCard = {
  title: string;
  eyebrow: string;
  href: string;
  blurb: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type SiteContent = {
  /* Hero images (per-page background) */
  homeHeroImage: string;
  homeHeroSlides: { src: string; place: string; country: string }[];
  homeStoryImage: string;
  homeGallery: GalleryImage[];
  homeCtaImage: string;
  aboutHeroImage: string;
  visitRwandaHeroImage: string;
  contactHeroImage: string;
  journalHeroImage: string;
  /* Brand & footer */
  companyName: string;
  footerBlurb: string;
  footerTagline: string;
  /* Social & messaging */
  socialHandle: string;
  socials: SocialLink[];
  whatsappNumber: string;
  whatsappMessage: string;
  /* Navigation */
  headerNav: HeaderNavItem[];
  headerFeatured: FeaturedCard[];
  footerGroups: NavGroup[];
  /* Journal page copy */
  journalEyebrow: string;
  journalHeadingLight: string;
  journalHeadingBold: string;
  journalIntro: string;
  journalContributors: string;
  journalCadence: string;
  journalCtaEyebrow: string;
  journalCtaHeadingLight: string;
  journalCtaHeadingBold: string;
  journalCtaBody: string;
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
  aboutStory: string[];
  aboutStudioImage: string;
};

/* ─────────── Visit Rwanda page ─────────── */

export type Place = {
  name: string;
  location: string;
  note: string;
};

export type PlaceCategory = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  places: Place[];
};

export type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  alt: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Season = {
  span: string;
  name: string;
  body: string;
  best: string[];
};

export type VisitRwandaContent = {
  placeCategories: PlaceCategory[];
  pillars: Pillar[];
  facts: Fact[];
  seasons: Season[];
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

/* ─────────── Formatting helpers (server + client safe) ─────────── */

/** "2025-04-12" → "12 April 2025". Returns '' for missing/invalid dates. */
export const formatDate = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

/** Distinct, in-use journal categories, ordered by how many posts carry each. */
export const journalCategories = (posts: JournalPost[]): string[] => {
  const counts = new Map<string, number>();
  for (const p of posts) {
    if (!p.category) continue;
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
};
