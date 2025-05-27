import { Plus, LogOut, UserCircle, Settings } from 'lucide-react';
import { useLocation, matchPath } from 'react-router-dom';
import { AccountEntry } from '../../types/emotion';
import HeaderView from '../domain/header/HeaderView';

export default function Header({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return <HeaderView isSidebarOpen={isSidebarOpen} />;
}
