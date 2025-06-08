import { Router } from '~/components/router/Router';
// TODO: 後々認証が必要になったら使う
import { LoadingProvider } from '~/components/contexts/LoadingContext';
import { UserProvider } from '~/components/contexts/UserContext';
import { UserDiaryProvider } from '../contexts/EntityContext';

function Main() {
  return (
    <main>
      <LoadingProvider>
        <UserProvider>
          <UserDiaryProvider>
            <Router />
          </UserDiaryProvider>
        </UserProvider>
      </LoadingProvider>
    </main>
  );
}

export default Main;
