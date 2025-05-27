import { Plus } from 'lucide-react';

const StepStart = ({ handleClick }) => {
  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="w-[160px] relative flex items-center gap-2 p-2 mb-4 rounded-full bg-gray-700 text-white  hover:bg-gray-500 cursor-pointer md:flex"
    >
      <Plus className="w-5 h-5 text-white" />
      <span className="text-sm overflow-hidden whitespace-nowrap  max-w-xs ml-1 pr-4 py-1 inline-block">
        日記を新規作成
      </span>
    </div>
  );
};

export default StepStart;
