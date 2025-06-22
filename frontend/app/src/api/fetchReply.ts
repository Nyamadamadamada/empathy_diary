import { EmotionStore, EntityData } from '~/components/contexts/EntityContext';
import { addNewlineAfterPeriod } from '~/hooks';
import { getMood } from '~/types';

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export type FetchReplyType = {
  reply: string;
  entities: EntityData;
  emotionScore: EmotionStore;
  mood: 'happy' | 'meh' | 'frown';
};
/**
 * モフの返事と感情分析結果を返す
 */
export const fetchReply = async (emotion: string, text: string, userName: string): Promise<FetchReplyType> => {
  const requestText = text.replace(/\r?\n/g, '');
  try {
    const res = await fetch(`${apiBase}/chats/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: requestText, emotion, user_name: userName }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    const entityData: EntityData = {
      PERSON: new Set(data.entities.PERSON),
      ORGANIZATION: new Set(data.entities.ORGANIZATION),
      LOCATION: new Set(data.entities.LOCATION),
      CONSUMER_GOOD: new Set(data.entities.CONSUMER_GOOD),
      EVENT: new Set(data.entities.EVENT),
    };

    // ネガティブな話題の場合、絶対値が低くなりがちなので、調節する
    let adjustedEmotionScore = data.emotion_score.score ?? 0;
    if (adjustedEmotionScore < 0) {
      adjustedEmotionScore -= 0.2;
    }
    const reply = data.reply.replace(/\r?\n/g, '');
    return {
      reply: addNewlineAfterPeriod(reply),
      entities: entityData,
      emotionScore: { score: adjustedEmotionScore, magnitude: data.emotion_score.magnitude },
      mood: getMood(adjustedEmotionScore ?? 0),
    };
  } catch (err) {
    console.error('Error fetching emotion:', err);
    return {
      reply: '',
      entities: {
        PERSON: new Set(),
        ORGANIZATION: new Set(),
        LOCATION: new Set(),
        CONSUMER_GOOD: new Set(),
        EVENT: new Set(),
      },
      emotionScore: {
        score: 0,
        magnitude: 0,
      },
      mood: 'meh',
    };
  }
};
