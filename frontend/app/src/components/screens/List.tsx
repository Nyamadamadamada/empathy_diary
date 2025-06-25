import React, { useState } from 'react';
import { Pencil, Trash2, Smile, Frown, Meh } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ListDiary from '../domain/list/List';
import { exampleDiares } from '~/config/example_diares';

function ListDiaryScreen() {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterMood, setFilterMood] = useState<'happy' | 'meh' | 'frown' | null>(null);

  const filteredEntries = exampleDiares.filter((entry) => {
    const moodMatch = !filterMood || entry.diary.mood === filterMood;
    return moodMatch;
  });

  const handleMoodClick = (mood: 'happy' | 'meh' | 'frown') => {
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
    // console.log(`${diaryId}を削除する`);
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
