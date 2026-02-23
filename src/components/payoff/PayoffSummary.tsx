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
          ? 'text-positive'
          : 'text-negative',
    },
    {
      label: 'MAX LOSS',
      value:
        result.maxLoss === 'Unlimited'
          ? 'Unlimited'
          : '-' + formatUSD(Math.abs(result.maxLoss as number)),
      color: 'text-negative',
    },
    ...result.breakevens.map((b, i) => ({
      label: `BREAKEVEN${result.breakevens.length > 1 ? ` ${i + 1}` : ''}`,
      value: formatUSD(b),
      color: 'text-warning',
    })),
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-border rounded-lg px-4 py-2.5 bg-bg-card flex-1 min-w-[140px]"
        >
          <div className="text-text-muted text-[9px] tracking-widest mb-1">
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
