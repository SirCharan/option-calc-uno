'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { ExpiryMode, ManualExpiry } from '@/lib/types';
import { manualExpiryToYears, dateToExpiryYears, formatNumber } from '@/lib/utils';
import { QUICK_SELECT_OPTIONS } from '@/lib/constants';

interface TimeToExpiryProps {
  value: number;
  onChange: (v: number) => void;
}

export function TimeToExpiry({ value, onChange }: TimeToExpiryProps) {
  const [mode, setMode] = useState<ExpiryMode>('manual');
  const [manual, setManual] = useState<ManualExpiry>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [calDate, setCalDate] = useState<Date | null>(null);

  useEffect(() => {
    if (mode === 'manual') {
      onChange(manualExpiryToYears(manual));
    }
  }, [manual, mode, onChange]);

  useEffect(() => {
    if (mode === 'calendar' && calDate) {
      onChange(dateToExpiryYears(calDate));
    }
  }, [calDate, mode, onChange]);

  const handleQuick = (opt: (typeof QUICK_SELECT_OPTIONS)[number]) => {
    const m = { days: opt.days, hours: opt.hours, minutes: opt.minutes, seconds: opt.seconds };
    setManual(m);
    setMode('manual');
    onChange(manualExpiryToYears(m));
  };

  const updateManual = (field: keyof ManualExpiry, val: string) => {
    setManual((prev) => ({ ...prev, [field]: parseInt(val) || 0 }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <span className="text-text-secondary text-xs mr-2">
          &gt; TIME_TO_EXPIRY:
        </span>
        {(['manual', 'calendar', 'quick'] as ExpiryMode[]).map((m) => (
          <TerminalButton
            key={m}
            active={mode === m}
            onClick={() => setMode(m)}
          >
            {m.toUpperCase()}
          </TerminalButton>
        ))}
      </div>

      {mode === 'manual' && (
        <div className="grid grid-cols-4 gap-2 ml-4">
          <TerminalInput
            label="D"
            value={manual.days || ''}
            onChange={(v) => updateManual('days', v)}
            type="number"
            min={0}
            placeholder="0"
          />
          <TerminalInput
            label="H"
            value={manual.hours || ''}
            onChange={(v) => updateManual('hours', v)}
            type="number"
            min={0}
            placeholder="0"
          />
          <TerminalInput
            label="M"
            value={manual.minutes || ''}
            onChange={(v) => updateManual('minutes', v)}
            type="number"
            min={0}
            placeholder="0"
          />
          <TerminalInput
            label="S"
            value={manual.seconds || ''}
            onChange={(v) => updateManual('seconds', v)}
            type="number"
            min={0}
            placeholder="0"
          />
        </div>
      )}

      {mode === 'calendar' && (
        <div className="ml-4">
          <DatePicker
            selected={calDate}
            onChange={(date: Date | null) => setCalDate(date)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select expiry date"
            className="w-full bg-bg-primary border border-border text-text-primary font-mono text-sm px-3 py-1.5 rounded focus:border-accent/60 focus:shadow-[0_0_5px_rgba(0,204,136,0.15)] focus:outline-none"
          />
        </div>
      )}

      {mode === 'quick' && (
        <div className="flex gap-2 ml-4 flex-wrap">
          {QUICK_SELECT_OPTIONS.map((opt) => (
            <TerminalButton key={opt.label} onClick={() => handleQuick(opt)}>
              {opt.label}
            </TerminalButton>
          ))}
        </div>
      )}

      <div className="text-text-secondary text-xs ml-4">
        &gt; T (years): {formatNumber(value, 6)}
      </div>
    </div>
  );
}
