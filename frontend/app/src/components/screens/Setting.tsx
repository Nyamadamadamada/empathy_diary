import { useState } from 'react';
import SettingView from '../domain/setting/SettingView';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '~/components/contexts/LoadingContext';
import { deleteAccount, putAccountIcon } from '~/lib/accounts';

function Setting() {
  const [selectedIcon, setSelectedIcon] = useState('/img/icons/icon1.png');
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const account = {
    id: 'accountID',
    nickname: 'nickname',
    icon_url: '/img/icons/icon1.png',
  };

  const handleSaveIcon = async (e) => {
    setSelectedIcon(e.target.value);
    setIsLoading(true);
    try {
      await putAccountIcon('accountID', e.target.value);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNickname = () => {
    alert(`ニックネームを保存しました。`);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteAccount('accountID');
      setIsLoading(false);
      navigate('/deleted-account');
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDiaries = () => {
    if (confirm('すべての日記データを削除しますか？')) {
      alert('日記データを削除しました。');
    }
  };

  return (
    <SettingView
      account={account}
      selectedIcon={selectedIcon}
      handleSaveIcon={handleSaveIcon}
      handleSaveNickname={handleSaveNickname}
      handleDeleteAccount={handleDeleteAccount}
      handleDeleteDiaries={handleDeleteDiaries}
      setSelectedIcon={setSelectedIcon}
    />
  );
}

export default Setting;
