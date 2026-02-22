export const CURRENCY_MAP: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
};

export const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
export const DERIBIT_BASE = 'https://www.deribit.com/api/v2';

export const DEFAULT_RISK_FREE_RATE = 0.10;
export const DEFAULT_CURRENCY = 'btc';

export const QUICK_SELECT_OPTIONS = [
  { label: '1H', days: 0, hours: 1, minutes: 0, seconds: 0 },
  { label: '1D', days: 1, hours: 0, minutes: 0, seconds: 0 },
  { label: '1W', days: 7, hours: 0, minutes: 0, seconds: 0 },
  { label: '1M', days: 30, hours: 0, minutes: 0, seconds: 0 },
  { label: '1Y', days: 365, hours: 0, minutes: 0, seconds: 0 },
] as const;

export const CURRENCIES = [
  { value: 'btc', label: 'BTC' },
  { value: 'eth', label: 'ETH' },
  { value: 'sol', label: 'SOL' },
] as const;
