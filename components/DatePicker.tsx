'use client';

/* Custom-designed date picker — a calendar popover styled to match the brand,
   instead of the browser-default date control. Writes the chosen date into a
   hidden input so it submits with the surrounding <form> via FormData. */

import { useEffect, useId, useRef, useState } from 'react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

function formatDisplay(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}
function formatValue(d: Date) {
  // Stable, locale-independent value for submission.
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function DatePicker({
  name,
  label,
  required,
  placeholder = 'Select a date',
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [today] = useState(() => startOfDay(new Date()));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const stepMonth = (delta: number) => setView(new Date(year, month + delta, 1));

  return (
    <div className="relative" ref={ref}>
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-neutral-600">
        {label}
        {required && <span className="ml-1 text-[#F58220]">*</span>}
      </span>

      {/* Hidden input carries the value into the form */}
      <input type="hidden" name={name} value={selected ? formatValue(selected) : ''} required={required} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        className={`mt-1.5 flex w-full items-center justify-between rounded-sm border bg-neutral-50/50 px-4 py-2.5 text-left text-base outline-none transition ${
          open
            ? 'border-[#F58220] bg-white ring-2 ring-[#F58220]/15'
            : 'border-neutral-200 hover:border-neutral-300'
        }`}
      >
        <span className={selected ? 'text-neutral-900' : 'text-neutral-400'}>
          {selected ? formatDisplay(selected) : placeholder}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 flex-none text-[#F58220]"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={label}
          className="absolute left-0 z-30 mt-2 w-[18rem] rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
        >
          {/* Month nav */}
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => stepMonth(-1)}
              aria-label="Previous month"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-[#F58220]"
            >
              ‹
            </button>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-neutral-900">
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => stepMonth(1)}
              aria-label="Next month"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-[#F58220]"
            >
              ›
            </button>
          </div>

          {/* Weekday header */}
          <div className="mt-3 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                {w}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <span key={`e-${i}`} />;
              const isPast = d < today;
              const isToday = sameDay(d, today);
              const isSelected = selected && sameDay(d, selected);
              return (
                <button
                  key={formatValue(d)}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    setSelected(d);
                    setOpen(false);
                  }}
                  className={`h-9 rounded-full text-[0.82rem] transition ${
                    isSelected
                      ? 'bg-[#F58220] font-semibold text-white shadow-glow'
                      : isPast
                        ? 'cursor-not-allowed text-neutral-300'
                        : isToday
                          ? 'text-[#F58220] ring-1 ring-[#F58220]/40 hover:bg-[#F58220]/10'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-[#F58220]'
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer actions */}
          <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
            <button
              type="button"
              onClick={() => {
                setSelected(null);
              }}
              className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-neutral-400 transition hover:text-neutral-700"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#F58220]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
