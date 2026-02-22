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
      <div className="flex items-center gap-2">
        <span className="text-terminal-dimgreen text-xs shrink-0">
          {prefix} {label}:
        </span>
        <div className="flex items-center gap-1 flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            step={step}
            disabled={disabled}
            className="w-full bg-black border border-terminal-green/30 text-terminal-green font-mono text-sm px-3 py-1.5 focus:border-terminal-green focus:shadow-[0_0_5px_rgba(0,255,0,0.3)] focus:outline-none transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          />
          {suffix && (
            <span className="text-terminal-dimgreen text-xs shrink-0">
              {suffix}
            </span>
          )}
        </div>
      </div>
      {error && (
        <p className="text-terminal-red text-xs ml-4">[ERROR]: {error}</p>
      )}
    </div>
  );
}
