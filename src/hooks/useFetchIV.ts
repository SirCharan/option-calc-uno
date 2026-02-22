import { useState, useCallback } from 'react';

export function useFetchIV() {
  const [iv, setIV] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async (currency: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/fetch-iv?currency=${currency}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setIV(data.iv);
      return data.iv as number;
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { iv, loading, error, fetchIV: fetch_ };
}
