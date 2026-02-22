import type { Metadata } from 'next';
import './globals.css';
import { OptionsProvider } from '@/context/OptionsContext';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Options Calculator Pro',
  description: 'Advanced options pricing and payoff analysis tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased min-h-screen bg-black text-terminal-green">
        <OptionsProvider>
          <Navbar />
          {children}
        </OptionsProvider>
      </body>
    </html>
  );
}
