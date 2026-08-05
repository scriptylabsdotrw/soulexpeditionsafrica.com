import { getDestinations, getSiteContent } from '@/external/lib/data';
import ContactView from './_view';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Plan your trip · Soul Expeditions Africa',
  description:
    'Select your destination, itinerary, and tier. A Travel Designer responds personally within 24 hours — no templates, no call centres.',
};

export default async function ContactPage() {
  const [destinations, siteContent] = await Promise.all([
    getDestinations(),
    getSiteContent(),
  ]);
  return <ContactView destinations={destinations} siteContent={siteContent} />;
}
