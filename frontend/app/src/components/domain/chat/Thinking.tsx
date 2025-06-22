function Thinking() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold ">処理中...</h1>
        {/* セリフセクション */}
        <div className="flex flex-col items-center">
          <img src="/img/mofu/loading.gif" alt="キャラアイコン" className="w-[200px]  h-full" />
        </div>
      </div>
    </div>
  );
}

export default Thinking;
