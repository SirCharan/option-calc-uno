'use client';

import { useState, useMemo } from 'react';
import LegList from '@/components/payoff/LegList';
import PayoffChart from '@/components/payoff/PayoffChart';
import PayoffSummary from '@/components/payoff/PayoffSummary';
import { calculatePayoffData, computeRange } from '@/lib/payoff';
import { generateId } from '@/lib/utils';
import type { OptionLeg } from '@/lib/types';

function createEmptyLeg(): OptionLeg {
  return {
    id: generateId(),
    type: 'call',
    position: 'long',
    strikePrice: 0,
    premium: 0,
    quantity: 1,
  };
}

export default function PayoffPage() {
  const [legs, setLegs] = useState<OptionLeg[]>([createEmptyLeg()]);

  const validLegs = legs.filter(
    (l) => l.strikePrice > 0 && l.premium >= 0 && l.quantity > 0
  );

  const [minPrice, maxPrice] = useMemo(() => computeRange(validLegs), [validLegs]);

  const payoffData = useMemo(
    () => calculatePayoffData(validLegs, minPrice, maxPrice),
    [validLegs, minPrice, maxPrice]
  );

  const handleAddLeg = () => {
    setLegs([...legs, createEmptyLeg()]);
  };

  const handleUpdateLeg = (id: string, updated: OptionLeg) => {
    setLegs(legs.map((l) => (l.id === id ? updated : l)));
  };

  const handleRemoveLeg = (id: string) => {
    if (legs.length <= 1) return;
    setLegs(legs.filter((l) => l.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <LegList
          legs={legs}
          onUpdateLeg={handleUpdateLeg}
          onRemoveLeg={handleRemoveLeg}
          onAddLeg={handleAddLeg}
        />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <PayoffChart data={payoffData} />
        <PayoffSummary data={payoffData} legs={validLegs} />
      </div>
    </div>
  );
}
