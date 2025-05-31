import { Link } from 'react-router-dom';
import Step3 from '../domain/chat/Step3';

function Home() {
  return (
    <div className="min-h-screen flex items-center  flex-col  px-4">
      <div className="flex flex-col items-center justify-center w-full mt-20 mb-20 ">
        <div className="flex flex-col items-center ">
          <div className="w-20 h-20 bg-white relative group overflow-hidden">
            {/* 通常の画像 */}
            <img
              src="/img/mofu/mofu_nomal.png"
              alt="キャラアイコン"
              className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            />
            {/* ホバー時に表示する画像 */}
            <img
              src="/img/mofu/mofu_smile.png"
              alt="キャラアイコン（ホバー）"
              className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </div>
          <div className="zenMaru-bold text-center text-yellow-600 text-sm mt-2 relative">モフ</div>
        </div>
        <span className="text-3xl zenMaru-regular mt-10">こんにちは、〜〜さん</span>
      </div>
      <div className="text-center mt-16">
        <Link
          to="/chat/step"
          className="font-bold text-lg px-6 py-4 rounded-full bg-gray-500 text-white hover:bg-gray-900 cursor-pointer transition duration-300"
        >
          日記を作成する
        </Link>
      </div>
    </div>
  );
}

export default Home;
