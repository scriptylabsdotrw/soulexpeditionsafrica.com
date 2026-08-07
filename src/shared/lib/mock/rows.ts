/* ────────────────────────────────────────────────────────────
   MOCK ROWS — Reshapes the static fixtures into the row shape the
   Payload mappers in `external/lib/data.ts` expect, so those mappers
   (and every fetcher above them) run unchanged against the mock.

   Row-shape rules the mappers rely on:
     • array-of-strings fields become `{ id, text }[]` / `{ id, name }[]`
     • images arrive as `imageUrl` / `heroUrl` strings, not Media objects
     • a tour's `destination` is an object carrying `slug` and `name`
   ──────────────────────────────────────────────────────────── */

import { destinations as fixtureDestinations } from './destinations';
import { tourCollections } from './themes';
import { articles } from './journal';

/* Payload array fields are rows, not bare strings. */
const textRows = (values: string[]) =>
  values.map((text, i) => ({ id: `${i + 1}`, text }));

const nameRows = (values: string[]) =>
  values.map((name, i) => ({ id: `${i + 1}`, name }));

/* ─────────── destinations & tours ─────────── */

export const destinationRows = fixtureDestinations.map((d, i) => ({
  id: i + 1,
  slug: d.slug,
  name: d.name,
  tagline: d.tagline,
  region: d.region,
  bestTime: d.bestTime,
  description: d.description,
  highlights: textRows(d.highlights),
  signatureLodges: nameRows(d.signatureLodges),
  imageUrl: d.image,
  heroUrl: d.hero,
}));

/* Tours are nested inside destinations in the fixtures; Payload stores them
   flat with a relationship back to the destination. Flatten to match. */
export const tourRows = fixtureDestinations.flatMap((d, di) =>
  d.tours.map((t, ti) => ({
    id: di * 100 + ti + 1,
    slug: t.slug,
    title: t.title,
    duration: t.duration,
    pace: t.pace,
    group: t.group,
    category: t.category,
    summary: t.summary,
    description: t.description,
    bestTime: t.bestTime,
    highlights: textRows(t.highlights),
    /* The fixtures predate per-day itineraries; the detail page renders an
       empty state rather than inventing days that were never written. */
    itinerary: [] as { id: string; day: string; title: string; body: string }[],
    tiers: t.tiers ? [...t.tiers] : undefined,
    imageUrl: t.image,
    /* Surface a few per destination so the "featured" rails aren't empty. */
    featured: ti === 0,
    destination: { id: di + 1, slug: d.slug, name: d.name },
  })),
);

/* ─────────── tour themes ─────────── */

export const tourThemeRows = tourCollections.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  title: c.title,
  group: c.group,
  tagline: c.tagline ?? '',
  description: c.description ?? '',
  imageUrl: c.image ?? '',
  heroUrl: c.hero ?? c.image ?? '',
  /* Themes link to tours by slug in the fixtures. */
  themes: [] as string[],
}));

/* ─────────── journal ─────────── */

export const journalRows = articles.map((a, i) => ({
  id: i + 1,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt ?? '',
  category: a.category ?? '',
  tag: a.tag ?? '',
  author: a.author?.name ?? '',
  authorRole: a.author?.role ?? '',
  publishedAt: a.date ?? '',
  readTime: a.readTime ?? '',
  imageUrl: a.image ?? '',
  featured: i === 0,
  pullQuote: null,
  body: null,
}));

/* ─────────── small supporting collections ─────────── */

export const partnerRows = [
  { id: 1, name: 'Visit Rwanda', logoUrl: '/logos/visit_rwanda-logo.png', url: '', order: 1 },
  { id: 2, name: 'Rwanda Development Board', logoUrl: '/logos/logo-02.png', url: '', order: 2 },
  { id: 3, name: 'Bridge2Rwanda', logoUrl: '/logos/logo-01.png', url: '', order: 3 },
];

export const testimonialRows = [
  {
    id: 1,
    quote:
      'Soul Expeditions read us perfectly — the pace, the lodges, the moments of quiet. We came home changed.',
    attribution: 'Marta & Jonas H.',
    context: 'Rwanda · 9 days',
    imageUrl: '/images/uploads/gorillaimage1.jpg',
    featured: true,
  },
  {
    id: 2,
    quote:
      'Every transfer, permit, and guide was handled before we thought to ask. That is the whole craft.',
    attribution: 'Dr. A. Mensah',
    context: 'Rwanda & Tanzania · 14 days',
    imageUrl: '/images/uploads/TanzaniaCoverImage.avif',
    featured: false,
  },
];

export const pressFeatureRows = [
  { id: 1, publication: 'Condé Nast Traveller', quote: 'A new standard for East African travel design.', url: '', order: 1 },
  { id: 2, publication: 'Travel + Leisure', quote: 'Quietly the most considered operator in Rwanda.', url: '', order: 2 },
];

export const principleRows = [
  {
    id: 1,
    title: 'Local expertise, global standards',
    body: 'Every journey is built by people who live here, held to the service standards of the world’s best hotels.',
    order: 1,
  },
  {
    id: 2,
    title: 'Conservation first',
    body: 'We route guests and spend toward the parks and communities doing the hardest conservation work.',
    order: 2,
  },
  {
    id: 3,
    title: 'Designed around you',
    body: 'No fixed departures. Every itinerary is drawn from a conversation, not a catalogue.',
    order: 3,
  },
];

export const milestoneRows = [
  { id: 1, year: '2015', title: 'Founded in Kigali', body: 'Started with a single vehicle and a permit book.', order: 1 },
  { id: 2, year: '2019', title: 'Expanded across the EAC', body: 'Added Uganda, Kenya, and Tanzania to the map.', order: 2 },
  { id: 3, year: '2024', title: 'A thousand journeys', body: 'Crossed a thousand guests hosted, still owner-led.', order: 3 },
];
