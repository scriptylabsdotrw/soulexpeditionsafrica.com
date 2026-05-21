import Image from 'next/image';
import Link from 'next/link';

const nav = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3 lg:px-10 lg:py-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Soul Expeditions Africa — home"
        >
          <Image
            src="/logos/logo-01.png"
            alt="Soul Expeditions Africa"
            width={480}
            height={144}
            priority
            className="h-20 w-auto object-contain lg:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-9 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-slate-600 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#F58220] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
        >
          Plan a Journey
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
