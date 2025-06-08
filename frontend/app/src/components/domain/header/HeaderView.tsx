import { Plus, LogOut, UserCircle, Settings } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, navigate, useNavigate } from 'react-router-dom';
import { AccountEntry } from '~/types/emotion';

export default function HeaderView({ isSidebarOpen }: { account: AccountEntry; isSidebarOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true;
  const cardRef = useRef<HTMLDivElement>(null);

  function closeCard() {
    setIsOpen(false);
  }

  function openCard() {
    setIsOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const sidebarWidth = isSidebarOpen ? 272 : 72;
  return (
    <div
      className="fixed z-30 top-0 bg-white transition-all duration-300 h-14"
      style={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
      }}
    >
      <div className="flex justify-between items-center p-4">
        <Link to="/home" className="flex">
          <img className="w-[30px] pr-1" src="/img/logo.png" />
          <span className="zenMaru-bold text-lg">らくらく日記</span>
        </Link>
      </div>

      {/* <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div ref={cardRef} className="fixed top-16 right-6 z-30 bg-white shadow-lg rounded-2xl border border-gray-100">
          <ProfileCard account={account} onClose={closeCard} />
        </div>
      </Transition> */}
    </div>
  );
}

// プロフィールカード
function ProfileCard({ account, onClose }: { account: AccountEntry; onClose: () => void }) {
  const navigate = useNavigate();
  const handleLinkClick = (to: string) => {
    onClose();
    navigate(to);
  };
  return (
    <div className="w-[440px] py-4 px-8 bg-white z-30">
      <div className="flex justify-end">
        <button className="text-gray-400 hover:text-gray-600 text-4xl" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-lg font-medium">{account.nickname}さん</p>
        <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">🐕</span>
        </div>
        <p className="mt-2 text-lg font-medium">{account.email}</p>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => handleLinkClick('/setting')}
          className="w-full flex items-center justify-start gap-2 px-4 py-2 border rounded hover:bg-gray-50"
        >
          <Settings className="w-4 h-4" />
          アカウントを編集
        </button>
        <button className="w-full flex items-center justify-start gap-2 px-4 py-2 border rounded hover:bg-gray-50">
          <LogOut className="w-4 h-4" /> ログアウト
        </button>
      </div>

      <div className="w-full flex justify-center mt-4 text-xs text-center gap-4">
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 ">
          プライバシーポリシー
        </a>
        <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 ">
          利用規約
        </a>
      </div>
    </div>
  );
}
