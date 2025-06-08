import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DiaryEntry } from '../list/List';

interface DiaryEditProps {
  diary: DiaryEntry;
  editedContent: string;
  setEditedContent: (content: string) => void;
  handleCopy: () => void;
  handleSave: () => void;
}

export default function DiaryEdit({ diary, editedContent, setEditedContent, handleSave }: DiaryEditProps) {
  const [title, setTitle] = useState(diary.title);
  const [mainText, setMainText] = useState('');

  const textareaRef = useRef(null);
  const [tags, setTags] = useState<string[]>(['うれしかった', '楽しかった', '仕事']);
  const [inputValue, setInputValue] = useState<string>(''); // 入力状態を保持

  const handleAddTag = () => {
    if (!inputValue.trim()) return; // 空のタグは追加しない
    setTags((prevTags) => [...prevTags, inputValue.trim()]);
    setInputValue(''); // 入力フィールドをクリア
  };
  const handleInput = (e) => {
    const textarea = textareaRef.current;

    // 一旦高さをリセットしてから、scrollHeightに合わせて再設定
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    setMainText(e.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <div className="fixed z-30 top-0  duration-300 h-14 w-full shadow-sm px-10 py-3 flex items-center justify-between">
        <Link to={`/history/${diary.id}`} className="text-gray-600 hover:text-gray-800 relative group">
          <ChevronLeft className="w-5 h-5" />
          <span className="absolute w-[100px] left-6 top-1/2 -translate-y-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            日記一覧に戻る
          </span>
        </Link>

        <button
          onClick={handleSave}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-sm px-4 py-2 mx-2 sm:mx-4 transition-colors rounded-full"
        >
          日記を保存する
        </button>
      </div>
      <hr />
      {/* タグ表示・入力エリア */}
      <div className="w-full xl:w-[300px] border border-gray-300 rounded-md shadow-sm p-4 min-h-[100px] h-full flex flex-col items-center justify-start">
        <p className="my-4">タグ候補</p>
        <div className="flex flex-row xl:flex-col items-start gap-4 text-sm text-gray-500 mt-1 w-full">
          {tags.map((tag, idx) => (
            <div key={idx}>
              <span className="text-gray-400 mr-1">#</span>
              {tag}
            </div>
          ))}
        </div>
        <div className="w-full flex gap-2 mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="タグを追加..."
            className="border text-sm border-gray-300 rounded-md p-2 w-[100px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag();
              }
            }}
          />
          <button
            onClick={handleAddTag}
            className="bg-slate-600 text-white font-bold text-sm px-4 py-2 rounded-full transition-colors hover:bg-gray-900 cursor-pointer"
          >
            タグ追加
          </button>
        </div>
      </div>

      {/* 編集エリア */}
      <div className="mt-20 flex h-full mx-auto flex-col items-center justify-center px-4 sm:px-6 md:px-10">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力..."
          className="h-[82px] p-4 w-full font-bold text-2xl text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mb-2 resize-none"
          maxLength={70}
          rows={1}
          spellCheck={false}
        />
        <div className="w-full bg-white border border-gray-300 rounded-md shadow-sm p-4">
          <textarea
            defaultValue={diary.content}
            value={mainText}
            ref={textareaRef}
            onInput={handleInput}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="日記の内容を入力..."
            className="w-full min-h-[500px] text-base text-gray-900 font-sans leading-relaxed focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
