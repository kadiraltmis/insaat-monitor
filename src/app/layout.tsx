import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'İnşaat Takip | İnşaat Monitor',
  description: 'İnşaat projenizin iş takibi ve maliyet yönetimi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
