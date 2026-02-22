export function timeToYears(
  days: number,
  hours: number,
  minutes: number,
  seconds: number
): number {
  const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
  return totalSeconds / (365 * 24 * 3600);
}

export function dateToYears(targetDate: Date): number {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  if (diffMs <= 0) return 0;
  return diffMs / 1000 / (365 * 24 * 3600);
}

export function formatNumber(n: number, decimals: number = 2): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
