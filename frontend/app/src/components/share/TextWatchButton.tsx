// components/TextWatchButton.tsx
import React from 'react';

type TextWatchButtonProps = {
  originalText: string;
  currentText: string;
  onClick: () => void;
  label?: string;
  className?: string;
};

const TextWatchButton: React.FC<TextWatchButtonProps> = ({
  originalText,
  currentText,
  onClick,
  label = '保存',
  className = '',
}) => {
  const isChanged = originalText !== currentText;
  return (
    <button
      onClick={onClick}
      disabled={!isChanged}
      className={`
				"bg-slate-600 flex-shrink-0 text-white font-bold text-sm px-4 py-2 rounded-full transition-colors
        ${
          isChanged
            ? 'bg-gray-700 text-white hover:bg-gray-900 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
        ${className}
      `}
    >
      <span>{label}</span>
    </button>
  );
};

export default TextWatchButton;
