/* ────────────────────────────────────────────────────────────
   MOCK PAYLOAD CLIENT — Stands in for the Payload local API so the
   site renders with no database and no PAYLOAD_SECRET.

   It implements only the surface `external/lib/data.ts` actually uses:
   `find` with `where` / `sort` / `limit`, and `findGlobal`. Every fetcher
   and row mapper above it runs unchanged, so the mock exercises the real
   code path rather than bypassing it.
   ──────────────────────────────────────────────────────────── */

import { siteContent, visitRwanda } from './globals';
import {
  destinationRows,
  journalRows,
  milestoneRows,
  partnerRows,
  pressFeatureRows,
  principleRows,
  testimonialRows,
  tourRows,
  tourThemeRows,
} from './rows';

type Row = Record<string, any>;

const collections: Record<string, Row[]> = {
  destinations: destinationRows,
  tours: tourRows,
  'tour-themes': tourThemeRows,
  journal: journalRows,
  partners: partnerRows,
  testimonials: testimonialRows,
  'press-features': pressFeatureRows,
  principles: principleRows,
  milestones: milestoneRows,
};

const globals: Record<string, Row> = {
  'site-content': siteContent as Row,
  'visit-rwanda': visitRwanda as Row,
};

/* Resolve the value a `where` key refers to. Relationship fields hold an
   object, so `destination: { equals: 3 }` must compare against its id. */
const fieldValue = (row: Row, field: string): unknown => {
  const raw = row[field];
  if (raw && typeof raw === 'object' && !Array.isArray(raw) && 'id' in raw) {
    return (raw as { id: unknown }).id;
  }
  return raw;
};

/* Supports the three operators the data layer uses: equals, in, contains. */
const matches = (row: Row, where: Row | undefined): boolean => {
  if (!where) return true;

  return Object.entries(where).every(([field, condition]) => {
    if (!condition || typeof condition !== 'object') return true;
    const value = fieldValue(row, field);

    for (const [op, expected] of Object.entries(condition as Row)) {
      if (op === 'equals' && value !== expected) return false;

      if (op === 'in') {
        const list = Array.isArray(expected) ? expected : [expected];
        if (!list.includes(value as never)) return false;
      }

      /* `contains` targets array fields (e.g. a tour's themes). */
      if (op === 'contains') {
        const list = Array.isArray(value) ? value : [];
        const hit = list.some((entry) =>
          entry && typeof entry === 'object' && 'id' in entry
            ? (entry as { id: unknown }).id === expected
            : entry === expected,
        );
        if (!hit) return false;
      }
    }

    return true;
  });
};

/* Payload sort syntax: "field" ascending, "-field" descending. */
const sortRows = (rows: Row[], sort: string | undefined): Row[] => {
  if (!sort) return rows;
  const desc = sort.startsWith('-');
  const field = desc ? sort.slice(1) : sort;

  return [...rows].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === bv) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const result = av > bv ? 1 : -1;
    return desc ? -result : result;
  });
};

export type MockPayloadClient = {
  find: (args: {
    collection: string;
    where?: Row;
    sort?: string;
    limit?: number;
    depth?: number;
  }) => Promise<{ docs: Row[]; totalDocs: number }>;
  findGlobal: (args: { slug: string }) => Promise<Row>;
};

export const createMockPayloadClient = (): MockPayloadClient => ({
  async find({ collection, where, sort, limit }) {
    const all = collections[collection] ?? [];
    const filtered = sortRows(all.filter((row) => matches(row, where)), sort);
    const docs =
      typeof limit === 'number' && limit > 0 ? filtered.slice(0, limit) : filtered;
    return { docs, totalDocs: filtered.length };
  },

  async findGlobal({ slug }) {
    return globals[slug] ?? {};
  },
});
