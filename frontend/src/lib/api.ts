import { API_BASE_URL } from './constants';
import type { PricingRequest, PricingResponse, SpotPriceResponse, DvolResponse } from './types';

export async function calculatePrice(req: PricingRequest): Promise<PricingResponse> {
  const response = await fetch(`${API_BASE_URL}/api/price`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Calculation failed' }));
    throw new Error(error.detail || 'Calculation failed');
  }

  return response.json();
}

export async function fetchSpotPrice(coin: string): Promise<SpotPriceResponse> {
  const response = await fetch(`${API_BASE_URL}/api/spot-price?coin=${encodeURIComponent(coin)}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch spot price' }));
    throw new Error(error.detail || 'Failed to fetch spot price');
  }

  return response.json();
}

export async function fetchDvol(currency: string): Promise<DvolResponse> {
  const response = await fetch(`${API_BASE_URL}/api/dvol?currency=${encodeURIComponent(currency)}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch DVOL' }));
    throw new Error(error.detail || 'Failed to fetch DVOL');
  }

  return response.json();
}
