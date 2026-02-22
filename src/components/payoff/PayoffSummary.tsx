'use client';

import { PayoffResult } from '@/lib/types';
import { formatUSD } from '@/lib/utils';

interface PayoffSummaryProps {
  result: PayoffResult | null;
}

export function PayoffSummary({ result }: PayoffSummaryProps) {
  if (!result) return null;

  const lines = [
    {
      label: 'MAX_PROFIT',
      value:
        result.maxProfit === 'Unlimited'
          ? 'Unlimited'
          : formatUSD(result.maxProfit),
      color:
        result.maxProfit === 'Unlimited' || result.maxProfit > 0
          ? 'text-terminal-green'
          : 'text-terminal-red',
    },
    {
      label: 'MAX_LOSS',
      value:
        result.maxLoss === 'Unlimited'
          ? 'Unlimited'
          : '-' + formatUSD(Math.abs(result.maxLoss as number)),
      color: 'text-terminal-red',
    },
    ...result.breakevens.map((b, i) => ({
      label: `BREAKEVEN_${i + 1}`,
      value: formatUSD(b),
      color: 'text-terminal-amber',
    })),
  ];

  return (
    <div className="border border-terminal-green/30 font-mono text-xs">
      <div className="px-3 py-1 border-b border-terminal-green/20 text-terminal-dimgreen">
        STRATEGY_SUMMARY
      </div>
      <div className="p-3 space-y-1">
        {lines.map((line) => (
          <div key={line.label} className="flex justify-between">
            <span className="text-terminal-dimgreen">{line.label}:</span>
            <span className={line.color}>{line.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
