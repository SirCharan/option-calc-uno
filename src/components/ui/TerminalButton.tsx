'use client';

import { ReactNode } from 'react';

interface TerminalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'ghost';
  disabled?: boolean;
  active?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function TerminalButton({
  children,
  onClick,
  variant = 'primary',
  disabled,
  active,
  className = '',
  type = 'button',
}: TerminalButtonProps) {
  const base =
    'px-3 py-1.5 text-xs font-mono border rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed';

  const variants = {
    primary: `border-border text-text-secondary hover:bg-accent/10 hover:text-accent hover:border-accent/30 active:bg-accent/20 ${
      active ? 'bg-accent/15 text-accent border-accent/40' : ''
    }`,
    danger:
      'border-border text-text-secondary hover:bg-negative/10 hover:text-negative hover:border-negative/30 active:bg-negative/20',
    ghost:
      'border-transparent text-text-muted hover:text-text-secondary hover:border-border',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
