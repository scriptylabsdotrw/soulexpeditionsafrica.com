'use client';

/* Compact day-by-day accordion for the dark tour hero. Lists every day
   (not just a 3-day preview) — click a day to expand it in place and read
   its summary, same interaction as the full itinerary on the details page. */

import { useState } from 'react';
import type { ItineraryDay } from '@/lib/types';

export default function TourItineraryGlance({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  if (!days || days.length === 0) return null;

  const toggle = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="mt-9">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.4em] text-white/55">
        Itinerary at a glance
      </p>
      <ol className="mt-4 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
        {days.map((day, i) => {
          const isOpen = Boolean(open[i]);
          return (
            <li
              key={`${day.day}-${i}`}
              className={`overflow-hidden rounded-sm border transition ${
                isOpen ? 'border-[#F58220]/70 bg-white/[0.06]' : 'border-white/15 bg-white/[0.02]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-3.5 px-4 py-3 text-left"
              >
                <span
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[0.6rem] font-bold ${
                    isOpen ? 'bg-[#F58220] text-white' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[0.58rem] font-semibold uppercase tracking-[0.3em] ${
                      isOpen ? 'text-[#F58220]' : 'text-white/50'
                    }`}
                  >
                    {day.day || `Day ${i + 1}`}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.95rem] font-light leading-snug text-white/90">
                    {day.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`flex-none text-sm text-white/50 transition ${
                    isOpen ? 'rotate-180 text-[#F58220]' : 'group-hover:text-white'
                  }`}
                >
                  ▾
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-4 pb-4 pl-[3.25rem] text-sm leading-7 text-white/70">
                    {day.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
