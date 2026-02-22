import TerminalCard from '@/components/ui/TerminalCard';
import TerminalButton from '@/components/ui/TerminalButton';
import LegEditor from './LegEditor';
import type { OptionLeg } from '@/lib/types';

interface LegListProps {
  legs: OptionLeg[];
  onUpdateLeg: (id: string, leg: OptionLeg) => void;
  onRemoveLeg: (id: string) => void;
  onAddLeg: () => void;
}

export default function LegList({ legs, onUpdateLeg, onRemoveLeg, onAddLeg }: LegListProps) {
  return (
    <div className="space-y-3">
      {legs.map((leg, index) => (
        <TerminalCard key={leg.id} title={`Leg ${index + 1}`}>
          <LegEditor
            leg={leg}
            onChange={(updated) => onUpdateLeg(leg.id, updated)}
            onRemove={() => onRemoveLeg(leg.id)}
          />
        </TerminalCard>
      ))}
      <TerminalButton variant="primary" onClick={onAddLeg} className="w-full">
        + ADD LEG
      </TerminalButton>
    </div>
  );
}
