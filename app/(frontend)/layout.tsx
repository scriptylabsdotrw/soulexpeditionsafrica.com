import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Soul Expeditions Africa — Bespoke Safaris & Soulful African Journeys',
  description:
    'Award-winning, privately designed safari, wildlife, and cultural expeditions across Rwanda, Tanzania, Kenya, Uganda, and Zanzibar. Crafted by Africa, for the world.',
  openGraph: {
    title: 'Soul Expeditions Africa — Crafting Soulful African Expeditions',
    description:
      'World-class private safaris, gorilla treks, cultural immersions, and coastal escapes — designed for the most discerning travellers.',
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: new URL('https://soulexpeditionsafrica.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-brand-surface text-brand-ink antialiased">
        <SiteHeader />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
