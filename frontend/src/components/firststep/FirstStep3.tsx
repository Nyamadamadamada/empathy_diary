import React, { useState } from 'react';
import TextWatchButton from '../share/TextWatchButton';
import { getAgeGroup } from '~/config/category';
import { Link } from 'react-router-dom';

type Prop = {};
export default function Step3() {
  return (
    <div className="mt-[30%] mb-[60%] w-full">
      <div className="max-w-4xl mx-auto p-6 w-full">
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
            <p className="opacity-0 animate-fade-fast">教えてくれて、ありがとう。</p>
            <p className="opacity-0 animate-fade-fast delay-200 font-bold">それじゃあ早速、今日の日記を書いてみる？</p>
          </div>
        </div>
        <div className="mt-24">
          <div className="flex flex-col gap-10 text-center">
            <Link
              to="/chat/step"
              className="font-bold text-lg px-6 py-4 rounded-full bg-gray-500 text-white hover:bg-gray-900 cursor-pointer transition duration-300"
            >
              日記を作成する
            </Link>
            <Link to="/home" className="text-gray-600">
              あとでにする
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
