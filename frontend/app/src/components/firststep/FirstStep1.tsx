import { ChevronLeft } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import TextWatchButton from '../share/TextWatchButton';

type Prop = {
  handleAddName: (name: string) => void;
};
export default function Step1({ handleAddName }: Prop) {
  const [name, setName] = useState<string>('');
  const handleAddClick = (text: string) => {
    setName(text);
  };
  return (
    <div className="my-[55%] w-full">
      <div className="max-w-4xl mx-auto p-6 space-y-8 w-full">
        {/* セリフセクション */}
        <div className="flex items-start space-x-8 w-full animate-fade-fast">
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

          <div className="flex flex-col justify-center mt-2 zenMaru-regular leading-[1.8] text-xl ">
            <p className="opacity-0  animate-fade-fast">はじめまして。 僕は「モフ」だよ。</p>
            <p className="opacity-0  animate-fade-fast delay-2000">これから、あなたの日記作りをお手伝いするよ。</p>
            <p className="opacity-0  animate-fade-fast delay-4000 font-bold">はじめに、お名前を聞いてもいいかな？</p>
          </div>
        </div>

        {/* 名前入力 */}
        <div className="mt-6 animate-fade-fast opacity-0 delay-5000">
          <div className="flex items-center gap-3 ">
            <input
              type="text"
              value={name}
              onChange={(e) => handleAddClick(e.target.value)}
              maxLength={100}
              placeholder="あなたのお名前"
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <TextWatchButton originalText="" label="決定" currentText={name} onClick={() => handleAddName(name)} />
          </div>
          <p className="text-sm mt-2 text-gray-500">※入力情報はサーバーに保存されません。</p>
        </div>
      </div>
    </div>
  );
}
