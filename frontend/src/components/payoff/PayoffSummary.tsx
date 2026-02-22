import TerminalCard from '@/components/ui/TerminalCard';
import { findBreakevens } from '@/lib/payoff';
import { formatNumber } from '@/lib/utils';
import type { PayoffDataPoint, OptionLeg } from '@/lib/types';

interface PayoffSummaryProps {
  data: PayoffDataPoint[];
  legs: OptionLeg[];
}

export default function PayoffSummary({ data, legs }: PayoffSummaryProps) {
  if (data.length === 0 || legs.length === 0) {
    return null;
  }

  const breakevens = findBreakevens(data);
  const payoffs = data.map((d) => d.totalPayoff);
  const maxProfit = Math.max(...payoffs);
  const maxLoss = Math.min(...payoffs);

  const netPremium = legs.reduce((sum, leg) => {
    const premium = leg.premium * leg.quantity;
    return sum + (leg.position === 'long' ? -premium : premium);
  }, 0);

  const rows = [
    {
      label: 'Breakeven(s)',
      value: breakevens.length > 0
        ? breakevens.map((b) => `$${formatNumber(b)}`).join(', ')
        : 'None',
    },
    {
      label: 'Max Profit',
      value: maxProfit >= payoffs[payoffs.length - 1] * 0.99 && maxProfit > 0
        ? 'Unlimited'
        : `$${formatNumber(maxProfit)}`,
      color: maxProfit > 0 ? 'text-[#00ff00]' : 'text-[#ff3333]',
    },
    {
      label: 'Max Loss',
      value: `$${formatNumber(maxLoss)}`,
      color: 'text-[#ff3333]',
    },
    {
      label: 'Net Premium',
      value: `$${formatNumber(netPremium)}`,
      color: netPremium >= 0 ? 'text-[#00ff00]' : 'text-[#ff3333]',
    },
  ];

  return (
    <TerminalCard title="Summary">
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-xs py-1 border-b border-[#00ff00]/10">
            <span className="text-[#00ff00]/60">{row.label}</span>
            <span className={row.color || 'text-[#00ff00]'}>{row.value}</span>
          </div>
        ))}
      </div>
    </TerminalCard>
  );
}
