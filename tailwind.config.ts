import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: '#FFFFFF',
          soft: '#F7F7F7',
          ink: '#111111',
          muted: '#5E5B56',
          accent: '#F58220',
          accentSoft: '#FF9D2E',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 35px 120px rgba(245,130,32,0.18)',
        soft: '0 24px 60px rgba(17,17,17,0.06)',
        deep: '0 60px 160px rgba(17,17,17,0.12)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 50% 0%, rgba(245,130,32,0.14), transparent 42%), radial-gradient(circle at 20% 0%, rgba(17,17,17,0.04), transparent 25%)',
        'sunrise':
          'linear-gradient(135deg, rgba(245,130,32,0.95) 0%, rgba(255,157,46,0.9) 100%)',
      },
      letterSpacing: {
        'eyebrow': '0.35em',
      },
    },
  },
  plugins: [],
};

export default config;
