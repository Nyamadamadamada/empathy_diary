import { useEffect, useState } from 'react';

export default function EmotionAnalysisPage() {
  const color1 = '#f9c2ff';
  const color2 = '#ffeaa7';

  return (
    <div className="bg-white min-h-screen p-6 text-gray-800 w-full">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">感情分析</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">最近のあなたの色</h2>
        <div
          id="gradient"
          className="w-full h-80 rounded-xl shadow p-6 flex items-center justify-center text-white text-xl font-semibold"
          style={{
            backgroundImage: `linear-gradient(135deg,${color1}, ${color2}`,
          }}
        >
          <p className="mt-8">「安らぎ」と「陽気さ」が混じっています。</p>
        </div>
      </section>
    </div>
  );
}
