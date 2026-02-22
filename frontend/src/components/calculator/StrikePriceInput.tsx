import TerminalInput from '@/components/ui/TerminalInput';

interface StrikePriceInputProps {
  value: number | string;
  onChange: (value: string) => void;
}

export default function StrikePriceInput({ value, onChange }: StrikePriceInputProps) {
  return (
    <TerminalInput
      label="Strike Price"
      value={value}
      onChange={onChange}
      suffix="USD"
      placeholder="0.00"
    />
  );
}
