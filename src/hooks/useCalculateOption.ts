import { useState, useEffect } from 'react';
import { OptionInput, OptionResult } from '@/lib/types';
import { useDebounce } from './useDebounce';
import { calculateOption } from '@/lib/black-scholes';
import { validateOptionInput } from '@/lib/utils';

export function useCalculateOption(input: OptionInput) {
  const debouncedInput = useDebounce(input, 300);
  const [result, setResult] = useState<OptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errors = validateOptionInput(debouncedInput);
    if (errors.length > 0) {
      setResult(null);
      setError(errors[0]);
      return;
    }
    try {
      const res = calculateOption(debouncedInput);
      setResult(res);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  }, [
    debouncedInput.spotPrice,
    debouncedInput.strikePrice,
    debouncedInput.riskFreeRate,
    debouncedInput.impliedVolatility,
    debouncedInput.timeToExpiry,
    debouncedInput.optionType,
  ]);

  return { result, error };
}
