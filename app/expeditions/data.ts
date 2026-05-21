export type Expedition = {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  fromPrice: string;
  image: string;
  hero: string;
  overview: string;
  highlights: { day: string; title: string; body: string }[];
  inclusions: string[];
};

export const expeditions: Expedition[] = [
  {
    slug: 'gorilla-trekking',
    title: 'Gorilla Trekking',
    subtitle: 'A privately permitted journey to the silverbacks of Volcanoes and Bwindi.',
    location: 'Rwanda · Uganda',
    duration: '7 days',
    fromPrice: 'From $8,600 / guest',
    image:
      'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1600&q=85',
    hero:
      'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=2400&q=85',
    overview:
      'Two countries, two forests, two completely different ways of meeting the gorillas — paired with the finest lodges in East Africa and led by guides who have tracked these families for nearly two decades.',
    highlights: [
      { day: 'Day 1–2', title: 'Kigali · Volcanoes', body: 'City briefing, design and memorial, scenic drive to Bisate, settle into forest luxury.' },
      { day: 'Day 3–4', title: 'Volcanoes treks', body: 'Two privately permitted gorilla treks; afternoons with conservation researchers and traditional healers.' },
      { day: 'Day 5–6', title: 'Bwindi crossing', body: 'Fly to Bwindi’s Impenetrable Forest for a different terrain and a deeper, quieter encounter.' },
      { day: 'Day 7', title: 'Return', body: 'Slow morning, farewell at Entebbe or Kigali — depending on the routing we’ve designed for you.' },
    ],
    inclusions: [
      'Two gorilla trekking permits',
      'Private guide and forest tracker',
      'All flights inside Africa',
      'Lodge: Bisate + Bwindi Lodge (or peers)',
      'Conservation researcher access',
    ],
  },
  {
    slug: 'great-migration',
    title: 'Great Migration Safari',
    subtitle: 'Time-tuned camps following the river crossings and big cats.',
    location: 'Serengeti · Maasai Mara',
    duration: '10 days',
    fromPrice: 'From $12,400 / guest',
    image:
      'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=85',
    hero:
      'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=2400&q=85',
    overview:
      'A two-country migration journey designed around the wildlife calendar — not the brochure. We track where the herds actually are, weeks ahead, and position camps accordingly.',
    highlights: [
      { day: 'Day 1–3', title: 'Northern Serengeti', body: 'Mobile migration camp positioned for river crossings; long days, golden light.' },
      { day: 'Day 4–6', title: 'Central plains', body: 'Big cats, cheetah families, hot-air balloon at dawn (optional).' },
      { day: 'Day 7–9', title: 'Mara conservancies', body: 'Cross into Kenya by light aircraft; private conservancy game drives and walking safaris.' },
      { day: 'Day 10', title: 'Nairobi', body: 'Slow breakfast, transit through Nairobi or a quiet final night at Giraffe Manor.' },
    ],
    inclusions: [
      'Mobile migration camp',
      'Private 4x4 with roof hatch',
      'All bush flights',
      'Lodge: Sayari, Angama Mara (or peers)',
      'Hot-air balloon (optional)',
    ],
  },
  {
    slug: 'cultural-heritage',
    title: 'Cultural Heritage Journey',
    subtitle: 'A slow, intentional route through memory, music, craft, and community.',
    location: 'Rwanda · Tanzania · Kenya',
    duration: '9 days',
    fromPrice: 'From $7,800 / guest',
    image:
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=85',
    hero:
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2400&q=85',
    overview:
      'For travellers who want to understand, not just see. We sit with historians, artists, and elders — and design unhurried days that leave room for the unscripted.',
    highlights: [
      { day: 'Day 1–3', title: 'Kigali', body: 'Memorial, design studios, Inema arts centre, hosted dinners with local writers and curators.' },
      { day: 'Day 4–6', title: 'Hadzabe & Datoga', body: 'Quiet days with two of the last hunter-gatherer cultures in East Africa.' },
      { day: 'Day 7–9', title: 'Lamu archipelago', body: 'Swahili coast — dhow sails, slow food, music nights, and Stone Town walks.' },
    ],
    inclusions: [
      'Private historian-guide',
      'Curator-led studio visits',
      'All transfers and bush flights',
      'Lodge: Heaven Boutique, Roving Bushtops, Peponi’s',
      'Community partnership contribution',
    ],
  },
  {
    slug: 'indian-ocean-escape',
    title: 'Indian Ocean Escape',
    subtitle: 'Spice routes, dhow sails, private islands, and Swahili-coast retreats.',
    location: 'Zanzibar · Lamu',
    duration: '8 days',
    fromPrice: 'From $9,200 / guest',
    image:
      'https://images.unsplash.com/photo-1589552416260-89fd1b39e9b8?auto=format&fit=crop&w=1600&q=85',
    hero:
      'https://images.unsplash.com/photo-1589552416260-89fd1b39e9b8?auto=format&fit=crop&w=2400&q=85',
    overview:
      'A quiet ending — or beginning — to almost any East African journey. Stone Town, Mnemba, and the wider Swahili coast at the pace of a long afternoon.',
    highlights: [
      { day: 'Day 1–2', title: 'Stone Town', body: 'A privately guided architecture and history walk, slow Swahili cooking, music nights.' },
      { day: 'Day 3–5', title: 'Mnemba Island', body: 'Private island, twelve bandas, reef and rest. Almost no schedule.' },
      { day: 'Day 6–8', title: 'Lamu', body: 'Dhow sails, beach picnics, museum-level Swahili interiors, and quiet rooftops.' },
    ],
    inclusions: [
      'Private guide and host',
      'Charter flights',
      'Lodge: Mnemba Island & Peponi’s',
      'Dhow charters and private chef',
      'Daily wellness sessions',
    ],
  },
];

export const getExpedition = (slug: string) => expeditions.find((e) => e.slug === slug);
