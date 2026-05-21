import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soul Expeditions Africa — Admin',
  description: 'Admin experience for Soul Expeditions Africa.'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}
