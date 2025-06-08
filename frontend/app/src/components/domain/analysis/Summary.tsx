import React, { useRef } from 'react';

const Summary = () => {
  const videoRef = useRef(null);

  return (
    <div className="relative h-[440px] overflow-hidden rounded-xl">
      <div className="table w-full h-full relative">
        <div className="table-cell align-middle text-center relative z-20">
          <div className="bg-white px-8  py-6 m-10  min:w-2/3 text-center">
            <h3 className="my-5 font-bold text-xl marker">「業務効率化」×「楽しい」</h3>
            <div className="text-left mt-3 leading-[1.8rem]">
              最近のニッキーさんは、<b>業務効率化</b>と<b>楽しさ</b>
              を両立させて、仕事そのものを心からエンジョイしていると言えるでしょう。
              <br />
              具体的には勤怠入力の自動化、ショートカットキーを覚えるなど、ちょっとしためんどくさいを解消することで、メインの仕事に注力している様子です。
              また、人事部の金森さんと雑談し、バイクの趣味が一致したことで意気投合していました。
            </div>
          </div>
        </div>
      </div>
      <video
        ref={videoRef}
        id="video"
        preload="auto"
        autoPlay
        loop
        muted
        className="absolute bg-blue-950-1 opacity-70  top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto  overflow-hidden transform -translate-x-1/2 -translate-y-1/2 scale-150"
      >
        <source src="video/bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Summary;
