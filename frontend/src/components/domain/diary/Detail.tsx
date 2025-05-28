import { Smile, Frown, Meh, ChevronLeft, Pencil, Copy, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DiaryEntry } from '~/types/emotion';
import { useState } from 'react';

const moodIcons = {
  happy: <Smile className="text-yellow-400 w-6 h-6" />,
  sad: <Frown className="text-blue-400 w-6 h-6" />,
  meh: <Meh className="text-gray-400 w-6 h-6" />,
};

interface DiaryDetailProps {
  diary: DiaryEntry;
  handleCopy: () => void;
  handleEdit: () => void;
}

export default function DiaryDetail({ diary, handleCopy, handleEdit }: DiaryDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center text-gray-900">2022/10/3</h1>

      <div className="bg-white text-gray-800 flex justify-center my-10">
        <div className="w-full border rounded-2xl shadow p-8">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-2">{diary.title}</h2>
              <div className="flex gap-2 items-center">
                <div onClick={handleCopy} className="cursor-pointer flex items-center">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm ml-1">コピーする</span>
                </div>
                <div onClick={handleEdit} className="cursor-pointer flex items-center">
                  <Pencil className="w-4 h-4" />
                  <span className="text-sm ml-1">編集する</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-4 mb-2">
              <p>{diary.date}</p>
              <div className="flex items-center gap-1">
                {moodIcons[diary.mood]}
                <span className="text-sm">Happyな気分</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
              {diary.tags.map((tag, idx) => (
                <span key={idx} className="cursor-default">
                  <span className="text-gray-400">#</span>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr />

          <div className="mt-6 whitespace-pre-wrap text-base leading-relaxed font-serif">{diary.content}</div>
        </div>
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
            <div className="">
              こんにちは！モフです。 今日は君にとって素敵な1日になりますように。
              ~~なことがあったんだね。それってもしかして「犬も歩けば棒に当たる」ってことかな？
              たまにはのんびりして、モフモフしようね 🐶✨
            </div>
            <div className="text-right">
              <br />
              親愛なるモフより。
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <Link to="/history" className="text-sm text-gray-600 hover:underline flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          日記一覧へ
        </Link>
      </div>
    </div>
  );
}
