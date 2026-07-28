'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SubItem = { label: string; href: string };

type NavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'mega'; label: string };

const nav: NavItem[] = [
  { kind: 'link', label: 'About Us', href: '/about' },
  { kind: 'mega', label: 'Tours' },
  { kind: 'link', label: 'Journal', href: '/journal' },
];

const toursFeatured: {
  title: string;
  eyebrow?: string;
  href: string;
  blurb: string;
}[] = [
  {
    eyebrow: 'Our Speciality',
    title: 'Rwanda',
    href: '/destinations/rwanda',
    blurb:
      'The heartbeat of every Soul journey — gorillas, glassy lakes, mist-laced hills and the country we call home.',
  },
  {
    title: 'EAC Destinations',
    href: '/destinations',
    blurb:
      'Cross-border adventures across the East African Community — Uganda, Kenya, Tanzania, Burundi & the DRC.',
  },
];

const toursGroups: { title: string; items: SubItem[] } = {
  title: 'Groups',
  items: [
    { label: 'Church & Mission', href: '/tours/church-mission' },
    { label: 'Schools', href: '/tours/schools' },
    { label: 'Leadership', href: '/tours/leadership' },
    { label: 'Immersion Programs', href: '/tours/immersion' },
    { label: 'Corporate', href: '/tours/corporate' },
  ],
};

const toursSpecialInterest: { title: string; items: SubItem[] } = {
  title: 'Special Interest',
  items: [
    { label: 'Philanthropy', href: '/tours/philanthropy' },
    { label: 'Arts & Design', href: '/tours/arts-design' },
    { label: 'Honeymoon', href: '/tours/honeymoon' },
    { label: 'History', href: '/tours/history' },
    { label: 'Active', href: '/tours/active' },
    { label: 'Volunteering', href: '/tours/volunteering' },
    { label: 'LGBTQ+', href: '/tours/lgbtq' },
  ],
};

