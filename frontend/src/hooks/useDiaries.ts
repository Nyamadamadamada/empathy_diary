import { useEffect, useState } from 'react';
import { DiaryEntry } from '~/types/emotion';
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export const useDiaries = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${apiBase}/diaries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDiaries(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { diaries, loading, error };
};
