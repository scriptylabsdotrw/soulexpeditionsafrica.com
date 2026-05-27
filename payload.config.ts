import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Destinations } from './src/collections/Destinations';
import { Tours } from './src/collections/Tours';
import { TourThemes } from './src/collections/TourThemes';
import { JournalPosts } from './src/collections/JournalPosts';
import { Enquiries } from './src/collections/Enquiries';
import { Testimonials } from './src/collections/Testimonials';
import { Partners } from './src/collections/Partners';
import { PressFeatures } from './src/collections/PressFeatures';
import { Principles } from './src/collections/Principles';
import { Milestones } from './src/collections/Milestones';
import { SiteContent } from './src/globals/SiteContent';

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
        Logo: '/src/components/AdminLogo#default',
        Icon: '/src/components/AdminIcon#default',
      },
      beforeDashboard: ['/src/components/Dashboard#default'],
      beforeNavLinks: ['/src/components/DashboardNavLink#default'],
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
  globals: [SiteContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
});
