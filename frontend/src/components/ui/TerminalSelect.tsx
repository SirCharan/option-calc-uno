interface TerminalSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export default function TerminalSelect({
  label,
  value,
  onChange,
  options,
}: TerminalSelectProps) {
  return (
    <div>
      <label className="block text-[#00ff00]/70 text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-[#00ff00]/30 text-[#00ff00] font-mono text-sm px-3 py-2 rounded focus:border-[#00ff00] focus:outline-none focus:ring-1 focus:ring-[#00ff00]/20 appearance-none cursor-pointer"
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
