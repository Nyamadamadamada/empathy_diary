import React from 'react';
import { DiaryItem } from './Item';

type DiaryEntry = {
  id: number;
  title: string;
  date: string;
  content: string;
  mood: string;
  tags: string[];
};

type Props = {
  filterTag: string | null;
  filterMood: string | null;
  filteredEntries: DiaryEntry[];
  toggleMood: (mood: string) => void;
  toggleTag: (tag: string) => void;
  handleDelete: (diaryId: number) => void;
  handleCopy: () => void;
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

      {(filterTag || filterMood) && (
        <div className="mb-4 text-sm text-gray-600 flex items-center gap-4">
          <span>絞り込み中:</span>
          {filterMood && (
            <button onClick={resetFilters} className="px-2 py-1 bg-gray-200 rounded">
              気分: {filterMood} ×
            </button>
          )}
          {filterTag && (
            <button onClick={resetFilters} className="px-2 py-1 bg-gray-200 rounded">
              タグ: #{filterTag} ×
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
              key={entry.id}
              entry={entry}
              onMoodClick={toggleMood}
              onTagClick={toggleTag}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ListDiary;
