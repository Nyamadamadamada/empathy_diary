import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, Settings, Plus, Heart } from 'lucide-react';

import SidebarList from '~/components/domain/sidebar/List';

export default function SidebarContents({ diaries, isSidebarOpen, setIsSidebarOpen, handleLinkClick }) {
  return (
    <>
      <div
        className={`z-50 fixed md:relative top-0 left-0 h-full bg-gray-50 text-gray-800 transition-all duration-300 ease-in-out py-4
          ${isSidebarOpen ? 'w-[90vw] md:w-64' : 'w-0 md:w-[72px]'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarOpen ? 'shadow-lg md:shadow-none' : ''}
        `}
        style={{ boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="group fixed top-4 left-4 z-50 md:relative md:top-0 md:left-0 md:pl-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-gray-200 text-gray-700 relative"
          >
            <MenuIcon />
          </button>
          <div className="z-50 absolute left-12 top-1/2 -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            {isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
          </div>
        </div>

        <div className="pt-20 flex flex-col justify-between h-[calc(100%-60px)] w-full">
          <div className="flex flex-col pr-4 h-full w-full">
            <div className="flex pl-4">
              <div
                onClick={() => {
                  handleLinkClick('/chat/step');
                }}
                className={`group relative flex items-center gap-2 p-2 mb-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200 cursor-pointer ${isSidebarOpen ? 'md:flex' : 'hidden md:flex'}`}
              >
                <Plus className="w-5 h-5" />
                <span
                  className={`text-sm transition-all duration-300 overflow-hidden whitespace-nowrap pr-2
                    ${isSidebarOpen ? 'opacity-100 max-w-xs ml-1 pr-4 py-1 inline-block' : 'opacity-0 max-w-0 ml-0 hidden'}`}
                >
                  日記を新規作成
                </span>
                {!isSidebarOpen && (
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    日記を新規作成
                  </div>
                )}
              </div>
            </div>

            <div className={`${isSidebarOpen ? 'opacity-100 duration-1000' : 'opacity-0'}`}>
              {isSidebarOpen && <SidebarList diaries={diaries} handleLinkClick={handleLinkClick} />}
            </div>

            <div
              className={`flex flex-col mt-8 px-4 w-full transition-opacity
                ${isSidebarOpen ? 'opacity-100 duration-1000' : 'opacity-0 pointer-events-none duration-0'}`}
            >
              <div
                onClick={() => {
                  handleLinkClick('/analysis');
                }}
                className="flex py-4 px-2 flex-col items-center justify-center bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors duration-200 cursor-pointer"
              >
                <Heart className="w-8 h-8" />
                <span className="text-3lg mt-1">感情メタ分析</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-4">
            <div className="w-full">
              <div
                onClick={() => {
                  handleLinkClick('/setting');
                }}
                className={`relative group flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition-colors duration-200 text-gray-700 cursor-pointer ${isSidebarOpen ? 'md:flex' : 'hidden md:flex'}`}
              >
                <Settings className="w-5 h-5" />
                <span className={`text-sm ${isSidebarOpen ? 'md:flex' : 'hidden'}`}>設定</span>
                {!isSidebarOpen && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    設定
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-30 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}
