import { CHARA_TYPE } from '~/config/characters';
import { AgeRange, Gender } from './category';

export type User = {
  name: string;
  age: number;
  ageRange: AgeRange;
  gender: Gender;
};

export type MakingDiary = {
  title: string;
  content: string;
};

export type AccountEntry = {
  email: string;
  account_id: number;
  nickname: string;
  icon_url: string;
};

export const FIRST_STEP = {
  STEP1: 'STEP1',
  STEP2: 'STEP2',
  STEP3: 'STEP3',
};

export type FIRST_STEP_TYPE = (typeof FIRST_STEP)[keyof typeof FIRST_STEP];

type BioItem = {
  label: string;
  value: string;
};

export type CharaInfo = {
  name: string;
  category: CHARA_TYPE;
  bios: BioItem[];
};

export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'meh' | 'frown';
  emotion: string;
  unRead: boolean;
  reply?: string;
};

export function getMood(value: string): 'happy' | 'meh' | 'frown' {
  const valueNumber = Number(value);
  if (valueNumber < -0.3) {
    return 'frown'; // ネガティブまたはややネガティブ
  } else if (valueNumber <= 0.3) {
    return 'meh'; // ナチュラル
  } else {
    return 'happy'; // ややポジティブまたはポジティブ
  }
}
