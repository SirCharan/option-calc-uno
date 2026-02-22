'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { OptionLeg, SavedStrategy } from '@/lib/types';
import { DEFAULT_RISK_FREE_RATE } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface OptionsContextType {
  spotPrice: number;
  setSpotPrice: (v: number) => void;
  strikePrice: number;
  setStrikePrice: (v: number) => void;
  riskFreeRate: number;
  setRiskFreeRate: (v: number) => void;
  impliedVolatility: number;
  setImpliedVolatility: (v: number) => void;
  timeToExpiry: number;
  setTimeToExpiry: (v: number) => void;
  optionType: 'call' | 'put';
  setOptionType: (v: 'call' | 'put') => void;
  currency: string;
  setCurrency: (v: string) => void;
  legs: OptionLeg[];
  addLeg: (leg: OptionLeg) => void;
  removeLeg: (id: string) => void;
  updateLeg: (id: string, updates: Partial<OptionLeg>) => void;
  clearLegs: () => void;
  savedStrategies: SavedStrategy[];
  saveStrategy: (name: string) => void;
  loadStrategy: (id: string) => void;
  deleteStrategy: (id: string) => void;
}

const OptionsContext = createContext<OptionsContextType | null>(null);

export function useOptions() {
  const ctx = useContext(OptionsContext);
  if (!ctx) throw new Error('useOptions must be used within OptionsProvider');
  return ctx;
}

export function OptionsProvider({ children }: { children: ReactNode }) {
  const [spotPrice, setSpotPrice] = useState(0);
  const [strikePrice, setStrikePrice] = useState(0);
  const [riskFreeRate, setRiskFreeRate] = useState(DEFAULT_RISK_FREE_RATE);
  const [impliedVolatility, setImpliedVolatility] = useState(0);
  const [timeToExpiry, setTimeToExpiry] = useState(0);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [currency, setCurrency] = useState('btc');
  const [legs, setLegs] = useState<OptionLeg[]>([]);
  const [savedStrategies, setSavedStrategies] = useState<SavedStrategy[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('options-strategies');
      if (saved) setSavedStrategies(JSON.parse(saved));
    } catch {}
  }, []);

  const persistStrategies = useCallback((strategies: SavedStrategy[]) => {
    setSavedStrategies(strategies);
    try {
      localStorage.setItem('options-strategies', JSON.stringify(strategies));
    } catch {}
  }, []);

  const addLeg = useCallback((leg: OptionLeg) => {
    setLegs((prev) => [...prev, leg]);
  }, []);

  const removeLeg = useCallback((id: string) => {
    setLegs((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLeg = useCallback((id: string, updates: Partial<OptionLeg>) => {
    setLegs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  }, []);

  const clearLegs = useCallback(() => setLegs([]), []);

  const saveStrategy = useCallback(
    (name: string) => {
      const strategy: SavedStrategy = {
        id: generateId(),
        name,
        legs: [...legs],
        createdAt: new Date().toISOString(),
      };
      persistStrategies([...savedStrategies, strategy]);
    },
    [legs, savedStrategies, persistStrategies],
  );

  const loadStrategy = useCallback(
    (id: string) => {
      const strategy = savedStrategies.find((s) => s.id === id);
      if (strategy) setLegs([...strategy.legs]);
    },
    [savedStrategies],
  );

  const deleteStrategy = useCallback(
    (id: string) => {
      persistStrategies(savedStrategies.filter((s) => s.id !== id));
    },
    [savedStrategies, persistStrategies],
  );

  return (
    <OptionsContext.Provider
      value={{
        spotPrice,
        setSpotPrice,
        strikePrice,
        setStrikePrice,
        riskFreeRate,
        setRiskFreeRate,
        impliedVolatility,
        setImpliedVolatility,
        timeToExpiry,
        setTimeToExpiry,
        optionType,
        setOptionType,
        currency,
        setCurrency,
        legs,
        addLeg,
        removeLeg,
        updateLeg,
        clearLegs,
        savedStrategies,
        saveStrategy,
        loadStrategy,
        deleteStrategy,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}
