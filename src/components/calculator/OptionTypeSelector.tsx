'use client';

import { TerminalButton } from '@/components/ui/TerminalButton';

interface OptionTypeSelectorProps {
  value: 'call' | 'put';
  onChange: (v: 'call' | 'put') => void;
}

export function OptionTypeSelector({
  value,
  onChange,
}: OptionTypeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-text-secondary text-xs">&gt; OPTION_TYPE:</span>
      <TerminalButton active={value === 'call'} onClick={() => onChange('call')}>
        CALL
      </TerminalButton>
      <TerminalButton active={value === 'put'} onClick={() => onChange('put')}>
        PUT
      </TerminalButton>
    </div>
  );
}
