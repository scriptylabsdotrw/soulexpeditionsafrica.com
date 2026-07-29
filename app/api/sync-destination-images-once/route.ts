import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

/* Temporary one-off admin route: production's destinations.image_url still
   holds the original Unsplash placeholder URLs (Kenya and Botswana even
   pointed at the same photo). Local was updated to the real uploaded
   photos in commit 50b2804, but only in the local database. Syncs
   production to match, then gets removed. */

const SECRET = '48b18ead8a539c715051ec886dd459543c53ff119e898da4';

const UPDATES: Record<string, string> = {
  rwanda: '/images/uploads/rwandatourism.webp',
  tanzania: '/images/uploads/TanzaniaCoverImage.avif',
  kenya: '/images/uploads/kenyaCoverImage.avif',
  uganda: '/images/uploads/Uganda-tourism.jpg',
  zanzibar: '/images/uploads/ZanzibarTourism.jpg',
};

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  if (req.headers.get('x-cleanup-secret') !== SECRET || searchParams.get('confirm') !== 'true') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';
  if (!connectionString) {
    return NextResponse.json({ error: 'no database connection string in env' }, { status: 500 });
  }
  const sql = neon(connectionString);

  const results: Array<{ slug: string; before: string | null; after: string }> = [];

  for (const [slug, imageUrl] of Object.entries(UPDATES)) {
    const before = await sql`SELECT image_url FROM destinations WHERE slug = ${slug}`;
    if (before.length === 0) continue;
    await sql`UPDATE destinations SET image_url = ${imageUrl} WHERE slug = ${slug}`;
    results.push({ slug, before: before[0].image_url, after: imageUrl });
  }

  return NextResponse.json({ updated: results });
}
