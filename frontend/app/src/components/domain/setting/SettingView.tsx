import { Save, Image, ArrowBigDown, ArrowDown, ArrowDown01, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '~/components/share/DeleteModal';
import AccountDelete from './AccountDelete';
import DiaryDelete from './DiaryDelete';
import TextWatchButton from '~/components/share/TextWatchButton';

function SettingView({ account }) {
  const [showIconList, setShowIconList] = useState(false);
  const [nickname, setNickname] = useState('');
  const [activeNicknameBtn, setActiveNicknameBtn] = useState(false);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setActiveNicknameBtn(value !== account.nickname);
  };

  return (
    <div className="w-full mb-40 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900">設定</h1>
      <div className="flex items-center justify-center p-20">
        <p>作成中...</p>
      </div>
    </div>
  );
}

export default SettingView;
