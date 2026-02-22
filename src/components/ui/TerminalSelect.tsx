'use client';

interface TerminalSelectProps {
  label?: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function TerminalSelect({
  label,
  options,
  value,
  onChange,
}: TerminalSelectProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-terminal-dimgreen text-xs shrink-0">
          &gt; {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black border border-terminal-green/30 text-terminal-green font-mono text-xs px-2 py-1.5 focus:border-terminal-green focus:shadow-[0_0_5px_rgba(0,255,0,0.3)] focus:outline-none transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-black">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
