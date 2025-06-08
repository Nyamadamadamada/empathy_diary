import React from 'react';

const AnimatedLoader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="200"
    height="200"
    style={{ shapeRendering: 'auto', display: 'block', background: 'rgba(255, 255, 255, 0)' }}
  >
    <g>
      <circle fill="#ff5f00" r="10" cy="50" cx="84">
        <animate
          begin="0s"
          keySplines="0 0.5 0.5 1"
          values="10;0"
          keyTimes="0;1"
          calcMode="spline"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          attributeName="r"
        />
        <animate
          begin="0s"
          values="#ff5f00;#b4b4b4;#b4b4b4;#b4b4b4;#ff5f00"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="discrete"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="fill"
        />
      </circle>
      <circle fill="#ff5f00" r="10" cy="50" cx="16">
        <animate
          begin="0s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="0;0;10;10;10"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="r"
        />
        <animate
          begin="0s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
      <circle fill="#b4b4b4" r="10" cy="50" cx="50">
        <animate
          begin="-0.8333333333333334s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="0;0;10;10;10"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="r"
        />
        <animate
          begin="-0.8333333333333334s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
      <circle fill="#b4b4b4" r="10" cy="50" cx="84">
        <animate
          begin="-1.6666666666666667s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="0;0;10;10;10"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="r"
        />
        <animate
          begin="-1.6666666666666667s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
      <circle fill="#b4b4b4" r="10" cy="50" cx="16">
        <animate
          begin="-2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="0;0;10;10;10"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="r"
        />
        <animate
          begin="-2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          dur="3.3333333333333335s"
          repeatCount="indefinite"
          attributeName="cx"
        />
      </circle>
    </g>
  </svg>
);

export default AnimatedLoader;
