export interface OptionInput {
  spotPrice: number;
  strikePrice: number;
  riskFreeRate: number;
  impliedVolatility: number;
  timeToExpiry: number;
  optionType: 'call' | 'put';
}

export interface OptionResult {
  price: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

export interface OptionLeg {
  id: string;
  optionType: 'call' | 'put';
  direction: 'long' | 'short';
  quantity: number;
  strikePrice: number;
  premium: number;
  spotPrice: number;
  riskFreeRate: number;
  impliedVolatility: number;
  timeToExpiry: number;
}

export interface PayoffPoint {
  spotPrice: number;
  legPayoffs: number[];
  totalPayoff: number;
}

export interface PayoffResult {
  points: PayoffPoint[];
  maxProfit: number | 'Unlimited';
  maxLoss: number | 'Unlimited';
  breakevens: number[];
}

export interface SavedStrategy {
  id: string;
  name: string;
  legs: OptionLeg[];
  createdAt: string;
}

export type ExpiryMode = 'manual' | 'calendar' | 'quick';

export interface ManualExpiry {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
