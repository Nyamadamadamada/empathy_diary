import { useState } from 'react';
import { Smile, Frown, Meh, ChevronLeft, Pencil, Save, Copy } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDiary } from '~/hooks/useDiary';
import DiaryDetail from '../domain/diary/Detail';

function DiaryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { diary, loading, error } = useDiary(id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!diary) return null;

  const handleEdit = () => {
    navigate(`/history/${id}/edit`);
  };

  const handleSave = () => {
    alert('保存しました');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(diary.content);
    alert('本文をコピーしました');
  };

  return <DiaryDetail diary={diary} handleCopy={handleCopy} handleEdit={handleEdit} handleSave={handleSave} />;
}

export default DiaryDetailScreen;
