'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import type { Partner, SiteContent } from '@/shared/lib/types';

type HomeViewProps = {
  siteContent: SiteContent;
  partners: Partner[];
};

/* ──────────────────────────────────────────────────────────────
   MOTION HELPERS
   ────────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const inView = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, margin: '-12% 0px' },
};

/* ──────────────────────────────────────────────────────────────
   PAGE CONTENT
   Client-supplied copy. Not yet CMS-editable — see notes in the
   SiteContent global if/when these move into /admin.
   ────────────────────────────────────────────────────────────── */

/* Hero — cross-fading images of East African places, culture & nature. */
const HERO_IMAGES = [
  { src: '/images/uploads/home_hero1.jpeg', place: 'Volcanoes National Park', country: 'Rwanda' },
  { src: '/images/uploads/intore.jpg', place: 'Intore dancers', country: 'Rwanda' },
  { src: '/images/uploads/Uganda-tourism.jpg', place: 'Murchison Falls', country: 'Uganda' },
  { src: '/images/uploads/TanzaniaCoverImage.avif', place: 'The Serengeti', country: 'Tanzania' },
  { src: '/images/uploads/kenyaCoverImage.avif', place: 'Maasai Mara', country: 'Kenya' },
  { src: '/images/uploads/ZanzibarTourism.jpg', place: 'Stone Town & the coast', country: 'Zanzibar' },
  { src: '/images/uploads/homehero2.jpg', place: 'Lake Kivu', country: 'Rwanda' },
];

/* Essential Traveler Facts at a Glance */
const FACT_COLUMNS = [
  'Destination',
  'Capital',
  'Currency',
  'Official / Major Languages',
  'Time Zone',
  'Best Time to Visit',
] as const;

const FACT_ROWS: { flagship?: boolean; cells: string[] }[] = [
  {
    flagship: true,
    cells: [
      'Rwanda',
      'Kigali',
      'Rwandan Franc (RWF)',
      'Kinyarwanda, English, French, Swahili',
      'CAT (UTC+2)',
      'June – September & December – February (Dry seasons)',
    ],
  },
  {
    cells: [
      'Uganda',
      'Kampala',
      'Ugandan Shilling (UGX)',
      'English, Swahili, Luganda',
      'EAT (UTC+3)',
      'June – August & December – February',
    ],
  },
  {
    cells: [
      'Tanzania',
      'Dodoma (Commercial hub: Dar es Salaam)',
      'Tanzanian Shilling (TZS)',
      'Swahili, English',
      'EAT (UTC+3)',
      'June – October (Migration & Dry season)',
    ],
  },
  {
    cells: [
      'Kenya',
      'Nairobi',
      'Kenyan Shilling (KES)',
      'Swahili, English',
      'EAT (UTC+3)',
      'July – October (Mara Migration) & Jan – March',
    ],
  },
];

/* Our Flagship Destination: Rwanda — quick orientation figures */
/* Cross-fades a place's frames when it covers more than one location.
   A single-image place renders as a plain <Image> with no timer. */
