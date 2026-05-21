import Image from 'next/image';
import Link from 'next/link';

const HANDLE = 'soulexpeditionsafrica';

const socials = [
  { label: 'Instagram', href: `https://instagram.com/${HANDLE}` },
  { label: 'Facebook', href: `https://facebook.com/${HANDLE}` },
  { label: 'YouTube', href: `https://youtube.com/@${HANDLE}` },
  { label: 'TikTok', href: `https://tiktok.com/@${HANDLE}` },
  { label: 'X', href: `https://x.com/${HANDLE}` },
] as const;

type SocialName = (typeof socials)[number]['label'];

function SocialIcon({ name, className = '' }: { name: SocialName; className?: string }) {
  switch (name) {
    case 'Instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.29 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={className}
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.06A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.36z" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      );
    default:
      return null;
  }
}

const groups = [
  {
    title: 'Expeditions',
    links: [
      { label: 'Gorilla Trekking', href: '/expeditions/gorilla-trekking' },
      { label: 'Great Migration', href: '/expeditions/great-migration' },
      { label: 'Cultural Heritage', href: '/expeditions/cultural-heritage' },
      { label: 'Indian Ocean Escape', href: '/expeditions/indian-ocean-escape' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Rwanda', href: '/destinations/rwanda' },
      { label: 'Tanzania', href: '/destinations/tanzania' },
      { label: 'Kenya', href: '/destinations/kenya' },
      { label: 'Uganda', href: '/destinations/uganda' },
      { label: 'Botswana', href: '/destinations/botswana' },
      { label: 'Zanzibar', href: '/destinations/zanzibar' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Journal', href: '/#journal' },
      { label: 'Press', href: '/#press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
      <div className="absolute -left-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#F58220]/15 blur-[120px]" aria-hidden />
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 py-20 lg:grid-cols-[1.1fr_2fr] lg:px-10">
        <div className="space-y-7">
          <Link href="/" className="inline-flex items-center" aria-label="Soul Expeditions Africa — home">
            <Image
              src="/logos/logo-02.png"
              alt="Soul Expeditions Africa"
              width={480}
              height={180}
              className="h-28 w-auto object-contain brightness-0 invert lg:h-32"
            />
          </Link>
          <p className="max-w-md text-base leading-8 text-white/70">
            Privately designed safaris, gorilla encounters, cultural journeys, and coastal escapes —
            crafted in Africa, for travellers who measure a trip in stories, not stops.
          </p>
          <div className="space-y-2 text-sm leading-7 text-white/65">
            <p>KG 7 Avenue, Kigali — Rwanda</p>
            <p>
              <a href="tel:+250783140000" className="transition hover:text-white">
                +250 783 140 000
              </a>{' '}
              ·{' '}
              <a href="mailto:info@soulexpeditionsafrica.com" className="transition hover:text-white">
                info@soulexpeditionsafrica.com
              </a>
            </p>
          </div>
          <div className="pt-2">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/45">
              Follow · @{HANDLE}
            </p>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Soul Expeditions Africa on ${s.label}`}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#F58220] hover:bg-[#F58220] hover:text-white"
                >
                  <SocialIcon name={s.label} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="space-y-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#F58220]">
                {group.title}
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-3 px-6 py-7 text-[0.72rem] uppercase tracking-[0.32em] text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Soul Expeditions Africa · All rights reserved.</p>
          <p>Crafted in Kigali. Designed for the world.</p>
        </div>
      </div>
    </footer>
  );
}
