import { Save, Image, ArrowBigDown, ArrowDown, ArrowDown01, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import DeleteModal from '~/components/share/DeleteModal';
import AccountDelete from './AccountDelete';
import DiaryDelete from './DiaryDelete';
import TextWatchButton from '~/components/share/TextWatchButton';

const iconList = [
  '/img/icons/icon1.png',
  '/img/icons/icon2.png',
  '/img/icons/icon3.png',
  '/img/icons/icon4.png',
  '/img/icons/icon5.png',
  '/img/icons/icon6.png',
  '/img/icons/icon7.png',
  '/img/icons/icon8.png',
  '/img/icons/icon9.png',
  '/img/icons/icon10.png',
  '/img/icons/icon11.png',
  '/img/icons/icon12.png',
];

function SettingView({
  account,
  selectedIcon,
  handleSaveIcon,
  handleSaveNickname,
  handleDeleteAccount,
  handleDeleteDiaries,
  setSelectedIcon,
}) {
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

      <div className="p-4 sm:p-8 space-y-8 text-gray-800">
        <h3 className="font-bold text-xl text-gray-900">アカウント情報の変更</h3>

        {/* アイコン変更 */}
        <div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
            <div className="flex flex-col items-center sm:items-start">
              <label className="block font-semibold mb-2">現在のアイコン</label>
              <img src={account.icon_url} alt="現在のアイコン" className="w-24 h-24 rounded-full mb-4" />
            </div>

            <button
              onClick={() => setShowIconList(!showIconList)}
              className="py-2 px-4  text-gray-800 rounded hover:bg-gray-200 flex items-center gap-2"
            >
              {showIconList ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              アイコンを変更
            </button>
          </div>

          {showIconList && (
            <>
              <label className="block font-semibold mt-6 mb-2">アイコンを選択</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                {iconList.map((icon) => (
                  <img
                    key={icon}
                    src={icon}
                    alt="アイコン候補"
                    className={`w-20 h-20 rounded-full cursor-pointer border-4 ${
                      selectedIcon === icon ? 'border-gray-600' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedIcon(icon)}
                  />
                ))}
              </div>

              <button
                onClick={handleSaveIcon}
                className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800 flex items-center gap-2"
              >
                アイコンの変更を保存
              </button>
            </>
          )}
        </div>

        {/* ニックネーム変更 */}
        <div>
          <label className="block font-semibold mb-2 pt-20">ニックネーム変更</label>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-stretch sm:items-center">
            <input
              type="text"
              defaultValue={account.nickname}
              onChange={handleNicknameChange}
              className="w-full p-2 border border-gray-400 rounded-md bg-white text-gray-800"
            />

            <TextWatchButton originalText={account.nickname} currentText={nickname} onClick={handleSaveNickname} />
          </div>
        </div>
      </div>

      {/* データの削除セクション */}
      <div className="mt-40 space-y-10 px-4 sm:px-0">
        <hr />

        <h3 className="font-bold text-xl text-gray-900">データの削除</h3>
        <DiaryDelete handleDeleteDiaries={handleDeleteDiaries} />
        <AccountDelete handleDeleteAccount={handleDeleteAccount} />
      </div>
    </div>
  );
}

export default SettingView;
