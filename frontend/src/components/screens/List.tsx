import React, { useState } from 'react';
import { Pencil, Trash2, Smile, Frown, Meh } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ListDiary from '../domain/list/List';

const diaryEntries = [
  {
    id: 1,
    title: '初めての投稿',
    date: '2025-05-01',
    content: '今日はとても良い日でした。公園でゆっくり読書をしました。',
    mood: 'happy',
    tags: ['うれしかった', 'リラックス', '読書'],
  },
  {
    id: 2,
    title: '疲れた一日',
    date: '2025-05-02',
    content: '仕事が忙しくてクタクタ…。でも頑張った自分を褒めたい。',
    mood: 'meh',
    tags: ['疲れた', '仕事', 'がんばった'],
  },
  {
    id: 3,
    title: '卵かけご飯が最高だった日',
    date: '2025-05-03',
    content: '朝ごはんに卵かけご飯を食べた。シンプルだけど美味しすぎた！',
    mood: 'happy',
    tags: ['美味', '卵かけご飯', '朝ごはん'],
  },
];

const moodIcons = {
  happy: <Smile className="text-yellow-400 w-8 h-8 cursor-pointer" />,
  sad: <Frown className="text-blue-400 w-8 h-8 cursor-pointer" />,
  meh: <Meh className="text-gray-400 w-8 h-8 cursor-pointer" />,
};

function ListDiaryScreen() {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<string | null>(null);

  const filteredEntries = diaryEntries.filter((entry) => {
    const tagMatch = !filterTag || entry.tags.includes(filterTag);
    const moodMatch = !filterMood || entry.mood === filterMood;
    return tagMatch && moodMatch;
  });

  const handleMoodClick = (mood: string) => {
    setFilterMood(filterMood === mood ? null : mood);
  };

  const handleTagClick = (tag: string) => {
    setFilterTag(filterTag === tag ? null : tag);
  };

  const resetFilters = () => {
    setFilterMood(null);
    setFilterTag(null);
  };

  const handleDelete = (diaryId: number) => {
    // 削除処理
    console.log(`${diaryId}を削除する`);
  };
  const handleCopy = () => {
    alert('本文をコピーしました');
  };

  return (
    <ListDiary
      filterMood={filterMood}
      filterTag={filterTag}
      filteredEntries={filteredEntries}
      toggleMood={handleMoodClick}
      toggleTag={handleTagClick}
      handleDelete={handleDelete}
      handleCopy={handleCopy}
      resetFilters={resetFilters}
    />
  );
}

export default ListDiaryScreen;
