'use client';

import { useState } from 'react';
import TerminalInput from '@/components/ui/TerminalInput';
import TerminalToggle from '@/components/ui/TerminalToggle';
import TerminalSelect from '@/components/ui/TerminalSelect';
import TerminalButton from '@/components/ui/TerminalButton';
import { COINS } from '@/lib/constants';
import { fetchSpotPrice } from '@/lib/api';

interface SpotPriceInputProps {
  value: number | string;
  onChange: (value: string) => void;
}

export default function SpotPriceInput({ value, onChange }: SpotPriceInputProps) {
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [coin, setCoin] = useState('bitcoin');
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchSpotPrice(coin);
      onChange(String(data.price_usd));
      setSource(`${COINS.find(c => c.id === coin)?.symbol} via CoinGecko`);
    } catch {
      setSource('Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <TerminalInput
        label="Spot Price"
        value={value}
        onChange={onChange}
        suffix="USD"
        placeholder="0.00"
      />
      <TerminalToggle
        label="Fetch from CoinGecko"
        enabled={fetchEnabled}
        onChange={setFetchEnabled}
      />
      {fetchEnabled && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <TerminalSelect
              label="Coin"
              value={coin}
              onChange={setCoin}
              options={COINS.map(c => ({ value: c.id, label: `${c.symbol} - ${c.name}` }))}
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
