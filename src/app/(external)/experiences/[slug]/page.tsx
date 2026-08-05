import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/external/lib/data';

const experiences = {
  'church-mission-trips': {
    title: 'Church & Mission Trips', group: 'Groups', image: '/images/uploads/intore.jpg',
    description: 'Purpose-led journeys created for church communities and mission teams. We coordinate meaningful cultural encounters, community visits, comfortable logistics, and time for fellowship with care and local insight.',
  },
  'school-leadership-culture-immersion': {
    title: 'School Leadership & Culture Immersion Program', group: 'Groups', image: '/images/uploads/Kigali_Convention_center,_Rwanda.jpg',
    description: 'An educational journey for students and school leaders that combines leadership development with respectful cultural immersion. Each program is shaped around learning goals, safeguarding needs, and the age of the group.',
  },
  'corporate-retreat-incentive-travel': {
    title: 'Corporate Retreat & Incentive Travel', group: 'Groups', image: '/images/uploads/Kigali_Convention_center,_Rwanda.jpg',
    description: 'Thoughtfully planned retreats and incentive journeys that bring teams together through inspiring settings, seamless hospitality, shared adventures, and space to reconnect away from the everyday office.',
  },
  philanthropy: {
    title: 'Philanthropy', group: 'Special Interest', image: '/images/uploads/Headquartered in Kigali.jpg',
    description: 'Private journeys that help travellers engage thoughtfully with locally led initiatives. We prioritise respectful relationships, transparency, and experiences shaped in partnership with the communities involved.',
  },
  'arts-design': {
    title: 'Arts & Design', group: 'Special Interest', image: '/images/uploads/intore.jpg',
    description: 'Explore East Africa through its artists, makers, architecture, fashion, performance, and contemporary design. Every itinerary is curated around your creative interests and opportunities for genuine exchange.',
  },
  honeymoon: {
    title: 'Honeymoon', group: 'Special Interest', image: '/images/uploads/ZanzibarTourism.jpg',
    description: 'A deeply personal celebration designed around the two of you, pairing extraordinary wildlife and landscapes with private moments, beautiful stays, and an unhurried rhythm.',
  },
  history: {
    title: 'History', group: 'Special Interest', image: '/images/uploads/ABOUTusHero.jpg',
    description: 'Discover the people, places, and events that shaped the region through expert-guided visits, museums, heritage sites, and conversations that bring the past into thoughtful context.',
  },
  'active-volunteering': {
    title: 'Active Volunteering', group: 'Special Interest', image: '/images/uploads/Headquartered in Kigali.jpg',
    description: 'Hands-on, responsibly planned experiences that match your time and skills with locally identified needs. We focus on useful participation, cultural respect, and positive long-term relationships.',
  },
  lgbtq: {
    title: 'LGBTQ', group: 'Special Interest', image: '/images/uploads/rwandatourism.webp',
    description: 'Private travel designed with care, discretion, and a clear understanding of local context. Our consultants listen closely and plan every detail around your comfort, interests, and preferred travel style.',
  },
} as const;

type ExperienceSlug = keyof typeof experiences;

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = experiences[slug as ExperienceSlug];
  if (!experience) notFound();
  const siteContent = await getSiteContent();

  return (
    <main className="bg-white">
      <section className="px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 lg:grid-cols-2">
          <div className="relative min-h-[340px] lg:min-h-[620px]">
            <Image src={experience.image} alt={experience.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-[#F58220]">{experience.group}</p>
            <h1 className="mt-5 text-balance text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.04em] text-neutral-950">{experience.title}</h1>
            <p className="mt-7 text-lg leading-8 text-neutral-600">{experience.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#F58220] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-950">Contact Us <span aria-hidden="true">→</span></Link>
              {siteContent.studioEmail && (
                <a href={`mailto:${siteContent.studioEmail}?subject=${encodeURIComponent(`Enquiry: ${experience.title}`)}`} className="inline-flex items-center rounded-full border border-neutral-300 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-neutral-700 transition hover:border-[#F58220] hover:text-[#F58220]">Email Us</a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

