import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'; // useRefは不要になるため削除
import { MakingDiary } from '~/types';
import { STEP_TYPE, STEP } from '~/types/step';
import EditSpace from './EditSpace'; // もし使わないなら削除も検討

type Prop = {
  isLoading: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  mainText: string;
  setMainText: React.Dispatch<React.SetStateAction<string>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Step4({ isLoading, title, setTitle, mainText, setMainText, setIsError }: Prop) {
  const textareaRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(999, 999);
    }, 800); // スクロールが終わった後にフォーカスさせる
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-20 pb-20">
      <div
        className={`max-w-4xl mx-auto p-0 md:p-6 space-y-0 md:space-y-8 w-full ${isLoading ? 'pointer-events-none' : ''}`}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10 rounded-lg" />
        )}
        {/* モフのセリフセクション */}
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

          <div className="flex flex-col justify-center mt-2">
            <p className="zenMaru-regular text-xl font-medium leading-[1.8]">
              教えてくれてありがとう。
              <br />
              今日の出来事をまとめると、こんなかんじかな？
              <br />
              自由に修正してね。
            </p>
          </div>
          {mainText.length > 1000 && (
            <div className="absolute top-0 left-0 w-full h-full bg-red-100 flex items-center justify-center z-20">
              <p className="zenMaru-regular text-xl font-medium leading-[1.8] text-red-600">
                1000文字以内で入力してください。
              </p>
            </div>
          )}
        </div>

        {/* 編集エリア */}
        <div className="mt-28 flex max-w-[960px] h-full mx-auto flex-col items-center justify-center px-0 sm:px-6 md:px-10 animate-fade-fast opacity-0 delay-700">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力..."
            className="h-[82px] w-full font-bold text-2xl text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mb-2 resize-none"
            maxLength={100}
            required
            spellCheck={false}
          />
          <div className="max-w-2xl mx-auto flex flex-col xl:flex-row-reverse w-full h-full gap-4">
            <textarea
              ref={textareaRef}
              value={mainText}
              onChange={(e) => {
                setIsError(e.target.value.length > 1000);
                setMainText(e.target.value);
              }}
              placeholder="今日の出来事を入力..."
              className="honokaMaru border text-xl leading-[1.8] border-none rounded p-1 mb-10  h-full focus:outline-none focus:no-underline focus: w-full min-h-[200px] resize-y" // リサイズを許可
              rows={10}
              maxLength={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
