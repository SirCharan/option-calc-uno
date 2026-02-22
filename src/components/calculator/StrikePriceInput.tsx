'use client';

import { TerminalInput } from '@/components/ui/TerminalInput';

interface StrikePriceInputProps {
  value: number;
  onChange: (v: number) => void;
}

export function StrikePriceInput({ value, onChange }: StrikePriceInputProps) {
  return (
    <TerminalInput
      label="STRIKE_PRICE"
      value={value || ''}
      onChange={(v) => onChange(parseFloat(v) || 0)}
      type="number"
      placeholder="0.00"
      min={0}
      step="0.01"
    />
  );
}
