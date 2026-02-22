import TerminalInput from '@/components/ui/TerminalInput';

interface RiskFreeRateInputProps {
  value: number | string;
  onChange: (value: string) => void;
}

export default function RiskFreeRateInput({ value, onChange }: RiskFreeRateInputProps) {
  return (
    <TerminalInput
      label="Risk-Free Rate"
      value={value}
      onChange={onChange}
      suffix="%"
      placeholder="10"
    />
  );
}
