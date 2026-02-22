import { OptionLeg, PayoffPoint, PayoffResult } from './types';

export function calculatePayoff(
  legs: OptionLeg[],
  spotRange: [number, number],
  steps: number = 200,
): PayoffResult {
  const points: PayoffPoint[] = [];
  const stepSize = (spotRange[1] - spotRange[0]) / steps;

  for (let i = 0; i <= steps; i++) {
    const S = spotRange[0] + i * stepSize;
    const legPayoffs: number[] = [];

    for (const leg of legs) {
      const intrinsic =
        leg.optionType === 'call'
          ? Math.max(S - leg.strikePrice, 0)
          : Math.max(leg.strikePrice - S, 0);
      const dirMul = leg.direction === 'long' ? 1 : -1;
      const legPL = (intrinsic - leg.premium) * dirMul * leg.quantity;
      legPayoffs.push(legPL);
    }

    const totalPayoff = legPayoffs.reduce((sum, pl) => sum + pl, 0);
    points.push({ spotPrice: S, legPayoffs, totalPayoff });
  }

  const payoffs = points.map((p) => p.totalPayoff);
  const maxProfit = Math.max(...payoffs);
  const maxLoss = Math.min(...payoffs);

  const breakevens: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    if (
      (prev.totalPayoff <= 0 && curr.totalPayoff >= 0) ||
      (prev.totalPayoff >= 0 && curr.totalPayoff <= 0)
    ) {
      const ratio =
        Math.abs(prev.totalPayoff) /
        (Math.abs(prev.totalPayoff) + Math.abs(curr.totalPayoff));
      const breakeven = prev.spotPrice + ratio * (curr.spotPrice - prev.spotPrice);
      breakevens.push(breakeven);
    }
  }

  const hasLongCall = legs.some(
    (l) => l.optionType === 'call' && l.direction === 'long',
  );
  const hasShortCall = legs.some(
    (l) => l.optionType === 'call' && l.direction === 'short',
  );
  const hasLongPut = legs.some(
    (l) => l.optionType === 'put' && l.direction === 'long',
  );
  const hasShortPut = legs.some(
    (l) => l.optionType === 'put' && l.direction === 'short',
  );

  const profitUnlimited = hasLongCall && !hasShortCall;
  const lossUnlimited = hasShortCall && !hasLongCall;

  return {
    points,
    maxProfit: profitUnlimited ? 'Unlimited' : maxProfit,
    maxLoss: lossUnlimited || (hasShortPut && !hasLongPut) ? 'Unlimited' : maxLoss,
    breakevens,
  };
}

export function getSpotRange(legs: OptionLeg[]): [number, number] {
  const strikes = legs.map((l) => l.strikePrice);
  const spots = legs.map((l) => l.spotPrice);
  const allPrices = [...strikes, ...spots];
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const padding = (max - min) * 0.5 || max * 0.3;
  return [Math.max(0, min - padding), max + padding];
}
