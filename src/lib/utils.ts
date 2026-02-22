import { ManualExpiry, OptionInput } from './types';

export function manualExpiryToYears(expiry: ManualExpiry): number {
  const totalDays =
    expiry.days +
    expiry.hours / 24 +
    expiry.minutes / 1440 +
    expiry.seconds / 86400;
  return totalDays / 365;
}

export function dateToExpiryYears(expiryDate: Date): number {
  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();
  if (diffMs <= 0) return 0;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays / 365;
}

export function formatNumber(n: number, decimals: number = 4): string {
  if (Math.abs(n) >= 1000) {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return n.toFixed(decimals);
}

export function formatUSD(n: number): string {
  return '$' + Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function validateOptionInput(input: OptionInput): string[] {
  const errors: string[] = [];
  if (input.spotPrice <= 0) errors.push('Spot price must be positive');
  if (input.strikePrice <= 0) errors.push('Strike price must be positive');
  if (input.riskFreeRate < 0) errors.push('Risk-free rate cannot be negative');
  if (input.impliedVolatility < 0) errors.push('IV cannot be negative');
  if (input.timeToExpiry <= 0) errors.push('Time to expiry must be positive');
  return errors;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
