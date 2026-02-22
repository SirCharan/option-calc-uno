interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalCard({ title, children, className = '' }: TerminalCardProps) {
  return (
    <div className={`bg-[#111111] border border-[#00ff00]/20 rounded-lg ${className}`}>
      {title && (
        <div className="border-b border-[#00ff00]/20 px-4 py-2">
          <span className="text-[#00ff00]/70 text-xs uppercase tracking-wider">{title}</span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
