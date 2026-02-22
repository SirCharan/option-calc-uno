interface TerminalInputProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  suffix?: string;
  placeholder?: string;
  className?: string;
  type?: string;
}

export default function TerminalInput({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  className = '',
  type = 'number',
}: TerminalInputProps) {
  return (
    <div className={className}>
      <label className="block text-[#00ff00]/70 text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-black border border-[#00ff00]/30 text-[#00ff00] font-mono text-sm px-3 py-2 rounded focus:border-[#00ff00] focus:outline-none focus:ring-1 focus:ring-[#00ff00]/20 placeholder-[#00ff00]/20"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff00]/50 text-xs">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
