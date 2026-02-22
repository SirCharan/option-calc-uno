'use client';

import { useState } from 'react';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { TerminalToggle } from '@/components/ui/TerminalToggle';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useFetchSpot } from '@/hooks/useFetchSpot';
import { useFetchIV } from '@/hooks/useFetchIV';
import { OptionLeg } from '@/lib/types';
import { calculateOption } from '@/lib/black-scholes';
import { generateId } from '@/lib/utils';
import { useOptions } from '@/context/OptionsContext';

interface LegFormProps {
  onAdd: (leg: OptionLeg) => void;
  onCancel: () => void;
}

export function LegForm({ onAdd, onCancel }: LegFormProps) {
  const { currency } = useOptions();
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [quantity, setQuantity] = useState(1);
  const [spotPrice, setSpotPrice] = useState(0);
  const [strikePrice, setStrikePrice] = useState(0);
  const [riskFreeRate, setRiskFreeRate] = useState(0.1);
  const [iv, setIV] = useState(0);
  const [timeToExpiry, setTimeToExpiry] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { loading: spotLoading, fetchSpot } = useFetchSpot();
  const { loading: ivLoading, fetchIV } = useFetchIV();

  const [fetchSpotOn, setFetchSpotOn] = useState(false);
  const [fetchIVOn, setFetchIVOn] = useState(false);

  const handleFetchSpot = async (checked: boolean) => {
    setFetchSpotOn(checked);
    if (checked) {
      const price = await fetchSpot(currency);
      if (price) setSpotPrice(price);
    }
  };

  const handleFetchIV = async (checked: boolean) => {
    setFetchIVOn(checked);
    if (checked) {
      const dvol = await fetchIV(currency);
      if (dvol) setIV(dvol / 100);
    }
  };

  const handleAdd = () => {
    if (spotPrice <= 0 || strikePrice <= 0 || iv <= 0 || timeToExpiry <= 0) {
      setError('All values must be positive');
      return;
    }

    const premium = calculateOption({
      spotPrice,
      strikePrice,
      riskFreeRate,
      impliedVolatility: iv,
      timeToExpiry,
      optionType,
    }).price;

    onAdd({
      id: generateId(),
      optionType,
      direction,
      quantity,
      strikePrice,
      premium,
      spotPrice,
      riskFreeRate,
      impliedVolatility: iv,
      timeToExpiry,
    });
  };

  return (
    <div className="space-y-3 border border-terminal-green/20 p-3">
      <div className="text-terminal-dimgreen text-xs">&gt; NEW_LEG_CONFIG</div>

      <div className="flex gap-2">
        <TerminalButton
          active={optionType === 'call'}
          onClick={() => setOptionType('call')}
        >
          CALL
        </TerminalButton>
        <TerminalButton
          active={optionType === 'put'}
          onClick={() => setOptionType('put')}
        >
          PUT
        </TerminalButton>
        <TerminalButton
          active={direction === 'long'}
          onClick={() => setDirection('long')}
        >
          LONG
        </TerminalButton>
        <TerminalButton
          active={direction === 'short'}
          onClick={() => setDirection('short')}
        >
          SHORT
        </TerminalButton>
      </div>

      <TerminalInput
        label="QTY"
        value={quantity}
        onChange={(v) => setQuantity(parseInt(v) || 1)}
        type="number"
        min={1}
      />

      <div className="space-y-1">
        <TerminalInput
          label="SPOT"
          value={spotPrice || ''}
          onChange={(v) => setSpotPrice(parseFloat(v) || 0)}
          type="number"
          placeholder="0.00"
          disabled={spotLoading}
        />
        <div className="flex items-center gap-2 ml-4">
          <TerminalToggle
            label="Fetch"
            checked={fetchSpotOn}
            onChange={handleFetchSpot}
            disabled={spotLoading}
          />
          {spotLoading && <LoadingSpinner />}
        </div>
      </div>

      <TerminalInput
        label="STRIKE"
        value={strikePrice || ''}
        onChange={(v) => setStrikePrice(parseFloat(v) || 0)}
        type="number"
        placeholder="0.00"
      />

      <TerminalInput
        label="RATE"
        value={riskFreeRate ? (riskFreeRate * 100).toString() : ''}
        onChange={(v) => setRiskFreeRate((parseFloat(v) || 0) / 100)}
        type="number"
        suffix="%"
      />

      <div className="space-y-1">
        <TerminalInput
          label="IV"
          value={iv ? (iv * 100).toString() : ''}
          onChange={(v) => setIV((parseFloat(v) || 0) / 100)}
          type="number"
          suffix="%"
          disabled={ivLoading}
        />
        <div className="flex items-center gap-2 ml-4">
          <TerminalToggle
            label="DVOL"
            checked={fetchIVOn}
            onChange={handleFetchIV}
            disabled={ivLoading}
          />
          {ivLoading && <LoadingSpinner text="DVOL" />}
        </div>
      </div>

      <TerminalInput
        label="T(days)"
        value={timeToExpiry ? (timeToExpiry * 365).toFixed(1) : ''}
        onChange={(v) => setTimeToExpiry((parseFloat(v) || 0) / 365)}
        type="number"
        placeholder="30"
      />

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2 pt-2">
        <TerminalButton onClick={handleAdd}>CONFIRM</TerminalButton>
        <TerminalButton variant="danger" onClick={onCancel}>
          CANCEL
        </TerminalButton>
      </div>
    </div>
  );
}
