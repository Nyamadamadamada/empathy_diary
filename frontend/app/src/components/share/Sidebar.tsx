import { useState } from 'react';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';

import { useDiaries } from '~/hooks/useDiaries';
import SidebarContents from '~/components/domain/sidebar/Contents';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { diaries, loading, error } = useDiaries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLinkClick = (path: string) => {
    // 遷移時タブレットならバーと閉じる
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    navigate(path);
  };

  return (
    <SidebarContents
      diaries={diaries}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      handleLinkClick={handleLinkClick}
    />
  );
}
