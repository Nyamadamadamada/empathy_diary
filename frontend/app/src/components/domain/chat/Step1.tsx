import { ChevronLeft } from 'lucide-react';
import React, { useMemo } from 'react';
import { getCategoryData } from '~/config/category';
import { STEP_TYPE, STEP } from '~/types/step';

type Prop = {
  handleSelectCategory: (category: string) => void;
  handleReturnStep: (step: STEP_TYPE) => void;
};
export default function Step1({ handleSelectCategory, handleReturnStep }: Prop) {
  // TODO: ユーザーの入力情報から取得
  const categories = useMemo(() => getCategoryData('80_84', 'man'), []);

  return (
    <div className="">
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

          <div className="flex flex-col justify-center mt-2">
            <p className="zenMaru-regular text-xl font-medium leading-[1.8]">
              どんなことを日記にしたい？
              <br />
              次のカテゴリから選んでね
            </p>
          </div>
        </div>

        {/* カテゴリセクション */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
          {categories.map((category) => (
            <div
              key={category.category}
              onClick={() => handleSelectCategory(category.category)}
              className="relative h-32 rounded-2xl overflow-hidden shadow-lg cursor-pointer group opacity-0 animate-fade-fast delay-500"
            >
              {/* 背景画像 */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.imageUrl})` }}
              />

              {/* グラデーションオーバーレイ（暗め） */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-gray-900/20 transition-opacity duration-300 group-hover:opacity-50" />

              {/* テキスト */}
              <div className="relative z-10 flex items-center justify-start h-full px-6 text-white text-2xl font-semibold">
                {category.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
