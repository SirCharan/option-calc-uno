import { useState, useEffect } from 'react';
import { OptionLeg, PayoffResult } from '@/lib/types';
import { calculatePayoff, getSpotRange } from '@/lib/payoff';
import { useDebounce } from './useDebounce';

export function useCalculatePayoff(legs: OptionLeg[]) {
  const debouncedLegs = useDebounce(legs, 300);
  const [result, setResult] = useState<PayoffResult | null>(null);

  useEffect(() => {
    if (debouncedLegs.length === 0) {
      setResult(null);
      return;
    }
    const spotRange = getSpotRange(debouncedLegs);
    const res = calculatePayoff(debouncedLegs, spotRange, 200);
    setResult(res);
  }, [debouncedLegs]);

  return result;
}
