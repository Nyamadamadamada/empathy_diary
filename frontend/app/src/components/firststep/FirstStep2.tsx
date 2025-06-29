import React, { useState } from 'react';
import { getAgeGroup } from '~/config/category';

type Prop = {
  name: string;
  handleAddGenderAge: (gender: string, rangeAge: number, inputAgeRange: string) => void;
};
export default function Step2({ name, handleAddGenderAge }: Prop) {
  const [selectedGender, setSelectedGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null); // エラー管理

  const handleCheck = () => {
    const ageNum = Number(age);

    if (!age || isNaN(ageNum) || ageNum < 12) {
      setError('年齢は12歳以上から可能です。');
      return;
    }

    if (!selectedGender) {
      setError('性別は必須です。');
      return;
    }

    // バリデーション成功
    setError(null);
    const rangeAge = getAgeGroup(ageNum);
    handleAddGenderAge(selectedGender, ageNum, rangeAge); // 成功時のアクション（必要に応じて調整）
  };

  const options = [
    { label: '男性', value: '男性' },
    { label: '女性', value: '女性' },
    { label: 'その他', value: '性別不明' },
  ];

  return (
    <div className="mt-[30%] mb-[60%] w-full">
      <div className="max-w-4xl  mx-auto p-6  space-y-0 md:space-y-8 w-full">
        {/* セリフセクション */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 w-full animate-fade-fast opacity-0 delay-200">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 overflow-hidden rounded-full relative flex-shrink-0">
              <img
                src="/img/mofu/mofu_smile.png"
                alt="キャラアイコン"
                className="w-full h-full object-cover transform scale-125 translate-y-3"
              />
            </div>
            <div className="zenMaru-bold text-center text-yellow-600 text-sm mt-1">モフ</div>
          </div>

          <div className="flex flex-col justify-center mt-2 zenMaru-regular leading-[1.8] text-xl ">
            <p className="opacity-0 animate-fade-fast">ありがとう。</p>
            <p className="opacity-0 animate-fade-fast delay-200">「{name}」さんだね。いい名前だね。</p>
            <p className="opacity-0 animate-fade-fast delay-400 font-bold">次に、年齢と性別を教えてね。</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-0 md:mt-6 animate-fade-fast opacity-0 delay-500">
          <div className="flex items-end gap-4 my-4 md:my-8">
            <input
              type="number"
              min={12}
              max={130}
              value={age}
              onInput={(e) => {
                setAge(e.currentTarget.value);
              }}
              placeholder="年齢"
              className="w-28 px-3 py-2 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="text-gray-700 text-lg">歳</div>
          </div>

          <div className="flex flex-row gap-5">
            {options.map((option) => (
              <button
                key={option.label}
                value={option.value}
                onClick={() => setSelectedGender(option.value)}
                className={`text-lg min-w-[86px]
                px-4 py-2 font-bold rounded-full transition-colors bg-gray-200 hover:bg-gray-400 
                ${selectedGender === option.value ? 'border-4 border-orange-400 ' : ''}
              `}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* エラーメッセージ */}
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

          <div className="mt-20">
            <button
              onClick={handleCheck}
              className="bg-slate-600  text-white font-bold px-4 py-2 rounded-full transition-colors hover:bg-gray-900 cursor-pointer"
            >
              <span>設定を完了する</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
