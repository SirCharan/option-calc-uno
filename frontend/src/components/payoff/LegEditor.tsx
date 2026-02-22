import TerminalInput from '@/components/ui/TerminalInput';
import TerminalSelect from '@/components/ui/TerminalSelect';
import TerminalButton from '@/components/ui/TerminalButton';
import type { OptionLeg } from '@/lib/types';

interface LegEditorProps {
  leg: OptionLeg;
  onChange: (leg: OptionLeg) => void;
  onRemove: () => void;
}

export default function LegEditor({ leg, onChange, onRemove }: LegEditorProps) {
  return (
    <div className="space-y-3 relative">
      <div className="absolute top-0 right-0">
        <TerminalButton variant="danger" onClick={onRemove}>
          X
        </TerminalButton>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TerminalSelect
          label="Type"
          value={leg.type}
          onChange={(v) => onChange({ ...leg, type: v as 'call' | 'put' })}
          options={[
            { value: 'call', label: 'CALL' },
            { value: 'put', label: 'PUT' },
          ]}
        />
        <TerminalSelect
          label="Position"
          value={leg.position}
          onChange={(v) => onChange({ ...leg, position: v as 'long' | 'short' })}
          options={[
            { value: 'long', label: 'LONG' },
            { value: 'short', label: 'SHORT' },
          ]}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <TerminalInput
          label="Strike"
          value={leg.strikePrice}
          onChange={(v) => onChange({ ...leg, strikePrice: Number(v) || 0 })}
          placeholder="0"
        />
        <TerminalInput
          label="Premium"
          value={leg.premium}
          onChange={(v) => onChange({ ...leg, premium: Number(v) || 0 })}
          placeholder="0"
        />
        <TerminalInput
          label="Qty"
          value={leg.quantity}
          onChange={(v) => onChange({ ...leg, quantity: Number(v) || 0 })}
          placeholder="1"
        />
      </div>
    </div>
  );
}
