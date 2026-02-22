import type { OptionLeg, PayoffDataPoint } from './types';

export function legPayoff(leg: OptionLeg, underlyingPrice: number): number {
  let intrinsic: number;
  if (leg.type === 'call') {
    intrinsic = Math.max(underlyingPrice - leg.strikePrice, 0);
  } else {
    intrinsic = Math.max(leg.strikePrice - underlyingPrice, 0);
  }

  if (leg.position === 'long') {
    return (intrinsic - leg.premium) * leg.quantity;
  } else {
    return (leg.premium - intrinsic) * leg.quantity;
  }
}

export function calculatePayoffData(
  legs: OptionLeg[],
  minPrice: number,
  maxPrice: number,
  numPoints: number = 500
): PayoffDataPoint[] {
  if (legs.length === 0 || minPrice >= maxPrice) return [];

  const step = (maxPrice - minPrice) / (numPoints - 1);
  const data: PayoffDataPoint[] = [];

  for (let i = 0; i < numPoints; i++) {
    const price = minPrice + step * i;
    const point: PayoffDataPoint = { underlyingPrice: price, totalPayoff: 0 };

    for (const leg of legs) {
      const pnl = legPayoff(leg, price);
      point[leg.id] = pnl;
      point.totalPayoff += pnl;
    }

    data.push(point);
  }

  return data;
}

export function findBreakevens(data: PayoffDataPoint[]): number[] {
  const breakevens: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1].totalPayoff;
    const curr = data[i].totalPayoff;

    if ((prev <= 0 && curr >= 0) || (prev >= 0 && curr <= 0)) {
      const range = curr - prev;
      if (range === 0) continue;
      const ratio = (0 - prev) / range;
      const breakevenPrice =
        data[i - 1].underlyingPrice +
        ratio * (data[i].underlyingPrice - data[i - 1].underlyingPrice);
      breakevens.push(breakevenPrice);
    }
  }

  return breakevens;
}

export function computeRange(legs: OptionLeg[]): [number, number] {
  if (legs.length === 0) return [0, 100000];

  const strikes = legs.map((l) => l.strikePrice).filter((s) => s > 0);
  if (strikes.length === 0) return [0, 100000];

  const minStrike = Math.min(...strikes);
  const maxStrike = Math.max(...strikes);
  const spread = maxStrike - minStrike || maxStrike * 0.5;
  const padding = Math.max(spread * 0.5, maxStrike * 0.2);

  return [Math.max(0, minStrike - padding), maxStrike + padding];
}
