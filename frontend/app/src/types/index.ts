export type MakingDiary = {
  title: string;
  content: string;
};

export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  tags: Set<string>;
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
