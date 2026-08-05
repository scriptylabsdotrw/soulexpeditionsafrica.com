import { getJournalPosts, getSiteContent } from '@/external/lib/data';
import JournalView from './_view';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Journal · Soul Expeditions Africa',
  description:
    'Slow, hosted writing from our guides, conservationists, and design team — the long form of how we actually work.',
};

export default async function JournalPage() {
  const [posts, siteContent] = await Promise.all([getJournalPosts(), getSiteContent()]);
  return <JournalView posts={posts} siteContent={siteContent} />;
}
