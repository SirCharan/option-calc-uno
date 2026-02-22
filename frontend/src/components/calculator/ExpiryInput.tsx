'use client';

import { useState } from 'react';
import TerminalInput from '@/components/ui/TerminalInput';
import TerminalButton from '@/components/ui/TerminalButton';
import { QUICK_EXPIRY } from '@/lib/constants';
import { timeToYears, dateToYears } from '@/lib/utils';

type ExpiryMode = 'duration' | 'calendar' | 'quick';

interface ExpiryInputProps {
  value: number;
  onChange: (years: number) => void;
}

export default function ExpiryInput({ value, onChange }: ExpiryInputProps) {
  const [mode, setMode] = useState<ExpiryMode>('duration');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selectedQuick, setSelectedQuick] = useState('');

  const modes: { key: ExpiryMode; label: string }[] = [
    { key: 'duration', label: 'DURATION' },
    { key: 'calendar', label: 'CALENDAR' },
    { key: 'quick', label: 'QUICK' },
  ];

  const handleDurationChange = (d: number, h: number, m: number, s: number) => {
    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    onChange(timeToYears(d, h, m, s));
  };

  const handleCalendarChange = (dateStr: string) => {
    if (!dateStr) return;
    const target = new Date(dateStr);
    onChange(dateToYears(target));
  };

  const handleQuickSelect = (label: string, secs: number) => {
    setSelectedQuick(label);
    onChange(secs / (365 * 24 * 3600));
  };

  return (
    <div className="space-y-3">
      <label className="block text-[#00ff00]/70 text-xs uppercase tracking-wider">
        Time to Expiry
      </label>

      <div className="flex gap-1">
        {modes.map((m) => (
          <TerminalButton
            key={m.key}
            onClick={() => setMode(m.key)}
            active={mode === m.key}
          >
            {m.label}
          </TerminalButton>
        ))}
      </div>

      {mode === 'duration' && (
        <div className="grid grid-cols-4 gap-2">
          <TerminalInput
            label="Days"
            value={days}
            onChange={(v) => handleDurationChange(Number(v) || 0, hours, minutes, seconds)}
            placeholder="0"
          />
          <TerminalInput
            label="Hours"
            value={hours}
            onChange={(v) => handleDurationChange(days, Number(v) || 0, minutes, seconds)}
            placeholder="0"
          />
          <TerminalInput
            label="Min"
            value={minutes}
            onChange={(v) => handleDurationChange(days, hours, Number(v) || 0, seconds)}
            placeholder="0"
          />
          <TerminalInput
            label="Sec"
            value={seconds}
            onChange={(v) => handleDurationChange(days, hours, minutes, Number(v) || 0)}
            placeholder="0"
          />
        </div>
      )}

      {mode === 'calendar' && (
        <input
          type="datetime-local"
          onChange={(e) => handleCalendarChange(e.target.value)}
          className="w-full bg-black border border-[#00ff00]/30 text-[#00ff00] font-mono text-sm px-3 py-2 rounded focus:border-[#00ff00] focus:outline-none focus:ring-1 focus:ring-[#00ff00]/20"
        />
      )}

      {mode === 'quick' && (
        <div className="flex gap-2">
          {QUICK_EXPIRY.map((q) => (
            <TerminalButton
              key={q.label}
              onClick={() => handleQuickSelect(q.label, q.seconds)}
              active={selectedQuick === q.label}
            >
              {q.label}
            </TerminalButton>
          ))}
        </div>
      )}

      {value > 0 && (
        <div className="text-[#00ff00]/50 text-xs">
          T = {value.toFixed(6)} years ({(value * 365).toFixed(2)} days)
        </div>
      )}
    </div>
  );
}
