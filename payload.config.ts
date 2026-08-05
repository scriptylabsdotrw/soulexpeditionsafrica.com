import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Users } from './src/internal/collections/Users';
import { Media } from './src/internal/collections/Media';
import { Destinations } from './src/internal/collections/Destinations';
import { Tours } from './src/internal/collections/Tours';
import { TourThemes } from './src/internal/collections/TourThemes';
import { JournalPosts } from './src/internal/collections/JournalPosts';
import { Enquiries } from './src/internal/collections/Enquiries';
import { Testimonials } from './src/internal/collections/Testimonials';
import { Partners } from './src/internal/collections/Partners';
import { PressFeatures } from './src/internal/collections/PressFeatures';
import { Principles } from './src/internal/collections/Principles';
import { Milestones } from './src/internal/collections/Milestones';
import { SiteContent } from './src/internal/globals/SiteContent';
import { VisitRwanda } from './src/internal/globals/VisitRwanda';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Soul Expeditions Africa',
    },
    components: {
      graphics: {
        Logo: '/src/internal/components/AdminLogo#default',
        Icon: '/src/internal/components/AdminIcon#default',
      },
      beforeDashboard: ['/src/internal/components/Dashboard#default'],
      beforeNavLinks: ['/src/internal/components/DashboardNavLink#default'],
    },
  },
  collections: [
    Users,
    Media,
    Destinations,
    Tours,
    TourThemes,
    JournalPosts,
    Testimonials,
    Partners,
    PressFeatures,
    Principles,
    Milestones,
    Enquiries,
  ],
  globals: [SiteContent, VisitRwanda],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/shared/payload-types.ts'),
  },
  /* On Vercel (any POSTGRES_URL set by the Neon Marketplace integration),
     use the serverless-friendly adapter that auto-pushes schema on cold start.
     Locally (Docker), keep the standard pg pool. */
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter({
        pool: { connectionString: process.env.POSTGRES_URL },
        push: true,
      })
    : postgresAdapter({
        pool: {
          connectionString:
            process.env.DATABASE_URI ||
            process.env.DATABASE_URL ||
            '',
        },
        push: true,
      }),
  sharp,
});
