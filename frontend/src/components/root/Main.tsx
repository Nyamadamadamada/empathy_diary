import { Router } from '~/components/router/Router';
// TODO: 後々認証が必要になったら使う
import { LoadingProvider } from '~/components/contexts/LoadingContext';
// import { AuthProvider } from '~/components/contexts/AuthContext';

function Main() {
  return (
    <main>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </main>
  );
}

export default Main;
