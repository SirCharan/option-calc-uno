'use client';

import { useOptions } from '@/context/OptionsContext';
import { useCalculatePayoff } from '@/hooks/useCalculatePayoff';
import { TerminalContainer } from '@/components/layout/TerminalContainer';
import { LegSidebar } from '@/components/payoff/LegSidebar';
import { PayoffSummary } from '@/components/payoff/PayoffSummary';
import { PayoffChart } from '@/components/payoff/PayoffChart';
import { PayoffTable } from '@/components/payoff/PayoffTable';

export default function PayoffPage() {
  const { legs } = useOptions();
  const result = useCalculatePayoff(legs);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 flex-shrink-0">
          <TerminalContainer title="OPTION_LEGS">
            <LegSidebar />
          </TerminalContainer>
        </div>

        <div className="flex-1 space-y-6">
          <PayoffSummary result={result} />
          <TerminalContainer title="PAYOFF_CHART">
            <PayoffChart result={result} />
          </TerminalContainer>
          <TerminalContainer title="PAYOFF_TABLE">
            <PayoffTable result={result} legCount={legs.length} />
          </TerminalContainer>
        </div>
      </div>
    </main>
  );
}
