'use client';

/* Day-by-day itinerary block with per-day expand/collapse + a master toggle.
   First day is expanded by default; the rest collapsed. */

import { useState } from 'react';
import type { ItineraryDay } from '@/shared/lib/types';

export default function TourItinerary({
  days,
  duration,
}: {
  days: ItineraryDay[];
  duration: string;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  if (!days || days.length === 0) return null;

  const allOpen = days.every((_, i) => open[i]);

  const toggle = (i: number) =>
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  const toggleAll = () => {
    if (allOpen) setOpen({});
    else setOpen(Object.fromEntries(days.map((_, i) => [i, true])));
  };

  return (
    <section className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <header className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-7 lg:flex-row lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#F58220]">
              Day by day
            </p>
            <h2 className="text-balance text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
              Your <span className="font-bold">{duration}</span> itinerary.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
              {days.length} {days.length === 1 ? 'day' : 'days'}
            </span>
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-neutral-700 transition hover:border-[#F58220] hover:text-[#F58220]"
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
              <span
                aria-hidden="true"
                className={`text-[0.6rem] transition ${allOpen ? 'rotate-180' : ''}`}
              >
                ▾
              </span>
            </button>
          </div>
        </header>

        {/* Day list */}
        <ol className="space-y-3">
          {days.map((d, i) => {
            const isOpen = Boolean(open[i]);
            const number = String(i + 1).padStart(2, '0');
            return (
              <li
                key={`${d.day}-${i}`}
                className={`overflow-hidden rounded-sm border transition ${
                  isOpen ? 'border-[#F58220]' : 'border-neutral-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={`group flex w-full items-center gap-6 px-6 py-5 text-left transition ${
                    isOpen ? 'bg-[#F58220]/[0.04]' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className={`text-[0.62rem] font-semibold uppercase tracking-[0.4em] ${
                      isOpen ? 'text-[#F58220]' : 'text-neutral-400'
                    } sm:min-w-[3rem]`}
                  >
                    {number}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`text-[0.62rem] font-semibold uppercase tracking-[0.32em] ${
                        isOpen ? 'text-[#F58220]' : 'text-neutral-500'
                      }`}
                    >
                      {d.day}
                    </p>
                    <h3 className="mt-1 text-balance text-xl font-light leading-tight tracking-tight text-neutral-950 lg:text-2xl">
                      {d.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex-none text-base text-neutral-400 transition ${
                      isOpen ? 'rotate-180 text-[#F58220]' : 'group-hover:text-[#F58220]'
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {/* Body — CSS-only collapse via grid-template-rows trick for smooth animation */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-neutral-200 bg-white px-6 py-6 sm:pl-[5.5rem]">
                      <p className="max-w-3xl text-base leading-8 text-neutral-700">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