function PlaceFrames({ images }: { images: { src: string; alt: string }[] }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length < 2) {
    return (
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition duration-700 hover:scale-105"
      />
    );
  }

  return (
    <>
      {/* The first frame is the default: rendered eagerly underneath so the
          card is never blank, with later frames cross-fading over it. */}
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />

      <AnimatePresence mode="sync">
        <motion.div
          key={images[frame].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[frame].src}
            alt={frame === 0 ? '' : images[frame].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Which of the two places is showing */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
        {images.map((img, i) => (
          <span
            key={img.src}
            aria-hidden="true"
            className={`h-1 rounded-full transition-all duration-500 ${
              i === frame ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </>
  );
}

/* Our Flagship Destination: Rwanda.
   `images` holds one or more frames — entries covering two places (Lake Kivu
   & Kigali) cross-fade between them so both are seen. */
const RWANDA_PLACES = [
  {
    title: 'Volcanoes National Park',
    body: 'Home to the endangered Mountain Gorillas and Golden Monkeys. Trek through lush bamboo forests for one of the most intimate wildlife encounters on Earth. Permits are strictly limited to eight visitors per family each day, so every encounter stays quiet and unhurried — an hour at close range in the same forests Dian Fossey made famous.',
    images: [
      {
        src: '/images/uploads/gorillaimage1.jpg',
        alt: 'A mountain gorilla in Volcanoes National Park, Rwanda',
      },
    ],
  },
  {
    title: 'Nyungwe National Park',
    body: 'One of Africa’s oldest rainforests. Experience the thrill of the suspended Canopy Walk, trek habituated Chimpanzees, and discover over 300 bird species. Untouched through the last ice age, Nyungwe shelters thirteen primate species and some 1,000 plant varieties, with tea estates falling away from the forest edge in every direction.',
    images: [
      {
        src: '/images/uploads/rwandatourism.webp',
        alt: 'Rainforest canopy in Nyungwe National Park, Rwanda',
      },
    ],
  },
  {
    title: 'Akagera National Park',
    body: 'A remarkable conservation success story where central Africa’s largest protected wetland meets rolling savanna, hosting the Big Five — Lion, Leopard, Elephant, Rhino, and Buffalo. Lions returned in 2015 and rhinos in 2017, restoring the full complement after decades; today a boat safari on Lake Ihema brings you level with hippo pods and basking crocodiles.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=85',
        alt: 'Savanna plains and wildlife in Akagera National Park, Rwanda',
      },
    ],
  },
  {
    title: 'Lake Kivu & Kigali',
    body: 'Relax along the serene, palm-fringed shores of Lake Kivu, and explore Kigali — celebrated as one of Africa’s cleanest, safest, and most dynamic capital cities. Kivu’s bays open onto the Congo Nile Trail and hillside coffee washing stations, while the capital pairs a considered memorial and a rising design and dining scene within a half-day’s drive of the volcanoes.',
    images: [
      {
        src: '/images/uploads/ABOUTusHero.jpg',
        alt: 'A wooden boat on the still waters of Lake Kivu, Rwanda',
      },
      {
        src: '/images/uploads/Kigali_Convention_center,_Rwanda.jpg',
        alt: 'The Kigali Convention Centre lit at dusk, Rwanda',
      },
    ],
  },
];

/* Expanding Across East Africa */
const EAST_AFRICA = [
  {
    index: '01',
    country: 'Uganda',
    tagline: 'The Pearl of Africa',
    body: 'With dramatic waterfalls, vast rivers, and raw wilderness, Uganda offers an adventurous spirit alongside rich biodiversity.',
    image: '/images/uploads/Uganda-tourism.jpg',
    alt: 'Wilderness landscape in Uganda',
    href: '/destinations/uganda',
    highlights: [
      {
        title: 'Bwindi Impenetrable National Park',
        body: 'A world-renowned sanctuary harbouring nearly half of the world’s mountain gorilla population.',
      },
      {
        title: 'Murchison Falls National Park',
        body: 'Watch the mighty Nile squeeze through a 7-metre gorge before plunging into the devil’s cauldron, surrounded by teeming wildlife.',
      },
      {
        title: 'Queen Elizabeth National Park',
        body: 'Famous for its tree-climbing lions in the Ishasha sector and launch cruises along the Kazinga Channel.',
      },
    ],
  },
  {
    index: '02',
    country: 'Tanzania',
    tagline: 'The Kingdom of the Serengeti & Zanzibar',
    body: 'Tanzania presents iconic safari vistas alongside the turquoise waters of the Indian Ocean.',
    image: '/images/uploads/TanzaniaCoverImage.avif',
    alt: 'The Serengeti plains at golden hour, Tanzania',
    href: '/destinations/tanzania',
    highlights: [
      {
        title: 'Serengeti National Park',
        body: 'Witness the Great Wildebeest Migration — the dramatic trek of over 1.5 million animals across vast plains.',
      },
      {
        title: 'Ngorongoro Crater',
        body: 'The world’s largest intact volcanic caldera, harbouring a dense ecosystem where wildlife thrives year-round.',
      },
      {
        title: 'Zanzibar Archipelago',
        body: 'Unwind on white-sand beaches, explore Stone Town’s historic Swahili architecture, and sail on traditional dhows.',
      },
    ],
  },
  {
    index: '03',
    country: 'Kenya',
    tagline: 'The Cradle of Safari Culture',
    body: 'Kenya is the classic safari destination, characterised by sweeping savannas, dramatic mountain backdrops, and rich cultural heritage.',
    image: '/images/uploads/kenyaCoverImage.avif',
    alt: 'Elephants on the savanna in Kenya',
    href: '/destinations/kenya',
    highlights: [
      {
        title: 'Maasai Mara National Reserve',
        body: 'World-famous for lion sightings and the high-octane Mara River crossings during the Great Migration.',
      },
      {
        title: 'Amboseli National Park',
        body: 'Capture iconic photographs of massive elephant herds set against the snow-capped peak of Mount Kilimanjaro.',
      },
      {
        title: 'Samburu & Lamu Island',
        body: 'Discover unique northern wildlife species (the Samburu Special Five) or immerse yourself in Swahili coastal history.',
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
export default function HomeView({ siteContent, partners }: HomeViewProps) {
  /* Prefer hero slides set in the CMS; fall back to the curated East African set. */
  const heroImages =
    siteContent.homeHeroSlides.length > 0 ? siteContent.homeHeroSlides : HERO_IMAGES;

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  const active = heroImages[slide];

  /* Smooth scrolling */
  useEffect(() => {
    let rafId: number;
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true, lerp: 0.08 });
    const animate = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const partnersRowOne = partners;
  const partnersRowTwo = [...partners].reverse();

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO — full-bleed rotating imagery; the copy sits on a
          translucent black panel so the photograph stays visible
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950">
        {/* Background imagery — covers the entire section */}
        <AnimatePresence>
          <motion.div
            key={active.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="ken-burns absolute inset-0 -z-20"
          >
            <Image
              src={active.src}
              alt={active.place ? `${active.place}, ${active.country}` : ''}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light scrim — grounds the panel without hiding the photograph */}
        <div className="absolute inset-0 -z-10 bg-neutral-950/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent lg:bg-gradient-to-l" />

        <div className="grid min-h-[88vh] grid-cols-1 lg:grid-cols-[1fr_minmax(0,44rem)]">
          {/* Image side — caption + slide dots only; the photograph is left clear */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[46vh] items-end p-6 lg:min-h-0 lg:p-10 xl:p-14"
          >
            <div className="flex w-full items-end justify-between gap-4">
              <div className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                {active.country && (
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
                    {active.country}
                  </p>
                )}
                {active.place && (
                  <p className="mt-2 text-lg font-light tracking-tight">{active.place}</p>
                )}
              </div>
              {heroImages.length > 1 && (
                <div className="flex shrink-0 gap-1.5">
                  {heroImages.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setSlide(i)}
                      aria-label={`Show ${img.place || `image ${i + 1}`}`}
                      aria-current={i === slide}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === slide ? 'w-7 bg-[#F58220]' : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Copy — translucent black holder; the image still reads through it.
              From lg up it becomes a true circle, so the padding is a percentage
              of its own width and the text centres to follow the curve. Below lg
              a circle can't hold this much copy, so it stays a full-bleed block. */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center bg-neutral-950/60 px-6 py-14 backdrop-blur-[3px] lg:aspect-square lg:place-self-center lg:rounded-full lg:px-[15%] lg:py-[15%] lg:text-center"
          >
            <motion.p
              variants={reveal}
              className="flex items-center gap-4 text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-[#F58220] lg:justify-center"
            >
              <span className="inline-block h-px w-10 bg-[#F58220]" />
              Soul Expeditions Africa
            </motion.p>

            <motion.h1
              variants={reveal}
              className="mt-7 text-balance text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.035em] text-white lg:mt-6 lg:text-[clamp(1.9rem,2.7vw,2.7rem)]"
            >
              <span className="font-light">Discover the Heart and Soul of </span>
              <span className="font-bold text-[#F58220]">Rwanda</span>
              <span className="font-light"> and other East African countries</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-8 max-w-xl text-base leading-8 text-white/75 lg:mt-6 lg:max-w-none lg:text-[0.95rem] lg:leading-7"
            >
              At Soul Expeditions Africa, we curate high-end, bespoke travel experiences across East
              Africa. Rooted in deep local expertise and refined global hospitality standards, our
              journeys connect you directly with the region’s breathtaking landscapes, rare wildlife,
              and rich cultural heritage.
            </motion.p>

            <motion.p
              variants={reveal}
              className="mt-6 max-w-xl text-base leading-8 text-white/75 lg:mt-4 lg:max-w-none lg:text-[0.95rem] lg:leading-7"
            >
              Whether you wish to immerse yourself in a single extraordinary country or connect the
              highlights of East Africa on a seamless multi-country expedition, every itinerary is
              custom-designed around your desires.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          ESSENTIAL TRAVELER FACTS
         ═════════════════════════════════════════════════════════ */}
      <section className="border-y border-neutral-200/80 bg-neutral-50/70 px-6 py-12 lg:px-10 lg:py-16">
        <motion.div {...inView} variants={stagger} className="mx-auto max-w-[1280px]">
          <motion.div variants={reveal} className="flex items-start gap-5">
            <span className="mt-4 inline-block h-px w-10 shrink-0 bg-[#F58220]" />
            <div>
              <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.08] tracking-[-0.03em] text-neutral-950">
                <span className="font-bold">Essential Traveler Facts</span>{' '}
                <span className="font-light">at a Glance</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
                Before embarking on your journey, here are key facts every traveller should know
                when visiting our destination countries.
              </p>
            </div>
          </motion.div>

          {/* Wide table — scrolls horizontally on small screens */}
          <motion.div
            variants={reveal}
            className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <caption className="sr-only">
                  Capital, currency, languages, time zone, and best time to visit for each
                  destination country
                </caption>
                <thead>
                  <tr className="bg-neutral-950">
                    {FACT_COLUMNS.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`px-5 py-5 align-bottom text-[0.72rem] font-bold uppercase tracking-[0.22em] ${
                          i === 0 ? 'text-[#F58220]' : 'border-l border-white/10 text-white'
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FACT_ROWS.map((row, r) => (
                    <tr
                      key={row.cells[0]}
                      className={`border-b border-neutral-200 align-top last:border-b-0 transition ${
                        row.flagship
                          ? 'bg-[#F58220]/[0.06] hover:bg-[#F58220]/[0.1]'
                          : r % 2 === 1
                            ? 'bg-neutral-50/60 hover:bg-neutral-100/70'
                            : 'hover:bg-neutral-50'
                      }`}
                    >
                      {row.cells.map((cell, i) => (
                        <td
                          key={`${row.cells[0]}-${i}`}
                          className={`px-5 py-5 text-[0.95rem] font-semibold leading-6 ${
                            i === 0
                              ? `border-l-[3px] text-[1.05rem] font-bold text-neutral-950 ${
                                  row.flagship ? 'border-l-[#F58220]' : 'border-l-transparent'
                                }`
                              : 'border-l border-neutral-200/70 text-neutral-800'
                          }`}
                        >
                          {cell}
                          {i === 0 && row.flagship && (
                            <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-[#F58220] px-2.5 py-1 align-middle text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white">
                              Flagship
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          OUR FLAGSHIP DESTINATION — RWANDA
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-10 lg:px-10 lg:py-14" id="rwanda">
        <div className="mx-auto max-w-[1280px]">
          <motion.div {...inView} variants={stagger} className="max-w-3xl">
            <motion.p
              variants={reveal}
              className="flex items-center gap-4 text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-[#F58220]"
            >
              <span className="inline-block h-px w-10 bg-[#F58220]" />
              Our flagship destination
            </motion.p>
            <motion.h2
              variants={reveal}
              className="mt-6 text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.035em] text-neutral-950"
            >
              <span className="font-bold text-[#F58220]">Rwanda</span>{' '}
              <span className="font-light">— The Land of a Thousand Hills</span>
            </motion.h2>
            <motion.p variants={reveal} className="mt-7 text-base leading-8 text-neutral-600">
              Rwanda is a triumph of conservation, safety, and boutique luxury. Compact yet
              extraordinarily diverse, it allows travellers to transition from vibrant urban culture
              to high-altitude mist forests and savanna plains in a matter of hours.
            </motion.p>

            <motion.p variants={reveal} className="mt-6 text-base leading-8 text-neutral-600">
              Few destinations reward the traveller so generously for so little time in transit. No
              internal flights, no punishing transfers — just a single scenic road unfolding between
              terraced hillsides, crater lakes, and rainforest. It is a country you can read in a
              week and remember for a lifetime.
            </motion.p>

            <motion.p variants={reveal} className="mt-6 text-base leading-8 text-neutral-600">
              Every journey we design here is anchored by permits secured well in advance, guides who
              were born on these hills, and lodges chosen for the view from the bath as much as the
              service at the door.
            </motion.p>
          </motion.div>

          {/* Zigzag rows */}
          <div className="mt-9 space-y-9 lg:mt-12 lg:space-y-12">
            {RWANDA_PLACES.map((place, i) => (
              <motion.article
                {...inView}
                variants={stagger}
                key={place.title}
                className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10"
              >
                <motion.div
                  variants={reveal}
                  className={`group relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-100 ${
                    i % 2 === 1 ? 'lg:order-last' : ''
                  }`}
                >
                  <PlaceFrames images={place.images} />
                </motion.div>

                {/* Copy starts on the same line as the top of the image */}
                <motion.div variants={reveal} className="lg:pt-1">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-[#F58220]">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.6vw,2.1rem)] font-light tracking-tight text-neutral-950">
                    {place.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{place.body}</p>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          EXPANDING ACROSS EAST AFRICA
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-950 px-6 py-14 text-white lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <motion.div {...inView} variants={stagger} className="max-w-3xl">
            <motion.p
              variants={reveal}
              className="flex items-center gap-4 text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-[#F58220]"
            >
              <span className="inline-block h-px w-10 bg-[#F58220]" />
              Beyond our sanctuary
            </motion.p>
            <motion.h2
              variants={reveal}
              className="mt-6 text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.035em]"
            >
              <span className="font-light">Expanding across</span>{' '}
              <span className="font-bold text-[#F58220]">East Africa.</span>
            </motion.h2>
            <motion.p variants={reveal} className="mt-7 text-base leading-8 text-white/70">
              While Rwanda is our sanctuary, our expertise spans across East Africa’s most
              celebrated safari landscapes.
            </motion.p>
          </motion.div>

          <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
            {EAST_AFRICA.map((c, i) => (
              <motion.article
                {...inView}
                variants={stagger}
                key={c.country}
                className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
              >
                {/* Country image card */}
                <motion.div
                  variants={reveal}
                  className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-900 lg:aspect-auto lg:min-h-[380px] ${
                    i % 2 === 1 ? 'lg:order-last' : ''
                  }`}
                >
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.36em] text-[#F58220]">
                      {c.index}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-tight">
                      {c.country}
                    </h3>
                    <p className="mt-1 text-sm font-light text-white/75">{c.tagline}</p>
                  </div>
                </motion.div>

                {/* Highlights */}
                <motion.div variants={reveal} className="flex flex-col justify-center">
                  <p className="text-base leading-8 text-white/70">{c.body}</p>

                  <ul className="mt-9 space-y-7">
                    {c.highlights.map((h) => (
                      <li key={h.title} className="border-t border-white/10 pt-6">
                        {/* Park names carry the accent so they read apart from the body copy */}
                        <h4 className="text-[1.15rem] font-semibold tracking-tight text-[#F58220]">
                          {h.title}
                        </h4>
                        <p className="mt-2.5 text-sm leading-7 text-white/60">{h.body}</p>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={c.href}
                    className="group mt-9 inline-flex w-fit items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70 transition hover:text-[#F58220]"
                  >
                    Explore {c.country}
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          PARTNERS — only renders when partners exist in admin
         ═════════════════════════════════════════════════════════ */}
      {partners.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-neutral-50/60 py-10 lg:py-14">
          <div className="mx-auto mb-10 max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
            >
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#F58220]" />
                <div>
                  <p className="text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-[#F58220]">
                    Lodge & camp partners
                  </p>
                  <h2 className="mt-3 text-balance text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.06] tracking-[-0.03em] text-neutral-950">
                    <span className="font-bold">The finest names</span>{' '}
                    <span className="font-light">in African hospitality.</span>
                  </h2>
                </div>
              </div>
              <p className="max-w-md text-base leading-8 text-neutral-600">
                Twenty years of relationships with the lodges, camps, and houses that quietly raise
                the standard across the continent.
              </p>
            </motion.div>
          </div>

          {/* Row 1 — scrolls right-to-left */}
          <div className="marquee-row marquee-shell">
            <div className="marquee-track">
              {[...partnersRowOne, ...partnersRowOne, ...partnersRowOne].map((p, i) => (
                <span
                  key={`r1-${p.name}-${i}`}
                  className="inline-flex h-16 items-center px-8 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 lg:h-20 lg:px-10"
                >
                  {p.logo && (
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={240}
                      height={120}
                      className="h-full w-auto object-contain"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls left-to-right (reverse) */}
          <div className="marquee-row marquee-shell mt-4">
            <div className="marquee-track-reverse">
              {[...partnersRowTwo, ...partnersRowTwo, ...partnersRowTwo].map((p, i) => (
                <span
                  key={`r2-${p.name}-${i}`}
                  className="inline-flex h-16 items-center px-8 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 lg:h-20 lg:px-10"
                >
                  {p.logo && (
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={240}
                      height={120}
                      className="h-full w-auto object-contain"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          BEGIN YOUR JOURNEY — closing CTA
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-neutral-950 text-white lg:min-h-[480px]">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          {siteContent.homeCtaImage && (
            <Image
              src={siteContent.homeCtaImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
        </motion.div>

        <div className="relative w-full px-6 pb-14 pt-24 lg:px-10 lg:pb-20 lg:pt-32">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              {...inView}
              variants={stagger}
              className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
            >
              <div className="space-y-6">
                <motion.p
                  variants={reveal}
                  className="flex items-center gap-4 text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-[#F58220]"
                >
                  <span className="inline-block h-px w-12 bg-[#F58220]" />
                  Begin your journey
                </motion.p>
                <motion.h2
                  variants={reveal}
                  className="text-balance text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.06] tracking-[-0.035em]"
                >
                  <span className="font-light">
                    We take care of every detail — from private gorilla permits to expert guides —
                  </span>{' '}
                  <span className="font-bold text-[#F58220]">
                    so your safari is effortless and deeply personal.
                  </span>
                </motion.h2>

                <motion.div
                  variants={reveal}
                  className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[0.62rem] uppercase tracking-[0.32em] text-white/65"
                >
                  {siteContent.studioPhone && (
                    <a
                      href={`tel:${siteContent.studioPhone.replace(/[^\d+]/g, '')}`}
                      className="transition hover:text-white"
                    >
                      {siteContent.studioPhone}
                    </a>
                  )}
                  {siteContent.studioPhone && siteContent.studioEmail && (
                    <span className="hidden h-px w-8 bg-white/25 sm:block" aria-hidden />
                  )}
                  {siteContent.studioEmail && (
                    <a
                      href={`mailto:${siteContent.studioEmail}`}
                      className="transition hover:text-white"
                    >
                      {siteContent.studioEmail}
                    </a>
                  )}
                </motion.div>
              </div>

              <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
                <Link
                  href="/destinations"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#F58220] px-9 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-neutral-950"
                >
                  Explore Our Signature Itineraries
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-9 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/85 transition hover:border-[#F58220] hover:text-[#F58220]"
                >
                  Speak with Our Luxury Travel Specialists
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
