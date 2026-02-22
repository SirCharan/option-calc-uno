interface TerminalToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export default function TerminalToggle({ label, enabled, onChange }: TerminalToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2 text-xs font-mono group"
    >
      <div
        className={`w-8 h-4 rounded-full border transition-colors relative ${
          enabled
            ? 'bg-[#00ff00]/20 border-[#00ff00]'
            : 'bg-black border-[#00ff00]/30'
        }`}
      >
        <div
          className={`w-3 h-3 rounded-full transition-all absolute top-0.5 ${
            enabled
              ? 'bg-[#00ff00] left-[calc(100%-14px)]'
              : 'bg-[#00ff00]/40 left-0.5'
          }`}
        />
      </div>
      <span className={enabled ? 'text-[#00ff00]' : 'text-[#00ff00]/50'}>
        {label}
      </span>
    </button>
  );
}
