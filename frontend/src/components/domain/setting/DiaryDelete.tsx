import DeleteModal from '~/components/share/DeleteModal';
import { useState } from 'react';

const DiaryDelete = ({ handleDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };
  return (
    <div>
      <p className="font-semibold">日記データを削除</p>
      <p className="text-sm text-gray-600">すべての日記データを削除します。アカウント情報は残ります。</p>
      <button
        onClick={() => {
          setShowConfirmModal(true);
        }}
        className="w-full sm:w-1/2 my-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-red-700 font-semibold rounded-lg"
      >
        日記データを削除
      </button>

      {/* 削除確認モーダル */}
      <DeleteModal
        deleteContents={`すべての日記データ`}
        handleDelete={handleDelete}
        showConfirmModal={showConfirmModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default DiaryDelete;
