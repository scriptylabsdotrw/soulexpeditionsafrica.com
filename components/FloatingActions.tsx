'use client';

import { useEffect, useState } from 'react';

const PHONE_E164 = '250783140000';
const WA_MESSAGE = encodeURIComponent(
  "Hello Soul Expeditions Africa — I'd like to plan a private journey.",
);

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 lg:bottom-7 lg:right-7">
      {/* Back to top */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={`pointer-events-auto group inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white shadow-[0_18px_44px_rgba(0,0,0,0.25)] ring-1 ring-white/10 transition duration-500 ease-out hover:bg-[#F58220] lg:h-13 lg:w-13 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 transition group-hover:-translate-y-0.5"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${PHONE_E164}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_44px_rgba(37,211,102,0.45)] ring-1 ring-white/15 transition hover:scale-[1.04] hover:bg-[#1ebe5b] lg:h-16 lg:w-16"
      >
        {/* Pulse */}
        <span
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-50"
          aria-hidden="true"
        />

        {/* WhatsApp glyph */}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-7 w-7 lg:h-8 lg:w-8"
        >
          <path d="M16 .25C7.32.25.25 7.32.25 16c0 2.85.75 5.63 2.17 8.07L.18 31.75l7.86-2.06A15.7 15.7 0 0 0 16 31.75C24.68 31.75 31.75 24.68 31.75 16 31.75 7.32 24.68.25 16 .25Zm0 28.7c-2.5 0-4.97-.68-7.13-1.95l-.51-.3-4.66 1.22 1.25-4.55-.34-.53A12.92 12.92 0 0 1 3.05 16C3.05 8.86 8.86 3.05 16 3.05c7.14 0 12.95 5.81 12.95 12.95 0 7.14-5.81 12.95-12.95 12.95Zm7.42-9.7c-.4-.2-2.37-1.17-2.74-1.3-.37-.14-.64-.2-.9.2-.27.4-1.03 1.3-1.27 1.57-.23.27-.46.3-.86.1-.4-.2-1.7-.62-3.23-2-1.2-1.07-2-2.39-2.23-2.79-.23-.4-.02-.62.17-.82.17-.17.4-.46.6-.69.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.18-1.24-2.98-.33-.78-.66-.68-.9-.69h-.77c-.27 0-.7.1-1.06.5-.37.4-1.4 1.37-1.4 3.33 0 1.96 1.43 3.86 1.63 4.13.2.27 2.81 4.29 6.81 6.02.95.4 1.7.65 2.28.83.96.3 1.83.26 2.52.16.77-.11 2.37-.97 2.7-1.9.34-.94.34-1.75.24-1.92-.1-.17-.36-.27-.76-.47Z" />
        </svg>
      </a>
    </div>
  );
}
