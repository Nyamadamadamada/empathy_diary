import React from 'react';

const BackgroundAnimation = ({ colors }) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden animate-fade-in">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
            <animate begin="0s" attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
            <stop offset="0%" stopColor={`rgba(${colors[0]}, 0.4)`} />
            <stop offset="100%" stopColor={`rgba(${colors[0]}, 0)`} />
          </radialGradient>
          <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
            <animate begin="0s" attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
            <stop offset="0%" stopColor={`rgba(${colors[1]}, 0.4)`} />
            <stop offset="100%" stopColor={`rgba(${colors[1]}, 0)`} />
          </radialGradient>
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
            <animate begin="0s" attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
            <stop offset="0%" stopColor={`rgba(${colors[2]}, 0.4)`} />
            <stop offset="100%" stopColor={`rgba(${colors[2]}, 0)`} />
          </radialGradient>
        </defs>

        <rect
          x="9.00483%"
          y="14.5733%"
          width="80%"
          height="80%"
          fill="url(#Gradient1)"
          transform="rotate(334.41 50 50)"
          style={{ willChange: 'transform' }}
        >
          <animate
            begin="0s"
            attributeName="transform"
            dur="20s"
            values="translate(0%, 0%) rotate(334.41 50 50); translate(-25%, 23.81527%) rotate(334.41 50 50); translate(0%, 0%) rotate(334.41 50 50)"
            repeatCount="indefinite"
          ></animate>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="21s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
        <rect
          x="-2.17916%"
          y="35.4267%"
          width="80%"
          height="80%"
          fill="url(#Gradient2)"
          transform="rotate(255.072 50 50)"
          style={{ willChange: 'transform' }}
        >
          <animate
            begin="0.5s"
            attributeName="transform"
            dur="23s"
            values="translate(0%, 0%) rotate(255.072 50 50); translate(22.17916%, 14.5733%) rotate(255.072 50 50); translate(0%, 0%) rotate(255.072 50 50)"
            repeatCount="indefinite"
          ></animate>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="36s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
        <rect
          x="13.744%"
          y="1.18473%"
          width="80%"
          height="80%"
          fill="url(#Gradient3)"
          transform="rotate(139.903 50 50)"
          style={{ willChange: 'transform' }}
        >
          <animate
            begin="1s"
            attributeName="transform"
            dur="25s"
            values="translate(0%, 0%) rotate(139.903 50 50); translate(-9.00483%, 10.4267%) rotate(139.903 50 50); translate(0%, 0%) rotate(139.903 50 50)"
            repeatCount="indefinite"
          ></animate>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="27s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </svg>
    </div>
  );
};

export default BackgroundAnimation;
