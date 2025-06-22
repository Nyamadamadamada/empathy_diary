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
    <div className="flex justify-end">
      <div
        className="hidden md:block fixed z-30 top-0 bg-white transition-all duration-300 h-14 "
        style={{
          left: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <div className="justify-between items-center p-4">
          <Link to="/home" className="flex">
            <img className="w-[30px] pr-1" src="/img/logo.png" />
            <span className="zenMaru-bold text-lg">らくらく日記</span>
          </Link>
        </div>
      </div>
      <div className="md:hidden  fixed z-30 top-0 bg-white transition-all duration-300 h-14 ">
        <div className="justify-between items-center p-4">
          <Link to="/home" className="flex">
            <img className="w-[30px] pr-1" src="/img/logo.png" />
            <span className="zenMaru-bold text-lg">らくらく日記</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
