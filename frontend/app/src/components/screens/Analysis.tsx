import { CircleHelp } from 'lucide-react';
import Characters from '../domain/analysis/Characters';
import Words from '../domain/analysis/Words';
import { negativeWord, positiveWord } from '~/config/words';
import Summary from '../domain/analysis/Summary';

export default function EmotionAnalysisPage() {
  const color1 = '#f9c2ff';
  const color2 = '#ffeaa7';

  return (
    <div className="bg-white min-h-screen p-6 text-gray-800 w-full">
      <div className="flex relative">
        <h1 className="text-2xl font-bold mb-6">メタ認知分析</h1>
        <div className="group absolute left-[10rem] z-50 md:relative md:top-0 md:left-0 md:pl-4">
          <CircleHelp />
          {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
          <div
            className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] // SPでの位置調整と最大幅設定
                    md:static md:top-auto md:left-auto md:translate-x-0 md:mt-0 md:ml-4 // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
          >
            メタ認知とは、自分の思考や感情、行動を客観視することです。
          </div>
        </div>
      </div>

      <section className="my-8">
        <h2 className="text-xl font-semibold mb-2">最近のニッキーさんの概要</h2>
        <Summary />
      </section>

      <section className="my-24">
        <div className="flex relative">
          <h2 className="text-xl font-semibold mb-2">登場人物</h2>
          <div className="group absolute left-[5.4rem] z-50 md:relative md:top-0 md:left-0 md:pl-4">
            <CircleHelp />
            {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
            <div
              className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] // SPでの位置調整と最大幅設定
                    md:static md:top-auto md:left-auto md:translate-x-0 md:mt-0 md:ml-4 // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
            >
              日記に登場する人物を抽出し、所属別に分類しています。
            </div>
          </div>
        </div>
        <div className="">
          <Characters />
        </div>
      </section>

      <section className="mt-48 ">
        <h2 className="text-xl font-semibold mb-24">ポジティブなとき、よく使う言葉</h2>
        <div className="flex justify-center w-full">
          <Words words={positiveWord} />
        </div>
      </section>
      <section className="mb-20 ">
        <h2 className="text-xl font-semibold mb-24">ネガティブなとき、よく使う言葉</h2>
        <div className="flex justify-center w-full">
          <Words words={negativeWord} />
        </div>
      </section>
    </div>
  );
}