// Groups now occupies the slot where Special Interest used to be (column 3),
// and Special Interest moves into the slot where Groups used to be (column 4).
const toursLists: { title: string; items: SubItem[] }[] = [
  toursGroups,
  toursSpecialInterest,
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileToursOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 lg:px-6 lg:py-4 xl:px-10">
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
              className="h-20 w-auto object-contain sm:h-24 xl:h-28"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-slate-700 lg:flex xl:gap-9 xl:text-[1rem] xl:tracking-[0.16em] 2xl:gap-11"
          >
            {nav.map((item) =>
              item.kind === 'mega' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="tours-mega"
                    onFocus={openMega}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`inline-flex items-center gap-1.5 text-inherit uppercase tracking-[inherit] transition hover:text-slate-950 ${
                      megaOpen ? 'text-slate-950' : ''
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-[0.7rem] transition ${
                        megaOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/visit-rwanda"
              aria-label="Visit Rwanda"
              className="hidden shrink-0 items-center sm:inline-flex"
            >
              <Image
                src="/logos/visit_rwanda-logo.png"
                alt="Visit Rwanda"
                width={120}
                height={48}
                className="h-9 w-auto object-contain lg:h-10"
              />
            </Link>
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#F58220] px-7 py-3 text-[0.86rem] font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition hover:bg-[#ff9d2e] sm:inline-flex"
            >
              Enquire Now
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F58220] px-5 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition hover:bg-[#ff9d2e] sm:hidden"
              aria-label="Enquire now"
            >
              Enquire
              <span aria-hidden="true">→</span>
            </Link>

            {/* Hamburger — visible below lg */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 transition hover:border-neutral-400 lg:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ease-out ${
                  open ? 'translate-y-0 rotate-45' : '-translate-y-[5px]'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-200 ${
                  open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition duration-300 ease-out ${
                  open ? 'translate-y-0 -rotate-45' : 'translate-y-[5px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ─────────── DESKTOP MEGA MENU (Tours) ─────────── */}
        <div
          id="tours-mega"
          role="region"
          aria-label="Tours"
          aria-hidden={!megaOpen}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className={`absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-200 lg:block ${
            megaOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-10 px-10 py-10">
            {/* Featured columns 1 & 2 */}
            {toursFeatured.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                onClick={() => setMegaOpen(false)}
                className="group flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition hover:border-slate-200 hover:bg-slate-50"
              >
                <span className="flex flex-wrap items-baseline gap-x-2.5 text-2xl font-light tracking-tight text-slate-950">
                  {col.title}
                  {col.eyebrow && (
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F58220]">
                      ({col.eyebrow})
                    </span>
                  )}
                </span>
                <span className="text-sm leading-relaxed text-slate-600">
                  {col.blurb}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-slate-500 transition group-hover:text-[#F58220]">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}

            {/* List columns 3 & 4 */}
            {toursLists.map((col) => (
              <div key={col.title} className="flex flex-col gap-4 p-5">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        onClick={() => setMegaOpen(false)}
                        className="group inline-flex items-center gap-2 text-[0.95rem] font-light tracking-tight text-slate-800 transition hover:text-[#F58220]"
                      >
                        {it.label}
                        <span
                          aria-hidden="true"
                          className="text-[0.7rem] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─────────── MOBILE MENU OVERLAY ─────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel — slides down from under the header */}
        <div
          className={`absolute inset-x-0 top-0 max-h-screen origin-top overflow-y-auto bg-white pt-[88px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] transition duration-500 ease-out ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav
            aria-label="Mobile primary"
            className="mx-auto max-w-[1280px] px-6 pb-10 pt-6"
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const index = String(i + 1).padStart(2, '0');

                if (item.kind === 'mega') {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileToursOpen((v) => !v)}
                        aria-expanded={mobileToursOpen}
                        className="group flex w-full items-center justify-between border-b border-neutral-200 py-5 text-left"
                      >
                        <span className="flex items-center gap-5">
                          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                            {index}
                          </span>
                          <span className="text-2xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                            {item.label}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`text-[0.7rem] uppercase tracking-[0.3em] text-neutral-400 transition ${
                            mobileToursOpen
                              ? 'rotate-180 text-[#F58220]'
                              : ''
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {/* Mobile Tours sub-panel */}
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                          mobileToursOpen
                            ? 'grid-rows-[1fr]'
                            : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="space-y-6 border-b border-neutral-200 py-6 pl-12">
                            {toursFeatured.map((col) => (
                              <Link
                                key={col.title}
                                href={col.href}
                                onClick={() => setOpen(false)}
                                className="block"
                              >
                                <span className="flex flex-wrap items-baseline gap-x-2 text-lg font-light tracking-tight text-neutral-950">
                                  {col.title}
                                  {col.eyebrow && (
                                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#F58220]">
                                      ({col.eyebrow})
                                    </span>
                                  )}
                                </span>
                              </Link>
                            ))}

                            {toursLists.map((col) => (
                              <div key={col.title}>
                                <span className="mb-2 block text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-neutral-400">
                                  {col.title}
                                </span>
                                <ul className="flex flex-col gap-2">
                                  {col.items.map((it) => (
                                    <li key={it.label}>
                                      <Link
                                        href={it.href}
                                        onClick={() => setOpen(false)}
                                        className="text-base font-light tracking-tight text-neutral-700 transition hover:text-[#F58220]"
                                      >
                                        {it.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between border-b border-neutral-200 py-5 transition"
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex items-center gap-5">
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                          {index}
                        </span>
                        <span className="text-2xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#F58220]">
                          {item.label}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-400 transition group-hover:translate-x-1 group-hover:text-[#F58220]"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
                >
                  Enquire Now
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/visit-rwanda"
                  onClick={() => setOpen(false)}
                  aria-label="Visit Rwanda"
                  className="shrink-0"
                >
                  <Image
                    src="/logos/visit_rwanda-logo.png"
                    alt="Visit Rwanda"
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                <a
                  href="tel:+250783140000"
                  className="rounded-sm border border-neutral-200 px-4 py-3 text-center transition hover:border-neutral-400 hover:text-neutral-950"
                >
                  +250 783 140 000
                </a>
                <a
                  href="mailto:info@soulexpeditionsafrica.com"
                  className="rounded-sm border border-neutral-200 px-4 py-3 text-center transition hover:border-neutral-400 hover:text-neutral-950"
                >
                  Email us
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
