import { useState, useCallback } from 'react';

export function useFetchSpot() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async (currency: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/fetch-spot?currency=${currency}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setPrice(data.price);
      return data.price as number;
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { price, loading, error, fetchSpot: fetch_ };
}
