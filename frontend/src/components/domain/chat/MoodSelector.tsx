import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const moods = [
  { color: '#C97B5B', label: 'ポジティブ' },
  { color: '#F3D268', label: 'ややポジティブ' },
  { color: '#D7E0A3', label: 'ふつう' },
  { color: '#6BA68F', label: 'ややネガティブ' },
  { color: '#5C80B9', label: 'ネガティブ' },
];

// 選択前の気分オプション（小さくてクリック可能）
const MoodOptionSelectable = ({ color, label, onClick }: { color: string; label?: string; onClick?: () => void }) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full transition-transform transform hover:scale-125"
      style={{ backgroundColor: color }}
      aria-label={label || 'mood'}
    />
    <span className="text-sm text-gray-600 mt-1">{label}</span>
  </div>
);

// 選択後の気分表示（大きくて固定）
const MoodOptionSelected = ({ color, label }: { color: string; label?: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 rounded-full shadow-lg" style={{ backgroundColor: color }} aria-label={label || 'mood'} />
    {label && <span className="text-base font-semibold text-gray-800 mt-4">{label}</span>}
  </div>
);

const MoodSelector = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = selectedIndex === null ? goodbyeRef : helloRef;

  const handleReset = () => setSelectedIndex(null);

  const renderMoodOptions = () => (
    <div className="flex justify-between items-center w-full px-6">
      {moods.map((mood, index) => (
        <MoodOptionSelectable
          key={index}
          color={mood.color}
          label={index === 0 || index === moods.length - 1 ? mood.label : ''}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );

  const renderSelectedMood = () => {
    const mood = moods[selectedIndex!];
    return <MoodOptionSelected color={mood.color} label={mood.label} />;
  };

  return (
    <div className="p-6 text-center mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        {selectedIndex === null ? '今はどんな気分ですか？' : '今のあなたの気分'}
      </h2>
      <SwitchTransition mode={'out-in'}>
        <CSSTransition
          key={selectedIndex}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener('transitionend', done, false);
          }}
          classNames="mood-fade"
        >
          <div ref={nodeRef} className="relative h-32 flex items-center justify-center mb-4">
            {selectedIndex === null ? renderMoodOptions() : renderSelectedMood()}
          </div>
        </CSSTransition>
      </SwitchTransition>

      {selectedIndex !== null && (
        <button onClick={handleReset} className="text-xs text-gray-500 underline transition-opacity duration-300">
          変更する
        </button>
      )}
    </div>
  );
};

export default MoodSelector;
