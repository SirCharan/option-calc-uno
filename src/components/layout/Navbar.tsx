'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'OPTIONS_CALCULATOR' },
    { href: '/payoff', label: 'PAYOFF_DISPLAY' },
  ];

  return (
    <nav className="border-b border-terminal-green/20 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-terminal-dimgreen text-xs">
            user@options-calc:~$
          </span>
          <span className="text-terminal-green text-sm font-bold tracking-wider">
            OPTIONS_CALCULATOR_PRO
          </span>
        </div>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-mono transition-all ${
                pathname === link.href
                  ? 'text-terminal-green border-b border-terminal-green shadow-[0_2px_4px_rgba(0,255,0,0.2)]'
                  : 'text-terminal-dimgreen hover:text-terminal-green'
              }`}
            >
              &gt; {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
