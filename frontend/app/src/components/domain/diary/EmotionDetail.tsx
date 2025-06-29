import { Bird, CircleHelp, X, ZoomIn } from 'lucide-react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { emotionMetaMap, getParentEmotionId, EmotionMeta } from '~/config/emotion';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Stepper from './EmotionProgress';

interface EmotionDetailProps {
  emotion: string;
}

const EmotionImg = ({
  emotionItem,
  setIsDetail,
}: {
  emotionItem: EmotionMeta;
  setIsDetail: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="">
      <div className="">
        <img
          onClick={() => {
            setIsDetail(true);
          }}
          src={emotionItem.image}
          alt="感情イメージ"
          className="cursor-pointer rounded-xl w-full m-auto max-w-[300px] object-cover  transition-transform duration-300 ease-in-out hover:scale-95"
        />
        <p className="honokaMaru text-center text-lg w-full text-gray-500 mt-2">根幹の感情：{emotionItem.title}</p>
      </div>
      <div
        onClick={() => {
          setIsDetail(true);
        }}
        className="absolute cursor-pointer top-0 right-0 p-2 bg-gray-600 rounded-full transition-transform duration-300 ease-in-out hover:scale-95"
      >
        <span className="relative group">
          <span
            className={[
              'whitespace-nowrap',
              'rounded',
              'bg-black',
              'px-2',
              'py-1',
              'text-white',
              'absolute',
              '-top-12',
              'left-1/2',
              '-translate-x-1/2',
              "before:content-['']",
              'before:absolute',
              'before:-translate-x-1/2',
              'before:left-1/2',
              'before:top-full',
              'before:border-4',
              'before:border-transparent',
              'before:border-t-black',
              'opacity-0',
              'group-hover:opacity-100',
              'transition',
              'pointer-events-none',
            ].join(' ')}
          >
            もっと詳しく！
          </span>
          <ZoomIn className="w-10 h-10 text-white" />
        </span>
      </div>
    </div>
  );
};

const EmotionDetail = ({ emotion }: EmotionDetailProps) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const helloRef = useRef(null);
  const goodbyeRef = useRef(null);
  const nodeRef = isDetail ? goodbyeRef : helloRef;

  const emotionId = getParentEmotionId(emotion);
  let emotionItem: EmotionMeta | undefined;
  if (emotionId) {
    emotionItem = emotionMetaMap[emotionId];
  }
  return (
    <div className="w-full min-h-[500px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <div className="p-5  flex items-start text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <h3>感情の説明</h3>
      </div>
      <div className="relative mx-2 md:mx-0">
        <div className="flex flex-col justify-center items-center mx-auto max-w-screen-lg">
          {/* 選択された感情の場合 */}
          {emotionItem?.image ? (
            <SwitchTransition>
              <CSSTransition key={isDetail ? 'detail' : 'image'} nodeRef={nodeRef} timeout={300} classNames="zoomfade">
                <div ref={nodeRef} className="relative w-full">
                  {isDetail ? (
                    <div className="relative">
                      <div
                        className={`z-10 max-w-sm rounded-3xl overflow-visible ${emotionItem.imageColor} shadow-lg  px-8 py-4`}
                      >
                        <div className="">
                          <div className="font-bold text-xl mb-4 text-gray-900">「{emotionItem.title}」の解説</div>
                          <p className="text-base text-gray-700">{emotionItem.description}</p>
                        </div>
                        <div className="relative flex items-center  mt-8 mb-2">
                          <p className=" text-md font-bold text-gray-800">{emotionItem.title}の段階</p>
                          <div className="group w-10  z-10 relative pl-2">
                            <CircleHelp />
                            {/* SPでアイコンの上に表示、MD以上でアイコンの右に表示 */}
                            <div
                              className="absolute z-10 -top-[80px] left-1/2 -translate-x-1/3 mt-2 w-[330px] w-max-full // SPでの位置調整と最大幅設定
                     md:top-auto md:left-auto md:translate-x-0 md:mt-0 md:ml-4 md:w-[440px] // MD以上での位置調整
                    bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-normal opacity-0 group-hover:opacity-100 transition pointer-events-none"
                            >
                              気持ちが強くなると、感情の段階が上がります。
                              例えば、「心配」が強くなると「恐怖」に発展します。
                            </div>
                          </div>
                        </div>
                        <Stepper emotionStep={emotionItem.emotionStep} />
                        <hr />
                        <div className="flex items-center justify-around mt-4 mb-4 relative">
                          <div className="font-bold text-gray-800">反対の感情</div>

                          <div className="flex flex-col items-center justify-center">
                            <img className="w-[80px]" src={emotionItem.reverse.img} />
                            <span>{emotionItem.reverse.title}</span>
                          </div>
                        </div>
                        <div className=" w-full px-6 pt-4 pb-2">
                          <button
                            onClick={() => setIsDetail(false)}
                            className="flex mx-auto items-center px-4 py-2 bg-gray-600 text-white rounded-2xl hover:scale-95 transition"
                          >
                            <span className="mr-2 font-bold">CLOSE</span>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <EmotionImg emotionItem={emotionItem} setIsDetail={setIsDetail} />
                  )}
                </div>
              </CSSTransition>
            </SwitchTransition>
          ) : (
            <div className="w-full  mb-6 ">
              <Bird className="w-[200px] h-[200px] m-auto text-gray-400/75" />
              <p className="text-center w-full text-gray-500 mt-2">自由記入の感情</p>
            </div>
          )}
        </div>
        {emotionItem?.image && isDetail && (
          <img
            src={emotionItem?.image}
            alt="感情イメージ"
            className="box absolute top-0 -z-10 -left-[50px] -rotate-45 rounded-xl w-full m-auto max-w-[200px] object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default EmotionDetail;
