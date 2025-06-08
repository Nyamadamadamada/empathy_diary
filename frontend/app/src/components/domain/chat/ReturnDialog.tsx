import { Dialog } from '@headlessui/react';

const ReturnDialog = ({ setShowReturnDialog, handleReturnTop }) => {
  return (
    <Dialog
      open={true}
      onClose={() => {
        setShowReturnDialog(false);
      }}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40"
    >
      <Dialog.Panel className="bg-white rounded-xl py-4 px-6 w-80 shadow-xl">
        <Dialog.Description className=" text-gray-800 my-4">
          作成した内容は保存されません。
          <br /> TOPページに戻りますか？
        </Dialog.Description>
        <div className="flex justify-between gap-2 mt-8">
          <button
            onClick={() => {
              setShowReturnDialog(false);
            }}
            className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={handleReturnTop}
            className="px-4 py-2 rounded-md text-sm bg-gray-600 text-white hover:bg-gray-800"
          >
            TOP画面に戻る
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ReturnDialog;
