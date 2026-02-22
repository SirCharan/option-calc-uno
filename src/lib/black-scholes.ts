import { OptionInput, OptionResult } from './types';

// Abramowitz & Stegun approximation (26.2.17) for the cumulative normal distribution
// Max error: |e| < 7.5e-8
const A1 = 0.254829592;
const A2 = -0.284496736;
const A3 = 1.421413741;
const A4 = -1.453152027;
const A5 = 1.061405429;
const P = 0.3275911;

function normalCDF(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + P * absX);
  const y =
    1.0 -
    (((((A5 * t + A4) * t + A3) * t + A2) * t + A1) * t *
      Math.exp((-absX * absX) / 2));
  return 0.5 * (1.0 + sign * y);
}

function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function calcD1(
  S: number,
  K: number,
  r: number,
  sigma: number,
  T: number,
): number {
  return (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
}

function calcD2(
  S: number,
  K: number,
  r: number,
  sigma: number,
  T: number,
): number {
  return calcD1(S, K, r, sigma, T) - sigma * Math.sqrt(T);
}

export function calculateOption(input: OptionInput): OptionResult {
  const {
    spotPrice: S,
    strikePrice: K,
    riskFreeRate: r,
    impliedVolatility: sigma,
    timeToExpiry: T,
    optionType,
  } = input;

  if (T <= 0) {
    const intrinsic =
      optionType === 'call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
    return { price: intrinsic, delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 };
  }

  if (sigma <= 0) {
    const pv = K * Math.exp(-r * T);
    if (optionType === 'call') {
      const price = Math.max(S - pv, 0);
      return { price, delta: price > 0 ? 1 : 0, gamma: 0, theta: 0, vega: 0, rho: 0 };
    } else {
      const price = Math.max(pv - S, 0);
      return { price, delta: price > 0 ? -1 : 0, gamma: 0, theta: 0, vega: 0, rho: 0 };
    }
  }

  const d1 = calcD1(S, K, r, sigma, T);
  const d2 = calcD2(S, K, r, sigma, T);
  const expMinusRT = Math.exp(-r * T);
  const sqrtT = Math.sqrt(T);
  const nd1 = normalCDF(d1);
  const nd2 = normalCDF(d2);
  const nPrimeD1 = normalPDF(d1);

  let price: number, delta: number, theta: number, rho: number;

  if (optionType === 'call') {
    price = S * nd1 - K * expMinusRT * nd2;
    delta = nd1;
    theta =
      (-(S * nPrimeD1 * sigma) / (2 * sqrtT) - r * K * expMinusRT * nd2) / 365;
    rho = (K * T * expMinusRT * nd2) / 100;
  } else {
    const nMinusD1 = normalCDF(-d1);
    const nMinusD2 = normalCDF(-d2);
    price = K * expMinusRT * nMinusD2 - S * nMinusD1;
    delta = nd1 - 1;
    theta =
      (-(S * nPrimeD1 * sigma) / (2 * sqrtT) + r * K * expMinusRT * nMinusD2) /
      365;
    rho = (-K * T * expMinusRT * nMinusD2) / 100;
  }

  const gamma = nPrimeD1 / (S * sigma * sqrtT);
  const vega = (S * nPrimeD1 * sqrtT) / 100;

  return { price, delta, gamma, theta, vega, rho };
}
