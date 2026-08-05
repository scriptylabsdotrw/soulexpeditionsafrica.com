/* First content in the admin sidebar: brand logo block + Dashboard nav link.
   Bypasses Payload's Icon slot to guarantee the logo always renders. */

import Image from 'next/image';
import Link from 'next/link';

export default function DashboardNavLink() {
  return (
    <>
      <Link href="/admin" className="soulx-sidebar-brand" aria-label="Soul Expeditions — Studio Admin home">
        <Image
          src="/logos/logo-01.png"
          alt="Soul Expeditions Africa"
          width={240}
          height={72}
          priority
          className="soulx-sidebar-brand__mark"
        />
        <span className="soulx-sidebar-brand__caption">
          <span className="soulx-sidebar-brand__dash" aria-hidden="true" />
          Studio Admin
        </span>
      </Link>

      <nav className="soulx-nav-section" aria-label="Studio">
        <p className="soulx-nav-section__label">Studio</p>
        <ul className="soulx-nav-list">
          <li>
            <Link href="/admin" className="soulx-nav-link soulx-nav-link--featured">
              <svg
                className="soulx-nav-link__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
              </svg>
              Dashboard
            </Link>
          </li>
        </ul>
        <span className="soulx-nav-section__divider" aria-hidden="true" />
      </nav>
    </>
  );
}
