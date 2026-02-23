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
    <nav className="border-b border-border px-4 sm:px-6 py-3 bg-bg-card">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-text-primary text-sm font-bold tracking-widest">
            OPTIONS_PRO
          </span>
          <span className="text-text-muted text-[10px] hidden sm:inline">
            v1.0
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-mono px-3 py-1.5 border rounded transition-all ${
                pathname === link.href
                  ? 'text-accent border-accent/30 bg-accent/5'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border-hover'
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
