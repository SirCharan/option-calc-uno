interface TerminalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'danger';
  active?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TerminalButton({
  children,
  onClick,
  variant = 'default',
  active = false,
  className = '',
  disabled = false,
}: TerminalButtonProps) {
  const base = 'font-mono text-xs px-3 py-1.5 rounded transition-colors disabled:opacity-40';

  const variants = {
    default: `border border-[#00ff00]/50 text-[#00ff00] hover:bg-[#00ff00]/10 ${
      active ? 'bg-[#00ff00]/20' : ''
    }`,
    primary: 'bg-[#00ff00] text-black hover:bg-[#00ff00]/80',
    danger: 'border border-[#ff3333]/50 text-[#ff3333] hover:bg-[#ff3333]/10',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
