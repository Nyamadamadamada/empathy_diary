import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 grayscale px-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">アカウントを削除しました。</h1>
        <p className="text-base md:text-lg mb-12">
          このたびは「TODOタイトル」をご利用いただきありがとうございました。
          <br className="hidden md:block" />
          またのご利用をお待ちしております。
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition duration-300"
        >
          Topページへ戻る
        </Link>
      </div>
    </div>
  );
}

export default Page404;
