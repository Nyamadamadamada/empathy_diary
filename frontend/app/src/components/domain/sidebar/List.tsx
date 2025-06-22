import { UserDiary, useUserDiary } from '~/components/contexts/EntityContext';

type Props = {
  diaries: UserDiary[];
  handleLinkClick: (path: string) => {};
};

export default function SidebarList({ diaries, handleLinkClick }: Props) {
  const visibleEntries = diaries.slice(0, 3);
  const { userDiary } = useUserDiary();
  return (
    <div className="my-4">
      <p className="mb-2 pl-4 text-sm font-bold">日記の履歴</p>
      <ul className="space-y-2">
        {/* もしユーザーの日記が追加されたら表示 */}
        {userDiary.diary.id && (
          <li>
            <div
              onClick={() => {
                handleLinkClick(`/history/guest`);
                // 既読状態に更新（外でステート管理している場合）
                // markAsRead(entry.id);
              }}
              className="cursor-pointer p-2 pe-2 rounded-none lg:rounded-e-2xl text-start relative flex items-center justify-between text-sm ps-6 
          text-gray-900 hover:bg-gray-100"
            >
              <div>
                <div className="text-xs text-gray-400">{userDiary.diary.date}</div>
                <div className="text-sm max-w-[220px] truncate">{userDiary.diary.title}</div>
              </div>

              {/* 未読なら赤い丸を表示 */}
              {userDiary.diary.unRead && (
                <span className="w-2 h-2 rounded-full bg-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </div>
          </li>
        )}
        {visibleEntries.map((entry) => (
          <li key={entry.diary.id}>
            <div
              onClick={() => {
                handleLinkClick(`/history/${entry.diary.id}`);
                // 既読状態に更新（外でステート管理している場合）
                // markAsRead(entry.id);
              }}
              className="cursor-pointer p-2 pe-2 rounded-none lg:rounded-e-2xl text-start relative flex items-center justify-between text-sm ps-6 
          text-gray-900 hover:bg-gray-100"
            >
              <div>
                <div className="text-xs text-gray-400">{entry.diary.date}</div>
                <div className="text-sm max-w-[220px] truncate">{entry.diary.title}</div>
              </div>

              {/* 未読なら赤い丸を表示 */}
              {entry.diary.unRead && (
                <span className="w-2 h-2 rounded-full bg-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </div>
          </li>
        ))}

        {/* 「すべて表示する」リンク */}
        <li className="mt-8">
          <div
            onClick={() => {
              handleLinkClick('/history');
            }}
            className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-6 py-2"
          >
            <span>すべて表示する</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
