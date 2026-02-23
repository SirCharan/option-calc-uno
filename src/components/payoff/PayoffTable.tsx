'use client';

import { PayoffResult } from '@/lib/types';
import { formatUSD } from '@/lib/utils';

interface PayoffTableProps {
  result: PayoffResult | null;
  legCount: number;
}

export function PayoffTable({ result, legCount }: PayoffTableProps) {
  if (!result || result.points.length === 0) return null;

  const step = Math.max(1, Math.floor(result.points.length / 20));
  const rows = result.points.filter(
    (_, i) => i % step === 0 || i === result.points.length - 1,
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-text-muted px-3 py-2 text-xs tracking-wider">
              SPOT
            </th>
            {Array.from({ length: legCount }).map((_, i) => (
              <th
                key={i}
                className="text-right text-text-muted px-3 py-2 text-xs tracking-wider"
              >
                LEG_{i + 1}
              </th>
            ))}
            <th className="text-right text-text-muted px-3 py-2 text-xs tracking-wider">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-border/30 hover:bg-bg-hover transition-colors ${
                ri % 2 === 0 ? 'bg-bg-elevated/30' : ''
              }`}
            >
              <td className="text-text-secondary px-3 py-1.5 tabular-nums">
                {formatUSD(row.spotPrice)}
              </td>
              {row.legPayoffs.map((lp, li) => (
                <td
                  key={li}
                  className={`text-right px-3 py-1.5 tabular-nums ${
                    lp >= 0 ? 'text-positive/80' : 'text-negative/80'
                  }`}
                >
                  {lp >= 0 ? '' : '-'}
                  {formatUSD(Math.abs(lp))}
                </td>
              ))}
              <td
                className={`text-right px-3 py-1.5 tabular-nums font-bold ${
                  row.totalPayoff >= 0
                    ? 'text-positive'
                    : 'text-negative'
                }`}
              >
                {row.totalPayoff >= 0 ? '' : '-'}
                {formatUSD(Math.abs(row.totalPayoff))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
