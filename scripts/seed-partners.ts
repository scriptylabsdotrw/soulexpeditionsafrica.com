/* ────────────────────────────────────────────────────────────
   SEED — Partner logos for the home marquee.

   Upserts the industry partners by name and points each at a logo
   committed under /public/logos/partners. Safe to re-run: existing
   rows are updated in place rather than duplicated.

   Run: npm run seed:partners
   ──────────────────────────────────────────────────────────── */

import { getPayload } from 'payload';
import config from '../payload.config';

const partners = [
  {
    name: 'Rwanda Safari Guides Association',
    logoUrl: '/logos/partners/rsga.png',
    url: 'https://rsga.rw',
    order: 1,
  },
  {
    name: 'Bridge2Rwanda',
    logoUrl: '/logos/partners/bridge2rwanda.png',
    url: 'https://bridge2rwanda.org',
    order: 2,
  },
  {
    name: 'RDB Tourism Regulation',
    logoUrl: '/logos/partners/rdb-tourism-regulation.png',
    url: 'https://entities.tourismregulation.rdb.rw',
    order: 3,
  },
  {
    name: 'Rwanda Chamber of Tourism',
    logoUrl: '/logos/partners/rcot.png',
    url: 'https://rcot.org.rw',
    order: 4,
  },
  {
    name: 'Rwanda Tours & Travel Association',
    logoUrl: '/logos/partners/rtta.png',
    url: 'https://rtta.rw',
    order: 5,
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  for (const p of partners) {
    const found = await payload.find({
      collection: 'partners',
      where: { name: { equals: p.name } },
      limit: 1,
    });
    const doc = found.docs[0];

    if (doc) {
      await payload.update({ collection: 'partners', id: doc.id, data: p as never });
      console.log(`✓ updated ${p.name}`);
    } else {
      await payload.create({ collection: 'partners', data: p as never });
      console.log(`✓ created ${p.name}`);
    }
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
