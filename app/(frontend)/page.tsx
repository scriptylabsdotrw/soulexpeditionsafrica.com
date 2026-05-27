import {
  getFeaturedTestimonial,
  getJournalPosts,
  getPartners,
  getPressFeatures,
  getPrinciples,
  getSiteContent,
} from '@/lib/data';
import HomeView from './_view';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [siteContent, principles, pressFeatures, partners, featuredTestimonial, journal] =
    await Promise.all([
      getSiteContent(),
      getPrinciples('home'),
      getPressFeatures(),
      getPartners(),
      getFeaturedTestimonial(),
      getJournalPosts(),
    ]);

  return (
    <HomeView
      siteContent={siteContent}
      principles={principles}
      pressFeatures={pressFeatures}
      partners={partners}
      featuredTestimonial={featuredTestimonial}
      journal={journal.slice(0, 3)}
    />
  );
}
