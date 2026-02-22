'use client';

import { OptionResult } from '@/lib/types';
import { formatNumber, formatUSD } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ResultsConsoleProps {
  result: OptionResult | null;
  error: string | null;
}

const LINES = [
  'OPTION_PRICE',
  'DELTA',
  'GAMMA',
  'THETA',
  'VEGA',
  'RHO',
] as const;

export function ResultsConsole({ result, error }: ResultsConsoleProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!result) {
      setVisibleLines(0);
      return;
    }
    setVisibleLines(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= LINES.length + 2) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [result]);

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-terminal-dimgreen text-xs">
          &gt; AWAITING VALID INPUT...
        </div>
        <div className="text-terminal-red text-xs">[ERROR]: {error}</div>
        <span className="inline-block w-2 h-4 bg-terminal-green/70 animate-cursor-blink" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-2">
        <div className="text-terminal-dimgreen text-xs">
          &gt; AWAITING INPUT...
        </div>
        <div className="text-terminal-dimgreen text-xs">
          &gt; Enter parameters to calculate option price and Greeks.
        </div>
        <span className="inline-block w-2 h-4 bg-terminal-green/70 animate-cursor-blink" />
      </div>
    );
  }

  const values: Record<string, { display: string; raw: number }> = {
    OPTION_PRICE: { display: formatUSD(result.price), raw: result.price },
    DELTA: { display: formatNumber(result.delta), raw: result.delta },
    GAMMA: { display: formatNumber(result.gamma, 6), raw: result.gamma },
    THETA: { display: formatNumber(result.theta), raw: result.theta },
    VEGA: { display: formatNumber(result.vega), raw: result.vega },
    RHO: { display: formatNumber(result.rho), raw: result.rho },
  };

  return (
    <div className="space-y-1 text-xs">
      {visibleLines >= 1 && (
        <div className="text-terminal-green">
          &gt; CALCULATING BLACK-SCHOLES...
        </div>
      )}
      {visibleLines >= 2 && (
        <div className="text-terminal-green/50">
          &gt; {'─'.repeat(35)}
        </div>
      )}
      {LINES.map((line, i) => {
        if (visibleLines < i + 3) return null;
        const val = values[line];
        const isNeg = val.raw < 0;
        return (
          <div key={line} className="flex justify-between">
            <span className="text-terminal-dimgreen">
              &gt; {line.padEnd(16)}
            </span>
            <span className={isNeg ? 'text-terminal-red' : 'text-terminal-green'}>
              {val.display}
            </span>
          </div>
        );
      })}
      {visibleLines >= LINES.length + 2 && (
        <>
          <div className="text-terminal-green/50">
            &gt; {'─'.repeat(35)}
          </div>
          <div className="text-terminal-green">&gt; STATUS: OK</div>
        </>
      )}
      <span className="inline-block w-2 h-4 bg-terminal-green/70 animate-cursor-blink" />
    </div>
  );
}
