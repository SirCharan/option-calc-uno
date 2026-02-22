'use client';

import { useState } from 'react';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { TerminalToggle } from '@/components/ui/TerminalToggle';
import { TerminalSelect } from '@/components/ui/TerminalSelect';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useFetchSpot } from '@/hooks/useFetchSpot';
import { useFetchIV } from '@/hooks/useFetchIV';
import { CURRENCIES, QUICK_SELECT_OPTIONS } from '@/lib/constants';
import { manualExpiryToYears, formatNumber } from '@/lib/utils';

export interface SharedParamsData {
  spotPrice: number;
  impliedVolatility: number;
  riskFreeRate: number;
  timeToExpiry: number;
  currency: string;
}

interface SharedParamsProps {
  params: SharedParamsData;
  onChange: (params: SharedParamsData) => void;
}

export function SharedParams({ params, onChange }: SharedParamsProps) {
  const [fetchSpotOn, setFetchSpotOn] = useState(false);
  const [fetchIVOn, setFetchIVOn] = useState(false);
  const { loading: spotLoading, error: spotError, fetchSpot } = useFetchSpot();
  const { loading: ivLoading, error: ivError, fetchIV } = useFetchIV();

  const update = (field: keyof SharedParamsData, value: number | string) => {
    onChange({ ...params, [field]: value });
  };

  const handleFetchSpot = async (checked: boolean) => {
    setFetchSpotOn(checked);
    if (checked) {
      const price = await fetchSpot(params.currency);
      if (price) update('spotPrice', price);
    }
  };

  const handleFetchIV = async (checked: boolean) => {
    setFetchIVOn(checked);
    if (checked) {
      const dvol = await fetchIV(params.currency);
      if (dvol) update('impliedVolatility', dvol / 100);
    }
  };

  const handleQuick = (opt: (typeof QUICK_SELECT_OPTIONS)[number]) => {
    const t = manualExpiryToYears({
      days: opt.days,
      hours: opt.hours,
      minutes: opt.minutes,
      seconds: opt.seconds,
    });
    update('timeToExpiry', t);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Spot Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <TerminalInput
              label="SPOT"
              value={params.spotPrice || ''}
              onChange={(v) => update('spotPrice', parseFloat(v) || 0)}
              type="number"
              placeholder="0.00"
              disabled={spotLoading}
            />
          </div>
          <TerminalSelect
            options={CURRENCIES}
            value={params.currency}
            onChange={(v) => update('currency', v)}
          />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <TerminalToggle
            label="Fetch"
            checked={fetchSpotOn}
            onChange={handleFetchSpot}
            disabled={spotLoading}
          />
          {spotLoading && <LoadingSpinner text="Spot" />}
        </div>
        {spotError && <ErrorMessage message={spotError} />}
      </div>

      {/* IV */}
      <div className="space-y-2">
        <TerminalInput
          label="IV"
          value={params.impliedVolatility ? (params.impliedVolatility * 100).toString() : ''}
          onChange={(v) => update('impliedVolatility', (parseFloat(v) || 0) / 100)}
          type="number"
          placeholder="50.00"
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
        {ivError && <ErrorMessage message={ivError} />}
      </div>

      {/* Risk-Free Rate */}
      <div>
        <TerminalInput
          label="RATE"
          value={params.riskFreeRate ? (params.riskFreeRate * 100).toString() : ''}
          onChange={(v) => update('riskFreeRate', (parseFloat(v) || 0) / 100)}
          type="number"
          placeholder="10.00"
          step="0.1"
          suffix="%"
        />
      </div>

      {/* Time to Expiry */}
      <div className="space-y-2">
        <TerminalInput
          label="EXPIRY"
          value={params.timeToExpiry ? (params.timeToExpiry * 365).toFixed(1) : ''}
          onChange={(v) => update('timeToExpiry', (parseFloat(v) || 0) / 365)}
          type="number"
          placeholder="30"
          suffix="days"
        />
        <div className="flex gap-1 ml-4 flex-wrap">
          {QUICK_SELECT_OPTIONS.map((opt) => (
            <TerminalButton
              key={opt.label}
              onClick={() => handleQuick(opt)}
              className="!px-2 !py-0.5 !text-[10px]"
            >
              {opt.label}
            </TerminalButton>
          ))}
        </div>
        <div className="text-terminal-dimgreen text-[10px] ml-4">
          T = {formatNumber(params.timeToExpiry, 6)} yr
        </div>
      </div>
    </div>
  );
}
