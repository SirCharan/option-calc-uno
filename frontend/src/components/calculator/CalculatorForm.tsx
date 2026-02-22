import TerminalCard from '@/components/ui/TerminalCard';
import SpotPriceInput from './SpotPriceInput';
import StrikePriceInput from './StrikePriceInput';
import RiskFreeRateInput from './RiskFreeRateInput';
import IVInput from './IVInput';
import ExpiryInput from './ExpiryInput';

interface CalculatorFormProps {
  spotPrice: string;
  strikePrice: string;
  riskFreeRate: string;
  volatility: string;
  timeToExpiry: number;
  onSpotPriceChange: (v: string) => void;
  onStrikePriceChange: (v: string) => void;
  onRiskFreeRateChange: (v: string) => void;
  onVolatilityChange: (v: string) => void;
  onTimeToExpiryChange: (v: number) => void;
}

export default function CalculatorForm({
  spotPrice,
  strikePrice,
  riskFreeRate,
  volatility,
  timeToExpiry,
  onSpotPriceChange,
  onStrikePriceChange,
  onRiskFreeRateChange,
  onVolatilityChange,
  onTimeToExpiryChange,
}: CalculatorFormProps) {
  return (
    <TerminalCard title="Parameters">
      <div className="space-y-4">
        <SpotPriceInput value={spotPrice} onChange={onSpotPriceChange} />
        <StrikePriceInput value={strikePrice} onChange={onStrikePriceChange} />
        <div className="grid grid-cols-2 gap-4">
          <RiskFreeRateInput value={riskFreeRate} onChange={onRiskFreeRateChange} />
          <IVInput value={volatility} onChange={onVolatilityChange} />
        </div>
        <ExpiryInput value={timeToExpiry} onChange={onTimeToExpiryChange} />
      </div>
    </TerminalCard>
  );
}
