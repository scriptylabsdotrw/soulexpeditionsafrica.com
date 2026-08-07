/* ─────────────────────────────────────────────────────────
   MOCK SEED — Journal articles
   Replace with a CMS / DB fetch later; signature stays the same.
   ───────────────────────────────────────────────────────── */

export const CATEGORIES = [
  'Field notes',
  'Conservation',
  'Craft',
  'Wildlife',
  'Cultural',
] as const;
export type JournalCategory = (typeof CATEGORIES)[number];

export type Author = {
  name: string;
  role: string;
  /** Optional portrait — placeholder if absent */
  portrait?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** Long-form body — array of paragraphs (rendered as <p>) so we don't need a markdown lib yet. */
  body: string[];
  /** Optional pull-quote inserted halfway through the article body. */
  pullQuote?: { quote: string; attribution: string };
  category: JournalCategory;
  tag?: string; // free-form secondary tag (e.g. country)
  author: Author;
  /** ISO date string */
  publishedAt: string;
  readTime: string; // '7 min read'
  image: string;
  featured?: boolean;
};

/* shared image pool — each entry is a distinct framed URL.
   Same base photo with different focal points counts as a different image. */
const u = (id: string, fpY = 0.5, fpX = 0.5) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}`;

const IMG = {
  gorillaFace: u('photo-1535941339077-2dd1c7963098', 0.35),
  gorillaForest: u('photo-1591824438708-ce405f36ba3d', 0.45),
  serengetiPlains: u('photo-1547970810-dc1eac37d174', 0.55),
  ngorongoroDawn: u('photo-1547970810-dc1eac37d174', 0.25, 0.35), // same photo, top focal
  culturalKigali: u('photo-1523805009345-7448845a9e53', 0.4),
  coastDhow: u('photo-1505881502353-a1986add3762', 0.35),
  coastWater: u('photo-1505881502353-a1986add3762', 0.7, 0.4), // same photo, lower focal
  elephantHerd: u('photo-1516426122078-c23e76319801', 0.45),
  guidePortrait: u('photo-1504432842672-1a79f78e4084', 0.3),
};

/* ─────────────────────────────────────────────────────────
   ARTICLES — 8 mock entries across all categories
   ───────────────────────────────────────────────────────── */
export const articles: Article[] = [
  {
    slug: 'reading-the-serengeti',
    title: 'Reading the Serengeti like a guide does',
    excerpt:
      'A field-level breakdown of how our trackers read the wind, the dust, and the morning shadow of an acacia — and how it changes where you’re sitting at 6:14 a.m.',
    category: 'Field notes',
    tag: 'Tanzania',
    author: {
      name: 'Jean-Pierre Habimana',
      role: 'Lead guide · 18 years in the field',
    },
    publishedAt: '2026-04-12',
    readTime: '7 min read',
    image: IMG.serengetiPlains,
    featured: true,
    pullQuote: {
      quote: 'The dust is never just dust. It is direction, and animal, and history.',
      attribution: 'Jean-Pierre, on the road to the Mara River',
    },
    body: [
      'The first sound the bush gives you is not a sound. It is a posture. The way a giraffe holds her head when she has stopped chewing. The way two zebra angle their hindquarters to give them line-of-sight in both directions. Long before a lion appears, the plains have already told you it is coming.',
      'For our guides, a morning game drive begins inside the lodge. While you are still buttoning a fleece against the cold, they are outside — listening to the night staff. Where did the hyenas call from? What time? How many voices? A pack that calls at 02:40 from the northern boundary is a different drive than a pack that called at 04:55 from the woodlands.',
      'Then there is the dust. The dust is never just dust. It is direction, and animal, and history. A vehicle leaves a fine, regular plume that drifts. A herd of buffalo throws a thicker, lower curtain that hangs heavy. A pride of lions on the move leaves something subtler — a low, intermittent puff — that you only see in low side-light.',
      'And the acacia shadow. The acacia, particularly the umbrella acacia of the central Serengeti, casts a shadow that moves through three distinct shapes in the first hour after sunrise. By the time the shadow goes from oval to fan, the cats will have moved off the kopjes and into the long grass. By the time it goes from fan to long-fingered hand, they will have stopped to drink.',
      'You will not see any of this on your first morning. You probably will not see it on your tenth. But the people sitting next to you in the vehicle will, and they will move you — quietly — to the right place, at the right minute, because that is what a guide does in the Serengeti. They read.',
    ],
  },
  {
    slug: 'batwa-partnership',
    title: 'Why the Batwa partnership changes everything',
    excerpt:
      'A long-form look at how a single revenue-share agreement, signed in 2019, is quietly rewriting a 20-year story in Bwindi.',
    category: 'Conservation',
    tag: 'Uganda',
    author: {
      name: 'Mukamana Léa',
      role: 'Conservation lead · Soul Expeditions Africa',
    },
    publishedAt: '2026-03-28',
    readTime: '12 min read',
    image: IMG.gorillaForest,
    pullQuote: {
      quote:
        'The Batwa were not asking to be visited. They were asking to be listened to. Those are two different itineraries.',
      attribution: 'Léa, in conversation with elders in Buhoma',
    },
    body: [
      'In 1991, the Batwa were moved out of the Bwindi forest so that the forest could be made a national park. They had lived in the forest, with the gorillas, for an unbroken span that researchers describe simply as "since before". They were not relocated. They were displaced.',
      'For nearly thirty years, the standard tourism response to the Batwa was a one-hour "cultural village visit" with a dance and a basket. It was, in our view, deeply uncomfortable. So in 2019, we stopped doing it.',
      'What we built instead, with the Batwa Development Programme and the council of elders in Buhoma, is a different kind of partnership. A direct revenue share — a fixed percentage of every Soul Expeditions itinerary that touches Bwindi flows into a community fund. The fund is managed entirely by the community council. We do not see how it is spent and we do not need to.',
      'When our guests now spend time with the Batwa, it is on the community’s terms. There is no schedule. There is no choreographed dance. There is, instead, the chance to walk a forest path with a man whose grandfather taught him which leaves the gorillas eat at altitude — and to sit with that for as long as he wants to sit with it.',
      'It has changed what a Bwindi visit looks like. It has also changed what Bwindi means. The Batwa were not asking to be visited. They were asking to be listened to. Those are two different itineraries.',
    ],
  },
  {
    slug: 'one-day-in-lamu',
    title: 'The art of a single perfect day in Lamu',
    excerpt:
      'What it takes — sail, kitchen, light — to design one quiet, unforgettable day on the Swahili coast.',
    category: 'Craft',
    tag: 'Kenya',
    author: { name: 'Aisha Mwakuya', role: 'Design lead · Coast' },
    publishedAt: '2026-03-09',
    readTime: '9 min read',
    image: IMG.coastDhow,
    body: [
      'A perfect day in Lamu does not begin with an itinerary. It begins with a sail-maker. Specifically: a man called Karim, who has been stitching dhow sails on the same wooden veranda in Shela since 1998.',
      'You meet Karim because the dhow you will sail at 4 p.m. has a sail that he stitched. This is not a stop. It is a piece of context. By the time you climb into the dhow that afternoon, you will know whose hands made the cloth that catches the wind that moves you to the picnic.',
      'Lunch on the boat is grilled fish. The fish was bought from a fisherman called Hassan, at 6:15 a.m., at the back of the market — not the front, the back. This matters: the front of the market is for visitors, the back is for the cooks. The chef who is grilling your fish is the one who chose it.',
      'The picnic site is on a beach which has no name on any map. It is reached from the water side only. We will not name it here. The beach is reached at the moment the sun is low enough to throw shadows from the dune grass across the sand. This timing is the entire design.',
      'You will return to the village after dark. There will be a small dinner at a friend’s house — not a restaurant. There will be Swahili music, played by someone who is also a fisherman in the mornings. Nobody will rush you. The day will end when it ends.',
    ],
  },
  {
    slug: 'math-of-a-mobile-camp',
    title: 'The math of a mobile migration camp',
    excerpt:
      'How we calculate, weeks in advance, where to place the camp to put you in the right place at the right week of the Great Migration.',
    category: 'Field notes',
    tag: 'Tanzania',
    author: { name: 'Eric Tumusiime', role: 'Operations lead' },
    publishedAt: '2026-02-22',
    readTime: '8 min read',
    image: IMG.ngorongoroDawn,
    body: [
      'The Great Migration is not a date. It is a system. About 1.5 million wildebeest, 200,000 zebra, and 350,000 Thompson’s gazelle move in a long, slow, weather-driven circle through Tanzania and Kenya. The system has no leader and no schedule. But it does have inputs.',
      'The two big inputs are rainfall and grass quality. The herds follow the rain — but with a one-to-three-week lag, because they will not move into wet grass until the wet grass is past its first sugar-poor phase. So we do not actually watch the rain. We watch the grass.',
      'Our placement model uses NDVI satellite data (a measure of vegetation greenness, updated every five days) layered onto seven-day rainfall forecasts from the World Meteorological Organisation. We then overlay where the herds are sitting at any given moment, using ranger-network reports from inside the Serengeti and from across the Mara River in Kenya.',
      'From that, we get a forecast of where the leading edge of the herds will be in roughly fourteen days. That is the window in which we move a mobile camp. Fourteen days is the minimum lead time we need to break down, transport, and re-pitch a fully-staffed camp.',
      'It is not always right. The herds have, on more than one occasion, ignored the model entirely. But when it works — and it works often — you will sit on a folding chair, with a cold drink, and watch 12,000 wildebeest cross a river that no one knew they would cross until a Wednesday morning eleven days earlier.',
    ],
  },
  {
    slug: 'three-forests-one-species',
    title: 'Three forests, one species',
    excerpt:
      'Mountain gorillas live in three places: Volcanoes, Bwindi, and Virunga. The same species — but, in important ways, three different gorillas.',
    category: 'Wildlife',
    tag: 'Rwanda · Uganda · DRC',
    author: { name: 'Dr. Felix Nshuti', role: 'Wildlife biologist' },
    publishedAt: '2026-02-08',
    readTime: '11 min read',
    image: IMG.gorillaFace,
    body: [
      'There are about 1,063 mountain gorillas left in the world. They live in three forests, in three countries, and behave noticeably differently in each.',
      'In Volcanoes National Park, Rwanda, the forest is high — much of it above 2,500 metres — and the volcano terrain is open in places. The gorillas there are habituated to a high frequency of researcher contact going back to Dian Fossey’s work in the 1960s. They are also, by reputation, the gentlest of the three populations.',
      'In Bwindi, Uganda, the forest is exactly as advertised: impenetrable. Steep, dense, hot, vertical. The gorillas there move with the terrain — they are more arboreal, they have a different territorial pattern, and the families are physically harder to reach. A Bwindi trek is, on average, two to three hours longer than a Volcanoes trek.',
      'In Virunga, in the eastern DRC, the gorillas live in active volcano country alongside a mountain that erupts on a regular schedule. The population there has been the most stressed by political instability. They are also, paradoxically, the most curious of the three groups — they have had less constant human contact, so when they do encounter humans they are often more interested.',
      'For most travellers, the choice is between Volcanoes and Bwindi. Both are extraordinary. But they are not the same encounter, and we have very strong opinions about which one suits which traveller, which we will happily share over a conversation.',
    ],
  },
  {
    slug: 'short-history-of-kigali-in-food',
    title: 'A short history of Kigali, in food',
    excerpt:
      'Restaurants, markets, memory. Three meals that map the last twenty years of Rwanda’s capital better than any guidebook will.',
    category: 'Cultural',
    tag: 'Rwanda',
    author: { name: 'Claudine Uwamahoro', role: 'Kigali design lead' },
    publishedAt: '2026-01-19',
    readTime: '6 min read',
    image: IMG.culturalKigali,
    body: [
      'Kigali in 2004 had perhaps three restaurants where you would have taken a guest. By 2014 it had thirty. By 2024 it had three hundred. The story of the last twenty years of Rwanda’s capital can be told, surprisingly accurately, through three meals.',
      'The first meal is at Heaven, in Kiyovu — a restaurant founded by a Rwandan-American family that returned after the genocide. It opened in 2008. Heaven is where the international NGO community ate while Rwanda rebuilt the infrastructure of normal life. It is still extraordinary, and it tells the story of the immediate post-2000 years better than any document I have read.',
      'The second meal is at Repub Lounge, on KN 14 Street. Repub belongs to the second wave — the years after 2015, when Rwanda began to feel less like a place that was recovering and more like a place that was becoming. Repub is fine-dining, modern Rwandan cuisine: pumpkin soup with sorghum, isombe (cassava leaves) with smoked freshwater fish.',
      'The third meal is at Inka Steakhouse, in Nyarutarama. Inka belongs to the most recent wave — the years from 2020 — when Kigali began to host its own design conferences, its own film festival, its own banking summits. Inka is glossy, international, confident. It is what a Kigali restaurant looks like when the city is no longer explaining itself to anyone.',
      'Eat in those three places, in that order, over three nights, and you will understand more about Rwanda than most weeks of reading.',
    ],
  },
  {
    slug: 'why-mokoro-still',
    title: 'Why we still use the mokoro',
    excerpt:
      'There are faster boats. There are quieter boats. There are dryer boats. None of them is a mokoro.',
    category: 'Craft',
    tag: 'Botswana',
    author: { name: 'Rra Tebogo', role: 'Polers’ guild · Maun' },
    publishedAt: '2026-01-03',
    readTime: '5 min read',
    image: IMG.coastWater,
    body: [
      'A mokoro is a shallow, narrow canoe poled from the back, with the poler standing. In the Okavango Delta in Botswana, it is the way you cross water. It has been the way you cross water for a very long time.',
      'There are faster boats in the Okavango. The motorboats can reach a lodge across the floodplain in twenty minutes; a mokoro takes ninety. There are dryer boats — the motorboats sit higher in the water and you do not need to take your shoes off. There are quieter boats too — newer electric outboards make almost no sound.',
      'None of those boats is a mokoro. From the floor of a mokoro, you are eye-level with a sitatunga antelope in the reeds. You are nine centimetres above a frog. You are below the dragonflies. The boat does not announce itself. The animals do not flinch.',
      'There is a second reason. The poler standing behind you is, almost certainly, a man who learned to read the delta from his father, who learned from his father. There is a polers’ guild in Maun. The men in it have been polers for generations. You are not in a boat. You are in a relationship.',
      'There is a faster way to cross water. There is not a better way.',
    ],
  },
  {
    slug: 'what-a-conservancy-actually-is',
    title: 'What a conservancy actually is',
    excerpt:
      'The word "conservancy" appears on a lot of safari brochures. Here is what it actually means — and why it changes everything about where to sit a vehicle.',
    category: 'Conservation',
    tag: 'Kenya',
    author: { name: 'Daniel Lekitiyok', role: 'Mara conservancy ranger' },
    publishedAt: '2025-12-14',
    readTime: '10 min read',
    image: IMG.elephantHerd,
    body: [
      'The Maasai Mara National Reserve is a government-run protected area. A conservancy is something different. It is a privately negotiated piece of land — usually adjacent to a national reserve — where a coalition of Maasai land-owning families have agreed not to graze their cattle, in exchange for a tourism revenue share.',
      'This sounds like an administrative footnote. It is not. The conservancy model changes almost everything about how a safari is structured.',
      'In the reserve, vehicle density is high, off-roading is forbidden, and night drives are not allowed. In a conservancy, vehicle density is capped (typically one vehicle per 700 acres), off-roading is permitted, walking safaris are allowed, and night drives are allowed.',
      'The other thing — the more important thing — is that the conservancy model means a meaningful share of every booking is going to the families whose land it is. Not as a stop-gap "community visit", but as recurring, contractual income. This is the single most effective conservation mechanism in operation in East Africa today.',
      'When you sit in a Maasai conservancy vehicle, you are not sitting in a safer Mara. You are sitting in a different Mara — designed, paid for, and run by the people whose land it always was.',
    ],
  },
];

/* ────────── lookups ────────── */
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleSlugs = () => articles.map((a) => ({ slug: a.slug }));

/* ────────── helpers ────────── */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
