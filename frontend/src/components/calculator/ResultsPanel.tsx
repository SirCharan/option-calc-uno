import TerminalCard from '@/components/ui/TerminalCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatNumber } from '@/lib/utils';
import type { PricingResponse } from '@/lib/types';

interface ResultsPanelProps {
  results: PricingResponse | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResultsPanel({ results, isLoading, error }: ResultsPanelProps) {
  if (isLoading) {
    return (
      <TerminalCard title="Results">
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </TerminalCard>
    );
  }

  if (error) {
    return (
      <TerminalCard title="Results">
        <div className="text-[#ff3333] text-sm py-4">{error}</div>
      </TerminalCard>
    );
  }

  if (!results) {
    return (
      <TerminalCard title="Results">
        <div className="text-[#00ff00]/30 text-sm py-8 text-center">
          Enter parameters to calculate option prices
        </div>
      </TerminalCard>
    );
  }

  const greekRows = [
    { label: 'Call Delta', value: results.greeks.call_delta },
    { label: 'Put Delta', value: results.greeks.put_delta },
    { label: 'Gamma', value: results.greeks.gamma },
    { label: 'Vega', value: results.greeks.vega },
    { label: 'Call Theta', value: results.greeks.call_theta },
    { label: 'Put Theta', value: results.greeks.put_theta },
    { label: 'Call Rho', value: results.greeks.call_rho },
    { label: 'Put Rho', value: results.greeks.put_rho },
  ];

  return (
    <TerminalCard title="Results">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#00ff00]/50 text-xs uppercase mb-1">Call Price</div>
            <div className="text-[#00ff00] text-2xl font-bold">
              ${formatNumber(results.call_price)}
            </div>
          </div>
          <div>
            <div className="text-[#00ff00]/50 text-xs uppercase mb-1">Put Price</div>
            <div className="text-[#00ff00] text-2xl font-bold">
              ${formatNumber(results.put_price)}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[#00ff00]/50 text-xs uppercase mb-2">Greeks</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {greekRows.map((row) => (
              <div key={row.label} className="flex justify-between text-xs py-1 border-b border-[#00ff00]/10">
                <span className="text-[#00ff00]/60">{row.label}</span>
                <span className="text-[#00ff00]">{formatNumber(row.value, 6)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TerminalCard>
  );
}
