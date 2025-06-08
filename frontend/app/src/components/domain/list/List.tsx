import React from 'react';
import { DiaryItem } from './Item';
import { UserDiary } from '~/components/contexts/EntityContext';

export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'meh' | 'frown';
  emotion: string;
  // tags: Set<string>;
  unRead: boolean;
  reply?: string;
};

type Props = {
  filterTag: string | null;
  filterMood: string | null;
  filteredEntries: UserDiary[];
  toggleMood: (mood: string) => void;
  toggleTag: (tag: string) => void;
  handleDelete: (diaryId: string) => void;
  handleCopy: (text: string) => void;
  resetFilters: () => void;
};

function ListDiary({
  filterMood,
  filterTag,
  filteredEntries,
  toggleMood,
  toggleTag,
  resetFilters,
  handleCopy,
  handleDelete,
}: Props) {
  return (
    <div className="bg-white min-h-screen p-6 text-gray-800 w-full">
      <h1 className="text-2xl font-bold mb-6">あなたの日記一覧</h1>

      {filterMood && (
        <div className="mb-4 text-sm text-gray-600 flex items-center gap-4">
          <span>絞り込み中:</span>
          {filterMood && (
            <button onClick={resetFilters} className="px-2 py-1 bg-gray-200 rounded">
              内容: {filterMood} ×
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <p className="text-gray-500 mt-4">該当する日記がありません。</p>
        ) : (
          filteredEntries.map((entry) => (
            <DiaryItem
              key={entry.diary.id}
              entry={entry.diary}
              handleCopy={handleCopy}
              onMoodClick={toggleMood}
              // onTagClick={toggleTag}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ListDiary;
