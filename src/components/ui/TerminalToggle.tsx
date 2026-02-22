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
      className={`flex items-center gap-2 text-xs font-mono px-2 py-1 border transition-all ${
        checked
          ? 'border-terminal-green bg-terminal-green/10 text-terminal-green shadow-[0_0_5px_rgba(0,255,0,0.2)]'
          : 'border-terminal-green/30 text-terminal-dimgreen hover:border-terminal-green/50'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          checked ? 'bg-terminal-green animate-pulse-green' : 'bg-terminal-green/30'
        }`}
      />
      {label}
      <span className="text-terminal-green/50">[{checked ? 'ON' : 'OFF'}]</span>
    </button>
  );
}
