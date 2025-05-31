import React, { useRef, useState } from 'react';

const EditSpace = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>(''); // 入力状態を保持

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col xl:flex-row-reverse w-full h-full gap-4">
      {/* テキスト入力欄 */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="honokaMaru border text-xl leading-[2.6] border-gray-300 rounded py-4 px-8 min-h-[100px] h-full focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
      >
        テキストのデモです。
      </div>
    </div>
  );
};

export default EditSpace;
