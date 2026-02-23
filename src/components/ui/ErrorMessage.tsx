'use client';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-negative text-xs font-mono py-1 animate-[fadeIn_0.3s_ease-in]">
      [ERROR]: {message}
    </div>
  );
}
