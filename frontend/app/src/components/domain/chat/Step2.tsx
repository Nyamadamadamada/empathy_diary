import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import TextWatchButton from '~/components/share/TextWatchButton';
import { STEP_TYPE, STEP } from '~/types/step';

type Prop = {
  selectedCategory: string | '';
  handleAddEvent: (event: string) => void;
  handleReturnStep: (step: STEP_TYPE) => void;
};

const defaultEvents = ['今朝、寝坊した。', '昼に同僚とランチに行った。', '20時ごろまで残業した。'];

export default function Step2({ selectedCategory, handleAddEvent, handleReturnStep }: Prop) {
  const [customInput, setCustomInput] = useState('');
  const handleAddClick = (text: string) => {
    setCustomInput(text);
  };

  return (
    <div className="mb-20">
      <div className="max-w-4xl mx-auto p-6 space-y-8 w-full">
        {/* モフのセリフセクション */}
        <div className="flex items-start space-x-8 w-full">
          <div className="flex flex-col items-center animate-fade-fast opacity-0 delay-200">
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
            <p className="zenMaru-regular text-xl font-medium leading-[1.8]">
              <span className="marker font-bold">{selectedCategory}</span>のことだね。
              <br />
              どんなことがあったのかな？
            </p>
          </div>
        </div>

        {/* 選択肢セクション */}
        <div className="space-y-4 animate-fade-fast opacity-0 delay-700">
          {defaultEvents.map((event, index) => (
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
        <div className="flex items-center gap-3 mt-6 animate-fade-fast opacity-0 delay-700">
          <input
            type="text"
            value={customInput}
            onChange={(e) => handleAddClick(e.target.value)}
            maxLength={100}
            placeholder="100字まで自由入力"
            className="flex-1 rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
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
