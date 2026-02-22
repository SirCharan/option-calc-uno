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
          <tr className="border-b border-terminal-green/20">
            <th className="text-left text-terminal-dimgreen/60 px-3 py-2 text-[10px] tracking-wider">
              SPOT
            </th>
            {Array.from({ length: legCount }).map((_, i) => (
              <th
                key={i}
                className="text-right text-terminal-dimgreen/60 px-3 py-2 text-[10px] tracking-wider"
              >
                LEG_{i + 1}
              </th>
            ))}
            <th className="text-right text-terminal-dimgreen/60 px-3 py-2 text-[10px] tracking-wider">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-terminal-green/5 hover:bg-terminal-green/5 transition-colors ${
                ri % 2 === 0 ? 'bg-terminal-gray/20' : ''
              }`}
            >
              <td className="text-terminal-dimgreen/70 px-3 py-1.5 tabular-nums">
                {formatUSD(row.spotPrice)}
              </td>
              {row.legPayoffs.map((lp, li) => (
                <td
                  key={li}
                  className={`text-right px-3 py-1.5 tabular-nums ${
                    lp >= 0 ? 'text-terminal-green/80' : 'text-terminal-red/80'
                  }`}
                >
                  {lp >= 0 ? '' : '-'}
                  {formatUSD(Math.abs(lp))}
                </td>
              ))}
              <td
                className={`text-right px-3 py-1.5 tabular-nums font-bold ${
                  row.totalPayoff >= 0
                    ? 'text-terminal-green'
                    : 'text-terminal-red'
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
