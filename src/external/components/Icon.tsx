import type { SVGProps } from 'react';

export type IconName =
  // includes
  | 'lodge'
  | 'meals'
  | 'drinks'
  | 'guide'
  | 'transport'
  | 'wifi'
  | 'water'
  | 'permit'
  | 'flight'
  | 'camera'
  | 'laundry'
  | 'gorilla'
  | 'binoculars'
  // excludes
  | 'flightIntl'
  | 'visa'
  | 'insurance'
  | 'tips'
  | 'alcohol'
  | 'personal'
  | 'phone'
  | 'spa'
  | 'balloon'
  // utility
  | 'check'
  | 'x';

/** Lucide-style minimal stroke icons, drawn at viewBox 0 0 24 24. */
const PATHS: Record<IconName, string> = {
  lodge:
    'M2 22V11l10-7 10 7v11M2 22h20M8 22v-6h8v6M11 7h2',
  meals:
    'M7 2v8a2 2 0 0 0 2 2v10M9 12V2M16 2v20M20 2a4 4 0 0 0-4 4v6h4',
  drinks:
    'M17 8h1a4 4 0 1 1 0 8h-1M5 8h13v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8zM8 2v3M12 2v3M16 2v3',
  guide:
    'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  transport:
    'M5 17H3a1 1 0 0 1-1-1v-3l2-4 1-2a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l1 2 2 4v3a1 1 0 0 1-1 1h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M9 17h6',
  wifi:
    'M5 13a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 19h.01M2 10a14 14 0 0 1 20 0',
  water:
    'M12 2.5l5.5 6.5a7 7 0 1 1-11 0L12 2.5z',
  permit:
    'M3 9a3 3 0 0 0 0 6v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a3 3 0 0 0 0-6V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2zM13 5v2M13 17v2M13 11v2',
  flight:
    'M17.8 19.2 16 11l4-4a2 2 0 1 0-3-3l-4 4-8.2-1.8a1 1 0 0 0-1 .3l-.5.5a1 1 0 0 0 .2 1.5L9 11.5l-2 3H4l-1 1 3 1.5L7.5 20l1-1v-3l3-2 4.3 4.5a1 1 0 0 0 1.5.2l.5-.5a1 1 0 0 0 0-1z',
  camera:
    'M3 9V19a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-3l-2-3H9L7 8H4a1 1 0 0 0-1 1zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  laundry:
    'M16 3l4 1.5 1 4-3 1V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9.5L3 8.5l1-4L8 3a4 4 0 0 0 8 0z',
  gorilla:
    'M12 3a5 5 0 0 1 5 5v2a5 5 0 0 1-1.5 3.6L17 16v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3l1.5-2.4A5 5 0 0 1 7 10V8a5 5 0 0 1 5-5zM9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM14.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM10 13s.8 1 2 1 2-1 2-1',
  binoculars:
    'M6 10a3 3 0 1 1 6 0v4a3 3 0 1 1-6 0v-4zM12 10a3 3 0 1 1 6 0v4a3 3 0 1 1-6 0v-4zM6 10V6M18 10V6M9 6h6',
  flightIntl:
    'M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  visa:
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M9 13h6M9 17h4',
  insurance:
    'M12 2l-8 3v7c0 5.5 4 9 8 10 4-1 8-4.5 8-10V5l-8-3zM9 12l2 2 4-4',
  tips:
    'M12 2v20M17 6H9a3 3 0 0 0 0 6h6a3 3 0 1 1 0 6H6',
  alcohol:
    'M8 22h8M7 10h10M12 15v7M7 10c-.4 0-2 4-2 5a7 7 0 0 0 14 0c0-1-1.6-5-2-5H7z',
  personal:
    'M2 6h20v12H2zM2 10h20',
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .4 1.9.6 2.8.7A2 2 0 0 1 22 16.9z',
  spa:
    'M12 22V8M12 8a6 6 0 0 0-6-6c0 4 2.5 6 6 6zM12 8a6 6 0 0 1 6-6c0 4-2.5 6-6 6zM12 22a6 6 0 0 0 6-6c-4 0-6 2-6 6zM12 22a6 6 0 0 1-6-6c4 0 6 2 6 6z',
  balloon:
    'M12 2a7 7 0 0 1 7 7c0 4-3 7-7 9-4-2-7-5-7-9a7 7 0 0 1 7-7zM10 18l1 2h2l1-2',
  check: 'M5 12l5 5 9-9',
  x: 'M6 6l12 12M18 6L6 18',
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Stroke width override. Defaults to 1.6. */
  weight?: number;
};

export default function Icon({ name, weight = 1.6, className = '', ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
