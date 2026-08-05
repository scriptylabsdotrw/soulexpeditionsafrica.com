import { getPartners, getSiteContent } from '@/external/lib/data';
import HomeView from './_view';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [siteContent, partners] = await Promise.all([getSiteContent(), getPartners()]);

  return <HomeView siteContent={siteContent} partners={partners} />;
}
