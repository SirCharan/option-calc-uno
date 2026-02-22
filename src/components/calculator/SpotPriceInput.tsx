'use client';

import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalToggle } from '@/components/ui/TerminalToggle';
import { TerminalSelect } from '@/components/ui/TerminalSelect';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useFetchSpot } from '@/hooks/useFetchSpot';
import { CURRENCIES } from '@/lib/constants';
import { useState } from 'react';

interface SpotPriceInputProps {
  value: number;
  onChange: (v: number) => void;
  currency: string;
  onCurrencyChange: (v: string) => void;
}

export function SpotPriceInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
}: SpotPriceInputProps) {
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const { loading, error, fetchSpot } = useFetchSpot();

  const handleToggle = async (checked: boolean) => {
    setFetchEnabled(checked);
    if (checked) {
      const price = await fetchSpot(currency);
      if (price) onChange(price);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <TerminalInput
            label="SPOT_PRICE"
            value={value || ''}
            onChange={(v) => onChange(parseFloat(v) || 0)}
            type="number"
            placeholder="0.00"
            min={0}
            step="0.01"
            disabled={loading}
          />
        </div>
        <TerminalSelect
          options={CURRENCIES}
          value={currency}
          onChange={onCurrencyChange}
        />
      </div>
      <div className="flex items-center gap-3 ml-4">
        <TerminalToggle
          label="Fetch from API"
          checked={fetchEnabled}
          onChange={handleToggle}
          disabled={loading}
        />
        {loading && <LoadingSpinner text="Fetching spot" />}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
