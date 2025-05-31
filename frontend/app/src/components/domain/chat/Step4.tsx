import { ChevronLeft } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { MakingDiary } from '~/types';
import { STEP_TYPE, STEP } from '~/types/step';
import EditSpace from './EditSpace';

type Prop = {
  diary: MakingDiary;
  handleFinish: (event: string) => void;
  handleReturnStep: (step: STEP_TYPE) => void;
};

export default function Step4({ handleFinish, handleReturnStep }: Prop) {
  const [title, setTitle] = useState('テストのタイトル');
  const [mainText, setMainText] = useState('中身');
  const [editedContent, setEditedContent] = useState('中身');
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef(null);

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6 space-y-8 w-full">
        {/* モフのセリフセクション */}
        <div className="flex items-start space-x-8 w-full animate-fade-fast opacity-0 delay-200">
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
        </div>

        {/* 編集エリア */}
        <div className="mt-28 flex max-w-[960px] h-full mx-auto flex-col items-center justify-center px-4 sm:px-6 md:px-10 animate-fade-fast opacity-0 delay-700">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力..."
            className="h-[82px] px-4 w-full font-bold text-2xl text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mb-2 resize-none"
            maxLength={70}
            rows={1}
            required
            spellCheck={false}
          />
          <div className="p-4 max-w-2xl mx-auto flex flex-col xl:flex-row-reverse w-full h-full gap-4">
            {/* テキスト入力欄 */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="honokaMaru border text-xl leading-[2.6] border-gray-300 rounded py-4 px-8 mb-96 min-h-[100px] h-full focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
            >
              テキストのデモです。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
