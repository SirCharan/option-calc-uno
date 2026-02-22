'use client';

import { PayoffResult } from '@/lib/types';
import { formatUSD } from '@/lib/utils';

interface PayoffSummaryProps {
  result: PayoffResult | null;
}

export function PayoffSummary({ result }: PayoffSummaryProps) {
  if (!result) return null;

  const items = [
    {
      label: 'MAX PROFIT',
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
      label: 'MAX LOSS',
      value:
        result.maxLoss === 'Unlimited'
          ? 'Unlimited'
          : '-' + formatUSD(Math.abs(result.maxLoss as number)),
      color: 'text-terminal-red',
    },
    ...result.breakevens.map((b, i) => ({
      label: `BREAKEVEN${result.breakevens.length > 1 ? ` ${i + 1}` : ''}`,
      value: formatUSD(b),
      color: 'text-terminal-amber',
    })),
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-terminal-border px-4 py-2.5 bg-terminal-gray/20 flex-1 min-w-[140px]"
        >
          <div className="text-terminal-dimgreen/50 text-[9px] tracking-widest mb-1">
            {item.label}
          </div>
          <div className={`text-sm font-bold tabular-nums ${item.color}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
