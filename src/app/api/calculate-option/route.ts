import { NextRequest, NextResponse } from 'next/server';
import { calculateOption } from '@/lib/black-scholes';
import { OptionInput } from '@/lib/types';
import { validateOptionInput } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const input: OptionInput = await request.json();
    const errors = validateOptionInput(input);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    const result = calculateOption(input);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Calculation failed: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
