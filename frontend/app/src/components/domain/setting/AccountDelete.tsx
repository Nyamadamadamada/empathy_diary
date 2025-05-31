import { Dialog } from '@headlessui/react';
import { Loader, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useLoading } from '~/components/contexts/LoadingContext';
type Props = {
  handleDeleteAccount: () => {};
};
const AccountDelete = ({ handleDeleteAccount }: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    handleDeleteAccount();
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="w-full">
      <p className="font-semibold">アカウントを削除</p>
      <p className="text-sm text-gray-600">
        日記データおよびアカウント情報のすべてが削除されます。
        <br />
        アカウントを削除すると、ログインおよびデータの参照ができなくなります。
      </p>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="w-full sm:w-1/2 my-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-red-700 font-semibold rounded-lg"
      >
        アカウントを削除
      </button>
      <DeleteModal
        handleDelete={handleDelete}
        showConfirmModal={showConfirmModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default AccountDelete;

type DeleteModalProps = {
  handleDelete: () => void;
  showConfirmModal: boolean;
  handleCloseModal: () => void;
};

const DeleteModal = ({ handleDelete, showConfirmModal, handleCloseModal }: DeleteModalProps) => {
  const { isLoading } = useLoading();

  return (
    <Dialog
      open={showConfirmModal}
      onClose={handleCloseModal}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-96 shadow-2xl border border-red-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <TriangleAlert className="w-6 h-6" />
          </div>
          <Dialog.Title className="text-lg font-bold text-red-600">アカウント削除の確認</Dialog.Title>
        </div>
        <Dialog.Description className="text-sm text-gray-700 mb-4">
          <p className="font-semibold text-red-700 ">この操作は取り消せません。</p>
          本当に<b>アカウント</b>を削除しますか？
          <div className=" mt-4 text-sm">
            一度削除すると、これまでのデータには<b className=" text-red-700">アクセスできなくなります</b>
            <br />
            また、<b className=" text-red-700">復元する手段はありません</b>
          </div>
        </Dialog.Description>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-sm bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {isLoading ? '削除中...' : '完全に削除する'}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
