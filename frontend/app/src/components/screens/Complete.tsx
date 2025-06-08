import { Link } from 'react-router-dom';

function Complete() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center ">
        <h1 className="text-2xl md:text-4xl font-bold">完了！</h1>
        <p className="text-gray-500 mt-4">「日記の履歴」にモフからのお手紙が届いているよ</p>
        {/* セリフセクション */}
        <div className="flex flex-col items-center">
          <img src="/img/mofu/complete.png" alt="キャラアイコン" className="w-40 h-full" />
        </div>
        <div className="mt-20  flex  flex-col items-center justify-center z-50 rounded-lg">
          <Link
            to="/history/guest"
            className="inline-block px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow hover:bg-gray-500 transition duration-300"
          >
            日記の履歴へ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Complete;
