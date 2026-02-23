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
        <span className="text-text-secondary text-xs shrink-0">
          &gt; {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-bg-primary border border-border text-text-primary font-mono text-xs px-2 py-1.5 rounded focus:border-accent/60 focus:shadow-[0_0_5px_rgba(0,204,136,0.15)] focus:outline-none transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-card">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
