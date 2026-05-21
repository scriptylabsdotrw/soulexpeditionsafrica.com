'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 lg:px-10 lg:py-4">
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
              className="h-16 w-auto object-contain sm:h-20 lg:h-24"
            />
          </Link>

          <nav className="hidden items-center gap-9 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-slate-600 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#F58220] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white shadow-glow transition hover:bg-[#ff9d2e] sm:inline-flex"
            >
              Plan a Journey
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 rounded-full bg-[#F58220] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white shadow-glow transition hover:bg-[#ff9d2e] sm:hidden"
              aria-label="Plan a journey"
            >
              Plan
              <span aria-hidden="true">→</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open ? 'true' : 'false'}
              aria-controls="mobile-menu"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 transition hover:border-neutral-400 md:hidden"
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
      </header>

      {/* ─────────── MOBILE MENU OVERLAY ─────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={open ? 'false' : 'true'}
        className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}
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
          className={`absolute inset-x-0 top-0 origin-top bg-white pt-[88px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] transition duration-500 ease-out ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="mx-auto max-w-[1280px] px-6 pb-10 pt-6">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-neutral-200 py-5 transition"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                        {String(i + 1).padStart(2, '0')}
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
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#F58220] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white shadow-glow transition hover:bg-[#ff9d2e]"
              >
                Plan a Journey
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
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
