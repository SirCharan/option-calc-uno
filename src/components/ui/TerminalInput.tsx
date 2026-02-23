'use client';

interface TerminalInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: string;
  disabled?: boolean;
}

export function TerminalInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  prefix = '>',
  suffix,
  min,
  step,
  disabled,
}: TerminalInputProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2">
        <span className="text-text-secondary text-[11px] shrink-0 min-w-fit">
          {prefix} {label}:
        </span>
        <div className="flex items-center gap-1.5 flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            step={step}
            disabled={disabled}
            className="w-full bg-bg-primary border border-border text-text-primary font-mono text-sm px-3 py-2 rounded focus:border-accent/60 focus:shadow-[0_0_8px_rgba(0,204,136,0.12)] focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed placeholder:text-text-muted"
          />
          {suffix && (
            <span className="text-text-muted text-[11px] shrink-0">
              {suffix}
            </span>
          )}
        </div>
      </label>
      {error && (
        <p className="text-negative text-[11px] ml-4">[ERROR]: {error}</p>
      )}
    </div>
  );
}
