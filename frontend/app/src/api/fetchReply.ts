import { EntityData } from '~/components/contexts/EntityContext';
import { addNewlineAfterPeriod } from '~/hooks';

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004/api';

export type FetchReplyType = {
  reply: string;
  entities: EntityData;
};
/**
 * モフの返事と感情分析結果を返す
 */
export const fetchReply = async (emotion: string, text: string, userName: string): Promise<FetchReplyType> => {
  try {
    const res = await fetch(`${apiBase}/chats/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, emotion, user_name: userName }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    console.log('戻り値');
    console.log(data);
    const entityData: EntityData = {
      PERSON: new Set(data.entities.PERSON),
      ORGANIZATION: new Set(data.entities.ORGANIZATION),
      LOCATION: new Set(data.entities.LOCATION),
      CONSUMER_GOOD: new Set(data.entities.CONSUMER_GOOD),
      EVENT: new Set(data.entities.EVENT),
    };
    console.log(addNewlineAfterPeriod(data.reply));

    return {
      reply: addNewlineAfterPeriod((text = data.reply)),
      entities: entityData,
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
    };
  }
};
