import { Router } from '~/components/router/Router';
// TODO: 後々認証が必要になったら使う
import { UserProvider } from '~/components/contexts/UserContext';
import { UserDiaryProvider } from '../contexts/EntityContext';

function Main() {
  return (
    <main>
      <UserProvider>
        <UserDiaryProvider>
          <Router />
        </UserDiaryProvider>
      </UserProvider>
    </main>
  );
}

export default Main;
