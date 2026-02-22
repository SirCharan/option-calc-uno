interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = 'COMPUTING...' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-2 text-[#00ff00]">
      <span className="inline-block w-2 h-4 bg-[#00ff00] animate-pulse" />
      <span className="text-sm font-mono">{text}</span>
    </div>
  );
}
