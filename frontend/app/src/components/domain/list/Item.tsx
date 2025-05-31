import { useState } from 'react';
import { Pencil, Trash2, Smile, Frown, Meh, MoreHorizontal, Copy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import DeleteModal from '~/components/share/DeleteModal';

const moodIcons = {
  happy: <Smile className="text-yellow-400 w-8 h-8 cursor-pointer" />,
  sad: <Frown className="text-blue-400 w-8 h-8 cursor-pointer" />,
  meh: <Meh className="text-gray-400 w-8 h-8 cursor-pointer" />,
};

export function DiaryItem({ entry, onTagClick, onMoodClick, handleDelete, handleCopy }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/history/${entry.id}/edit`);
  };

  const handleDeleteChilde = () => {
    handleDelete(entry.id); // 親から渡された削除処理
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="relative">
      <Link
        to={`/history/${entry.id}`}
        className="flex items-start gap-4 p-4 border rounded-2xl shadow hover:shadow-xl transition"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMoodClick(entry.mood);
          }}
          title={`気分: ${entry.mood}`}
        >
          {moodIcons[entry.mood]}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{entry.title}</h2>
              <p className="text-sm text-gray-500">{entry.date}</p>
            </div>

            {/* 3点ドット */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 p-2 w-52  bg-white border shadow-lg rounded-xl z-10">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <Pencil className="w-4 h-4" />
                    編集する
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCopy();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    内容をコピーする
                  </button>

                  <hr className="mt-2" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setShowMenu(false);
                      setShowConfirmModal(true);
                    }}
                    className="flex mt-2 items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                    削除する
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-2 text-gray-700 text-sm truncate">{entry.content}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
            {entry.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onTagClick(tag);
                }}
              >
                <span className="text-gray-400">#</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* 削除確認モーダル */}
      <DeleteModal
        deleteContents={`『${entry.title}』`}
        handleDelete={handleDeleteChilde}
        showConfirmModal={showConfirmModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
