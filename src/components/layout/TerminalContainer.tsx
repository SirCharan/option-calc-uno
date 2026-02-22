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
      className={`border border-terminal-border bg-terminal-gray/20 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-border bg-terminal-gray/40">
        <span className="w-2 h-2 rounded-full bg-terminal-red/60" />
        <span className="w-2 h-2 rounded-full bg-terminal-amber/60" />
        <span className="w-2 h-2 rounded-full bg-terminal-green/60" />
        <span className="text-terminal-dimgreen/70 text-[10px] ml-2 tracking-widest uppercase">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
