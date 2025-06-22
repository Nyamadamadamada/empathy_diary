import React, { useState, useRef, useEffect } from 'react';

import Step1 from '../domain/chat/Step1';
import Step2 from '../domain/chat/Step2';
import Step3 from '../domain/chat/Step3';
import Step4 from '../domain/chat/Step4';

import { STEP_TYPE, STEP } from '~/types/step';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReturnDialog from '../domain/chat/ReturnDialog';
import { EmotionNode, fetchEmotion } from '~/api/fetchEmotion';
import { getOptionEvents } from '~/config/category';
import { CategoryName } from '~/types/category';
import { useGetCategories } from '~/hooks/useGetCategories';
import { featchCreateDiary } from '~/api/featchCreateDiary';
import { useUser } from '../contexts/UserContext';
import { UserDiary, useUserDiary } from '../contexts/EntityContext';
import Thinking from '../domain/chat/Thinking';
import { fetchReply } from '~/api/fetchReply';

function Chat() {
  const [shownSteps, setShownSteps] = useState<STEP_TYPE[]>([STEP.STEP1]);
  const [category, setCategory] = useState('');
  const [event, setEvent] = useState('');
  const [emotion, setEmotion] = useState('');
  const [predictedEmotion, setPredictedEmotion] = useState<EmotionNode | null>(null);
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [optionEvents, setOptionEvents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { setUserDiary } = useUserDiary();
  const { user } = useUser();

  const [showReturnDialog, setShowReturnDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const categories = useGetCategories();

  const stepRefs = useRef<Record<STEP_TYPE, HTMLDivElement | null>>({
    START: null,
    STEP1: null,
    STEP2: null,
    STEP3: null,
    STEP4: null,
  });
  const divRef = useRef(null);

  const addStep = (nextStep: STEP_TYPE) => {
    setShownSteps((prev) => {
      if (prev.includes(nextStep)) return prev;
      return [...prev, nextStep];
    });
  };

  useEffect(() => {
    const lastStep = shownSteps[shownSteps.length - 1];
    const ref = stepRefs.current[lastStep];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shownSteps]);

  const handleSelectCategory = (selected: CategoryName) => {
    const matchedOption = getOptionEvents(user.ageRange, user.gender, selected);
    setOptionEvents(matchedOption);
    setCategory(selected);
    addStep(STEP.STEP2);
  };

  const handleAddEvent = async (input: string) => {
    setEvent(input);
    setIsLoading(true);
    // 感情API
    const eotionNode = await fetchEmotion(input); // テキストを渡して関数を呼び出す

    setPredictedEmotion(eotionNode);
    if (eotionNode && emotion === '') {
      setEmotion(eotionNode.emotion);
    }

    setIsLoading(false);
    addStep(STEP.STEP3);
  };
  const handleSelectEmotion = async () => {
    setIsLoading(true);

    // 文章＆タイトル作成API
    const createDiary = await featchCreateDiary(emotion, event);
    setTitle(createDiary?.title ?? '');
    setMainText(createDiary?.text ?? '');

    addStep(STEP.STEP4);
    setIsLoading(false);
  };
  const handleFinish = async () => {
    if (mainText.length > 1000) {
      console.error('1000文字以内で入力してください。');
      setIsError(true);
      return;
    }
    setIsFinish(true);
    const resultReply = await fetchReply(emotion, mainText, user.name);

    const now = new Date();
    const dateString = now.toLocaleDateString('ja-JP');
    const diary: UserDiary = {
      diary: {
        id: 'guest',
        title,
        date: dateString,
        content: mainText,
        mood: resultReply.mood,
        emotion,
        reply: resultReply.reply,
        unRead: true,
      },
      entities: resultReply?.entities ?? {
        PERSON: new Set(),
        ORGANIZATION: new Set(),
        LOCATION: new Set(),
        CONSUMER_GOOD: new Set(),
        EVENT: new Set(),
      },
      emotionScore: {
        score: resultReply?.emotionScore.score,
        magnitude: resultReply?.emotionScore.magnitude,
      },
    };
    setUserDiary(diary);
    navigate(`/complete`);
  };

  const handleReturnTop = () => {
    navigate(`/home`);
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* スクロール可能エリア */}
      <div className="flex-1 overflow-y-auto px-6 mb-20 m-auto w-full flex justify-center">
        <div className=" text-gray-800 max-w-[1000px] flex flex-col w-full gap-32" ref={divRef}>
          {!isFinish &&
            shownSteps.map((step) => (
              <div
                key={step}
                ref={(el) => {
                  stepRefs.current[step] = el;
                }}
              >
                {step === STEP.STEP1 && (
                  <Step1 isLoading={isLoading} categories={categories} handleSelectCategory={handleSelectCategory} />
                )}
                {step === STEP.STEP2 && (
                  <Step2
                    shownSteps={shownSteps}
                    isLoading={isLoading}
                    category={category}
                    optionEvents={optionEvents}
                    handleAddEvent={handleAddEvent}
                  />
                )}
                {step === STEP.STEP3 && (
                  <Step3
                    isLoading={isLoading}
                    selectedEvent={event}
                    emotion={emotion}
                    predictedEmotion={predictedEmotion}
                    setEmotion={setEmotion}
                    handleSelectEmotion={handleSelectEmotion}
                  />
                )}
                {step === STEP.STEP4 && (
                  <Step4
                    isLoading={isLoading}
                    title={title}
                    setTitle={setTitle}
                    mainText={mainText}
                    setMainText={setMainText}
                    setIsError={setIsError}
                  />
                )}
              </div>
            ))}
          {isFinish && <Thinking />}
        </div>
      </div>
      {/* 固定フッター */}
      {!isFinish && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white shadow-md">
          <div className="max-w-[1200px] w-full pt-8 pb-10 px-6 flex justify-between">
            <div
              onClick={() => {
                setShowReturnDialog(true);
              }}
              className="cursor-pointer text-sm text-gray-600 hover:underline flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              日記作成をやめる
            </div>
            {shownSteps.includes(STEP.STEP4) && (
              <button
                onClick={() => {
                  handleFinish();
                }}
                className={`
								"bg-slate-600  text-white font-bold text-sm px-4 py-2 rounded-full transition-colors
								 ${isLoading ? 'pointer-events-none' : ''}
                ${
                  mainText && title
                    ? 'bg-gray-700 text-white hover:bg-gray-900 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
							`}
              >
                <span>日記作成を終了する</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* TOPページに戻る？ダイアログ */}
      {showReturnDialog && <ReturnDialog handleReturnTop={handleReturnTop} setShowReturnDialog={setShowReturnDialog} />}
    </div>
  );
}

export default Chat;
