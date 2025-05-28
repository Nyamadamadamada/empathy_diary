import { Link } from 'react-router-dom';

function Terms() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="text-center hero-content text-3xl font-bold">
          <div>
            <h1>利用規約</h1>
            <div className="mt-20">
              <Link to="/" className="">
                Topページへ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;
