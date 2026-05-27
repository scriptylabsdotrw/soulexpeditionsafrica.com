/* ────────────────────────────────────────────────────────────
   SEED — Imports existing static data into Payload.
   Upserts by slug: creates new records, updates existing ones to
   stay in sync with the static data files. Run: npm run seed
   ──────────────────────────────────────────────────────────── */

import { getPayload } from 'payload';
import config from '../payload.config';
import { destinations } from '../app/(frontend)/destinations/data';
import { tourCollections } from '../app/(frontend)/tours/data';
import { articles } from '../app/(frontend)/journal/data';

/* Build a minimal Lexical root from plain text paragraphs (Payload's rich-text needs Lexical JSON). */
const paragraphsToLexical = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'text',
          text,
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      textFormat: 0,
    })),
    direction: 'ltr',
  },
});

const seed = async () => {
  const payload = await getPayload({ config });
  const log = payload.logger;

  /* ─────── 1. Destinations + their tours ─────── */
  log.info('Seeding destinations + tours…');

  for (const dest of destinations) {
    const destData = {
      name: dest.name,
      slug: dest.slug,
      tagline: dest.tagline,
      region: dest.region as
        | 'East Africa'
        | 'Southern Africa'
        | 'Indian Ocean'
        | 'North Africa'
        | 'West Africa',
      bestTime: dest.bestTime,
      description: dest.description,
      imageUrl: dest.image,
      heroUrl: dest.hero,
      highlights: dest.highlights.map((text) => ({ text })),
      signatureLodges: dest.signatureLodges.map((name) => ({ name })),
    };

    const existing = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: dest.slug } },
      limit: 1,
    });

    let destId: number | string;
    if (existing.docs.length) {
      const updated = await payload.update({
        collection: 'destinations',
        id: existing.docs[0].id,
        data: destData,
      });
      destId = updated.id;
      log.info(`  ↻ destination updated: ${dest.name}`);
    } else {
      const created = await payload.create({
        collection: 'destinations',
        data: destData,
      });
      destId = created.id;
      log.info(`  ✓ destination created: ${dest.name}`);
    }

    /* tours within this destination */
    for (const tour of dest.tours) {
      const tourData = {
        title: tour.title,
        slug: tour.slug,
        destination: destId,
        duration: tour.duration,
        pace: tour.pace,
        category: tour.category,
        group: tour.group,
        summary: tour.summary,
        description: tour.description,
        bestTime: tour.bestTime,
        imageUrl: tour.image,
        highlights: tour.highlights.map((text) => ({ text })),
        tiers: (tour.tiers ?? ['Luxury', 'Mid range', 'Budget']) as (
          | 'Luxury'
          | 'Mid range'
          | 'Budget'
        )[],
      };

      const existingTour = await payload.find({
        collection: 'tours',
        where: { slug: { equals: tour.slug } },
        limit: 1,
      });

      if (existingTour.docs.length) {
        await payload.update({
          collection: 'tours',
          id: existingTour.docs[0].id,
          data: tourData,
        });
        log.info(`    ↻ tour updated: ${tour.title}`);
      } else {
        await payload.create({ collection: 'tours', data: tourData });
        log.info(`    ✓ tour created: ${tour.title}`);
      }
    }
  }

  /* ─────── 2. Tour Themes (Special Interest + Groups) ─────── */
  log.info('Seeding tour themes…');
  for (const tc of tourCollections) {
    const themeData = {
      title: tc.title,
      slug: tc.slug,
      group: tc.group,
      tagline: tc.tagline,
      description: tc.description,
    };

    const existing = await payload.find({
      collection: 'tour-themes',
      where: { slug: { equals: tc.slug } },
      limit: 1,
    });

    if (existing.docs.length) {
      await payload.update({
        collection: 'tour-themes',
        id: existing.docs[0].id,
        data: themeData,
      });
      log.info(`  ↻ theme updated: ${tc.title}`);
    } else {
      await payload.create({ collection: 'tour-themes', data: themeData });
      log.info(`  ✓ theme created: ${tc.title}`);
    }
  }

  /* ─────── 3. Journal posts ─────── */
  log.info('Seeding journal posts…');
  for (const article of articles) {
    const articleData = {
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      author: article.author.name,
      publishedAt: article.publishedAt,
      readTime: article.readTime,
      imageUrl: article.image,
      body: paragraphsToLexical(article.body),
    };

    const existing = await payload.find({
      collection: 'journal',
      where: { slug: { equals: article.slug } },
      limit: 1,
    });

    if (existing.docs.length) {
      await payload.update({
        collection: 'journal',
        id: existing.docs[0].id,
        data: articleData,
      });
      log.info(`  ↻ article updated: ${article.title}`);
    } else {
      await payload.create({ collection: 'journal', data: articleData });
      log.info(`  ✓ article created: ${article.title}`);
    }
  }

  log.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log.info('✓ Seed complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
