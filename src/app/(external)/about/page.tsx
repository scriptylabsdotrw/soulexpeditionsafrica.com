import { getMilestones, getPrinciples, getSiteContent } from '@/external/lib/data';
import AboutView from './_view';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About · Soul Expeditions Africa',
  description:
    'A Kigali-based travel design studio crafting privately led journeys across East Africa.',
};

export default async function AboutPage() {
  const [siteContent, principles, milestones] = await Promise.all([
    getSiteContent(),
    getPrinciples('about'),
    getMilestones(),
  ]);
  return (
    <AboutView siteContent={siteContent} principles={principles} milestones={milestones} />
  );
}
