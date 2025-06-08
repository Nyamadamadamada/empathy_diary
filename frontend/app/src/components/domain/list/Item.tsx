import { useState } from 'react';
import { Trash2, Meh, MoreHorizontal, Copy, Smile, Frown } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeleteModal from '~/components/share/DeleteModal';
import { DiaryEntry } from './List';

type Props = {
  entry: DiaryEntry;
  onMoodClick: (mood: string) => void;
  handleDelete: (diaryId: string) => void;
  handleCopy: (text: string) => void;
};

const moodIcons = {
  happy: <Smile className="text-yellow-400 w-8 h-8 cursor-pointer" />,
  meh: <Meh className="text-gray-400 w-8 h-8 cursor-pointer" />,
  frown: <Frown className="text-blue-300 w-8 h-8 cursor-pointer" />,
};

export function DiaryItem({ entry, onMoodClick, handleDelete, handleCopy }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteChilde = () => {
    handleDelete(entry.id);
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="relative">
      <Link
        to={`/history/${entry.id}`}
        className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 border rounded-2xl shadow hover:shadow-xl"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onMoodClick(entry.mood);
          }}
          title={`気分: ${entry.mood}`}
          className="shrink-0"
        >
          {moodIcons[entry.mood]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start w-full flex-wrap gap-2">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold break-words">{entry.title}</h2>
              <p className="text-xs sm:text-sm text-gray-500">{entry.date}</p>
            </div>

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
                <div className="absolute right-0 mt-2 p-2 w-44 sm:w-52 bg-white border shadow-lg rounded-xl z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCopy(entry.content);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    コピー
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
                    削除
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-gray-700 text-sm break-words line-clamp-2 sm:line-clamp-1 max-w-120 truncate">
            {entry.content}
          </p>
        </div>
      </Link>

      <DeleteModal
        deleteContents={`『${entry.title}』`}
        handleDelete={handleDeleteChilde}
        showConfirmModal={showConfirmModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
