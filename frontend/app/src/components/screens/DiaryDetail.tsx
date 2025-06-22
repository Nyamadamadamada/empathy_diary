import { useParams } from 'react-router-dom';
import DiaryDetail from '../domain/diary/Detail';
import { getDiaryById } from '~/config/example_diares';
import { UserDiary, useUserDiary } from '../contexts/EntityContext';

function DiaryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const { userDiary } = useUserDiary();
  let diary: UserDiary;
  if (id === 'guest') {
    diary = userDiary;
  } else {
    diary = getDiaryById(id);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(diary.diary.content);
    alert('本文をコピーしました');
  };

  return (
    <DiaryDetail
      entities={diary.entities}
      diary={diary.diary}
      emotionScore={diary.emotionScore}
      handleCopy={handleCopy}
    />
  );
}

export default DiaryDetailScreen;
