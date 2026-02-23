'use client';

import { TerminalInput } from '@/components/ui/TerminalInput';

interface RiskFreeRateInputProps {
  value: number;
  onChange: (v: number) => void;
}

export function RiskFreeRateInput({ value, onChange }: RiskFreeRateInputProps) {
  return (
    <TerminalInput
      label="RISK_FREE_RATE"
      value={value != null ? (Number(value) * 100).toString() : ''}
      onChange={(v) => onChange(v === '' ? 0 : parseFloat(v) / 100)}
      type="number"
      placeholder="10.00"
      step="0.1"
      suffix="%"
    />
  );
}
