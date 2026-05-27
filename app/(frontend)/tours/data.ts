/* ────────────────────────────────────────────────────────────
   MOCK SEED DATA — Tour Collections
   Two parent groups: "Special Interest" and "Groups".
   Each parent has many collections (philanthropy, schools, etc).
   Each collection holds a list of bookable tour ideas.
   When the backend lands, all of this is admin-managed.
   ──────────────────────────────────────────────────────────── */

export type TourPace = 'Easy' | 'Moderate' | 'Active' | 'Expedition';

export type CollectionTour = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  pace: TourPace;
  summary: string;
  highlights: string[];
  image: string;
};

export type CollectionGroup = 'Special Interest' | 'Groups';

export type TourCollection = {
  slug: string;
  group: CollectionGroup;
  title: string;
  tagline: string;
  description: string;
  image: string;
  hero: string;
  tours: CollectionTour[];
};

/* Shared image pool — same photos as destinations, varied focal points */
const u = (id: string, fpY = 0.5, fpX = 0.5, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}`;

const IMG = {
  gorillaA: u('photo-1535941339077-2dd1c7963098', 0.35),
  gorillaB: u('photo-1535941339077-2dd1c7963098', 0.5, 0.55),
  gorillaC: u('photo-1591824438708-ce405f36ba3d', 0.4),
  gorillaD: u('photo-1591824438708-ce405f36ba3d', 0.6, 0.6),
  savannaA: u('photo-1547970810-dc1eac37d174', 0.55),
  savannaB: u('photo-1547970810-dc1eac37d174', 0.3, 0.4),
  savannaC: u('photo-1547970810-dc1eac37d174', 0.65, 0.55),
  elephantA: u('photo-1516426122078-c23e76319801', 0.45),
  elephantB: u('photo-1516426122078-c23e76319801', 0.6, 0.7),
  elephantC: u('photo-1516426122078-c23e76319801', 0.5, 0.3),
  culturalA: u('photo-1523805009345-7448845a9e53', 0.4),
  culturalB: u('photo-1523805009345-7448845a9e53', 0.65, 0.6),
  culturalC: u('photo-1523805009345-7448845a9e53', 0.3, 0.55),
  culturalD: u('photo-1523805009345-7448845a9e53', 0.55, 0.35),
  coastA: u('photo-1589552416260-89fd1b39e9b8', 0.35),
  coastB: u('photo-1589552416260-89fd1b39e9b8', 0.7, 0.4),
  coastC: u('photo-1589552416260-89fd1b39e9b8', 0.5, 0.65),
  coastD: u('photo-1589552416260-89fd1b39e9b8', 0.25),
  guideA: u('photo-1504432842672-1a79f78e4084', 0.3),
  guideB: u('photo-1504432842672-1a79f78e4084', 0.55, 0.55),
};

export const tourCollections: TourCollection[] = [
  /* ════════════════════ SPECIAL INTEREST ════════════════════ */
  {
    slug: 'philanthropy',
    group: 'Special Interest',
    title: 'Philanthropy',
    tagline: 'Travel that gives back, designed with the people on the ground.',
    description:
      'Privately hosted visits to the conservation projects, schools, and community trusts we have partnered with for over a decade. Every itinerary is co-designed with our partners — no parachute donations, no extractive visits.',
    image: IMG.culturalB,
    hero: IMG.culturalB.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'conservation-field-days',
        title: 'Conservation Field Days',
        destination: 'Volcanoes NP, Rwanda',
        duration: '4 days',
        pace: 'Moderate',
        summary:
          'Three days alongside the field rangers, trackers, and veterinarians of Volcanoes National Park.',
        highlights: [
          'Anti-poaching patrol with rangers',
          'Veterinary clinic visit',
          'Community buffer-zone tour',
          'Hosted dinner with park leadership',
        ],
        image: IMG.gorillaA,
      },
      {
        slug: 'girls-education-visit',
        title: 'Girls’ Education Visit',
        destination: 'Kigali, Rwanda',
        duration: '2 days',
        pace: 'Easy',
        summary:
          'A privately hosted visit to Akilah Institute and partner schools educating Rwanda’s next generation of women leaders.',
        highlights: [
          'Akilah Institute campus tour',
          'Student-led mentorship session',
          'Hosted lunch with alumnae',
          'Optional sponsorship match',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'clean-water-project',
        title: 'Clean Water Project Tour',
        destination: 'Lake Kivu, Rwanda',
        duration: '3 days',
        pace: 'Easy',
        summary:
          'Visit the lakeside communities where our clean-water partnerships have funded over forty boreholes.',
        highlights: [
          'Borehole site visit',
          'Village host family lunch',
          'Lake Kivu boat transfer',
          'Coffee co-op tasting',
        ],
        image: IMG.coastB,
      },
      {
        slug: 'anti-poaching-patrol',
        title: 'Anti-Poaching Patrol Day',
        destination: 'Akagera NP, Rwanda',
        duration: '2 days',
        pace: 'Active',
        summary:
          'A full day in the field with Akagera’s canine and ranger units — the team that helped bring back the rhinos.',
        highlights: [
          'Canine unit demonstration',
          'Ranger patrol ride-along',
          'Rhino monitoring brief',
          'Bush dinner at Magashi',
        ],
        image: IMG.savannaB,
      },
      {
        slug: 'mara-conservancy-trust',
        title: 'Maasai Mara Conservancy Trust',
        destination: 'Maasai Mara, Kenya',
        duration: '3 days',
        pace: 'Moderate',
        summary:
          'A look behind the curtain at how Mara conservancies fund community land leases and education.',
        highlights: [
          'Land-lease site visit',
          'Conservancy chief briefing',
          'Maasai primary school tour',
          'Conservancy dinner',
        ],
        image: IMG.guideB,
      },
    ],
  },
  {
    slug: 'arts-design',
    group: 'Special Interest',
    title: 'Arts & Design',
    tagline: 'Studios, ateliers, and the new African design scene — privately hosted.',
    description:
      'A growing route through the curators, architects, and artists rewriting East Africa’s creative story. Designed with insiders, never the gift-shop circuit.',
    image: IMG.culturalA,
    hero: IMG.culturalA.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'inema-arts-atelier',
        title: 'Inema Arts Centre Atelier',
        destination: 'Kigali, Rwanda',
        duration: '2 days',
        pace: 'Easy',
        summary:
          'A two-day immersion at the studio that started Rwanda’s contemporary art scene.',
        highlights: [
          'Studio visit with the Niyo brothers',
          'Private painting session',
          'Hosted dinner with artists in residence',
          'Optional commission',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'kigali-architecture-walk',
        title: 'Kigali Architecture Walk',
        destination: 'Kigali, Rwanda',
        duration: '1 day',
        pace: 'Easy',
        summary:
          'A privately guided architecture walk through the new Kigali — campus to convention.',
        highlights: [
          'Norrsken House',
          'Kigali Convention Centre',
          'CBD design district',
          'Hosted coffee with the architects',
        ],
        image: IMG.culturalC,
      },
      {
        slug: 'stone-town-craft',
        title: 'Stone Town Craft & Textiles',
        destination: 'Zanzibar',
        duration: '3 days',
        pace: 'Easy',
        summary:
          'Doors, fabrics, silver — and the makers still working with centuries-old patterns.',
        highlights: [
          'Carved-door studio tour',
          'Kanga textile workshop',
          'Silver-jewellery commission',
          'Curator-led Stone Town walk',
        ],
        image: IMG.coastA,
      },
      {
        slug: 'nairobi-galleries',
        title: 'Nairobi Galleries & Studios',
        destination: 'Nairobi, Kenya',
        duration: '2 days',
        pace: 'Easy',
        summary:
          'Circle Art Gallery, One-Off, GoDown — the city’s pillars of contemporary African art.',
        highlights: [
          'Circle Art Gallery preview',
          'GoDown Arts Centre studios',
          'One-Off Gallery dinner',
          'Karen designer ateliers',
        ],
        image: IMG.culturalD,
      },
      {
        slug: 'african-design-symposium',
        title: 'African Design Symposium',
        destination: 'Kigali, Rwanda',
        duration: '4 days',
        pace: 'Easy',
        summary:
          'Time your visit to the annual symposium — and we will host you privately around it.',
        highlights: [
          'Symposium speaker pass',
          'Curator-led after-hours',
          'Private collector visits',
          'Hosted closing dinner',
        ],
        image: IMG.culturalB,
      },
    ],
  },
  {
    slug: 'honeymoon',
    group: 'Special Interest',
    title: 'Honeymoon',
    tagline: 'Slow, private, and designed only for the two of you.',
    description:
      'The journeys we love most to design — quiet lodges, private dinners on the floodplain, and unhurried days between forest and ocean. Each route is built for two.',
    image: IMG.coastC,
    hero: IMG.coastC.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'bisate-mnemba-honeymoon',
        title: 'Bisate & Mnemba Honeymoon',
        destination: 'Rwanda + Zanzibar',
        duration: '10 days',
        pace: 'Moderate',
        summary:
          'Forest and ocean. One gorilla trek, one private island, and a private chef from start to finish.',
        highlights: [
          'Bisate Lodge — 3 nights',
          'Gorilla trekking permits',
          'Mnemba Island — 5 nights',
          'Private chef end-to-end',
        ],
        image: IMG.gorillaB,
      },
      {
        slug: 'lakeside-romance',
        title: 'Lakeside Romance',
        destination: 'Lake Kivu, Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'Boat house, lake suppers, no schedule — a quiet lakeside chapter at the end of a longer journey.',
        highlights: [
          'Private boat charter',
          'Lakeside villa with butler',
          'Coffee village morning',
          'Hosted sunset dinner',
        ],
        image: IMG.coastB,
      },
      {
        slug: 'mara-and-lamu',
        title: 'Mara & Lamu Honeymoon',
        destination: 'Kenya',
        duration: '9 days',
        pace: 'Moderate',
        summary:
          'Big cats and big silence — a Mara conservancy paired with a dhow charter on the Swahili coast.',
        highlights: [
          'Mara conservancy — 4 nights',
          'Hot-air balloon at sunrise',
          'Lamu dhow charter',
          'Beach picnic days',
        ],
        image: IMG.savannaA,
      },
      {
        slug: 'volcanoes-and-indian-ocean',
        title: 'Volcanoes & Indian Ocean',
        destination: 'Rwanda + Zanzibar',
        duration: '8 days',
        pace: 'Moderate',
        summary:
          'A gorilla trek, a slow city stop in Kigali, and seven nights of pure ocean rest.',
        highlights: [
          'One gorilla trek',
          'Kigali curated dinner',
          'Mnemba Island stay',
          'Spice plantation lunch',
        ],
        image: IMG.gorillaC,
      },
      {
        slug: 'private-island-retreat',
        title: 'Private Island Retreat',
        destination: 'Mnemba, Zanzibar',
        duration: '6 days',
        pace: 'Easy',
        summary:
          'Twelve thatched bandas, one private reef, and almost no schedule. The quietest honeymoon we design.',
        highlights: [
          'Private island stay',
          'Reef snorkelling',
          'Private chef',
          'Sea kayaks',
        ],
        image: IMG.coastC,
      },
      {
        slug: 'treetop-honeymoon',
        title: 'Treetop Honeymoon',
        destination: 'Bwindi, Uganda',
        duration: '6 days',
        pace: 'Active',
        summary:
          'Bwindi’s deepest forest lodges, two gorilla treks, and a hammock day in between.',
        highlights: [
          'Clouds Mountain Gorilla Lodge',
          'Two Bwindi gorilla treks',
          'Forest hammock day',
          'Bush bath under the stars',
        ],
        image: IMG.gorillaD,
      },
    ],
  },
  {
    slug: 'history',
    group: 'Special Interest',
    title: 'History',
    tagline: 'Memory, memorial, kingdom, coast — Africa told from inside.',
    description:
      'Slow, hosted routes through the moments that made the continent — pre-colonial kingdoms, coastal slave-trade memorials, twentieth-century memory, and the people who keep the stories.',
    image: IMG.culturalD,
    hero: IMG.culturalD.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'kigali-memory-walk',
        title: 'Kigali Memory Walk',
        destination: 'Kigali, Rwanda',
        duration: '2 days',
        pace: 'Easy',
        summary:
          'A privately hosted memory route through the city — memorial, archives, survivor-led dinner.',
        highlights: [
          'Kigali Genocide Memorial',
          'Camp Kigali memorial',
          'Survivor-led dinner',
          'Hosted archive visit',
        ],
        image: IMG.culturalC,
      },
      {
        slug: 'stone-town-heritage',
        title: 'Stone Town Heritage',
        destination: 'Zanzibar',
        duration: '3 days',
        pace: 'Easy',
        summary:
          'The full Stone Town story — Omani palaces, slave-trade memorial, spice trade, and the layered Swahili coast.',
        highlights: [
          'Slave-trade memorial visit',
          'House of Wonders',
          'Spice plantation tour',
          'Curator-led architecture walk',
        ],
        image: IMG.coastA,
      },
      {
        slug: 'slave-trade-memorial-route',
        title: 'Slave Trade Memorial Route',
        destination: 'Zanzibar + Coastal Kenya',
        duration: '6 days',
        pace: 'Moderate',
        summary:
          'A historian-led route between Zanzibar and Mombasa — the eastern memorial of a journey too often only told on the western coast.',
        highlights: [
          'Stone Town memorial',
          'Bagamoyo old town',
          'Fort Jesus Mombasa',
          'Lamu Swahili houses',
        ],
        image: IMG.coastD,
      },
      {
        slug: 'colonial-architecture-tour',
        title: 'Colonial Architecture Tour',
        destination: 'Nairobi, Kenya',
        duration: '2 days',
        pace: 'Easy',
        summary:
          'A privately guided route through Nairobi’s railway-era and post-independence buildings.',
        highlights: [
          'Nairobi Railway Museum',
          'Macmillan Library',
          'Karen Blixen Museum',
          'Hosted dinner with a historian',
        ],
        image: IMG.culturalD,
      },
      {
        slug: 'pre-colonial-kingdoms',
        title: 'Pre-Colonial Kingdoms',
        destination: 'Buganda, Uganda',
        duration: '4 days',
        pace: 'Easy',
        summary:
          'The Kasubi Tombs, royal drums, and the still-active courts of the Buganda kingdom.',
        highlights: [
          'Kasubi Tombs (UNESCO)',
          'Royal drum demonstration',
          'Buganda court visit',
          'Hosted dinner with a historian',
        ],
        image: IMG.culturalB,
      },
    ],
  },
  {
    slug: 'active',
    group: 'Special Interest',
    title: 'Active',
    tagline: 'Summit days, multi-day trails, and long rides through the great lakes.',
    description:
      'For travellers who want the legs to ache by golden hour. Summits, trail-walking routes, and the cleanest, longest single-track cycling in East Africa.',
    image: IMG.gorillaC,
    hero: IMG.gorillaC.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'mount-karisimbi-summit',
        title: 'Mount Karisimbi Summit',
        destination: 'Volcanoes NP, Rwanda',
        duration: '2 days',
        pace: 'Expedition',
        summary:
          'A two-day summit of the highest peak in the Virunga range, with overnight camp at 3,700m.',
        highlights: [
          'High-altitude camp',
          '4,507m summit',
          'Private porter team',
          'Bisate Lodge recovery night',
        ],
        image: IMG.gorillaA,
      },
      {
        slug: 'congo-nile-trail',
        title: 'Congo Nile Trail Hike',
        destination: 'Lake Kivu, Rwanda',
        duration: '6 days',
        pace: 'Active',
        summary:
          'Five days walking the lakeside trail from Gisenyi to Kibuye — coffee villages, fishing boats, golden evenings.',
        highlights: [
          'Five trail days',
          'Hosted village dinners',
          'Boat support stage',
          'Coffee-farm overnight',
        ],
        image: IMG.coastA,
      },
      {
        slug: 'kilimanjaro-climb',
        title: 'Kilimanjaro Climb',
        destination: 'Tanzania',
        duration: '8 days',
        pace: 'Expedition',
        summary:
          'Lemosho route — the most beautiful, highest-success summit ascent. Privately guided.',
        highlights: [
          'Lemosho 7-day route',
          'Uhuru peak (5,895m)',
          'Private porter team',
          'Post-climb recovery lodge',
        ],
        image: IMG.savannaB,
      },
      {
        slug: 'mount-kenya-trek',
        title: 'Mount Kenya Trek',
        destination: 'Kenya',
        duration: '5 days',
        pace: 'Active',
        summary:
          'A four-day Point Lenana traverse — Africa’s second-highest summit, far quieter than Kili.',
        highlights: [
          'Point Lenana summit',
          'Sirimon-Chogoria traverse',
          'High-altitude tarns',
          'Recovery at Hemingways',
        ],
        image: IMG.guideA,
      },
      {
        slug: 'rwenzori-expedition',
        title: 'Rwenzori Expedition',
        destination: 'Uganda',
        duration: '9 days',
        pace: 'Expedition',
        summary:
          'The Mountains of the Moon — eight days through glaciers, bogs, and the most remote massif in Africa.',
        highlights: [
          'Margherita Peak attempt',
          'Glacier crossing',
          'High-altitude camps',
          'Helicopter exit option',
        ],
        image: IMG.gorillaD,
      },
      {
        slug: 'lake-kivu-cycle',
        title: 'Lake Kivu Cycle',
        destination: 'Rwanda',
        duration: '5 days',
        pace: 'Active',
        summary:
          'Four days of single-track cycling on the new Lake Kivu route — support van, mechanic, and lakeside lodges every night.',
        highlights: [
          '227km route',
          'E-bike or road option',
          'Mechanic support',
          'Lakeside lodges nightly',
        ],
        image: IMG.coastB,
      },
    ],
  },
  {
    slug: 'volunteering',
    group: 'Special Interest',
    title: 'Volunteering',
    tagline: 'Short, well-designed service journeys — never extractive, never staged.',
    description:
      'We only operate volunteer tours with partners we have worked with for years, where the work is genuinely useful and the visit is welcome. No orphanage tourism, no parachute building projects.',
    image: IMG.culturalB,
    hero: IMG.culturalB.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'teach-in-rural-schools',
        title: 'Teach in Rural Schools',
        destination: 'Rwanda',
        duration: '7 days',
        pace: 'Moderate',
        summary:
          'A week of teaching support with a school we have partnered with since 2016. Pre-trip lesson planning included.',
        highlights: [
          'Five teaching days',
          'Lesson planning with the head teacher',
          'Hosted village lunches',
          'Weekend gorilla trek option',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'wildlife-rehabilitation',
        title: 'Wildlife Rehabilitation',
        destination: 'Akagera NP, Rwanda',
        duration: '5 days',
        pace: 'Active',
        summary:
          'Four days alongside the rehabilitation team — orphan elephants, injured antelope, and rhino monitoring.',
        highlights: [
          'Veterinary assistance',
          'Orphan feeding rounds',
          'Ranger patrol day',
          'Magashi Camp stay',
        ],
        image: IMG.elephantC,
      },
      {
        slug: 'community-health-outreach',
        title: 'Community Health Outreach',
        destination: 'Lake Kivu, Rwanda',
        duration: '6 days',
        pace: 'Moderate',
        summary:
          'Mobile clinic days with a Rwandan-led health partner — best for medical professionals.',
        highlights: [
          'Mobile clinic days',
          'Maternal health rounds',
          'Lakeside guesthouse',
          'Village hosted dinners',
        ],
        image: IMG.coastB,
      },
      {
        slug: 'reforestation-days',
        title: 'Reforestation Days',
        destination: 'Volcanoes buffer zone, Rwanda',
        duration: '4 days',
        pace: 'Active',
        summary:
          'Three days planting indigenous trees in the Volcanoes buffer zone with our long-time forestry partner.',
        highlights: [
          'Planting days',
          'Nursery management',
          'Bisate dinner',
          'Forest walk',
        ],
        image: IMG.gorillaC,
      },
      {
        slug: 'youth-mentorship',
        title: 'Youth Mentorship Programme',
        destination: 'Kigali, Rwanda',
        duration: '6 days',
        pace: 'Easy',
        summary:
          'Five days of structured mentorship sessions with university students — for professionals who can offer career time.',
        highlights: [
          'Daily mentorship sessions',
          'Career-talk programme',
          'Hosted student dinners',
          'Weekend culture day',
        ],
        image: IMG.culturalD,
      },
    ],
  },
  {
    slug: 'lgbtq',
    group: 'Special Interest',
    title: 'LGBTQ+',
    tagline: 'Discreet, welcoming, privately hosted — built around hand-picked partners.',
    description:
      'East Africa is not uniformly welcoming, but our chosen lodges and host teams are. We design private, discreet itineraries with partners we trust deeply — primarily in Rwanda and on the Swahili coast, where our network is strongest.',
    image: IMG.coastC,
    hero: IMG.coastC.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'discreet-honeymoon-journey',
        title: 'Discreet Honeymoon Journey',
        destination: 'Rwanda + Zanzibar',
        duration: '10 days',
        pace: 'Moderate',
        summary:
          'A privately hosted journey between Volcanoes and Mnemba — hand-picked welcoming partners, end-to-end.',
        highlights: [
          'Private lodge with welcoming host',
          'Gorilla trek',
          'Private island stay',
          'Private chef end-to-end',
        ],
        image: IMG.gorillaB,
      },
      {
        slug: 'private-safari-for-two',
        title: 'Private Safari for Two',
        destination: 'Maasai Mara, Kenya',
        duration: '6 days',
        pace: 'Moderate',
        summary:
          'A privately leased Mara conservancy stay — just the two of you, the guide, and the wildlife.',
        highlights: [
          'Private conservancy lodge',
          'Dedicated guide',
          'Private dinners on the plain',
          'Optional balloon at dawn',
        ],
        image: IMG.savannaA,
      },
      {
        slug: 'cultural-cities-tour',
        title: 'Cultural Cities Tour',
        destination: 'Kigali + Stone Town',
        duration: '7 days',
        pace: 'Easy',
        summary:
          'Two of East Africa’s most welcoming cities — galleries, design studios, and discreet hosting throughout.',
        highlights: [
          'Inema Arts Centre',
          'Private Kigali dinners',
          'Stone Town curator walk',
          'Boutique hotel partners',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'coastal-privacy-retreat',
        title: 'Coastal Privacy Retreat',
        destination: 'Mnemba Island',
        duration: '6 days',
        pace: 'Easy',
        summary:
          'A private island chapter — fully booked, end-to-end privacy, no public lodge interaction unless wanted.',
        highlights: [
          'Twelve-banda private island',
          'Private chef',
          'Sea kayaks',
          'Reef snorkelling',
        ],
        image: IMG.coastC,
      },
      {
        slug: 'adventure-for-two',
        title: 'Adventure for Two',
        destination: 'Volcanoes + Lake Kivu',
        duration: '7 days',
        pace: 'Active',
        summary:
          'A gentle adventure route — gorilla trek, lakeside cycling, and slow lodge evenings.',
        highlights: [
          'Gorilla trek',
          'Lake Kivu cycle day',
          'Lakeside lodge',
          'Hosted dinners throughout',
        ],
        image: IMG.coastB,
      },
    ],
  },

  /* ════════════════════ GROUPS ════════════════════ */
  {
    slug: 'church-mission',
    group: 'Groups',
    title: 'Church & Mission',
    tagline: 'Vision tours, mission visits, and pastor retreats — privately hosted.',
    description:
      'We host visiting churches, mission boards, and pastor teams across our long-standing East African church partnerships. Every itinerary is co-built with the host churches on the ground.',
    image: IMG.culturalC,
    hero: IMG.culturalC.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'mission-vision-tour',
        title: 'Mission Vision Tour',
        destination: 'Rwanda',
        duration: '10 days',
        pace: 'Moderate',
        summary:
          'A privately hosted vision tour across our church partnerships in Kigali, Lake Kivu, and the Volcanoes region.',
        highlights: [
          'Three partner church visits',
          'Hosted pastor lunches',
          'Optional gorilla trek',
          'Group debrief days',
        ],
        image: IMG.culturalB,
      },
      {
        slug: 'pastor-retreats',
        title: 'Pastor Retreats in Volcanoes',
        destination: 'Volcanoes NP, Rwanda',
        duration: '6 days',
        pace: 'Easy',
        summary:
          'A quiet, restful pastor retreat — forest lodge, devotional days, and one gorilla trek as gift.',
        highlights: [
          'Forest lodge with devotional rooms',
          'Hosted devotional days',
          'One gorilla trek',
          'Group rest day',
        ],
        image: IMG.gorillaC,
      },
      {
        slug: 'bible-school-outreach',
        title: 'Bible School Outreach',
        destination: 'Lake Kivu, Rwanda',
        duration: '8 days',
        pace: 'Moderate',
        summary:
          'A teaching trip for Bible school faculty — three teaching days, four partner-church visits.',
        highlights: [
          'Three teaching days',
          'Four church visits',
          'Pastoral mentoring',
          'Lakeside guesthouse',
        ],
        image: IMG.coastB,
      },
      {
        slug: 'church-planting-tour',
        title: 'Church Planting Tour',
        destination: 'Uganda',
        duration: '9 days',
        pace: 'Moderate',
        summary:
          'A working tour for church-planting leaders — five plant sites, hosted by the lead planters.',
        highlights: [
          'Five plant site visits',
          'Planter-led briefings',
          'Group strategy days',
          'Optional gorilla trek',
        ],
        image: IMG.gorillaA,
      },
      {
        slug: 'worship-conference-journey',
        title: 'Worship Conference Journey',
        destination: 'Kigali, Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'Time your group visit around our partner church’s annual worship conference — and we will host privately around it.',
        highlights: [
          'Conference pass',
          'Worship leader meet-ups',
          'Hosted dinners',
          'City culture day',
        ],
        image: IMG.culturalC,
      },
    ],
  },
  {
    slug: 'schools',
    group: 'Groups',
    title: 'Schools',
    tagline: 'Curriculum-linked study tours — designed with the teaching team.',
    description:
      'Field-trip-grade school journeys built with the teaching team — geography, biology, history, and service learning. Safety lead, two-leader minimum, and full risk paperwork included as standard.',
    image: IMG.culturalD,
    hero: IMG.culturalD.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'geography-wildlife-expedition',
        title: 'Geography & Wildlife Expedition',
        destination: 'Akagera NP, Rwanda',
        duration: '7 days',
        pace: 'Active',
        summary:
          'A curriculum-linked field journey through Rwanda — savanna, volcano, lake — with student field notebooks.',
        highlights: [
          'Akagera game drives',
          'Volcanic geology day',
          'Field-notebook programme',
          'Two-leader minimum',
        ],
        image: IMG.elephantA,
      },
      {
        slug: 'african-history-study-tour',
        title: 'African History Study Tour',
        destination: 'Rwanda + Zanzibar',
        duration: '10 days',
        pace: 'Moderate',
        summary:
          'A historian-led study route — Kigali memorial, Stone Town slave-trade memorial, and pre-colonial coastal history.',
        highlights: [
          'Kigali memorial visit',
          'Stone Town memorial',
          'Historian-led sessions',
          'Student journal programme',
        ],
        image: IMG.culturalD,
      },
      {
        slug: 'conservation-biology-camp',
        title: 'Conservation Biology Camp',
        destination: 'Volcanoes NP, Rwanda',
        duration: '8 days',
        pace: 'Active',
        summary:
          'A working biology field camp — gorilla habituation observation, vegetation transects, and conservation officer talks.',
        highlights: [
          'Habituation observation day',
          'Vegetation transects',
          'Ranger field talks',
          'Group lodge accommodation',
        ],
        image: IMG.gorillaA,
      },
      {
        slug: 'cultural-exchange-programme',
        title: 'Cultural Exchange Programme',
        destination: 'Rwanda',
        duration: '9 days',
        pace: 'Moderate',
        summary:
          'A two-way exchange with a Rwandan partner school — host-school days, joint projects, and shared field trips.',
        highlights: [
          'Partner school days',
          'Joint art project',
          'Joint field trip',
          'Group homestay nights',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'service-learning-tour',
        title: 'Service Learning Tour',
        destination: 'Lake Kivu, Rwanda',
        duration: '10 days',
        pace: 'Active',
        summary:
          'A structured service-learning programme — five working days at a partner project, with reflection sessions built in.',
        highlights: [
          'Five service days',
          'Reflection sessions',
          'Partner site visits',
          'Weekend culture day',
        ],
        image: IMG.coastB,
      },
    ],
  },
  {
    slug: 'leadership',
    group: 'Groups',
    title: 'Leadership',
    tagline: 'Wilderness-set leadership retreats and executive off-sites.',
    description:
      'Retreats designed with leadership coaches — long quiet days in the wilderness, facilitated reflection sessions, and lodges built for groups of 8 to 16.',
    image: IMG.gorillaB,
    hero: IMG.gorillaB.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'executive-retreat-bisate',
        title: 'Executive Retreat at Bisate',
        destination: 'Volcanoes NP, Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'Bisate Lodge taken privately — facilitated leadership days set between forest walks and one gorilla trek.',
        highlights: [
          'Private lodge buyout',
          'Facilitated sessions',
          'One gorilla trek',
          'Private chef',
        ],
        image: IMG.gorillaB,
      },
      {
        slug: 'wilderness-leadership-course',
        title: 'Wilderness Leadership Course',
        destination: 'Akagera NP, Rwanda',
        duration: '7 days',
        pace: 'Active',
        summary:
          'A walking-led course — bush walks, fireside reflection, and ranger-led challenges. Designed with leadership coaches.',
        highlights: [
          'Daily bush walks',
          'Coach-led sessions',
          'Ranger field challenges',
          'Bush dinner under the stars',
        ],
        image: IMG.savannaA,
      },
      {
        slug: 'servant-leadership-journey',
        title: 'Servant Leadership Journey',
        destination: 'Lake Kivu, Rwanda',
        duration: '6 days',
        pace: 'Moderate',
        summary:
          'A retreat built around servant-leadership principles — partner project visits and facilitated daily debriefs.',
        highlights: [
          'Daily project visits',
          'Facilitated debriefs',
          'Lakeside lodge',
          'Group reading slot',
        ],
        image: IMG.coastB,
      },
      {
        slug: 'visionary-conservation-trip',
        title: 'Visionary Conservation Trip',
        destination: 'Volcanoes NP, Rwanda',
        duration: '5 days',
        pace: 'Moderate',
        summary:
          'For boards and leadership teams in conservation, ESG, or sustainability — designed with park leadership.',
        highlights: [
          'Park leadership briefings',
          'Field ranger day',
          'Conservation researcher access',
          'Hosted dinners',
        ],
        image: IMG.gorillaC,
      },
      {
        slug: 'team-builder-expedition',
        title: 'Team Builder Expedition',
        destination: 'Nyungwe NP, Rwanda',
        duration: '6 days',
        pace: 'Active',
        summary:
          'Canopy walks, chimp tracking, and facilitated team-building sessions in one of Africa’s oldest rainforests.',
        highlights: [
          'Canopy walk team challenge',
          'Chimp tracking',
          'Facilitated team sessions',
          'Forest lodge group stay',
        ],
        image: IMG.guideB,
      },
    ],
  },
  {
    slug: 'immersion',
    group: 'Groups',
    title: 'Immersion Programs',
    tagline: 'Slow, long-form immersion in language, food, faith, and community.',
    description:
      'Programmes designed for groups who want to stay long enough to belong — coffee-farm seasons, village homestays, language and food immersion, and faith-led service.',
    image: IMG.culturalA,
    hero: IMG.culturalA.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'ten-day-cultural-immersion',
        title: '10-Day Cultural Immersion',
        destination: 'Rwanda',
        duration: '10 days',
        pace: 'Moderate',
        summary:
          'A slow ten days through Rwanda — Kigali, lakeside, and a village homestay segment to bind the journey.',
        highlights: [
          'Kigali host family',
          'Lake Kivu lodge',
          'Village homestay',
          'Coffee co-op visit',
        ],
        image: IMG.culturalC,
      },
      {
        slug: 'coffee-farm-stay',
        title: 'Coffee Farm Stay',
        destination: 'Lake Kivu, Rwanda',
        duration: '7 days',
        pace: 'Moderate',
        summary:
          'A week embedded with a Lake Kivu coffee co-op — picking, washing, cupping, and a hosted village home.',
        highlights: [
          'Co-op coffee picking',
          'Washing station days',
          'Cupping sessions',
          'Hosted village home',
        ],
        image: IMG.coastA,
      },
      {
        slug: 'village-homestay',
        title: 'Village Homestay Programme',
        destination: 'Bugesera, Rwanda',
        duration: '8 days',
        pace: 'Moderate',
        summary:
          'A structured homestay programme — paired host families, daily community life, and language tuition.',
        highlights: [
          'Paired host families',
          'Daily community life',
          'Kinyarwanda tuition',
          'Hosted closing dinner',
        ],
        image: IMG.culturalB,
      },
      {
        slug: 'language-food-immersion',
        title: 'Language & Food Immersion',
        destination: 'Kigali, Rwanda',
        duration: '7 days',
        pace: 'Easy',
        summary:
          'Daily Kinyarwanda tuition, daily Rwandan cooking sessions, and city culture afternoons.',
        highlights: [
          'Daily Kinyarwanda class',
          'Daily cooking class',
          'Market mornings',
          'Hosted dinners',
        ],
        image: IMG.culturalA,
      },
      {
        slug: 'faith-and-service-immersion',
        title: 'Faith & Service Immersion',
        destination: 'Volcanoes buffer zone, Rwanda',
        duration: '12 days',
        pace: 'Active',
        summary:
          'A long-form faith-led immersion — partner-church service days, reflection rhythms, and one gorilla trek as gift.',
        highlights: [
          'Six service days',
          'Daily reflection rhythms',
          'One gorilla trek',
          'Group debriefs',
        ],
        image: IMG.gorillaA,
      },
    ],
  },
  {
    slug: 'corporate',
    group: 'Groups',
    title: 'Corporate',
    tagline: 'Off-sites, sales rewards, investor trips, and brand retreats.',
    description:
      'Discreet, well-resourced corporate journeys — lodge buyouts, helicopter logistics, on-site AV, and the East African network to make it feel effortless.',
    image: IMG.gorillaA,
    hero: IMG.gorillaA.replace('w=1600', 'w=2400'),
    tours: [
      {
        slug: 'corporate-off-site-kwitonda',
        title: 'Corporate Off-Site at Kwitonda',
        destination: 'Volcanoes NP, Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'Singita Kwitonda taken privately — boardroom set-up, on-site AV, gorilla trekking, and private chef.',
        highlights: [
          'Private lodge buyout',
          'Full AV set-up',
          'Gorilla trekking',
          'Private chef',
        ],
        image: IMG.gorillaB,
      },
      {
        slug: 'investor-familiarisation-trip',
        title: 'Investor Familiarisation Trip',
        destination: 'Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'A working investor tour — government meetings, on-the-ground portfolio visits, and an evening cultural programme.',
        highlights: [
          'Government meetings',
          'Portfolio site visits',
          'Cultural evenings',
          'Hosted dinners',
        ],
        image: IMG.culturalD,
      },
      {
        slug: 'sales-team-reward-safari',
        title: 'Sales Team Reward Safari',
        destination: 'Maasai Mara, Kenya',
        duration: '6 days',
        pace: 'Moderate',
        summary:
          'A reward-grade safari — private conservancy lodge, hot-air balloons, and a celebration dinner on the plain.',
        highlights: [
          'Private conservancy lodge',
          'Hot-air balloons',
          'Celebration dinner on the plain',
          'Branded welcome',
        ],
        image: IMG.savannaA,
      },
      {
        slug: 'brand-storytelling-retreat',
        title: 'Brand Storytelling Retreat',
        destination: 'Nyungwe NP, Rwanda',
        duration: '5 days',
        pace: 'Moderate',
        summary:
          'A creative off-site for marketing and brand teams — forest lodge, photographer-in-residence, and facilitated workshops.',
        highlights: [
          'Photographer-in-residence',
          'Facilitated workshops',
          'Chimp tracking',
          'Forest lodge',
        ],
        image: IMG.guideA,
      },
      {
        slug: 'c-suite-wilderness-retreat',
        title: 'C-Suite Wilderness Retreat',
        destination: 'Akagera NP, Rwanda',
        duration: '5 days',
        pace: 'Easy',
        summary:
          'A C-suite retreat at Magashi — fully buy-out, helicopter logistics, and absolute privacy.',
        highlights: [
          'Magashi lodge buyout',
          'Helicopter logistics',
          'Bush dinner under the stars',
          'Facilitated session day',
        ],
        image: IMG.elephantA,
      },
    ],
  },
];

/* ────────────── Lookups ────────────── */
export const getCollection = (slug: string) =>
  tourCollections.find((c) => c.slug === slug);

export const collectionsByGroup = (group: CollectionGroup) =>
  tourCollections.filter((c) => c.group === group);

export const allCollectionParams = () =>
  tourCollections.map((c) => ({ slug: c.slug }));
