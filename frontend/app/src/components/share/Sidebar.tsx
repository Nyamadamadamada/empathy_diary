import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarContents from '~/components/domain/sidebar/Contents';
import { exampleDiares } from '~/config/example_diares';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: Props) {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    // 遷移時タブレットならバーと閉じる
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    navigate(path);
  };

  return (
    <SidebarContents
      diaries={exampleDiares}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      handleLinkClick={handleLinkClick}
    />
  );
}
