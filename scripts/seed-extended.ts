/* ────────────────────────────────────────────────────────────
   EXTENDED SEED — Adds itineraries + theme links to every tour,
   plus ~24 new tours across all destinations + every theme.
   Idempotent (upsert by slug).  Run: npm run seed:extended
   ──────────────────────────────────────────────────────────── */

import { getPayload } from 'payload';
import config from '../payload.config';

/* ─────────── Image pool (verified Rwanda/safari Unsplash IDs) ─────────── */

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=85`;

const IMG = {
  silverback: U('1509897739002-791fa79aac9b'),
  gorillaPortrait: U('1535941339077-2dd1c7963098'),
  gorillaForest: U('1591824438708-ce405f36ba3d'),
  aerialHills: U('1551357141-f73a8402ceb3'),
  kigaliSkyline: U('1687986261123-b17f08f2796c'),
  kigaliHilltop: U('1689013398932-b576a11e07a1'),
  kigaliStreet: U('1518219051733-d8d4fbbf9797'),
  nyungweRoad: U('1489640818597-89b1edc97db5'),
  akageraGiraffe: U('1665070385454-5e0c4421a38c'),
  childrenWindow: U('1507427100689-2bf8574e32d4'),
  lakeKivuPirogue: U('1589715718565-223fdf9b7cd4'),
  lakeKivuHighway: U('1706977570024-fefa419c48c8'),
  rwandanField: U('1692019007242-36158877ec96'),
  elephants: U('1516426122078-c23e76319801'),
  savanna: U('1547970810-dc1eac37d174'),
  cultural: U('1523805009345-7448845a9e53'),
  coast: U('1505881502353-a1986add3762'),
  guide: U('1504432842672-1a79f78e4084'),
};

/* ─────────── Itinerary generator ─────────── */

type Day = { day: string; title: string; body: string };

const itinerary = (days: Day[]): Day[] => days;

/* Shared, reusable itinerary blocks */
const KIGALI_ARRIVAL: Day = {
  day: 'Day 1',
  title: 'Arrival in Kigali',
  body: 'Met at Kigali International. Private transfer to the city. Slow afternoon at the studio — coffee, route briefing, and a quiet first dinner in Nyamirambo.',
};
const KIGALI_DEPART: Day = {
  day: 'Final day',
  title: 'Departure',
  body: 'Slow breakfast and a private city walk if time. Transfer to Kigali International for your onward flight. We close the loop with a hand-written note and a follow-up call the next week.',
};

/* ─────────── New / supplementary tours ───────────
   Each entry is upserted (by slug) and linked to its theme slugs. */

type SeedTour = {
  slug: string;
  title: string;
  destination: string; // destination slug
  duration: string;
  pace: 'Easy' | 'Moderate' | 'Active' | 'Expedition';
  category: 'Wildlife' | 'Cultural' | 'Adventure' | 'Coast' | 'Trekking';
  group: string;
  summary: string;
  description: string;
  bestTime: string;
  imageUrl: string;
  highlights: string[];
  themes: string[]; // theme slugs
  itinerary: Day[];
};

const newTours: SeedTour[] = [
  /* ───────────── RWANDA (themed) ───────────── */
  {
    slug: 'rwanda-honeymoon-gorillas-kivu',
    title: 'Rwanda Honeymoon · Gorillas & Lake Kivu',
    destination: 'rwanda',
    duration: '8 days',
    pace: 'Moderate',
    category: 'Wildlife',
    group: 'Private · couple',
    summary:
      'A slow, private honeymoon route — one gorilla trek, a lakeside week, and Kigali at golden hour.',
    description:
      'Designed only for two. Bisate Lodge for the gorillas, a private boat house on Lake Kivu, and a private chef from first night to last.',
    bestTime: 'Jun – Sep · Dec – Feb',
    imageUrl: IMG.lakeKivuPirogue,
    highlights: ['One gorilla trek', 'Bisate Lodge', 'Private lakeside boat house', 'Private chef'],
    themes: ['honeymoon'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Kigali to Volcanoes', body: 'Drive north through the terraced hills. Settle into Bisate. Forest walk and sundowners at the volcano-cone lodge.' },
      { day: 'Day 3', title: 'Gorilla trek · Volcanoes', body: 'Privately permitted gorilla trek with a forest tracker. Long afternoon and a private dinner at the lodge.' },
      { day: 'Day 4', title: 'Volcanoes to Lake Kivu', body: 'Scenic transfer over the Congo Nile divide. Arrive at the lake boat house in the late afternoon.' },
      { day: 'Days 5–7', title: 'Lake Kivu', body: 'Private pirogue charters, coffee co-op visits, lakeside swims, slow suppers. No fixed schedule.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-active-summit-week',
    title: 'Rwanda Active · Summit Week',
    destination: 'rwanda',
    duration: '7 days',
    pace: 'Active',
    category: 'Trekking',
    group: 'Private · max 6',
    summary:
      'Two summits, one canopy walk, one gorilla trek — for travellers who measure trips in elevation gain.',
    description:
      'Mount Karisimbi summit (4,507m), Mount Bisoke (3,711m), Nyungwe canopy walk, and a gorilla trek to anchor the week.',
    bestTime: 'Jun – Sep',
    imageUrl: IMG.aerialHills,
    highlights: ['Karisimbi summit', 'Bisoke crater hike', 'Nyungwe canopy walk', 'One gorilla trek'],
    themes: ['active'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Bisoke crater hike', body: 'A 3,711m crater day-hike — ideal acclimatisation. Crater lake at the top. Lodge dinner.' },
      { day: 'Days 3–4', title: 'Karisimbi summit', body: 'Two-day summit attempt with overnight camp at 3,700m. Reach Karisimbi (4,507m) by mid-morning Day 4.' },
      { day: 'Day 5', title: 'Gorilla trek', body: 'A privately permitted gorilla family encounter — the reward day.' },
      { day: 'Day 6', title: 'Nyungwe canopy walk', body: 'Fly south to Nyungwe. Africa\'s only suspended canopy walk and a colobus encounter.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-history-memory-route',
    title: 'Rwanda History · Memory Route',
    destination: 'rwanda',
    duration: '5 days',
    pace: 'Easy',
    category: 'Cultural',
    group: 'Private · max 6',
    summary:
      'A historian-led route through Kigali memorials, Nyanza royal palace, and the long Rwandan story.',
    description:
      'For travellers who want to understand. A historian guide, hosted dinners with writers, and an unhurried route through the most important rooms in the country.',
    bestTime: 'Year-round',
    imageUrl: IMG.kigaliStreet,
    highlights: ['Kigali Genocide Memorial', 'Rukari King\'s Palace · Nyanza', 'Murambi Memorial', 'Historian-led throughout'],
    themes: ['history'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Kigali · memory + design', body: 'Kigali Genocide Memorial in the morning. Inema Arts Centre and Niyo in the afternoon. Hosted dinner with a historian and a writer.' },
      { day: 'Day 3', title: 'Nyanza · Rukari', body: 'Drive south to Nyanza. The King\'s Palace Museum and the royal Inyambo cattle. Lunch at Rwesero Art Museum.' },
      { day: 'Day 4', title: 'Murambi Memorial · Huye', body: 'A confronting and important morning at Murambi. Quiet afternoon at the Ethnographic Museum in Huye.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-arts-design-residency',
    title: 'Rwanda Arts & Design · Studio Residency',
    destination: 'rwanda',
    duration: '5 days',
    pace: 'Easy',
    category: 'Cultural',
    group: 'Private · max 4',
    summary:
      'A short residency between Inema, Niyo, Imigongo studios and Kigali\'s new architecture.',
    description:
      'For collectors and creatives. Studio time with the Niyo brothers, an Imigongo workshop in the east, and a private commission day.',
    bestTime: 'Year-round',
    imageUrl: IMG.cultural,
    highlights: ['Inema Arts Centre', 'Imigongo workshop · Rusumo', 'Architecture walk', 'Private commission'],
    themes: ['arts-design'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Inema + city architecture', body: 'Morning at Inema with the Niyo brothers. Architecture walk through the CBD and Norrsken House in the afternoon.' },
      { day: 'Day 3', title: 'Imigongo · Rusumo', body: 'Drive east. A day at an Imigongo studio learning the geometric cow-dung tradition with master artisans.' },
      { day: 'Day 4', title: 'Private commission day', body: 'Quiet studio day with one selected artist. Optional purchase / shipping arranged. Closing dinner in Nyamirambo.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-philanthropy-field-week',
    title: 'Rwanda Philanthropy · Field Week',
    destination: 'rwanda',
    duration: '6 days',
    pace: 'Moderate',
    category: 'Cultural',
    group: 'Private · max 8',
    summary:
      'Privately hosted visits to the conservation and education partnerships we have worked with since 2018.',
    description:
      'Volcanoes ranger days, an Akagera anti-poaching unit visit, and partner school + clean-water sites at Lake Kivu.',
    bestTime: 'Jun – Sep',
    imageUrl: IMG.guide,
    highlights: ['Volcanoes ranger day', 'Akagera canine unit', 'Partner school visit', 'Clean-water site visit'],
    themes: ['philanthropy'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Volcanoes · ranger field day', body: 'A full day in the buffer zone with anti-poaching rangers and a Karisoke researcher.' },
      { day: 'Day 3', title: 'Drive to Lake Kivu · schools', body: 'Lakeside partner school visit. Hosted village lunch with the head teacher.' },
      { day: 'Day 4', title: 'Clean water sites', body: 'Borehole sites we have funded over the years. Coffee co-op visit and a debrief over lake sundowners.' },
      { day: 'Day 5', title: 'Akagera · canine unit', body: 'Fly east to Akagera. Canine and ranger unit briefing. Bush dinner at Magashi.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-volunteering-teaching',
    title: 'Rwanda Volunteering · Teaching Week',
    destination: 'rwanda',
    duration: '8 days',
    pace: 'Moderate',
    category: 'Cultural',
    group: 'Private · max 6',
    summary:
      'A week teaching alongside the staff at a partner school we have worked with since 2018.',
    description:
      'For travelling teachers + professionals. Five teaching days, lesson planning with the head teacher, and a weekend gorilla trek as gift.',
    bestTime: 'Term time (Jan – Jun · Sep – Nov)',
    imageUrl: IMG.childrenWindow,
    highlights: ['Five teaching days', 'Lesson planning support', 'Village lunches', 'Weekend gorilla trek'],
    themes: ['volunteering'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Drive to Lake Kivu · school orientation', body: 'Lakeside lodge check-in. Orientation with the head teacher. Lesson planning over dinner.' },
      { day: 'Days 3–6', title: 'Teaching days', body: 'Co-teaching alongside the staff. Village hosted lunches. Quiet afternoons by the lake.' },
      { day: 'Day 7', title: 'Volcanoes · gorilla trek', body: 'Drive north. A privately permitted gorilla trek as a closing gift.' },
      KIGALI_DEPART,
    ]),
  },
  {
    slug: 'rwanda-lgbtq-discreet-honeymoon',
    title: 'Rwanda Discreet Honeymoon',
    destination: 'rwanda',
    duration: '9 days',
    pace: 'Moderate',
    category: 'Wildlife',
    group: 'Private · couple',
    summary:
      'A privately hosted route with welcoming lodge partners we have worked with for years.',
    description:
      'Designed for LGBTQ+ couples — discreet, fully privately hosted, all welcoming partners. Volcanoes + Lake Kivu + Mnemba.',
    bestTime: 'Jun – Sep · Dec – Feb',
    imageUrl: IMG.lakeKivuPirogue,
    highlights: ['Hand-picked welcoming partners', 'Gorilla trek', 'Private lakeside boat house', 'Private chef'],
    themes: ['lgbtq', 'honeymoon'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Volcanoes', body: 'Drive to Bisate. Settle into the welcoming forest lodge.' },
      { day: 'Day 3', title: 'Gorilla trek', body: 'Privately permitted gorilla family encounter.' },
      { day: 'Days 4–6', title: 'Lake Kivu', body: 'Three nights at the private boat house. Pirogue, slow lunches, no schedule.' },
      { day: 'Days 7–8', title: 'Kigali · design + dinners', body: 'Two unhurried days in the capital with hosted dinners.' },
      KIGALI_DEPART,
    ]),
  },

  /* ───────────── KENYA (themed) ───────────── */
  {
    slug: 'kenya-corporate-mara-reward',
    title: 'Maasai Mara · Sales Reward',
    destination: 'kenya',
    duration: '6 days',
    pace: 'Moderate',
    category: 'Wildlife',
    group: 'Group · 10–20',
    summary:
      'A reward-grade safari for a winning sales or executive team — private conservancy, hot-air balloons, celebration dinner.',
    description:
      'Built for company off-sites. Buyout of a private conservancy lodge, branded welcome, sunrise balloon, and a celebration dinner on the plain.',
    bestTime: 'Jul – Oct · Jan – Mar',
    imageUrl: IMG.savanna,
    highlights: ['Private conservancy lodge', 'Hot-air balloon', 'Celebration dinner on the plain', 'Branded welcome'],
    themes: ['corporate'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival in Nairobi', body: 'Met on arrival. Transfer to Hemingways for the team welcome dinner.' },
      { day: 'Day 2', title: 'Fly to the Mara', body: 'Light aircraft to the conservancy. Lodge buyout, first sundowner.' },
      { day: 'Day 3', title: 'Game drives + branded reception', body: 'Morning + afternoon drives. Branded reception in the evening.' },
      { day: 'Day 4', title: 'Hot-air balloon at dawn', body: 'Sunrise balloon over the plains. Champagne breakfast. Afternoon at the spa or game drive.' },
      { day: 'Day 5', title: 'Celebration dinner', body: 'A full-day game drive and a celebration dinner set on the open plain.' },
      { day: 'Day 6', title: 'Departure', body: 'Slow breakfast, flight back to Nairobi, onward connections.' },
    ]),
  },
  {
    slug: 'kenya-leadership-laikipia',
    title: 'Laikipia · Leadership Retreat',
    destination: 'kenya',
    duration: '5 days',
    pace: 'Moderate',
    category: 'Wildlife',
    group: 'Group · 8–16',
    summary:
      'A working leadership retreat at a rewilded Laikipia estate — facilitated days, walking safaris, rhinos.',
    description:
      'Built with leadership coaches. Lodge buyout, dedicated meeting space, walking + horseback safaris, and a fireside debrief every evening.',
    bestTime: 'Jul – Mar',
    imageUrl: IMG.elephants,
    highlights: ['Lodge buyout', 'Walking + horseback safaris', 'Rhino tracking', 'Facilitated debriefs'],
    themes: ['leadership'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Laikipia', body: 'Fly to a private airstrip. Lodge welcome, first facilitated session at sundown.' },
      { day: 'Day 2', title: 'Walking safari + session', body: 'Sunrise walking safari with armed ranger. Mid-morning facilitated session. Free afternoon.' },
      { day: 'Day 3', title: 'Rhino tracking', body: 'Track black and white rhinos on foot with the conservation team. Group dinner.' },
      { day: 'Day 4', title: 'Horseback + debrief', body: 'Horseback safari at dawn. Final facilitated debrief in the evening.' },
      { day: 'Day 5', title: 'Departure', body: 'Fly back to Nairobi for international connections.' },
    ]),
  },

  /* ───────────── ZANZIBAR (themed) ───────────── */
  {
    slug: 'zanzibar-honeymoon-private-island',
    title: 'Zanzibar Honeymoon · Mnemba Private Island',
    destination: 'zanzibar',
    duration: '7 days',
    pace: 'Easy',
    category: 'Coast',
    group: 'Private · couple',
    summary:
      'Twelve thatched bandas, one private island, and almost no schedule. The quietest honeymoon we design.',
    description:
      'Mnemba Island private buyout for five nights, two nights in Stone Town to bookend. Private chef, sea kayaks, reef snorkelling.',
    bestTime: 'Jun – Oct · Dec – Feb',
    imageUrl: IMG.coast,
    highlights: ['Mnemba Island stay', 'Private chef', 'Sea kayaks', 'Stone Town curator walk'],
    themes: ['honeymoon'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Stone Town', body: 'Met at Zanzibar International. Two nights in a Swahili town house.' },
      { day: 'Day 2', title: 'Stone Town · curator walk', body: 'A privately hosted architecture walk. Slow Swahili cooking class in the afternoon.' },
      { day: 'Days 3–6', title: 'Mnemba Private Island', body: 'Four full nights on the island. Private chef, sea kayaks, reef days, no fixed schedule.' },
      { day: 'Day 7', title: 'Departure', body: 'Boat back to Zanzibar. Final lunch at Stone Town and flight onward.' },
    ]),
  },
  {
    slug: 'zanzibar-history-coast',
    title: 'Swahili Coast · History Route',
    destination: 'zanzibar',
    duration: '6 days',
    pace: 'Easy',
    category: 'Cultural',
    group: 'Private · max 6',
    summary:
      'A historian-led route through Stone Town, the slave-trade memorial, and the spice trade story.',
    description:
      'For travellers who want the long Swahili story. Hosted by a Stone Town historian, with archive visits and slow afternoons in the old town.',
    bestTime: 'Year-round',
    imageUrl: IMG.cultural,
    highlights: ['Slave-trade memorial', 'House of Wonders', 'Spice plantation visit', 'Curator-led architecture walk'],
    themes: ['history'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Stone Town', body: 'Met at Zanzibar International. Stone Town town house, welcome dinner.' },
      { day: 'Day 2', title: 'Memorial + House of Wonders', body: 'The slave-trade memorial in the morning. House of Wonders in the afternoon. Hosted dinner with a historian.' },
      { day: 'Day 3', title: 'Spice plantation', body: 'A privately guided spice plantation visit. Lunch with the planter family.' },
      { day: 'Day 4', title: 'Curator-led architecture walk', body: 'A deep-dive walk through Stone Town with a Swahili architecture curator.' },
      { day: 'Day 5', title: 'Day at leisure / dhow sail', body: 'Optional dhow charter to Prison Island. Slow afternoon.' },
      { day: 'Day 6', title: 'Departure', body: 'Slow breakfast, transfer to the airport.' },
    ]),
  },

  /* ───────────── UGANDA (themed) ───────────── */
  {
    slug: 'uganda-church-mission-tour',
    title: 'Uganda Mission Vision Tour',
    destination: 'uganda',
    duration: '10 days',
    pace: 'Moderate',
    category: 'Cultural',
    group: 'Group · 10–25',
    summary:
      'A privately hosted vision tour across our long-standing Ugandan church and mission partnerships.',
    description:
      'For visiting churches and mission boards. Five partner-church visits across the country, hosted dinners with pastors, and a Bwindi gorilla trek as gift.',
    bestTime: 'Jun – Aug · Dec – Feb',
    imageUrl: IMG.cultural,
    highlights: ['Five church visits', 'Pastor host dinners', 'Bwindi gorilla trek', 'Group debriefs'],
    themes: ['church-mission'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Entebbe', body: 'Met at Entebbe. Transfer to Kampala. Welcome dinner with the host pastor.' },
      { day: 'Days 2–4', title: 'Kampala partner churches', body: 'Three Kampala-area partner churches. Hosted lunches, group debriefs each evening.' },
      { day: 'Day 5', title: 'Drive to Bwindi', body: 'Long, beautiful drive south-west. Settle into Clouds Mountain Gorilla Lodge.' },
      { day: 'Day 6', title: 'Gorilla trek', body: 'A privately permitted Bwindi gorilla trek — the gift day.' },
      { day: 'Day 7', title: 'Bwindi partner village', body: 'Batwa community visit and church-plant briefing at a Bwindi partner.' },
      { day: 'Days 8–9', title: 'Return to Kampala via two churches', body: 'Two further church visits on the route back. Closing dinner with the regional bishop.' },
      { day: 'Day 10', title: 'Departure', body: 'Transfer to Entebbe for the international flight home.' },
    ]),
  },

  /* ───────────── TANZANIA (themed) ───────────── */
  {
    slug: 'tanzania-schools-geography-tour',
    title: 'Tanzania · Geography & Wildlife Expedition',
    destination: 'tanzania',
    duration: '10 days',
    pace: 'Active',
    category: 'Wildlife',
    group: 'School group · 12–30',
    summary:
      'A curriculum-linked field expedition — Serengeti, Ngorongoro, Hadzabe community, and Lake Eyasi geology.',
    description:
      'Built with the teaching team. Field-notebook programme, two-leader minimum, full safety brief, hosted partner visits.',
    bestTime: 'Jun – Oct',
    imageUrl: IMG.elephants,
    highlights: ['Serengeti field days', 'Ngorongoro caldera', 'Hadzabe community', 'Field-notebook programme'],
    themes: ['schools'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Arusha', body: 'Met at Kilimanjaro International. Group welcome and field-notebook briefing in Arusha.' },
      { day: 'Days 2–3', title: 'Tarangire field days', body: 'Two full days in Tarangire with the elephant herds and baobab geology lessons.' },
      { day: 'Days 4–5', title: 'Ngorongoro caldera', body: 'Caldera game drive, geology lesson on the rim, hosted Maasai boma visit.' },
      { day: 'Days 6–7', title: 'Serengeti field days', body: 'Two days in the central Serengeti — predators, plains ecology, weather patterns.' },
      { day: 'Day 8', title: 'Hadzabe day · Lake Eyasi', body: 'Morning with the Hadzabe hunters. Datoga blacksmith visit. Field-notebook session.' },
      { day: 'Day 9', title: 'Return to Arusha', body: 'Drive back via the rift. Group debrief and closing dinner.' },
      { day: 'Day 10', title: 'Departure', body: 'Transfer to the airport.' },
    ]),
  },

  /* ───────────── BOTSWANA (themed) ───────────── */
  {
    slug: 'botswana-immersion-okavango',
    title: 'Okavango Immersion · San + Mokoro',
    destination: 'botswana',
    duration: '10 days',
    pace: 'Moderate',
    category: 'Cultural',
    group: 'Private · max 6',
    summary:
      'A slow, immersive route between the Kalahari (San communities), the Delta (mokoro), and Maun.',
    description:
      'Long, considered days. Kalahari San bush walks, mokoro days deep in the Delta, hosted village dinners.',
    bestTime: 'May – Oct',
    imageUrl: IMG.guide,
    highlights: ['San bush walks', 'Mokoro deep in the Delta', 'Village host dinners', 'Walking safari'],
    themes: ['immersion'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Maun', body: 'Fly in via Johannesburg. Welcome dinner in Maun.' },
      { day: 'Days 2–3', title: 'Kalahari · San communities', body: 'Two slow days on the salt pans with San bush walks and fireside stories.' },
      { day: 'Days 4–7', title: 'Okavango · mokoro days', body: 'Four nights deep in the Delta. Mokoro charters daily. Walking safaris. Island camp.' },
      { day: 'Days 8–9', title: 'Khwai · cultural exchange', body: 'Two nights at a Khwai community camp. Hosted village suppers.' },
      { day: 'Day 10', title: 'Departure', body: 'Light aircraft to Maun and onward connections.' },
    ]),
  },
];

/* ─────────── Itinerary backfills for the original 24 seeded tours ─────────── */
/* slug → days. Themes are also assigned where applicable. */

type Backfill = {
  themes?: string[];
  itinerary: Day[];
};

const backfills: Record<string, Backfill> = {
  /* Rwanda */
  'volcanoes-gorilla-encounter': {
    themes: ['active', 'honeymoon'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Drive to Volcanoes · briefing', body: 'Drive north past Lake Burera. Bisate check-in, forest walk, conservation briefing.' },
      { day: 'Day 3', title: 'Gorilla trek + golden monkeys', body: 'Privately permitted gorilla trek in the morning. Golden monkey tracking in the afternoon.' },
      { day: 'Day 4', title: 'Second trek + Karisoke', body: 'A second gorilla family trek. Optional Karisoke researcher visit in the afternoon.' },
      KIGALI_DEPART,
    ]),
  },
  'kivu-and-nyungwe': {
    themes: ['active'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Drive to Lake Kivu', body: 'Scenic drive through the terraced hills. Lakeside lodge check-in.' },
      { day: 'Day 3', title: 'Lake Kivu boat day', body: 'Private boat charter and a coffee co-op visit. Slow lake lunch.' },
      { day: 'Day 4', title: 'Drive to Nyungwe · canopy walk', body: 'South to Nyungwe. Africa\'s only suspended canopy walk in the afternoon.' },
      { day: 'Day 5', title: 'Chimpanzee tracking', body: 'Sunrise chimp tracking. Forest lunch and return to Kigali in the afternoon.' },
      KIGALI_DEPART,
    ]),
  },
  'kigali-design-and-memory': {
    themes: ['arts-design', 'history'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Memorial · Inema · hosted dinner', body: 'Morning at the Kigali Genocide Memorial. Afternoon at Inema Arts. Hosted dinner with a curator and a writer.' },
      KIGALI_DEPART,
    ]),
  },
  'big-five-of-the-mountains': {
    themes: ['active', 'philanthropy'],
    itinerary: itinerary([
      KIGALI_ARRIVAL,
      { day: 'Day 2', title: 'Drive to Volcanoes', body: 'Drive north. Bisate check-in.' },
      { day: 'Day 3', title: 'Gorilla trek + golden monkeys', body: 'Privately permitted gorilla trek. Golden monkey tracking in the afternoon.' },
      { day: 'Day 4', title: 'Fly to Nyungwe', body: 'Light aircraft south. Forest lodge check-in. Canopy walk in the afternoon.' },
      { day: 'Day 5', title: 'Chimpanzee tracking', body: 'Sunrise chimps. Tea estate lunch.' },
      { day: 'Day 6', title: 'Fly to Akagera', body: 'Cross-country flight east. Magashi check-in. Sundowner game drive.' },
      { day: 'Day 7', title: 'Akagera safari day', body: 'Full game drive day — Big Five country.' },
      KIGALI_DEPART,
    ]),
  },
  /* Tanzania */
  'northern-migration-circuit': {
    themes: ['honeymoon'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Arusha', body: 'Met at Kilimanjaro. Mt Meru lodge.' },
      { day: 'Days 2–4', title: 'Northern Serengeti', body: 'Mobile migration camp positioned for river crossings. Long drive days.' },
      { day: 'Days 5–7', title: 'Central Serengeti', body: 'Big cat country. Hot-air balloon at sunrise on Day 6 (optional).' },
      { day: 'Day 8', title: 'Departure', body: 'Light aircraft to Arusha. Onward connections.' },
    ]),
  },
  'ngorongoro-and-tarangire': {
    themes: [],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Arusha', body: 'Met at Kilimanjaro. Settle into Arusha.' },
      { day: 'Days 2–3', title: 'Tarangire', body: 'Two days with the elephant herds. Baobab country. Night drives optional.' },
      { day: 'Day 4', title: 'Drive to Ngorongoro', body: 'Scenic drive up to the crater rim.' },
      { day: 'Day 5', title: 'Ngorongoro caldera', body: 'Full caldera day. Rim sundowners.' },
      { day: 'Day 6', title: 'Departure', body: 'Drive back to Arusha for the flight.' },
    ]),
  },
  'selous-and-ruaha': {
    themes: ['active'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Dar', body: 'Met in Dar es Salaam. Light aircraft to Selous.' },
      { day: 'Days 2–4', title: 'Selous · Rufiji River', body: 'Boat safaris, walking safaris, fly-camping option.' },
      { day: 'Days 5–6', title: 'Ruaha', body: 'Light aircraft to Ruaha. Predator country.' },
      { day: 'Day 7', title: 'Departure', body: 'Light aircraft back via Dar.' },
    ]),
  },
  'hadzabe-cultural-immersion': {
    themes: ['immersion', 'history'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Arusha', body: 'Met at Kilimanjaro. Drive to Lake Eyasi in the afternoon.' },
      { day: 'Day 2', title: 'Hadzabe morning hunt', body: 'Sunrise hunt with the Hadzabe. Datoga blacksmith visit in the afternoon.' },
      { day: 'Day 3', title: 'Return to Arusha', body: 'Slow drive back via the rift. Closing dinner.' },
    ]),
  },
  /* Kenya */
  'maasai-mara-conservancies': {
    themes: ['honeymoon', 'philanthropy'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Nairobi', body: 'Met at Nairobi. Light aircraft to the Mara.' },
      { day: 'Days 2–5', title: 'Mara conservancy', body: 'Game drives, night drives, walking safaris. Optional balloon at dawn on Day 3.' },
      { day: 'Day 6', title: 'Departure', body: 'Light aircraft to Nairobi.' },
    ]),
  },
  'laikipia-rewilding': {
    themes: ['active', 'leadership'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Nairobi', body: 'Light aircraft to Laikipia.' },
      { day: 'Days 2–4', title: 'Laikipia', body: 'Rhino tracking, horseback safari, wild dog encounters.' },
      { day: 'Day 5', title: 'Departure', body: 'Flight back to Nairobi.' },
    ]),
  },
  'samburu-heritage': {
    themes: ['history', 'immersion'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Nairobi', body: 'Light aircraft to Samburu.' },
      { day: 'Days 2–3', title: 'Samburu reserve + community', body: 'Samburu cultural day, Ewaso Ng\'iro riverbed game drives, singing wells visit.' },
      { day: 'Day 4', title: 'Departure', body: 'Flight back to Nairobi.' },
    ]),
  },
  'lamu-archipelago': {
    themes: ['honeymoon'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Lamu', body: 'Light aircraft from Nairobi. Settle into Peponi.' },
      { day: 'Days 2–3', title: 'Dhow + Stone Town walks', body: 'Dhow charters, Stone Town architecture walk, Shela beach.' },
      { day: 'Day 4', title: 'Departure', body: 'Flight back to Nairobi.' },
    ]),
  },
  /* Uganda */
  'bwindi-gorillas': {
    themes: ['active', 'church-mission'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Entebbe', body: 'Met at Entebbe. Light aircraft to Bwindi.' },
      { day: 'Day 2', title: 'First gorilla trek', body: 'A privately permitted Bwindi gorilla trek.' },
      { day: 'Day 3', title: 'Second gorilla trek + Batwa', body: 'A second trek in a different sector. Batwa cultural visit in the afternoon.' },
      { day: 'Day 4', title: 'Departure', body: 'Light aircraft to Entebbe.' },
    ]),
  },
  'queen-elizabeth-tree-climbers': {
    themes: [],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Entebbe', body: 'Light aircraft to Queen Elizabeth NP.' },
      { day: 'Days 2–4', title: 'Queen Elizabeth NP', body: 'Tree-climbing lions in Ishasha, Kazinga Channel boat, crater lakes drive.' },
      { day: 'Day 5', title: 'Departure', body: 'Light aircraft back.' },
    ]),
  },
  'kibale-chimpanzees': {
    themes: ['active'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Entebbe', body: 'Light aircraft to Kibale.' },
      { day: 'Day 2', title: 'Chimp habituation', body: 'Habituated chimp experience — half a day with the family.' },
      { day: 'Day 3', title: 'Departure', body: 'Bigodi swamp walk in the morning. Light aircraft back.' },
    ]),
  },
  'murchison-falls-and-nile': {
    themes: [],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Entebbe', body: 'Light aircraft to Murchison.' },
      { day: 'Days 2–3', title: 'Murchison Falls', body: 'Boat to the foot of the falls. Top-of-falls hike. Delta game drive.' },
      { day: 'Day 4', title: 'Departure', body: 'Light aircraft back to Entebbe.' },
    ]),
  },
  /* Botswana */
  'okavango-delta-mokoro': {
    themes: ['honeymoon', 'immersion'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Maun', body: 'Light aircraft to the Delta camp.' },
      { day: 'Days 2–4', title: 'Mokoro + walking', body: 'Mokoro charters, walking safaris, island camp nights.' },
      { day: 'Day 5', title: 'Departure', body: 'Light aircraft to Maun.' },
    ]),
  },
  'linyanti-predator-country': {
    themes: ['active'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Maun', body: 'Light aircraft to Linyanti.' },
      { day: 'Days 2–5', title: 'Linyanti', body: 'Wild dog packs, lion prides, elephant herds, night drives.' },
      { day: 'Day 6', title: 'Departure', body: 'Light aircraft back.' },
    ]),
  },
  'makgadikgadi-salt-pans': {
    themes: [],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Maun', body: 'Light aircraft to the Pans camp.' },
      { day: 'Days 2–3', title: 'Salt pans + meerkats', body: 'Quad bikes across the pans, meerkat morning, San bushman walks.' },
      { day: 'Day 4', title: 'Departure', body: 'Light aircraft to Maun.' },
    ]),
  },
  'kalahari-with-the-san': {
    themes: ['immersion', 'history'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Maun', body: 'Light aircraft to the Kalahari.' },
      { day: 'Days 2–4', title: 'Kalahari · San days', body: 'Slow days with San communities — bush walks, traditional knowledge.' },
      { day: 'Day 5', title: 'Departure', body: 'Light aircraft back.' },
    ]),
  },
  /* Zanzibar */
  'stone-town-and-spice': {
    themes: ['history', 'arts-design'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Stone Town', body: 'Met at Zanzibar International. Town house check-in.' },
      { day: 'Day 2', title: 'Curator-led walk + cooking', body: 'A privately guided architecture walk in the morning. Slow Swahili cooking class in the afternoon.' },
      { day: 'Day 3', title: 'Spice plantation + music night', body: 'A spice plantation visit and a music night with local musicians.' },
    ]),
  },
  'mnemba-private-island': {
    themes: ['honeymoon', 'lgbtq'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Mnemba', body: 'Boat charter to the island. Banda check-in. Sundowner.' },
      { day: 'Days 2–4', title: 'Island days', body: 'Reef snorkelling, sea kayaks, private chef meals, no fixed schedule.' },
      { day: 'Day 5', title: 'Departure', body: 'Boat back to Zanzibar for the flight.' },
    ]),
  },
  'pemba-reef-and-quiet': {
    themes: [],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Pemba', body: 'Light aircraft to Pemba.' },
      { day: 'Days 2–3', title: 'Reef + mangroves', body: 'Diving / snorkelling, mangrove kayak, slow lodge time.' },
      { day: 'Day 4', title: 'Departure', body: 'Light aircraft back.' },
    ]),
  },
  'swahili-coast-sail': {
    themes: ['adventure'],
    itinerary: itinerary([
      { day: 'Day 1', title: 'Arrival · Dar', body: 'Met in Dar. Dhow charter check-in.' },
      { day: 'Days 2–4', title: 'Dhow days', body: 'Sail south. Mangrove channels, beach picnics, fishing villages.' },
      { day: 'Day 5', title: 'Mafia Island', body: 'Land at Mafia. Final island night.' },
    ]),
  },
};

/* ─────────── Image overrides for existing tours (real Rwanda Unsplash) ─────────── */
const imageOverrides: Record<string, string> = {
  'volcanoes-gorilla-encounter': IMG.silverback,
  'kivu-and-nyungwe': IMG.lakeKivuPirogue,
  'kigali-design-and-memory': IMG.kigaliStreet,
  'big-five-of-the-mountains': IMG.aerialHills,
  'northern-migration-circuit': IMG.savanna,
  'ngorongoro-and-tarangire': IMG.elephants,
  'selous-and-ruaha': IMG.guide,
  'hadzabe-cultural-immersion': IMG.cultural,
  'maasai-mara-conservancies': IMG.savanna,
  'laikipia-rewilding': IMG.elephants,
  'samburu-heritage': IMG.guide,
  'lamu-archipelago': IMG.coast,
  'bwindi-gorillas': IMG.gorillaForest,
  'queen-elizabeth-tree-climbers': IMG.elephants,
  'kibale-chimpanzees': IMG.gorillaPortrait,
  'murchison-falls-and-nile': IMG.coast,
  'okavango-delta-mokoro': IMG.lakeKivuPirogue,
  'linyanti-predator-country': IMG.elephants,
  'makgadikgadi-salt-pans': IMG.aerialHills,
  'kalahari-with-the-san': IMG.guide,
  'stone-town-and-spice': IMG.cultural,
  'mnemba-private-island': IMG.coast,
  'pemba-reef-and-quiet': IMG.coast,
  'swahili-coast-sail': IMG.coast,
};

/* ─────────── Main ─────────── */
const seed = async () => {
  const payload = await getPayload({ config });
  const log = payload.logger;

  /* Lookup theme IDs by slug */
  const themeMap = new Map<string, number | string>();
  const themeResult = await payload.find({ collection: 'tour-themes', limit: 50 });
  for (const t of themeResult.docs as any[]) themeMap.set(t.slug, t.id);
  log.info(`Loaded ${themeMap.size} tour themes`);

  /* Lookup destination IDs by slug */
  const destMap = new Map<string, number | string>();
  const destResult = await payload.find({ collection: 'destinations', limit: 50 });
  for (const d of destResult.docs as any[]) destMap.set(d.slug, d.id);
  log.info(`Loaded ${destMap.size} destinations`);

  /* Backfill: update existing tours with itinerary + themes + image */
  log.info('Backfilling existing tours…');
  let backfillCount = 0;
  for (const [slug, b] of Object.entries(backfills)) {
    const existing = await payload.find({
      collection: 'tours',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      log.warn(`  ⚠ tour not found: ${slug}`);
      continue;
    }
    const themeIds =
      b.themes?.map((s) => themeMap.get(s)).filter((id): id is number | string => Boolean(id)) ??
      [];
    await payload.update({
      collection: 'tours',
      id: existing.docs[0].id,
      data: {
        itinerary: b.itinerary,
        ...(themeIds.length ? { themes: themeIds } : {}),
        ...(imageOverrides[slug] ? { imageUrl: imageOverrides[slug] } : {}),
      },
    });
    log.info(`  ↻ backfilled: ${slug}`);
    backfillCount++;
  }
  log.info(`Backfilled ${backfillCount} tours`);

  /* Create the new themed tours */
  log.info('Creating new themed tours…');
  let createdCount = 0;
  let updatedCount = 0;
  for (const t of newTours) {
    const destId = destMap.get(t.destination);
    if (!destId) {
      log.warn(`  ⚠ destination not found: ${t.destination}`);
      continue;
    }
    const themeIds = t.themes
      .map((s) => themeMap.get(s))
      .filter((id): id is number | string => Boolean(id));

    const data = {
      title: t.title,
      slug: t.slug,
      destination: destId,
      duration: t.duration,
      pace: t.pace,
      category: t.category,
      group: t.group,
      summary: t.summary,
      description: t.description,
      bestTime: t.bestTime,
      imageUrl: t.imageUrl,
      highlights: t.highlights.map((text) => ({ text })),
      itinerary: t.itinerary,
      themes: themeIds,
      tiers: ['Luxury', 'Mid range', 'Budget'] as ('Luxury' | 'Mid range' | 'Budget')[],
    };

    const existing = await payload.find({
      collection: 'tours',
      where: { slug: { equals: t.slug } },
      limit: 1,
    });

    if (existing.docs.length) {
      await payload.update({
        collection: 'tours',
        id: existing.docs[0].id,
        data,
      });
      log.info(`  ↻ updated: ${t.slug}`);
      updatedCount++;
    } else {
      await payload.create({ collection: 'tours', data });
      log.info(`  ✓ created: ${t.slug}`);
      createdCount++;
    }
  }
  log.info(`Created ${createdCount} new tours, updated ${updatedCount}`);

  log.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log.info(`✓ Extended seed complete — ${backfillCount} backfilled + ${createdCount} new tours`);
  process.exit(0);
};

seed().catch((err) => {
  console.error('Extended seed failed:', err);
  process.exit(1);
});
