// FirstSettings.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FIRST_STEP, FIRST_STEP_TYPE } from '~/types/index';
import FirstStep1 from '../firststep/FirstStep1';
import FirstStep2 from '../firststep/FirstStep2';
import FirstStep3 from '../firststep/FirstStep3';

const FirstSettings = () => {
  const [shownSteps, setShownSteps] = useState<FIRST_STEP_TYPE[]>([FIRST_STEP.STEP1]);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const stepRefs = useRef<Record<FIRST_STEP_TYPE, HTMLDivElement | null>>({
    STEP1: null,
    STEP2: null,
    FINISH: null,
  });
  const addStep = (nextStep: FIRST_STEP_TYPE) => {
    if (nextStep === FIRST_STEP.STEP3) {
      setShownSteps([FIRST_STEP.STEP3]); // STEP3だけを表示
    } else {
      setShownSteps((prev) => {
        if (prev.includes(nextStep)) return prev;
        return [...prev, nextStep];
      });
    }
  };

  const handleAddName = (inputName: string) => {
    setName(inputName);
    addStep(FIRST_STEP.STEP2);
  };
  const handleAddGenderAge = (inputGender: string, inputAge: string) => {
    setGender(inputGender);
    setAge(inputAge);
    addStep(FIRST_STEP.STEP3);
  };

  const handleFinishSetting = () => {
    console.log('入力情報を保持する');
  };

  useEffect(() => {
    const lastStep = shownSteps[shownSteps.length - 1];
    const ref = stepRefs.current[lastStep];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shownSteps]);

  return (
    <div className="flex flex-col gap-32 items-center justify-center min-h-screen  p-4">
      {shownSteps.map((step) => (
        <div
          key={step}
          ref={(el) => {
            stepRefs.current[step] = el;
          }}
        >
          {step === FIRST_STEP.STEP1 && <FirstStep1 handleAddName={handleAddName} />}
          {step === FIRST_STEP.STEP2 && <FirstStep2 name={name} handleAddGenderAge={handleAddGenderAge} />}
          {step === FIRST_STEP.STEP3 && <FirstStep3 />}
        </div>
      ))}
    </div>
  );
};

export default FirstSettings;
