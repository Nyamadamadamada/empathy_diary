import { useEffect, useState } from 'react';
import { AccountEntry } from '~/types/emotion';
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export const useAccount = (accountId: string) => {
  const [account, setAccount] = useState<AccountEntry>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/accounts/${accountId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAccount(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { account, loading, error };
};
