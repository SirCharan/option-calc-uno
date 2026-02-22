'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'CALCULATOR' },
    { href: '/payoff', label: 'PAYOFF' },
  ];

  return (
    <nav className="border-b border-terminal-border px-4 sm:px-6 py-3 bg-terminal-gray/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-terminal-green text-sm font-bold tracking-widest">
            OPTIONS_PRO
          </span>
          <span className="text-terminal-dimgreen/50 text-[10px] hidden sm:inline">
            v1.0
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                pathname === link.href
                  ? 'text-terminal-green border-terminal-green/30 bg-terminal-green/5'
                  : 'text-terminal-dimgreen border-transparent hover:text-terminal-green hover:border-terminal-green/20'
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
