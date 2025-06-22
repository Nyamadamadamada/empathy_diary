import { createContext, useContext, useState, ReactNode } from 'react';
import { DiaryEntry } from '~/types';

export type EntityData = {
  PERSON: Set<string>;
  ORGANIZATION: Set<string>;
  LOCATION: Set<string>;
  CONSUMER_GOOD: Set<string>;
  EVENT: Set<string>;
};

export type EmotionStore = {
  score: number;
  magnitude: number;
};

export type UserDiary = {
  diary: DiaryEntry;
  entities: EntityData;
  emotionScore: EmotionStore;
};

export type UserDiaryContextType = {
  userDiary: UserDiary;
  setUserDiary: (userDiary: UserDiary) => void;
};

const UserDiaryContext = createContext<UserDiaryContextType | undefined>(undefined);

const defaultEntity: UserDiary = {
  diary: {
    id: '',
    title: '',
    date: '',
    content: '',
    mood: 'happy',
    emotion: '',
    unRead: true,
  },
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
};

export const UserDiaryProvider = ({ children }: { children: ReactNode }) => {
  const [userDiary, setUserDiary] = useState<UserDiary>(defaultEntity);
  return <UserDiaryContext.Provider value={{ userDiary, setUserDiary }}>{children}</UserDiaryContext.Provider>;
};

export const useUserDiary = () => {
  const context = useContext(UserDiaryContext);
  if (!context) {
    throw new Error('useUserDiary must be used within a UserDiaryProvider');
  }
  return context;
};
