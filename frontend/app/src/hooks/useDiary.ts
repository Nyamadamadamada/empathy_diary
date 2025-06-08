import { useEffect, useState } from 'react';
import { DiaryEntry } from '~/components/domain/list/List';
const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export const useDiary = (diaryId) => {
  const [diary, setDiary] = useState<DiaryEntry>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetch(`${apiBase}/diaries/${diaryId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDiary(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { diary, loading, error };
};
