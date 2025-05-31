import { useState } from 'react';
import { Smile, Frown, Meh, ChevronLeft, Pencil, Save, Copy } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDiary } from '~/hooks/useDiary';
import DiaryEdit from '../domain/diary/Edit';

function DiaryEditScreen() {
  const [editedContent, setEditedContent] = useState('');
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { diary, loading, error } = useDiary(id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!diary) return null;

  const handleSave = () => {
    navigate(`/history/${id}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    alert('本文をコピーしました');
  };

  return (
    <DiaryEdit
      diary={diary}
      editedContent={editedContent}
      handleCopy={handleCopy}
      handleSave={handleSave}
      setEditedContent={setEditedContent}
    />
  );
}

export default DiaryEditScreen;
