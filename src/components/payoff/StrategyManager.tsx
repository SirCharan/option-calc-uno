'use client';

import { useState } from 'react';
import { useOptions } from '@/context/OptionsContext';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { TerminalInput } from '@/components/ui/TerminalInput';

export function StrategyManager() {
  const {
    legs,
    savedStrategies,
    saveStrategy,
    loadStrategy,
    deleteStrategy,
  } = useOptions();
  const [name, setName] = useState('');
  const [showSave, setShowSave] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    saveStrategy(name.trim());
    setName('');
    setShowSave(false);
  };

  return (
    <div className="space-y-3 border-t border-border pt-3">
      <div className="text-text-secondary text-xs">&gt; STRATEGIES</div>

      {legs.length > 0 && (
        <>
          {showSave ? (
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TerminalInput
                  label="NAME"
                  value={name}
                  onChange={setName}
                  placeholder="e.g. Bull Call Spread"
                />
              </div>
              <TerminalButton onClick={handleSave} disabled={!name.trim()}>
                SAVE
              </TerminalButton>
              <TerminalButton variant="ghost" onClick={() => setShowSave(false)}>
                X
              </TerminalButton>
            </div>
          ) : (
            <TerminalButton onClick={() => setShowSave(true)}>
              SAVE STRATEGY
            </TerminalButton>
          )}
        </>
      )}

      {savedStrategies.length > 0 && (
        <div className="space-y-1.5">
          {savedStrategies.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between border border-border rounded px-3 py-1.5"
            >
              <div className="text-xs">
                <span className="text-text-primary">{s.name}</span>
                <span className="text-text-muted">
                  {' '}
                  ({s.legs.length} legs)
                </span>
              </div>
              <div className="flex gap-1.5">
                <TerminalButton
                  variant="ghost"
                  onClick={() => loadStrategy(s.id)}
                >
                  LOAD
                </TerminalButton>
                <TerminalButton
                  variant="danger"
                  onClick={() => deleteStrategy(s.id)}
                >
                  X
                </TerminalButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
