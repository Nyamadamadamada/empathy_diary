import React, { useMemo } from 'react';
import { getCategoryData } from '~/config/category';
import { User } from '~/types';
import { CategoryName, CategoryType } from '~/types/category';

type Prop = {
  isLoading: boolean;
  categories: CategoryType[];
  handleSelectCategory: (category: CategoryName) => void;
};
export default function Step1({ isLoading, categories, handleSelectCategory }: Prop) {
  return (
    <div
      className={`max-w-4xl mx-auto mt-10 p-6 space-y-8 w-full mb-36 relative ${isLoading ? 'pointer-events-none' : ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10 rounded-lg" />
      )}
      {/* モフのセリフセクション */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8  w-full animate-fade-fast opacity-0 delay-200">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-200 mx-auto">
        {categories.map((category) => (
          <div
            key={category.category}
            onClick={() => handleSelectCategory(category.category)}
            className="relative h-20 md:h-32 rounded-2xl overflow-hidden shadow-lg cursor-pointer group opacity-0 animate-fade-fast delay-500"
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
  );
}
