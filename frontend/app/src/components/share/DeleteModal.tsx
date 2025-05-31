import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

type DeleteModalProps = {
  deleteContents: string;
  handleDelete: () => void;
  showConfirmModal: boolean;
  handleCloseModal: () => void;
  description?: ReactNode;
};

const DeleteModal = ({
  deleteContents,
  handleDelete,
  showConfirmModal,
  handleCloseModal,
  description,
}: DeleteModalProps) => {
  return (
    <Dialog
      open={showConfirmModal}
      onClose={handleCloseModal}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-80 shadow-xl">
        <Dialog.Title className="text-lg font-semibold mb-2">削除の確認</Dialog.Title>
        <Dialog.Description className="text-sm text-gray-600 mb-4">
          本当に{deleteContents}を削除しますか？
          {description}
        </Dialog.Description>
        <div className="flex justify-end gap-2">
          <button onClick={handleCloseModal} className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300">
            キャンセル
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
          >
            削除する
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DeleteModal;
