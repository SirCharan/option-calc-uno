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
    }, 50);
    return () => clearInterval(interval);
  }, [result]);

  if (error) {
    return (
      <div className="space-y-3 min-h-[200px] flex flex-col justify-center items-center">
        <div className="text-text-muted text-xs">
          &gt; AWAITING VALID INPUT...
        </div>
        <div className="text-negative/80 text-xs">[ERROR]: {error}</div>
        <span className="inline-block w-2 h-4 bg-accent/50 animate-cursor-blink" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-3 min-h-[200px] flex flex-col justify-center items-center">
        <div className="text-text-muted text-xs">
          &gt; AWAITING INPUT...
        </div>
        <div className="text-text-muted/60 text-[11px]">
          Enter parameters to calculate option price and Greeks
        </div>
        <span className="inline-block w-2 h-4 bg-accent/40 animate-cursor-blink" />
      </div>
    );
  }

  const values: Record<string, { display: string; raw: number; unit: string }> = {
    OPTION_PRICE: { display: formatUSD(result.price), raw: result.price, unit: '' },
    DELTA: { display: formatNumber(result.delta), raw: result.delta, unit: '' },
    GAMMA: { display: formatNumber(result.gamma, 6), raw: result.gamma, unit: '' },
    THETA: { display: formatNumber(result.theta), raw: result.theta, unit: '/day' },
    VEGA: { display: formatNumber(result.vega), raw: result.vega, unit: '/1%' },
    RHO: { display: formatNumber(result.rho), raw: result.rho, unit: '/1%' },
  };

  return (
    <div className="space-y-1.5 text-xs font-mono">
      {visibleLines >= 1 && (
        <div className="text-accent/60 text-[10px] tracking-wider">
          CALCULATING BLACK-SCHOLES...
        </div>
      )}
      {visibleLines >= 2 && (
        <div className="border-b border-border mb-1" />
      )}
      {LINES.map((line, i) => {
        if (visibleLines < i + 3) return null;
        const val = values[line];
        const isNeg = val.raw < 0;
        return (
          <div
            key={line}
            className="flex items-baseline justify-between py-0.5 animate-[fadeIn_0.2s_ease]"
          >
            <span className="text-text-secondary text-[11px]">
              {line}
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-sm tabular-nums ${
                  isNeg ? 'text-negative' : 'text-positive'
                }`}
              >
                {val.display}
              </span>
              {val.unit && (
                <span className="text-text-muted text-[9px]">
                  {val.unit}
                </span>
              )}
            </div>
          </div>
        );
      })}
      {visibleLines >= LINES.length + 2 && (
        <>
          <div className="border-b border-border mt-1" />
          <div className="text-accent/50 text-[10px] tracking-wider">
            STATUS: OK
          </div>
        </>
      )}
    </div>
  );
}
