'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavGroup, SiteContent } from '@/shared/lib/types';

const consultantCards = [
  {
    title: 'Groups',
    offerings: [
      { label: 'Church & Mission Trips', slug: 'church-mission-trips' },
      { label: 'School Leadership & Culture Immersion Program', slug: 'school-leadership-culture-immersion' },
      { label: 'Corporate Retreat & Incentive Travel', slug: 'corporate-retreat-incentive-travel' },
    ],
  },
  {
    title: 'Special Interest',
    offerings: [
      { label: 'Philanthropy', slug: 'philanthropy' },
      { label: 'Arts & Design', slug: 'arts-design' },
      { label: 'Honeymoon', slug: 'honeymoon' },
      { label: 'History', slug: 'history' },
      { label: 'Active Volunteering', slug: 'active-volunteering' },
      { label: 'LGBTQ', slug: 'lgbtq' },
    ],
  },
];

export default function SiteHeader({
  siteContent,
  themeGroups,
}: {
  siteContent: SiteContent;
  /* Built from the Tour Themes collection — one column per theme group. */
  themeGroups: NavGroup[];
}) {
  const nav = siteContent.headerNav;
  const toursFeatured = siteContent.headerFeatured;
  const megaHasContent = toursFeatured.length > 0 || themeGroups.length > 0;

  const brand = siteContent.companyName || 'Soul Expeditions Africa';
  const telHref = siteContent.studioPhone
    ? `tel:${siteContent.studioPhone.replace(/[^\d+]/g, '')}`
    : '';

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
        {/* Vertical padding is minimal so the full-size logo fills the white
            space instead of pushing the bar taller. */}
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-0.5 lg:px-6 lg:py-1 xl:px-10">
          {/* The mark sits in a disc that overhangs the header's bottom edge,
              breaking the rule line. It carries the same translucent surface as
              the bar so the two read as one. The negative bottom margin is what
              lets it overflow without making the bar itself taller. */}
          <Link
            href="/"
            className="relative z-10 -mb-8 flex h-[6.5rem] w-[6.5rem] shrink-0 items-center justify-center rounded-full bg-white/85 backdrop-blur-xl sm:-mb-9 sm:h-[7.25rem] sm:w-[7.25rem] xl:-mb-10 xl:h-[8.25rem] xl:w-[8.25rem]"
            aria-label={`${brand} — home`}
          >
            <Image
              src="/logos/logo-01.png"
              alt={brand}
              width={388}
              height={264}
              priority
              className="h-[4rem] w-auto object-contain sm:h-[4.5rem] xl:h-[5.25rem]"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-slate-700 lg:flex xl:gap-9 xl:text-[1rem] xl:tracking-[0.16em] 2xl:gap-11"
          >
            {nav.map((item) =>
              item.isMegaMenu && megaHasContent ? (
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
                  key={item.label}
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
              width={768}
              height={268}
              className="h-10 w-auto object-contain lg:h-12"
            />
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
          aria-label="Tours and safaris"
          aria-hidden={!megaOpen}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className={`absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-200 lg:block ${
            megaOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div
            className="mx-auto grid max-w-[1280px] gap-10 px-10 py-10"
            style={{
              gridTemplateColumns: `repeat(${Math.max(
                1,
                toursFeatured.length + consultantCards.length,
              )}, minmax(0, 1fr))`,
            }}
          >
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

            {/* Consultant-led cards 3 & 4 — enquiries go straight to Contact. */}
            {consultantCards.map((col) => (
              <article key={col.title} className="group flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition hover:border-slate-200 hover:bg-slate-50">
                <h3 className="text-2xl font-light tracking-tight text-slate-950">{col.title}</h3>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                  {col.offerings.map((offering) => (
                    <li key={offering.slug}>
                      <Link href={`/experiences/${offering.slug}`} onClick={() => setMegaOpen(false)} className="group/item inline-flex items-start gap-2 transition hover:text-[#F58220]">
                        <span aria-hidden="true" className="mt-[0.08rem] text-[#F58220] transition group-hover/item:translate-x-0.5">→</span>
                        <span>{offering.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  onClick={() => setMegaOpen(false)}
                  className="mt-auto inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-slate-500 transition group-hover:text-[#F58220]"
                >
                  Talk to a consultant
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </article>
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

                if (item.isMegaMenu && megaHasContent) {
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

                            {consultantCards.map((col) => (
                              <div key={col.title}>
                                <span className="mb-2 block text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-neutral-400">
                                  {col.title}
                                </span>
                                <ul className="flex flex-col gap-2">
                                  {col.offerings.map((offering) => (
                                    <li key={offering.slug}>
                                      <Link href={`/experiences/${offering.slug}`} onClick={() => setOpen(false)} className="group/item inline-flex items-start gap-2 text-base font-light tracking-tight text-neutral-700 transition hover:text-[#F58220]">
                                        <span aria-hidden="true" className="mt-[0.08rem] text-[#F58220] transition group-hover/item:translate-x-0.5">→</span>
                                        <span>{offering.label}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <Link href="/contact" onClick={() => setOpen(false)} className="mt-3 inline-flex text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#F58220]">
                                  Talk to a consultant →
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
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
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/visit-rwanda"
                  onClick={() => setOpen(false)}
                  aria-label="Visit Rwanda"
                  className="shrink-0"
                >
                  <Image
                    src="/logos/visit_rwanda-logo.png"
                    alt="Visit Rwanda"
                    width={768}
                    height={268}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
              </div>
              {(siteContent.studioPhone || siteContent.studioEmail) && (
                <div className="grid grid-cols-2 gap-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                  {siteContent.studioPhone && (
                    <a
                      href={telHref}
                      className="rounded-sm border border-neutral-200 px-4 py-3 text-center transition hover:border-neutral-400 hover:text-neutral-950"
                    >
                      {siteContent.studioPhone}
                    </a>
                  )}
                  {siteContent.studioEmail && (
                    <a
                      href={`mailto:${siteContent.studioEmail}`}
                      className="rounded-sm border border-neutral-200 px-4 py-3 text-center transition hover:border-neutral-400 hover:text-neutral-950"
                    >
                      Email us
                    </a>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
