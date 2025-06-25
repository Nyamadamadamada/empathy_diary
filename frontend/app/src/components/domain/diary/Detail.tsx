import { ChevronLeft, ChevronDown, Smile, Meh, Frown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DiaryEntity from './DiaryEntity';
import { DiaryEntry } from '~/types';
import { EmotionStore, EntityData } from '~/components/contexts/EntityContext';
import DiaryEmotion from './DiaryEmotion';
import EmotionDetail from './EmotionDetail';

interface DiaryDetailProps {
  diary: DiaryEntry;
  entities: EntityData;
  emotionScore: EmotionStore;
  handleCopy: () => void;
}

const moodIcons = {
  happy: (
    <div className="group  relative">
      <Smile className="text-yellow-400 w-8 h-8" />
      {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
      <div
        className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[180px] // SPでの位置調整と最大幅設定
                     md:top-auto md:left-auto md:translate-x-0 md:mb-0  // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
      >
        ポジティブよりの内容
      </div>
    </div>
  ),
  meh: (
    <div className="group  relative">
      <Meh className="text-gray-400 w-8 h-8" />
      {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
      <div
        className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[250px] // SPでの位置調整と最大幅設定
                     md:top-auto md:left-auto md:translate-x-0 md:mb-0  // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
      >
        ポジティブでもネガティブでもない内容
      </div>
    </div>
  ),
  frown: (
    <div className="group  relative">
      <Frown className="text-blue-300 w-8 h-8" />
      {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
      <div
        className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[180px] // SPでの位置調整と最大幅設定
                     md:top-auto md:left-auto md:translate-x-0 md:mb-0  // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
      >
        ネガティブよりの内容
      </div>
    </div>
  ),
};

export default function DiaryDetail({ diary, handleCopy, entities, emotionScore }: DiaryDetailProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full mt-10 md:mt-0">
      <div className="flex items-center justify-center">
        <h1 className="relative text-3xl flex gap-2 font-bold text-center text-gray-900">
          {moodIcons[diary.mood]}
          {diary.date}
        </h1>
      </div>
      <div className="mohu-note mt-10 w-full  shadow p-8 transition-all duration-300">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 overflow-hidden  bg-white rounded-full relative flex-shrink-0">
                <img
                  src="/img/mofu/mofu_nomal.png"
                  alt="キャラアイコン"
                  className="w-full h-full object-cover transform scale-125 translate-y-3"
                />
              </div>
            </div>
            <span className="text-lg zenMaru-bold">モフからの手紙</span>
          </div>
          <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="zenMaru-regular mohu-note-sen mt-4 animate-fade-fast">
            <div className="whitespace-pre-wrap">{diary.reply}</div>
            <div className="text-right">
              <br />
              親愛なるモフより。
            </div>
          </div>
        )}
      </div>
      <div className="bg-white text-gray-800 flex flex-col justify-center my-10">
        <div className="w-full border rounded-2xl shadow p-8">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-2 wrap-break-word w-full">{diary.title}</h2>
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-4 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-sm">気持ち：「{diary.emotion}」</span>
              </div>
            </div>
          </div>

          <hr />

          <div className="my-6 text-base honokaMaru font-serif leading-[1.8rem] wrap-break-word w-full">
            {diary.content}
          </div>
        </div>
      </div>
      <div className="bg-white text-gray-800 flex flex-col justify-center md:mx-10 mt-20 mb-32">
        <EmotionDetail emotion={diary.emotion} />
      </div>
      <div className="bg-white text-gray-800 flex flex-col justify-center md:mx-10 mt-20 mb-32">
        <DiaryEmotion emotionScore={emotionScore} />
      </div>
      <div className="bg-white text-gray-800 flex flex-col justify-center md:mx-10 mb-10">
        <DiaryEntity entities={entities} />
      </div>

      <div className="mt-20 mb-16">
        <Link to="/history" className="text-sm text-gray-600 hover:underline flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          日記一覧へ
        </Link>
      </div>
    </div>
  );
}
