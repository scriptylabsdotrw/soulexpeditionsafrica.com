/* Soul Expeditions Africa — Admin dashboard widget.
   Rendered above the default Payload dashboard via beforeDashboard.
   Fetches live counts + 5 most recent enquiries server-side. */

import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';

const fmt = (n: number) =>
  n.toLocaleString('en-US').padStart(2, '0');

const since = (iso: string) => {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

export default async function Dashboard() {
  const payload = await getPayload({ config });

  const [tours, destinations, themes, journal, enquiries, media, newEnquiries, recent] =
    await Promise.all([
      payload.count({ collection: 'tours' }),
      payload.count({ collection: 'destinations' }),
      payload.count({ collection: 'tour-themes' }),
      payload.count({ collection: 'journal' }),
      payload.count({ collection: 'enquiries' }),
      payload.count({ collection: 'media' }),
      payload.count({
        collection: 'enquiries',
        where: { status: { equals: 'New' } },
      }),
      payload.find({
        collection: 'enquiries',
        limit: 5,
        sort: '-createdAt',
        depth: 0,
      }),
    ]);

  const stats: {
    label: string;
    value: number;
    href: string;
    accent?: 'brand' | 'muted';
    sub?: string;
  }[] = [
    { label: 'Destinations', value: destinations.totalDocs, href: '/admin/collections/destinations' },
    { label: 'Tours', value: tours.totalDocs, href: '/admin/collections/tours' },
    { label: 'Tour themes', value: themes.totalDocs, href: '/admin/collections/tour-themes' },
    { label: 'Journal posts', value: journal.totalDocs, href: '/admin/collections/journal' },
    {
      label: 'Enquiries',
      value: enquiries.totalDocs,
      href: '/admin/collections/enquiries',
      accent: newEnquiries.totalDocs > 0 ? 'brand' : 'muted',
      sub: newEnquiries.totalDocs > 0 ? `${newEnquiries.totalDocs} new` : 'all replied',
    },
    { label: 'Media files', value: media.totalDocs, href: '/admin/collections/media' },
  ];

  const quickActions = [
    { label: 'New tour', href: '/admin/collections/tours/create' },
    { label: 'New destination', href: '/admin/collections/destinations/create' },
    { label: 'New journal post', href: '/admin/collections/journal/create' },
    { label: 'Upload media', href: '/admin/collections/media/create' },
  ];

  return (
    <div className="soulx-dashboard">
      {/* ───── Hero / welcome ───── */}
      <header className="soulx-dashboard__hero">
        <div>
          <p className="soulx-dashboard__eyebrow">
            <span className="soulx-dashboard__dot" aria-hidden="true" />
            Studio Admin
          </p>
          <h1 className="soulx-dashboard__title">
            Welcome back to <span className="soulx-dashboard__brandword">Soul Expeditions</span>.
          </h1>
          <p className="soulx-dashboard__lede">
            A quiet console for everything the studio publishes — destinations, tours, themes,
            journal, and enquiries. Every change is live the moment you save.
          </p>
        </div>

        <Link
          href="/admin/collections/enquiries?where[status][equals]=New"
          className="soulx-dashboard__hero-cta"
        >
          <span className="soulx-dashboard__hero-cta-eyebrow">
            {newEnquiries.totalDocs > 0
              ? `${newEnquiries.totalDocs} new ${newEnquiries.totalDocs === 1 ? 'enquiry' : 'enquiries'}`
              : 'Inbox'}
          </span>
          <span className="soulx-dashboard__hero-cta-label">
            View enquiries →
          </span>
        </Link>
      </header>

      {/* ───── KPI grid ───── */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">
            Index · 01 — At a glance
          </span>
        </header>

        <ul className="soulx-dashboard__stats">
          {stats.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className={`soulx-dashboard__stat${
                  s.accent === 'brand' ? ' soulx-dashboard__stat--brand' : ''
                }`}
              >
                <span className="soulx-dashboard__stat-value">{fmt(s.value)}</span>
                <span className="soulx-dashboard__stat-label">{s.label}</span>
                {s.sub && <span className="soulx-dashboard__stat-sub">{s.sub}</span>}
                <span className="soulx-dashboard__stat-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── Quick actions ───── */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">Index · 02 — Quick add</span>
        </header>

        <ul className="soulx-dashboard__actions">
          {quickActions.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="soulx-dashboard__action">
                <span className="soulx-dashboard__action-plus" aria-hidden="true">
                  +
                </span>
                <span>{a.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── Recent enquiries ───── */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">
            Index · 03 — Recent enquiries
          </span>
          <Link
            href="/admin/collections/enquiries"
            className="soulx-dashboard__section-link"
          >
            All enquiries →
          </Link>
        </header>

        {recent.docs.length === 0 ? (
          <div className="soulx-dashboard__empty">
            No enquiries yet — the contact form is wired up and will land here.
          </div>
        ) : (
          <ul className="soulx-dashboard__enquiries">
            {recent.docs.map((e: any) => (
              <li key={e.id}>
                <Link
                  href={`/admin/collections/enquiries/${e.id}`}
                  className="soulx-dashboard__enquiry"
                >
                  <div className="soulx-dashboard__enquiry-main">
                    <p className="soulx-dashboard__enquiry-name">{e.name}</p>
                    <p className="soulx-dashboard__enquiry-meta">
                      {[e.destination, e.tour, e.tier].filter(Boolean).join(' · ') ||
                        'No destination picked'}
                    </p>
                  </div>
                  <div className="soulx-dashboard__enquiry-side">
                    <span
                      className={`soulx-dashboard__pill soulx-dashboard__pill--${(e.status ?? 'new')
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {e.status ?? 'New'}
                    </span>
                    <span className="soulx-dashboard__enquiry-time">
                      {since(e.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
