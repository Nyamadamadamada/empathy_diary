import { addNewlineAfterPeriod } from '~/hooks';
import { Gender } from '~/types/category';

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export type CreateDiary = {
  title: string;
  text: string;
};

export type FetchUser = {
  name: string;
  age: number;
  gender: Gender;
};

/**
 * @returns タイトルと日記テキスト
 */
export const featchCreateDiary = async (emotion: string, text: string): Promise<CreateDiary | null> => {
  const requestText = text.replace(/\r?\n/g, '');
  try {
    const res = await fetch(`${apiBase}/chats/fix-diary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion, text: requestText, user_name: '' }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();

    return {
      title: data.title,
      text: addNewlineAfterPeriod(data.text),
    };
  } catch (err) {
    console.error('Error fetching emotion:', err);
    return null; // エラー発生時はnullを返す
  }
};
