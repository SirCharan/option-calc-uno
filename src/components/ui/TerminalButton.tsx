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
    'px-3 py-1.5 text-xs font-mono border transition-all disabled:opacity-30 disabled:cursor-not-allowed';

  const variants = {
    primary: `border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 hover:shadow-[0_0_5px_rgba(0,255,0,0.2)] active:bg-terminal-green/20 ${
      active ? 'bg-terminal-green/20 shadow-[0_0_5px_rgba(0,255,0,0.2)] border-terminal-green' : ''
    }`,
    danger:
      'border-terminal-red/50 text-terminal-red hover:bg-terminal-red/10 hover:shadow-[0_0_5px_rgba(255,68,68,0.2)] active:bg-terminal-red/20',
    ghost:
      'border-transparent text-terminal-dimgreen hover:text-terminal-green hover:border-terminal-green/30',
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
