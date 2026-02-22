'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/calculator', label: 'CALCULATOR' },
    { href: '/payoff', label: 'PAYOFF BUILDER' },
  ];

  return (
    <nav className="border-b border-[#00ff00]/20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/calculator" className="text-[#00ff00] font-bold text-sm tracking-wider">
          {'>'} CRYPTO_OPTIONS_v1
        </Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-mono tracking-wider transition-colors px-2 py-1 ${
                pathname === link.href
                  ? 'text-[#00ff00] border-b border-[#00ff00]'
                  : 'text-[#00ff00]/50 hover:text-[#00ff00]/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
