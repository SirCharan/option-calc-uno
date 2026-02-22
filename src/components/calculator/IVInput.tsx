'use client';

import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalToggle } from '@/components/ui/TerminalToggle';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useFetchIV } from '@/hooks/useFetchIV';
import { useState } from 'react';

interface IVInputProps {
  value: number;
  onChange: (v: number) => void;
  currency: string;
}

export function IVInput({ value, onChange, currency }: IVInputProps) {
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const { loading, error, fetchIV } = useFetchIV();

  const handleToggle = async (checked: boolean) => {
    setFetchEnabled(checked);
    if (checked) {
      const iv = await fetchIV(currency);
      if (iv) onChange(iv / 100); // DVOL returns %, store as decimal
    }
  };

  return (
    <div className="space-y-2">
      <TerminalInput
        label="IMPLIED_VOLATILITY"
        value={value ? (value * 100).toString() : ''}
        onChange={(v) => onChange((parseFloat(v) || 0) / 100)}
        type="number"
        placeholder="50.00"
        step="0.1"
        suffix="%"
        disabled={loading}
      />
      <div className="flex items-center gap-3 ml-4">
        <TerminalToggle
          label="Fetch DVOL"
          checked={fetchEnabled}
          onChange={handleToggle}
          disabled={loading}
        />
        {loading && <LoadingSpinner text="Fetching DVOL" />}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
