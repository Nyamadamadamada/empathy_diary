import { idLabelMap } from '~/config/emotion';

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export type EmotionNode = {
  id: string;
  emotion: string;
};

/**
 * APIを叩いて感情データを取得し、キャラクター名が存在すればその感情を返す関数
 * @returns 感情データ（文字列）またはnull（エラー発生時やデータが不正な場合）
 */
export const fetchEmotion = async (text: string): Promise<EmotionNode | null> => {
  try {
    const res = await fetch(`${apiBase}/chats/emotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    console.log('戻り値');
    console.log(data);

    // IDとラベルが存在するかチェック
    if (idLabelMap[data.id]) {
      return {
        id: data.id,
        emotion: idLabelMap[data.id],
      };
    }
    return null; // 該当する感情がない場合はnullを返す
  } catch (err) {
    console.error('Error fetching emotion:', err);
    return null; // エラー発生時はnullを返す
  }
};
