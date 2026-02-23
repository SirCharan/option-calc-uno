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
      className={`border border-border rounded-lg bg-bg-card overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-elevated">
        <span className="w-2 h-2 rounded-full bg-negative/60" />
        <span className="w-2 h-2 rounded-full bg-warning/60" />
        <span className="w-2 h-2 rounded-full bg-accent/60" />
        <span className="text-text-muted text-xs ml-2 tracking-widest uppercase">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
