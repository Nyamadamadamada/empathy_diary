import React, { useState, KeyboardEvent } from 'react';
import TextWatchButton from '~/components/share/TextWatchButton';
import { STEP_TYPE, STEP } from '~/types/step';

type Prop = {
  shownSteps: STEP_TYPE[];
  isLoading: boolean;
  category: string | '';
  optionEvents: string[];
  handleAddEvent: (event: string) => void;
};

export default function Step2({ shownSteps, isLoading, category, optionEvents, handleAddEvent }: Prop) {
  const [customInput, setCustomInput] = useState('');
  const handleAddClick = (text: string) => {
    setCustomInput(text);
  };
  // Enterキーが押された時のハンドラ
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim() !== '') {
      handleAddEvent(customInput);
    }
  };
  return (
    <div className="mb-24 pb-28">
      <div className="max-w-4xl mx-auto p-0 md:p-6 space-y-8 w-full relative">
        {/* ローディングアニメーションはSTEP２の時だけ */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10 rounded-lg">
            {/* ローディングオーバーレイ */}
            {!shownSteps.includes(STEP.STEP3) && (
              <div className="">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        )}
        <div className={`flex items-start space-x-8 w-full ${isLoading ? 'pointer-events-none' : ''}`}>
          {/* ローディング中に半透明＋操作不可 */}
          {/* モフのセリフセクション */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 w-full animate-fade-fast opacity-0 delay-200">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 overflow-hidden rounded-full relative flex-shrink-0">
                <img
                  src="/img/mofu/mofu_nomal.png"
                  alt="キャラアイコン"
                  className="w-full h-full object-cover transform scale-125 translate-y-3"
                />
              </div>
              <div className="zenMaru-bold text-center text-yellow-600 text-sm mt-1">モフ</div>
            </div>

            <div className="flex flex-col justify-center mt-2">
              <div className="flex flex-col justify-center mt-2">
                {category ? (
                  <p className="zenMaru-regular text-xl font-medium leading-[1.8]">
                    <span className="marker font-bold">{category}</span>のことだね。
                    <br />
                    どんなことがあったのかな？
                  </p>
                ) : (
                  <p className="zenMaru-regular text-xl font-medium leading-[1.8]">どんなことがあったのかな？</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 選択肢セクション */}
        <div
          className={`max-w-200 mx-auto space-y-4 animate-fade-fast opacity-0 delay-700 ${isLoading ? ' pointer-events-none' : ''}`}
        >
          {/* ローディング中に半透明＋操作不可 */}
          {optionEvents.map((event, index) => (
            <div
              key={index}
              onClick={() => handleAddEvent(event)}
              className="cursor-pointer px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-lg font-medium shadow"
            >
              {event}
            </div>
          ))}
        </div>
        {/* 入力欄＋追加ボタン */}
        <div
          className={`flex max-w-200 mx-auto items-center gap-3 mt-6 animate-fade-fast opacity-0 delay-700 ${isLoading ? 'pointer-events-none' : ''}`}
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => handleAddClick(e.target.value)}
            maxLength={100}
            onKeyDown={handleKeyDown}
            placeholder="100字まで自由入力"
            className="flex-1 rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isLoading}
          />
          <TextWatchButton
            originalText=""
            label="追加"
            currentText={customInput}
            onClick={() => handleAddEvent(customInput)}
          />
        </div>
      </div>
    </div>
  );
}
