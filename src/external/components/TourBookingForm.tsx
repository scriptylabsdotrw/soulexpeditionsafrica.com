'use client';

/* Compact "Book This Tour" card shown in the tour-detail hero.
   Persists to the Enquiries collection via /api/enquiries.

   NOTE: This intentionally does NOT send email yet. When SMTP credentials are
   provided, wire an afterChange hook on the Enquiries collection (or a small
   route handler) to email the customer their itinerary, includes & excludes —
   no change to this form is required. */

import { useState } from 'react';
import DatePicker from '@/external/components/DatePicker';

export default function TourBookingForm({
  destinationName,
  tourTitle,
}: {
  destinationName: string;
  tourTitle: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/95 p-6 text-neutral-900 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:p-7">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#F58220]">
          Book this tour
        </p>
        <span className="text-[0.56rem] uppercase tracking-[0.28em] text-neutral-400">
          24h reply
        </span>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          setSubmitting(true);
          setSubmitMessage(null);
          try {
            const res = await fetch('/api/enquiries', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                dates: formData.get('dates'),
                travellers: formData.get('travellers'),
                notes: formData.get('notes'),
                destination: destinationName,
                tour: tourTitle,
                status: 'New',
              }),
            });
            if (!res.ok) throw new Error(`Submission failed (${res.status})`);
            setSubmitMessage(
              'Thank you. A Travel Designer will reply personally within 24 hours.',
            );
            form.reset();
          } catch (err) {
            console.error(err);
            setSubmitMessage(
              'Something went wrong — please email info@soulexpeditionsafrica.com directly.',
            );
          } finally {
            setSubmitting(false);
          }
        }}
        className="mt-5 grid gap-3.5"
      >
        <Field label="Full name" name="name" placeholder="Priya Raman" required />
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" placeholder="priya@example.com" required />
          <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <DatePicker label="Preferred date" name="dates" placeholder="Select" />
          <Field label="Travellers" name="travellers" placeholder="2 adults" />
        </div>

        <label className="block">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
            Message
          </span>
          <textarea
            name="notes"
            rows={2}
            placeholder="Anything we should know?"
            className="mt-2 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-[0.92rem] text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className={`mt-1 inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] transition ${
            submitting
              ? 'cursor-not-allowed bg-neutral-200 text-neutral-500'
              : 'bg-[#F58220] text-white shadow-glow hover:bg-[#ff9d2e]'
          }`}
        >
          {submitting ? 'Sending…' : 'Book this tour →'}
        </button>

        {submitMessage && (
          <div
            role="status"
            className="rounded-sm bg-[#F58220]/10 px-4 py-3 text-[0.82rem] leading-6 text-[#8a4e1f] ring-1 ring-[#F58220]/25"
          >
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
        {label}
        {required && <span className="ml-1 text-[#F58220]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-[0.92rem] text-neutral-900 outline-none transition focus:border-[#F58220] focus:bg-white focus:ring-2 focus:ring-[#F58220]/15"
      />
    </label>
  );
}
