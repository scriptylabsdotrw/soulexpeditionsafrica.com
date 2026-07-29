import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

/* Temporary one-off admin route: deletes the orphaned Botswana destination
   + its tours from production, which commit 50b2804 removed from the code
   but never from the database. Delete this file after running it once. */

const SECRET = '87cf2897de06d42fc52af83b8825121ba11f71c00ab5fbcc';

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

  const dest = await sql`SELECT id, name, slug FROM destinations WHERE slug = 'botswana'`;
  if (dest.length === 0) {
    return NextResponse.json({ message: 'No Botswana destination found — nothing to do.' });
  }

  const tours = await sql`SELECT id, title, slug FROM tours WHERE destination_id = ${dest[0].id}`;
  await sql`DELETE FROM tours WHERE destination_id = ${dest[0].id}`;
  await sql`DELETE FROM destinations WHERE id = ${dest[0].id}`;

  return NextResponse.json({ deletedDestination: dest[0], deletedTours: tours });
}
