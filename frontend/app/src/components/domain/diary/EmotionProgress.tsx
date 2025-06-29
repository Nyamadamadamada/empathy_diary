import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Step } from '~/config/emotion';

type Props = {
  emotionStep: {
    step1: Step;
    step2: Step;
    step3: Step;
  };
};

const Stepper = ({ emotionStep }: Props) => {
  const steps = [emotionStep.step1, emotionStep.step2, emotionStep.step3];

  return (
    <ol className="flex flex-col sm:flex-row items-center w-full font-bold space-x-0 md:space-x-4 text-sm text-center text-gray-800 bg-white sm:text-base mb-4 rtl:space-x-reverse">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex w-full ${index === 3 ? 'md:w-1/4' : 'md:w-1/3'}  mb-0 sm:mb-0 flex-col sm:flex-row items-center`}
        >
          <div className={`${step.bgColor} ${step.textColor} px-2 py-4 rounded-md w-full`}>
            {step.title.map((text, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-center">
                <span>{text} </span>
              </div>
            ))}
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-8 h-8 mt-2 md:mt-2 ms-0 sm:ms-4 rotate-90 sm:rotate-0 rtl:rotate-180 sm:rtl:rotate-180" />
          )}
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
