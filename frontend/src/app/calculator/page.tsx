'use client';

import { useState, useEffect, useRef } from 'react';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import ResultsPanel from '@/components/calculator/ResultsPanel';
import { calculatePrice } from '@/lib/api';
import { DEFAULT_RISK_FREE_RATE } from '@/lib/constants';
import type { PricingResponse } from '@/lib/types';

export default function CalculatorPage() {
  const [spotPrice, setSpotPrice] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState(String(DEFAULT_RISK_FREE_RATE));
  const [volatility, setVolatility] = useState('');
  const [timeToExpiry, setTimeToExpiry] = useState(0);
  const [results, setResults] = useState<PricingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const spot = parseFloat(spotPrice);
    const strike = parseFloat(strikePrice);
    const rate = parseFloat(riskFreeRate);
    const vol = parseFloat(volatility);

    if (!(spot > 0 && strike > 0 && !isNaN(rate) && vol > 0 && timeToExpiry > 0)) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await calculatePrice({
          spot_price: spot,
          strike_price: strike,
          risk_free_rate: rate / 100,
          volatility: vol / 100,
          time_to_expiry: timeToExpiry,
        });
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation failed');
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [spotPrice, strikePrice, riskFreeRate, volatility, timeToExpiry]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CalculatorForm
        spotPrice={spotPrice}
        strikePrice={strikePrice}
        riskFreeRate={riskFreeRate}
        volatility={volatility}
        timeToExpiry={timeToExpiry}
        onSpotPriceChange={setSpotPrice}
        onStrikePriceChange={setStrikePrice}
        onRiskFreeRateChange={setRiskFreeRate}
        onVolatilityChange={setVolatility}
        onTimeToExpiryChange={setTimeToExpiry}
      />
      <ResultsPanel results={results} isLoading={isLoading} error={error} />
    </div>
  );
}
