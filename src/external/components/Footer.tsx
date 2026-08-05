import Image from 'next/image';
import Link from 'next/link';
import type { SiteContent, SocialPlatform } from '@/shared/lib/types';

const SOCIAL_LABEL: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  x: 'X',
  linkedin: 'LinkedIn',
};

function SocialIcon({
  platform,
  className = '',
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  switch (platform) {
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.29 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.06A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.36z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.64h.05A4.17 4.17 0 0 1 16.6 8.7c4 0 4.75 2.64 4.75 6.06V21h-4v-5.44c0-1.3-.02-2.97-1.8-2.97-1.82 0-2.1 1.42-2.1 2.88V21H9z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer({ siteContent }: { siteContent: SiteContent }) {
  const {
    companyName,
    footerBlurb,
    footerTagline,
    socialHandle,
    socials,
    studioAddress,
    studioPhone,
    studioEmail,
  } = siteContent;

  const brand = companyName || 'Soul Expeditions Africa';
  const telHref = studioPhone ? `tel:${studioPhone.replace(/[^\d+]/g, '')}` : '';

  return (
    <footer className="relative isolate overflow-hidden bg-[#0c0c0c] text-white">
      <div
        className="absolute -left-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#F58220]/15 blur-[120px]"
        aria-hidden
      />
      <div className="mx-auto max-w-[1280px] px-6 py-4 lg:px-10 lg:py-5">
        {/* Left: blurb · Centre: logo · Right: contact & socials */}
        <div className="grid items-center gap-14 text-center lg:grid-cols-3 lg:gap-16 lg:text-left">
          {footerBlurb ? (
            <p className="mx-auto max-w-md text-base leading-8 text-white/70 lg:mx-0">
              {footerBlurb}
            </p>
          ) : (
            <div aria-hidden />
          )}

          <Link
            href="/"
            className="order-first flex justify-center lg:order-none"
            aria-label={`${brand} — home`}
          >
          <Image
              src="/logos/logo-02.png"
              alt={brand}
              width={680}
              height={280}
              className="h-[12.5rem] w-auto object-contain brightness-0 invert lg:h-[19.5rem]"
            />
          </Link>

          <div className="space-y-7 lg:text-right">
            {(studioAddress || studioPhone || studioEmail) && (
              <div className="space-y-2 text-sm leading-7 text-white/65">
                {studioAddress && <p>{studioAddress}</p>}
                {(studioPhone || studioEmail) && (
                  <p>
                    {studioPhone && (
                      <a href={telHref} className="transition hover:text-white">
                        {studioPhone}
                      </a>
                    )}
                    {studioPhone && studioEmail && ' · '}
                    {studioEmail && (
                      <a href={`mailto:${studioEmail}`} className="transition hover:text-white">
                        {studioEmail}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}

            {socials.length > 0 && (
              <div className="pt-2">
                {socialHandle && (
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/45">
                    Follow · @{socialHandle}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-end">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand} on ${SOCIAL_LABEL[s.platform] ?? s.platform}`}
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-[#F58220] hover:bg-[#F58220] hover:text-white"
                    >
                      <SocialIcon platform={s.platform} className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-3 px-6 py-7 text-[0.72rem] uppercase tracking-[0.32em] text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} {brand} · All rights reserved.
          </p>
          {footerTagline && <p>{footerTagline}</p>}
        </div>
      </div>
    </footer>
  );
}
