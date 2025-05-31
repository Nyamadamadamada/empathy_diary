import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

import Step1 from '../domain/chat/Step1';
import Step2 from '../domain/chat/Step2';
import Step3 from '../domain/chat/Step3';
import Step4 from '../domain/chat/Step4';

import { STEP_TYPE, STEP } from '~/types/step';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [shownSteps, setShownSteps] = useState<STEP_TYPE[]>([STEP.STEP1]);
  const [category, setCategory] = useState('');
  const [event, setEvent] = useState('');
  const [emotion, setEmotion] = useState('');
  const [showReturnDialog, setShowReturnDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const stepRefs = useRef<Record<STEP_TYPE, HTMLDivElement | null>>({
    START: null,
    STEP1: null,
    STEP2: null,
    STEP3: null,
    STEP4: null,
  });

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

  const handleSelectCategory = (selected: string) => {
    setCategory(selected);
    addStep(STEP.STEP2);
  };
  const handleAddEvent = (input: string) => {
    setEvent(input);
    addStep(STEP.STEP3);
  };
  const handleSelectEmotion = (selected: string) => {
    setEmotion(selected);
    addStep(STEP.STEP4);
  };
  const handleFinish = () => {
    console.log('日記作成を終了します');
  };
  const handleNextStep = () => {
    const nextStep: STEP_TYPE = 'STEP' + (shownSteps.length + 1);
    if (nextStep in STEP) {
      addStep(nextStep);
    }
  };

  const handleReturnTop = () => {
    navigate(`/home`);
  };

  return (
    <div className="relative h-screen flex flex-col">
      {/* スクロール可能エリア */}
      <div className="flex-1 overflow-y-auto px-6 pt-20 mb-20 m-auto w-full flex justify-center">
        <div className=" text-gray-800 max-w-[1000px] flex flex-col w-full gap-32">
          {shownSteps.map((step) => (
            <div
              key={step}
              ref={(el) => {
                stepRefs.current[step] = el;
              }}
            >
              {step === STEP.STEP1 && <Step1 handleSelectCategory={handleSelectCategory} handleReturnStep={() => {}} />}
              {step === STEP.STEP2 && (
                <Step2 selectedCategory={category} handleAddEvent={handleAddEvent} handleReturnStep={() => {}} />
              )}
              {step === STEP.STEP3 && (
                <Step3 selectedEvent={event} handleSelectEmotion={handleSelectEmotion} handleReturnStep={() => {}} />
              )}
              {step === STEP.STEP4 && <Step4 handleFinish={handleFinish} handleReturnStep={() => {}} />}
            </div>
          ))}
        </div>
      </div>
      {/* 固定フッター */}
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
          {shownSteps.includes(STEP.STEP4) ? (
            <button
              onClick={() => {
                handleFinish();
              }}
              disabled={!event || !emotion}
              className={`
								"bg-slate-600  text-white font-bold text-sm px-4 py-2 rounded-full transition-colors
								${
                  !event || !emotion
                    ? 'bg-gray-700 text-white hover:bg-gray-900 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
							`}
            >
              <span>日記作成を終了する</span>
            </button>
          ) : (
            <div
              onClick={() => {
                handleNextStep();
              }}
              className="cursor-pointer text-sm text-gray-600 hover:underline flex items-center gap-1"
            >
              スキップする
            </div>
          )}
        </div>
      </div>
      {showReturnDialog && (
        <Dialog
          open={showReturnDialog}
          onClose={() => {
            setShowReturnDialog(false);
          }}
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40"
        >
          <Dialog.Panel className="bg-white rounded-xl py-4 px-6 w-80 shadow-xl">
            <Dialog.Description className=" text-gray-800 my-4">
              作成した内容は保存されません。
              <br /> TOPページに戻りますか？
            </Dialog.Description>
            <div className="flex justify-between gap-2 mt-8">
              <button
                onClick={() => {
                  setShowReturnDialog(false);
                }}
                className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                onClick={handleReturnTop}
                className="px-4 py-2 rounded-md text-sm bg-gray-600 text-white hover:bg-gray-800"
              >
                TOP画面に戻る
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
}

export default Chat;
