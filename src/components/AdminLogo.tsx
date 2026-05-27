/* Renders on the Payload login screen + top-left brand area.
   Sized for the central login card (white background, ~360px wide). */

import Image from 'next/image';

export default function AdminLogo() {
  return (
    <div className="soulx-admin-logo">
      <Image
        src="/logos/logo-01.png"
        alt="Soul Expeditions Africa"
        width={480}
        height={144}
        priority
      />
      <span className="soulx-admin-logo__caption">Studio Admin</span>
    </div>
  );
}
