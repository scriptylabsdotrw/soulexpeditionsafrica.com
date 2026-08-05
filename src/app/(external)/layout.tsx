import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';
import SiteHeader from '@/external/components/SiteHeader';
import Footer from '@/external/components/Footer';
import FloatingActions from '@/external/components/FloatingActions';
import { getSiteContent, getThemeNavGroups } from '@/external/lib/data';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  /* Header, footer, and the floating WhatsApp button are all CMS-driven. */
  const [siteContent, themeGroups] = await Promise.all([
    getSiteContent(),
    getThemeNavGroups(),
  ]);

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-brand-surface text-brand-ink antialiased">
        <SiteHeader siteContent={siteContent} themeGroups={themeGroups} />
        {children}
        <Footer siteContent={siteContent} />
        <FloatingActions
          whatsappNumber={siteContent.whatsappNumber}
          whatsappMessage={siteContent.whatsappMessage}
        />
      </body>
    </html>
  );
}
