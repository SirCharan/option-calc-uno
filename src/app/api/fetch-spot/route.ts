import { NextRequest, NextResponse } from 'next/server';
import { CURRENCY_MAP, COINGECKO_BASE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const currency = request.nextUrl.searchParams.get('currency') || 'btc';
  const coinId = CURRENCY_MAP[currency.toLowerCase()] || 'bitcoin';

  try {
    const res = await fetch(
      `${COINGECKO_BASE}/simple/price?ids=${coinId}&vs_currencies=usd`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) throw new Error(`CoinGecko returned ${res.status}`);
    const data = await res.json();
    const price = data[coinId]?.usd;
    if (!price) throw new Error('Price not found in response');
    return NextResponse.json({ price, source: 'coingecko' });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch spot price: ${(error as Error).message}` },
      { status: 502 },
    );
  }
}
