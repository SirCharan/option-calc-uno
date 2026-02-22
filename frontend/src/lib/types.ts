export interface PricingRequest {
  spot_price: number;
  strike_price: number;
  risk_free_rate: number;
  volatility: number;
  time_to_expiry: number;
}

export interface Greeks {
  call_delta: number;
  put_delta: number;
  gamma: number;
  vega: number;
  call_theta: number;
  put_theta: number;
  call_rho: number;
  put_rho: number;
}

export interface PricingResponse {
  call_price: number;
  put_price: number;
  greeks: Greeks;
}

export interface SpotPriceResponse {
  coin: string;
  price_usd: number;
  source: string;
  timestamp: string;
}

export interface DvolResponse {
  currency: string;
  dvol: number;
  dvol_decimal: number;
  timestamp: string;
}

export interface OptionLeg {
  id: string;
  type: 'call' | 'put';
  position: 'long' | 'short';
  strikePrice: number;
  premium: number;
  quantity: number;
}

export interface PayoffDataPoint {
  underlyingPrice: number;
  totalPayoff: number;
  [key: string]: number;
}
