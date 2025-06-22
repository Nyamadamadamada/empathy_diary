import { CircleHelp } from 'lucide-react';
import GaugeComponent from 'react-gauge-component';
import { EmotionStore } from '~/components/contexts/EntityContext';

interface DiaryEmotionProps {
  emotionScore: EmotionStore;
}

const DiaryEmotion = ({ emotionScore }: DiaryEmotionProps) => {
  return (
    <div className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <div className="p-5  flex items-start text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <h3>感情分析</h3>
        <div className="group w-10 left-2 z-10 relative md:top-0 md:left-0 md:pl-4">
          <CircleHelp />
          {/* SPでアイコンの下に表示、MD以上でアイコンの右に表示 */}
          <div
            className="z-10 top-full left-1/2 -translate-x-1/3 mt-2 w-[330px] w-max-full // SPでの位置調整と最大幅設定
                     md:top-auto md:left-auto md:translate-x-0 md:mt-0 md:ml-4 md:w-[440px] // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
          >
            日記の内容から「ポジティブ」か「ネガティブ」かを判断します。文章が長くなると「ふつう」に近くなる傾向があります。
          </div>
        </div>
      </div>
      <div className="px-0 md:px-10">
        <GaugeComponent
          type="semicircle"
          pointer={{ type: 'arrow', elastic: true }}
          minValue={-1}
          maxValue={1}
          value={emotionScore.score}
          arc={{
            padding: 0.02,
            subArcs: [
              {
                limit: -0.6,
                color: '#4169E1', // ネガティブ（紺色）
                showTick: true,
                tooltip: { text: 'ネガティブ' },
              },
              {
                limit: -0.3,
                color: '#9AAFEF', // ややネガティブ（薄い紺色）
                showTick: true,
                tooltip: { text: 'ややネガティブ' },
              },
              {
                limit: 0.3,
                color: '#CCCCCC', // ナチュラル（グレー）
                showTick: true,
                tooltip: { text: 'ふつう' },
              },
              {
                limit: 0.6,
                color: '#F5CD19', // ややポジティブ（黄色）
                showTick: true,
                tooltip: { text: 'ややポジティブ' },
              },
              {
                // 0.6〜1
                limit: 1,
                color: '#FFA500', // ポジティブ（オレンジ）
                showTick: true,
                tooltip: { text: 'ポジティブ' },
              },
            ],
          }}
          labels={{
            // ラベル設定 [1]
            valueLabel: {
              // 中央の値ラベル [1]
              // matchColorWithArc: true, // 現在の弧の色と一致させる（任意）
              formatTextValue: (value) => {
                if (value < -0.6) {
                  return 'ネガティブ';
                } else if (value < -0.3) {
                  return 'ややネガティブ';
                } else if (value < 0.3) {
                  return 'ふつう';
                } else if (value < 0.6) {
                  return 'ややポジティブ';
                } else {
                  return 'ポジティブ';
                }
              },
              style: {
                // ラベルのスタイルを調整（任意） [1]
                fontSize: '18px',
                fill: '#fff',
                fontWeight: '600',
                textShadow: 'black 1px 0 10px',
                fontFamily: 'sans-serif',
              },
            },
            tickLabels: {
              // 目盛りラベル [2]
              // デフォルトの目盛りラベルのスタイルを設定 [1]
              defaultTickValueConfig: {
                style: {
                  fontSize: '15px',
                },
              },
            },
          }}
        />
        {emotionScore.magnitude > 3 && (
          <p className="text-sm text-gray-500 mt-6">
            ※ この日記はネガティブとポジティブのどちらの内容も含まれます。
            <br />
            どちらの内容も含む場合、「ふつう」に近いパラメータを指すことがあります。
          </p>
        )}
      </div>
    </div>
  );
};

export default DiaryEmotion;
