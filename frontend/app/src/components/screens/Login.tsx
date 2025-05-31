import React from 'react';
export default function Login() {
  return (
    <div className="h-screen flex flex-col items-center pt-10 bg-[#f2ede5] p-4">
      <p className="text-sm text-gray-700">PC、タブレットからもジャーナリングできる</p>
      <p className="text-[5.5rem] font-bold text-[#1e1c38] mb-4">muute</p>

      <div className="w-full max-w-mdp-6 rounded-2xl max-w-[480px]">
        <p className="text-sm text-gray-600 mb-4">
          このサービスは「
          <a href="https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2">
            第2回 AI Agent Hackathon with Google Cloud
          </a>
          」応募作品です。
          <br />
        </p>
        <p className="text-xs text-gray-500">
          ※プロジェクト提出期間を過ぎた2025年7月17日以降より、本サービスは使えなくなる可能性がございます。
        </p>
        <div className="mt-10 w-[360px] mx-auto">
          <button
            type="submit"
            className="w-full bg-[#1e1c38] text-white py-2 rounded-md hover:bg-[#2c2a50] transition"
          >
            ゲストログイン
          </button>
        </div>
      </div>
    </div>
  );
}
