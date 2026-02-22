'use client';

import { useState } from 'react';
import { useOptions } from '@/context/OptionsContext';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { LegForm } from './LegForm';
import { StrategyManager } from './StrategyManager';
import { OptionLeg } from '@/lib/types';
import { formatUSD } from '@/lib/utils';

export function LegSidebar() {
  const { legs, addLeg, removeLeg, clearLegs } = useOptions();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (leg: OptionLeg) => {
    addLeg(leg);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {legs.length === 0 && (
          <div className="text-terminal-dimgreen text-xs">
            &gt; No legs added. Click [+ ADD LEG] to start.
          </div>
        )}
        {legs.map((leg, i) => (
          <div
            key={leg.id}
            className="flex items-center justify-between border border-terminal-green/20 px-2 py-1.5"
          >
            <div className="text-xs space-y-0.5">
              <div className="text-terminal-green">
                LEG_{String(i + 1).padStart(3, '0')}:{' '}
                {leg.direction.toUpperCase()} {leg.optionType.toUpperCase()}
              </div>
              <div className="text-terminal-dimgreen">
                Strike: {formatUSD(leg.strikePrice)} | IV:{' '}
                {(leg.impliedVolatility * 100).toFixed(0)}% | Qty: {leg.quantity}
              </div>
              <div className="text-terminal-dimgreen">
                Premium: {formatUSD(leg.premium)}
              </div>
            </div>
            <TerminalButton variant="danger" onClick={() => removeLeg(leg.id)}>
              X
            </TerminalButton>
          </div>
        ))}
      </div>

      {showForm ? (
        <LegForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
      ) : (
        <div className="flex gap-2">
          <TerminalButton onClick={() => setShowForm(true)}>
            + ADD LEG
          </TerminalButton>
          {legs.length > 0 && (
            <TerminalButton variant="danger" onClick={clearLegs}>
              CLEAR ALL
            </TerminalButton>
          )}
        </div>
      )}

      <StrategyManager />
    </div>
  );
}
