'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SiteContent, Testimonial, Tour } from '@/lib/types';

/* ────────────────────────────────────────────────────────────
   IMAGERY — Rwanda-focused image pool, varied focal points
   ──────────────────────────────────────────────────────────── */
const u = (id: string, fpY = 0.5, fpX = 0.5, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}`;

/* Rwanda-specific Unsplash photo IDs — verified against unsplash.com/s/photos/rwanda */
const IMG = {
  heroSilverback: u('photo-1535941339077-2dd1c7963098', 0.35, 0.5, 2400),
  gorillaPortrait: u('photo-1591824438708-ce405f36ba3d', 0.45),
  intore: u('photo-1692019007242-36158877ec96', 0.45),
  akageraSafari: u('photo-1665070385454-5e0c4421a38c', 0.5),
  nyungweForest: u('photo-1489640818597-89b1edc97db5', 0.5),
  lakeKivu: u('photo-1589715718565-223fdf9b7cd4', 0.45),
  kigali: u('photo-1687986261123-b17f08f2796c', 0.5),
  cultural: u('photo-1507427100689-2bf8574e32d4', 0.45),
  heritage: u('photo-1631774991422-ccc98283d33f', 0.45),
  memory: u('photo-1504432842672-1a79f78e4084', 0.35, 0.45),
  aerialHills: u('photo-1551357141-f73a8402ceb3', 0.5),
  modernKigali: u('photo-1689013398932-b576a11e07a1', 0.5),
  kigaliStreet: u('photo-1518219051733-d8d4fbbf9797', 0.45),
};

/* ────────────────────────────────────────────────────────────
   PLACES BY CATEGORY — a directory of Rwandan attractions
   ──────────────────────────────────────────────────────────── */
type Place = { name: string; location: string; note: string };
type PlaceCategory = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  places: Place[];
};

const placeCategories: PlaceCategory[] = [
  {
    eyebrow: 'Theme · 01',
    title: 'Cultural',
    tagline: 'Living tradition — dance, music, craft, royal heritage.',
    description:
      'Rwandan culture is not staged for travellers; it is alive in every village, household and Sunday afternoon. These are the doorways we open for our guests.',
    image: IMG.cultural,
    alt: 'Rwandan cultural life — children at a village window',
    places: [
      {
        name: 'Intore Dance Performance',
        location: 'Musanze · Kigali',
        note: 'The warrior dance of memory and pride — privately performed at lodge or in-village.',
      },
      {
        name: "Iby'Iwacu Cultural Village",
        location: 'Musanze',
        note: 'A reformed-poacher community model — drumming workshops, traditional cuisine, and host families.',
      },
      {
        name: 'Inema Arts Centre',
        location: 'Kigali',
        note: "Rwanda's leading contemporary art atelier — studio visits with the Niyo brothers.",
      },
      {
        name: 'Niyo Cultural Centre',
        location: 'Kigali',
        note: 'Children of Niyo programme, traditional performances, café, gallery.',
      },
      {
        name: 'Imigongo Art Studios',
        location: 'Eastern Province · Rusumo',
        note: 'Geometric cow-dung art unique to Rwanda — workshops with master artisans.',
      },
      {
        name: 'Caplaki Craft Village',
        location: 'Kigali',
        note: "The country's artisan market — basketry, wood, Imigongo, weaving.",
      },
    ],
  },
  {
    eyebrow: 'Theme · 02',
    title: 'History & Heritage',
    tagline: 'Pre-colonial kingdoms, royal courts, and the long story.',
    description:
      "The Rwandan story begins long before colonial maps — at the Mwami's court at Rukari, in royal Inyambo cattle, and in the careful keeping of national memory.",
    image: IMG.heritage,
    alt: "Rukari, the King's Palace Museum in Nyanza",
    places: [
      {
        name: "Rukari — King's Palace Museum",
        location: 'Nyanza',
        note: "The traditional Mwami's residence — thatched royal palace, Inyambo long-horned cattle, and a quiet hosted tour of pre-colonial kingdom history.",
      },
      {
        name: 'Ethnographic Museum',
        location: 'Huye (Butare)',
        note: "Formerly the National Museum of Rwanda — the deepest ethnographic collection on the continent.",
      },
      {
        name: 'Rwesero Art Museum',
        location: 'Nyanza',
        note: 'Modern and contemporary Rwandan art, housed in a former royal residence.',
      },
      {
        name: 'Presidential Palace Museum',
        location: 'Kanombe, Kigali',
        note: 'The Habyarimana residence and the preserved wreckage of the 1994 plane on the grounds.',
      },
      {
        name: 'Kandt House Museum of Natural History',
        location: 'Kigali',
        note: "The colonial-era home of Richard Kandt — Rwanda's natural history and early-20th-century context.",
      },
      {
        name: 'King\'s Throne & Royal Forest',
        location: 'Nyanza',
        note: 'The royal forest beside Rukari, with ancient Erythrina trees planted by successive kings.',
      },
    ],
  },
  {
    eyebrow: 'Theme · 03',
    title: 'Memory & Remembrance',
    tagline: 'The careful, public way Rwanda holds its own history.',
    description:
      "Rwanda's memorial sites are visited privately, slowly, and always with a hosted guide. They are not optional context — they are the country's most important rooms.",
    image: IMG.memory,
    alt: 'A quiet memorial site in Rwanda',
    places: [
      {
        name: 'Kigali Genocide Memorial',
        location: 'Gisozi, Kigali',
        note: 'The principal national memorial — over 250,000 buried, and a deeply considered educational centre.',
      },
      {
        name: 'Murambi Genocide Memorial',
        location: 'Nyamagabe (Southern)',
        note: 'The most confronting of the memorials — a former technical school preserved with stark honesty.',
      },
      {
        name: 'Nyamata Church Memorial',
        location: 'Bugesera',
        note: 'A church preserved exactly as it was found, with belongings and clothing laid out in tribute.',
      },
      {
        name: 'Ntarama Church Memorial',
        location: 'Bugesera',
        note: 'A second preserved church memorial in the same district — quieter, smaller, equally moving.',
      },
      {
        name: 'Bisesero Memorial',
        location: 'Western Province',
        note: 'The "Hill of Resistance" — a memorial to those who fought back.',
      },
      {
        name: 'Camp Kigali Memorial',
        location: 'Kigali',
        note: 'Ten white pillars commemorating the Belgian peacekeepers killed at the start of the genocide.',
      },
    ],
  },
  {
    eyebrow: 'Theme · 04',
    title: 'Nature & Wildlife',
    tagline: 'Forests, volcanoes, savanna, and the great lakes.',
    description:
      "Four national parks across a country smaller than Belgium — and one of the most diverse one-week wildlife circuits on the continent.",
    image: IMG.aerialHills,
    alt: 'Aerial view of Rwanda — the land of a thousand hills',
    places: [
      {
        name: 'Volcanoes National Park',
        location: 'Musanze',
        note: 'Mountain gorillas, golden monkeys, and the five Virunga summits.',
      },
      {
        name: 'Akagera National Park',
        location: 'Eastern Province',
        note: 'The Big Five — lions returned in 2015, rhinos in 2017, in a wild lake-and-savanna landscape.',
      },
      {
        name: 'Nyungwe National Park',
        location: 'Southern Province',
        note: "Africa's oldest rainforest, the canopy walk, 13 primate species and chimpanzees.",
      },
      {
        name: 'Gishwati-Mukura National Park',
        location: 'Western Province',
        note: "Rwanda's newest and smallest park — chimpanzees, golden monkeys, regrowing forest.",
      },
      {
        name: 'Lake Kivu',
        location: 'Western border',
        note: 'A freshwater lake the size of a small sea — coffee villages, pirogues, lakeside lodges.',
      },
      {
        name: 'Twin Lakes Burera & Ruhondo',
        location: 'Musanze',
        note: 'Mirror lakes beneath the volcanoes — boating, lakeside walks, terraced landscape.',
      },
    ],
  },
  {
    eyebrow: 'Theme · 05',
    title: 'Modern Rwanda',
    tagline: 'A new African capital you should plan three days for.',
    description:
      "Kigali is one of Africa's most design-led, safest, and walkable capitals — and worth a slow stay before or after the forests.",
    image: IMG.modernKigali,
    alt: 'Modern architecture in Kigali, Rwanda',
    places: [
      {
        name: 'Kigali Convention Centre',
        location: 'Kimihurura',
        note: 'The iconic glass dome — a symbol of the new Kigali, lit each evening.',
      },
      {
        name: 'Norrsken House Kigali',
        location: 'CBD',
        note: 'Pan-African entrepreneurship campus, café, and the city\'s sharpest co-working room.',
      },
      {
        name: 'Kimironko Market',
        location: 'Kimironko',
        note: "The everyday market — fabrics, food, life. Best with a local host.",
      },
      {
        name: 'Nyamirambo Walking Tour',
        location: 'Nyamirambo',
        note: "Hosted walks through Kigali's most multicultural neighbourhood, led by the Nyamirambo Women's Centre.",
      },
      {
        name: 'Mount Kigali',
        location: 'Western Kigali',
        note: 'A 1,853m city hike with panoramic views and a quiet lunch at the top.',
      },
      {
        name: 'Kigali Cultural Village',
        location: 'Rebero',
        note: "Traditional dance evenings, food market, and craft stalls — a relaxed Sunday option.",
      },
    ],
  },
];

/* Hero stats are derived at render time from the SiteContent global. */

const pillars: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  alt: string;
}[] = [
  {
    eyebrow: 'Pillar · 01',
    title: 'The Gorillas of Volcanoes',
    body:
      'Volcanoes National Park is the only place on Earth where you can trek to a habituated family of mountain gorillas in the morning and be home to a five-star bed by dusk. Twelve families. Eight permits per family per day. The most carefully protected wildlife encounter on the continent.',
    bullets: [
      'Habituated family treks — Susa, Agashya, Sabyinyo and more',
      'Golden monkey tracking in the same forest',
      'Karisimbi & Bisoke summit hikes',
      'Conservation researcher access at Karisoke',
    ],
    image: IMG.gorillaPortrait,
    alt: 'A young mountain gorilla in Volcanoes National Park',
  },
  {
    eyebrow: 'Pillar · 02',
    title: 'Intore, the Dance of Heroes',
    body:
      'Rwandan culture is not staged for visitors — it is alive in every village. The Intore dance was once a warrior’s preparation for battle; today it is a celebration of memory and pride. We host private performances, drumming workshops, and quiet evenings with elders who carry the country’s oral history.',
    bullets: [
      'Private Intore performances in Musanze',
      'Drum workshops with Inanga and Ingoma masters',
      'Hosted dinners with Rwandan historians',
      'Kinyarwanda language tasters',
    ],
    image: IMG.intore,
    alt: 'Rural Rwandan landscape — the green country of Intore tradition',
  },
  {
    eyebrow: 'Pillar · 03',
    title: 'Akagera — The Big Five Return',
    body:
      'A long, slow, deeply considered rewilding has brought the Big Five back to Rwanda. Lions returned in 2015, rhinos in 2017, and Akagera is now one of Africa’s most quietly impressive conservation stories — savanna, lake, papyrus swamp, and very few other vehicles.',
    bullets: [
      'Game drives across savanna and lake plains',
      'Boat safari on Lake Ihema',
      'Behind-the-scenes ranger and canine unit access',
      'Magashi Camp — the only premium lodge in the park',
    ],
    image: IMG.akageraSafari,
    alt: 'Giraffe in Akagera National Park, Rwanda',
  },
  {
    eyebrow: 'Pillar · 04',
    title: 'Nyungwe — Africa’s Oldest Rainforest',
    body:
      'A million-year-old montane forest in the southwest — 1,068 plant species, 322 bird species, 13 primates including the largest chimpanzee community in East Africa. Africa’s only suspended canopy walk swings 70 metres above the forest floor.',
    bullets: [
      'Chimpanzee tracking — habituated communities',
      'Africa’s only suspended canopy walk',
      'Colobus monkey super-groups (300+ individuals)',
      'Tea estate visits and forest waterfalls',
    ],
    image: IMG.nyungweForest,
    alt: 'Nyungwe rainforest canopy in Rwanda',
  },
  {
    eyebrow: 'Pillar · 05',
    title: 'Lake Kivu — A Quiet Pause',
    body:
      'A freshwater lake the size of a small sea, on the western border with the DRC. Coffee villages, fishing pirogues that sing at dawn, twin-island retreats, and the gentle pace that every good Rwandan itinerary needs in the middle.',
    bullets: [
      'Kibuye and Gisenyi lakeside stays',
      'Coffee co-operative visits and washing-station tours',
      'Pirogue boat charters at golden hour',
      'Congo Nile Trail — walking or cycling',
    ],
    image: IMG.lakeKivu,
    alt: 'A traditional pirogue on Lake Kivu, Rwanda',
  },
  {
    eyebrow: 'Pillar · 06',
    title: 'Kigali — Africa, Quietly Reimagined',
    body:
      'The cleanest capital in Africa, the safest country on the continent for solo travellers, and a design-led city worth its own three days. Memorial, museum, market, ateliers, hosted dinners with curators — Kigali is where every Rwandan journey should begin and end.',
    bullets: [
      'Kigali Genocide Memorial — privately hosted',
      'Inema Arts Centre & emerging studios',
      'Niyo Cultural Centre and Caplaki market',
      'Hosted dinners with writers and curators',
    ],
    image: IMG.kigali,
    alt: 'Kigali, the capital of Rwanda',
  },
];

const facts: { k: string; v: string }[] = [
  { k: 'Capital', v: 'Kigali' },
  { k: 'Population', v: '~13.5 million' },
  { k: 'Languages', v: 'Kinyarwanda · English · French · Swahili' },
  { k: 'Currency', v: 'Rwandan Franc (RWF) · USD widely accepted' },
  { k: 'Visa', v: 'On arrival / e-visa · USD 50' },
  { k: 'Time zone', v: 'Central Africa Time (UTC+2)' },
  { k: 'Climate', v: 'Temperate · 18 – 27 °C year-round' },
  { k: 'Plug', v: 'Type C / J · 230 V · 50 Hz' },
  { k: 'Drive', v: 'Right-hand side · valid licence required' },
  { k: 'Main gateway', v: 'Kigali International (KGL) · 30 min from CBD' },
];

const seasons: {
  span: string;
  name: string;
  body: string;
  best: string[];
}[] = [
  {
    span: 'Jun – Sep',
    name: 'Long dry season',
    body:
      'The classic, golden-light window. Drier trails into Volcanoes, easier chimp tracking in Nyungwe, prime Akagera game viewing. Lodges fill 8 – 10 months ahead.',
    best: ['Gorillas', 'Chimps', 'Safari'],
  },
  {
    span: 'Oct – Nov',
    name: 'Short rains',
    body:
      'Short, sharp afternoon rains. Far fewer travellers, deeply photogenic light, lush forest. A favourite of our designers for quieter, more intimate journeys.',
    best: ['Photography', 'Birding', 'Honeymoon'],
  },
  {
    span: 'Dec – Feb',
    name: 'Short dry season',
    body:
      'The second prime window — warm days, clear skies, festive. Holiday demand is high, so we book this season earliest.',
    best: ['Gorillas', 'Family travel', 'Festive'],
  },
  {
    span: 'Mar – May',
    name: 'Long rains',
    body:
      'Lush, dramatic, and almost empty. Trails are slippery and treks more demanding, but the photography is unrivalled and lodge rates ease.',
    best: ['Active travellers', 'Off-peak rates', 'Birding'],
  },
];

/* ────────────────────────────────────────────────────────────
   MOTION
   ──────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */
export default function VisitRwandaView({
  tours,
  siteContent,
  featuredTestimonial,
}: {
  tours: Tour[];
  siteContent: SiteContent;
  featuredTestimonial: Testimonial | null;
}) {
  const heroStats = [
    siteContent.mountainGorillas && {
      value: siteContent.mountainGorillas,
      label: 'Mountain gorillas (and counting)',
    },
    siteContent.gorillaFamilies && {
      value: siteContent.gorillaFamilies,
      label: 'Gorilla families · Volcanoes NP',
    },
    siteContent.nationalParks && {
      value: siteContent.nationalParks,
      label: 'National parks',
    },
    siteContent.hills && {
      value: siteContent.hills,
      label: 'Hills · the country’s nickname',
    },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteContent.visitRwandaHeroImage || IMG.heroSilverback}
            alt="A silverback mountain gorilla in Volcanoes National Park, Rwanda"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto max-w-[1280px] px-6 pb-10 lg:px-10 lg:pb-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-5xl text-white"
            >
              {/* Wordmark */}
              <motion.div
                variants={reveal}
                className="mb-9 inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/5 px-4 py-2 backdrop-blur"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F58220] text-[0.55rem] font-bold tracking-widest">
                  VR
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5em]">
                  Visit Rwanda · Official partner
                </span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(3rem,9.5vw,9rem)] leading-[0.9] tracking-[-0.05em]"
              >
                <span className="block font-light">Visit</span>
                <span className="block font-bold text-[#F58220]">Rwanda.</span>
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-8 max-w-xl text-balance text-xl leading-9 text-white/85 lg:text-2xl lg:leading-10"
              >
                A small, considered country of forested volcanoes, glassy lakes, and the world’s
                most carefully protected primates — the land of a thousand hills.
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-7">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
                >
                  Plan your Rwanda trip
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/destinations/rwanda"
                  className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/90 transition hover:text-[#F58220]"
                >
                  <span className="relative pb-1">
                    View Rwanda tours
                    <span className="absolute -bottom-0 left-0 h-px w-full bg-white/40 transition group-hover:bg-[#F58220]" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero stats — only render when any are set in admin */}
            {heroStats.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
                className={`mt-10 grid grid-cols-2 gap-px border-t border-white/15 pt-6 sm:grid-cols-${Math.min(heroStats.length, 4)}`}
              >
                {heroStats.map((s) => (
                  <li key={s.label} className="px-1 py-1 text-white">
                    <p className="text-3xl font-light tracking-tight sm:text-4xl">{s.value}</p>
                    <p className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/65">
                      {s.label}
                    </p>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          MANIFESTO
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="grid gap-14 lg:grid-cols-[0.32fr_1fr] lg:gap-20"
          >
            <motion.div variants={reveal} className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                Why Rwanda
                <br />
                <span className="text-neutral-400">Index · 01</span>
              </span>
            </motion.div>

            <motion.p
              variants={reveal}
              className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
            >
              Few countries are so easy to fall in love with. Rwanda is the{' '}
              <span className="font-bold text-[#F58220]">safest</span> country we work in, the
              easiest to enter, and home to one of the most quietly impressive conservation stories
              on the continent — written in <span className="italic">a single generation</span>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          SIX PILLARS — alternating editorial blocks
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px] space-y-16 lg:space-y-20">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-9 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Index · 02 — The six Rwandas
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                <span className="font-bold">Six countries</span>{' '}
                <span className="font-light">inside one.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">
              Most travellers see two — gorillas and Kigali. The Rwanda we design is six places,
              stitched together at the pace of the road.
            </p>
          </motion.header>

          {pillars.map((p, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`relative isolate aspect-[4/5] overflow-hidden rounded-sm ${
                    flipped ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                    {p.eyebrow}
                  </span>
                </div>

                <div className={`space-y-7 ${flipped ? 'lg:order-1' : ''}`}>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                    {p.eyebrow}
                  </p>
                  <h3 className="text-balance text-[clamp(2rem,4vw,3rem)] font-light leading-[1.04] tracking-[-0.025em] text-neutral-950">
                    {p.title}
                  </h3>
                  <p className="max-w-lg text-lg leading-9 text-neutral-700">{p.body}</p>
                  <ul className="space-y-px pt-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-4 border-t border-neutral-200 py-3.5 text-[0.95rem] leading-7 text-neutral-800 last:border-b"
                      >
                        <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#F58220]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          PLACES BY CATEGORY — Cultural, History, Memory, Nature, Modern
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Index · 03 — Directory
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                <span className="font-light">Places to visit,</span>{' '}
                <span className="font-bold">by theme.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">
              Use this directory to begin a shortlist — every itinerary we design is a slow,
              considered selection from these places.
            </p>
          </motion.header>

          {/* Category tab row — anchor links to each category */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 flex flex-wrap items-center gap-2 border-y border-neutral-200 py-4"
          >
            <span className="mr-3 text-[0.58rem] font-medium uppercase tracking-[0.4em] text-neutral-400">
              Jump to
            </span>
            {placeCategories.map((c) => (
              <a
                key={c.title}
                href={`#cat-${c.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-neutral-700 transition hover:border-[#F58220] hover:text-[#F58220]"
              >
                <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                {c.title}
              </a>
            ))}
          </motion.div>

          <div className="space-y-16 lg:space-y-20">
            {placeCategories.map((cat) => (
              <motion.article
                key={cat.title}
                id={`cat-${cat.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-28 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
              >
                {/* LEFT — sticky image + category meta */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="relative isolate aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(min-width: 1024px) 460px, 100vw"
                      className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                        {cat.eyebrow}
                      </p>
                      <h3 className="mt-2 text-balance text-3xl font-light leading-tight tracking-tight lg:text-4xl">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.32em] text-white/75">
                        {String(cat.places.length).padStart(2, '0')} places
                      </p>
                    </div>
                  </div>
                  <p className="mt-7 text-base leading-8 text-neutral-700">{cat.tagline}</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{cat.description}</p>
                </div>

                {/* RIGHT — places list */}
                <ul className="space-y-px">
                  {cat.places.map((place, i) => (
                    <li
                      key={place.name}
                      className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-neutral-200 py-6 last:border-b sm:gap-7"
                    >
                      <span className="pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-2">
                        <p className="text-balance text-xl font-light leading-snug tracking-tight text-neutral-950">
                          {place.name}
                        </p>
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
                          {place.location}
                        </p>
                        <p className="text-[0.95rem] leading-7 text-neutral-600">{place.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          COUNTRY AT A GLANCE
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                Index · 04 — Practical
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                Rwanda <span className="font-bold">at a glance.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">
              Everything you’d ask a friend before you book — the practical details we get asked
              most.
            </p>
          </motion.header>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-2">
            {facts.map((f) => (
              <li key={f.k} className="bg-white px-8 py-7">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                  {f.k}
                </p>
                <p className="mt-2.5 text-lg font-medium text-neutral-950">{f.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          WHEN TO VISIT
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-950 px-6 py-32 text-white lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-5">
                <span className="inline-block h-px w-10 bg-[#F58220]" />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-white/55">
                  Index · 05 — Seasons
                </span>
              </div>
              <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] font-light leading-[1.02] tracking-[-0.03em]">
                When to <span className="font-bold text-[#F58220]">visit Rwanda.</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-white/70">
                Rwanda is a year-round country, but each season has its own personality. Our
                designers shape every itinerary around the rhythm of the trees, not the brochure.
              </p>
            </div>

            <ol className="space-y-px">
              {seasons.map((s, i) => (
                <motion.li
                  key={s.span}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
                  className="border-t border-white/10 py-9 first:border-t-0 first:pt-0"
                >
                  <div className="grid items-start gap-8 sm:grid-cols-[0.22fr_1fr]">
                    <div>
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                        {s.span}
                      </p>
                      <p className="mt-3 text-xl font-light tracking-tight">{s.name}</p>
                    </div>
                    <div>
                      <p className="text-base leading-8 text-white/75">{s.body}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.best.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/85 backdrop-blur"
                          >
                            <span className="h-1 w-1 rounded-full bg-[#F58220]" />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CURATED RWANDA TOURS
         ═════════════════════════════════════════════════════════ */}
      {tours.length > 0 && (
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-9 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Index · 06 — Curated
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                  Our <span className="font-bold">Rwanda</span> routes.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-neutral-600">
                Each route is a starting point — bring us your dates and we tune the lodges, pace,
                and order around the way you travel.
              </p>
            </motion.header>

            <ul className="grid gap-6 md:grid-cols-2">
              {tours.map((t, i) => (
                <motion.li
                  key={t.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <Link
                    href={`/destinations/rwanda/tours/${t.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-sm bg-white ring-1 ring-neutral-200 transition hover:ring-[#F58220]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {t.image && (
                        <Image
                          src={t.image}
                          alt={t.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                        {String(i + 1).padStart(2, '0')} · {t.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-8">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        <span>{t.duration}</span>
                        <span className="text-neutral-300">·</span>
                        <span>{t.pace}</span>
                        <span className="text-neutral-300">·</span>
                        <span>{t.group}</span>
                      </div>
                      <h3 className="text-balance text-2xl font-light leading-tight tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                        {t.title}
                      </h3>
                      <p className="text-sm leading-7 text-neutral-600">{t.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#F58220] transition group-hover:gap-3">
                        Open route
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <Link
                href="/destinations/rwanda"
                className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#F58220] hover:text-[#F58220]"
              >
                See all Rwanda tours
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          GUEST QUOTE — only renders when a featured testimonial exists
         ═════════════════════════════════════════════════════════ */}
      {featuredTestimonial && (
        <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative isolate hidden aspect-[4/5] overflow-hidden rounded-sm lg:block"
              >
                <Image
                  src={featuredTestimonial.image || IMG.kigaliStreet}
                  alt={featuredTestimonial.attribution}
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                className="space-y-10"
              >
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                  Guest story
                </span>
                <blockquote className="text-balance text-[clamp(1.85rem,3.6vw,3.1rem)] font-light leading-[1.18] tracking-[-0.02em] text-neutral-950">
                  <span className="text-[#F58220]">“</span>
                  {featuredTestimonial.quote}
                  <span className="text-[#F58220]">.”</span>
                </blockquote>
                <figcaption className="flex items-center gap-5">
                  <span className="h-px w-10 bg-neutral-300" />
                  <div>
                    <p className="text-base font-medium text-neutral-950">
                      {featuredTestimonial.attribution}
                    </p>
                    {featuredTestimonial.context && (
                      <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        {featuredTestimonial.context}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          FINAL CTA
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-10 lg:py-40">
        <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-50" aria-hidden />
        <div className="glow-orb -right-32 top-1/4 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={stagger}
            className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-8">
              <motion.p
                variants={reveal}
                className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]"
              >
                Begin
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">A privately designed Rwanda journey,</span>
                <br />
                <span className="font-bold text-[#F58220]">tuned to the way you travel.</span>
              </motion.h2>
            </div>

            <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                Inquire Now
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/destinations/rwanda"
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#F58220]"
              >
                <span className="relative pb-1">
                  Browse Rwanda tours
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/30 transition group-hover:bg-[#F58220]" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
