import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dwell | Land intelligence for stronger decisions',
  description:
    'Dwell connects community priorities, land intelligence and practical technology to support stronger decisions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
