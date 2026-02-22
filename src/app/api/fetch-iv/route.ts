import { NextRequest, NextResponse } from 'next/server';
import { DERIBIT_BASE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const currency = (
    request.nextUrl.searchParams.get('currency') || 'BTC'
  ).toUpperCase();

  try {
    const now = Date.now();
    const oneHourAgo = now - 3600000;
    const res = await fetch(
      `${DERIBIT_BASE}/public/get_volatility_index_data?currency=${currency}&start_timestamp=${oneHourAgo}&end_timestamp=${now}&resolution=3600`,
    );
    if (!res.ok) throw new Error(`Deribit returned ${res.status}`);
    const data = await res.json();
    const candles = data.result?.data;
    if (!candles || candles.length === 0)
      throw new Error('No DVOL data returned');
    const latestCandle = candles[candles.length - 1];
    const dvol = latestCandle[4]; // close
    return NextResponse.json({ iv: dvol, source: 'deribit_dvol' });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch IV: ${(error as Error).message}` },
      { status: 502 },
    );
  }
}
