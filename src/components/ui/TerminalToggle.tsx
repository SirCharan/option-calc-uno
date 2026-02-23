'use client';

interface TerminalToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function TerminalToggle({
  label,
  checked,
  onChange,
  disabled,
}: TerminalToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`flex items-center gap-2 text-xs font-mono px-2 py-1 border rounded transition-all ${
        checked
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-border text-text-muted hover:border-border-hover hover:text-text-secondary'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          checked ? 'bg-accent animate-pulse-accent' : 'bg-text-muted/30'
        }`}
      />
      {label}
      <span className="text-text-muted">[{checked ? 'ON' : 'OFF'}]</span>
    </button>
  );
}
