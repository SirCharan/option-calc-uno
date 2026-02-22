'use client';

import { useState, useEffect } from 'react';

export function LoadingSpinner({ text = 'Fetching' }: { text?: string }) {
  const frames = ['|', '/', '-', '\\'];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-terminal-green text-xs animate-pulse-green">
      {text}... {frames[frame]}
    </span>
  );
}
