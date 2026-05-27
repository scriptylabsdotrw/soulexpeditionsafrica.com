/* Brand block at the very top of the admin sidebar — full logo + studio caption. */

import Image from 'next/image';

export default function AdminIcon() {
  return (
    <span className="soulx-brandblock">
      <Image
        src="/logos/logo-01.png"
        alt="Soul Expeditions Africa"
        width={240}
        height={72}
        priority
        className="soulx-brandblock__mark"
      />
      <span className="soulx-brandblock__caption">Studio Admin</span>
    </span>
  );
}
