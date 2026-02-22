import { NextRequest, NextResponse } from 'next/server';
import { calculatePayoff } from '@/lib/payoff';

export async function POST(request: NextRequest) {
  try {
    const { legs, spotRange, steps = 200 } = await request.json();
    if (!Array.isArray(legs) || legs.length === 0) {
      return NextResponse.json(
        { error: 'At least one leg is required' },
        { status: 400 },
      );
    }
    const result = calculatePayoff(legs, spotRange, steps);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Payoff calculation failed: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
