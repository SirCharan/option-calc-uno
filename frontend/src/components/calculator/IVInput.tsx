'use client';

import { useState } from 'react';
import TerminalInput from '@/components/ui/TerminalInput';
import TerminalToggle from '@/components/ui/TerminalToggle';
import TerminalSelect from '@/components/ui/TerminalSelect';
import TerminalButton from '@/components/ui/TerminalButton';
import { fetchDvol } from '@/lib/api';

interface IVInputProps {
  value: number | string;
  onChange: (value: string) => void;
}

export default function IVInput({ value, onChange }: IVInputProps) {
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [currency, setCurrency] = useState('BTC');
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchDvol(currency);
      onChange(String(data.dvol.toFixed(2)));
      setSource(`${currency} DVOL via Deribit`);
    } catch {
      setSource('Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <TerminalInput
        label="Implied Volatility"
        value={value}
        onChange={onChange}
        suffix="%"
        placeholder="80"
      />
      <TerminalToggle
        label="Fetch from Deribit DVOL"
        enabled={fetchEnabled}
        onChange={setFetchEnabled}
      />
      {fetchEnabled && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <TerminalSelect
              label="Currency"
              value={currency}
              onChange={setCurrency}
              options={[
                { value: 'BTC', label: 'BTC' },
                { value: 'ETH', label: 'ETH' },
              ]}
            />
          </div>
          <TerminalButton onClick={handleFetch} disabled={loading}>
            {loading ? 'FETCHING...' : 'FETCH'}
          </TerminalButton>
        </div>
      )}
      {source && (
        <div className="text-[#00ff00]/50 text-xs">{source}</div>
      )}
    </div>
  );
}
