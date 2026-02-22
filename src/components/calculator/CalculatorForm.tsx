'use client';

import { useOptions } from '@/context/OptionsContext';
import { useCalculateOption } from '@/hooks/useCalculateOption';
import { SpotPriceInput } from './SpotPriceInput';
import { StrikePriceInput } from './StrikePriceInput';
import { RiskFreeRateInput } from './RiskFreeRateInput';
import { IVInput } from './IVInput';
import { TimeToExpiry } from './TimeToExpiry';
import { OptionTypeSelector } from './OptionTypeSelector';
import { ResultsConsole } from './ResultsConsole';
import { TerminalContainer } from '@/components/layout/TerminalContainer';

export function CalculatorForm() {
  const ctx = useOptions();

  const { result, error } = useCalculateOption({
    spotPrice: ctx.spotPrice,
    strikePrice: ctx.strikePrice,
    riskFreeRate: ctx.riskFreeRate,
    impliedVolatility: ctx.impliedVolatility,
    timeToExpiry: ctx.timeToExpiry,
    optionType: ctx.optionType,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <TerminalContainer title="INPUT_PARAMETERS">
          <div className="space-y-5">
            <SpotPriceInput
              value={ctx.spotPrice}
              onChange={ctx.setSpotPrice}
              currency={ctx.currency}
              onCurrencyChange={ctx.setCurrency}
            />
            <StrikePriceInput
              value={ctx.strikePrice}
              onChange={ctx.setStrikePrice}
            />
            <div className="border-b border-terminal-border" />
            <RiskFreeRateInput
              value={ctx.riskFreeRate}
              onChange={ctx.setRiskFreeRate}
            />
            <IVInput
              value={ctx.impliedVolatility}
              onChange={ctx.setImpliedVolatility}
              currency={ctx.currency}
            />
            <div className="border-b border-terminal-border" />
            <TimeToExpiry
              value={ctx.timeToExpiry}
              onChange={ctx.setTimeToExpiry}
            />
            <OptionTypeSelector
              value={ctx.optionType}
              onChange={ctx.setOptionType}
            />
          </div>
        </TerminalContainer>
      </div>

      <div className="lg:w-1/2">
        <TerminalContainer title="OUTPUT_CONSOLE">
          <ResultsConsole result={result} error={error} />
        </TerminalContainer>
      </div>
    </div>
  );
}
