export const STEP = {
  STEP1: 'STEP1',
  STEP2: 'STEP2',
  STEP3: 'STEP3',
  STEP4: 'STEP4',
  END: 'END',
};

export type STEP_TYPE = (typeof STEP)[keyof typeof STEP];
