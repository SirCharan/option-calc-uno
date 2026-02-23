'use client';

import { useState } from 'react';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { OptionLeg } from '@/lib/types';
import { calculateOption } from '@/lib/black-scholes';
import { generateId } from '@/lib/utils';
import { SharedParamsData } from './SharedParams';

interface LegFormProps {
  sharedParams: SharedParamsData;
  onAdd: (leg: OptionLeg) => void;
  onCancel: () => void;
}

export function LegForm({ sharedParams, onAdd, onCancel }: LegFormProps) {
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [quantity, setQuantity] = useState(1);
  const [strikePrice, setStrikePrice] = useState(sharedParams.spotPrice || 0);
  const [customPremium, setCustomPremium] = useState('');
  const [error, setError] = useState<string | null>(null);

  const hasCustomPremium = customPremium !== '' && parseFloat(customPremium) >= 0;

  const canCalcPremium =
    strikePrice > 0 &&
    sharedParams.spotPrice > 0 &&
    sharedParams.impliedVolatility > 0 &&
    sharedParams.timeToExpiry > 0;

  const handleFetchPremium = () => {
    setError(null);
    if (!canCalcPremium) {
      setError('Set strike and shared parameters (spot, IV, expiry) to fetch premium');
      return;
    }
    const price = calculateOption({
      spotPrice: sharedParams.spotPrice,
      strikePrice,
      riskFreeRate: sharedParams.riskFreeRate,
      impliedVolatility: sharedParams.impliedVolatility,
      timeToExpiry: sharedParams.timeToExpiry,
      optionType,
    }).price;
    setCustomPremium(price.toFixed(2));
  };

  const handleAdd = () => {
    if (strikePrice <= 0) {
      setError('Strike price must be positive');
      return;
    }

    let premium: number;

    if (hasCustomPremium) {
      premium = parseFloat(customPremium);
    } else {
      if (
        sharedParams.spotPrice <= 0 ||
        sharedParams.impliedVolatility <= 0 ||
        sharedParams.timeToExpiry <= 0
      ) {
        setError('Set shared parameters (spot, IV, expiry) or enter a custom premium');
        return;
      }

      premium = calculateOption({
        spotPrice: sharedParams.spotPrice,
        strikePrice,
        riskFreeRate: sharedParams.riskFreeRate,
        impliedVolatility: sharedParams.impliedVolatility,
        timeToExpiry: sharedParams.timeToExpiry,
        optionType,
      }).price;
    }

    onAdd({
      id: generateId(),
      optionType,
      direction,
      quantity,
      strikePrice,
      premium,
      spotPrice: sharedParams.spotPrice,
      riskFreeRate: sharedParams.riskFreeRate,
      impliedVolatility: sharedParams.impliedVolatility,
      timeToExpiry: sharedParams.timeToExpiry,
    });
  };

  return (
    <div className="space-y-3 border border-border rounded p-3 bg-bg-elevated">
      <div className="grid grid-cols-4 gap-1.5">
        <TerminalButton
          size="sm"
          active={optionType === 'call'}
          onClick={() => setOptionType('call')}
        >
          CALL
        </TerminalButton>
        <TerminalButton
          size="sm"
          active={optionType === 'put'}
          onClick={() => setOptionType('put')}
        >
          PUT
        </TerminalButton>
        <TerminalButton
          size="sm"
          active={direction === 'long'}
          onClick={() => setDirection('long')}
        >
          LONG
        </TerminalButton>
        <TerminalButton
          size="sm"
          active={direction === 'short'}
          onClick={() => setDirection('short')}
        >
          SHORT
        </TerminalButton>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <TerminalInput
            label="STRIKE"
            value={strikePrice || ''}
            onChange={(v) => setStrikePrice(parseFloat(v) || 0)}
            type="number"
            placeholder="0.00"
            step="0.01"
          />
          <TerminalInput
            label="QTY"
            value={quantity}
            onChange={(v) => setQuantity(parseInt(v) || 1)}
            type="number"
            min={1}
          />
        </div>
        <div className="space-y-1.5">
          <TerminalInput
            label="PREMIUM"
            value={customPremium}
            onChange={setCustomPremium}
            type="number"
            placeholder="auto"
            step="0.01"
          />
          <TerminalButton size="sm" onClick={handleFetchPremium} disabled={hasCustomPremium}>
            FETCH
          </TerminalButton>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2">
        <TerminalButton onClick={handleAdd}>ADD</TerminalButton>
        <TerminalButton variant="ghost" onClick={onCancel}>
          CANCEL
        </TerminalButton>
      </div>
    </div>
  );
}
