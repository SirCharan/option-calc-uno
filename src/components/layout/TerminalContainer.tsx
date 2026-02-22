'use client';

import { ReactNode } from 'react';

interface TerminalContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function TerminalContainer({
  title,
  children,
  className = '',
}: TerminalContainerProps) {
  return (
    <div
      className={`border border-terminal-green/20 bg-terminal-gray/30 ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-green/20 bg-terminal-gray/50">
        <span className="w-2.5 h-2.5 rounded-full bg-terminal-red/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-terminal-amber/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-terminal-green/70" />
        <span className="text-terminal-dimgreen text-xs ml-2 tracking-wider">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
