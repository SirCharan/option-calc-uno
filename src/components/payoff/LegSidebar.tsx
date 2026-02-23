'use client';

import { useState } from 'react';
import { useOptions } from '@/context/OptionsContext';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { LegForm } from './LegForm';
import { StrategyManager } from './StrategyManager';
import { OptionLeg } from '@/lib/types';
import { formatUSD } from '@/lib/utils';
import { SharedParamsData } from './SharedParams';

interface LegSidebarProps {
  sharedParams: SharedParamsData;
}

export function LegSidebar({ sharedParams }: LegSidebarProps) {
  const { legs, addLeg, removeLeg, clearLegs } = useOptions();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (leg: OptionLeg) => {
    addLeg(leg);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {legs.length === 0 && !showForm && (
          <div className="text-text-muted text-xs py-2">
            &gt; No legs added yet.
          </div>
        )}
        {legs.map((leg, i) => (
          <div
            key={leg.id}
            className="flex items-center justify-between border border-border rounded px-3 py-2 hover:border-border-hover transition-colors"
          >
            <div className="text-xs space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    leg.direction === 'long'
                      ? 'text-positive'
                      : 'text-negative'
                  }
                >
                  {leg.direction.toUpperCase()}
                </span>
                <span className="text-text-primary">
                  {leg.optionType.toUpperCase()}
                </span>
                <span className="text-text-muted">x{leg.quantity}</span>
              </div>
              <div className="text-text-secondary ml-6">
                K: {formatUSD(leg.strikePrice)} | P: {formatUSD(leg.premium)}
              </div>
            </div>
            <TerminalButton
              variant="danger"
              onClick={() => removeLeg(leg.id)}
              className="!px-2 !py-0.5"
            >
              X
            </TerminalButton>
          </div>
        ))}
      </div>

      {showForm ? (
        <LegForm
          sharedParams={sharedParams}
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="flex gap-2">
          <TerminalButton onClick={() => setShowForm(true)}>
            + ADD LEG
          </TerminalButton>
          {legs.length > 0 && (
            <TerminalButton variant="danger" onClick={clearLegs}>
              CLEAR
            </TerminalButton>
          )}
        </div>
      )}

      <StrategyManager />
    </div>
  );
}
