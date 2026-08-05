import {
  getDestination,
  getFeaturedTestimonial,
  getSiteContent,
  getVisitRwandaContent,
} from '@/external/lib/data';
import VisitRwandaView from './_view';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Visit Rwanda · Soul Expeditions Africa',
  description:
    'A small, considered country of forested volcanoes, glassy lakes, and the world\'s most carefully protected primates — the land of a thousand hills.',
};

export default async function VisitRwandaPage() {
  const [rwanda, siteContent, featuredTestimonial, content] = await Promise.all([
    getDestination('rwanda'),
    getSiteContent(),
    getFeaturedTestimonial(),
    getVisitRwandaContent(),
  ]);
  const tours = rwanda?.tours ?? [];
  return (
    <VisitRwandaView
      tours={tours}
      siteContent={siteContent}
      featuredTestimonial={featuredTestimonial}
      content={content}
    />
  );
}
