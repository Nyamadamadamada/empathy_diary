import { lazy, Suspense, useState, useMemo, createRef, RefObject, LazyExoticComponent } from 'react';
import { RouteObject, useRoutes, BrowserRouter, useLocation, useOutlet } from 'react-router-dom';
import { ScrollToTop } from '../share/ScrollToTop';
import Sidebar from '../share/Sidebar';
import Header from '../share/Header';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Loader } from 'lucide-react';
import Home from '../screens/Home';

// const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const ChatMessage = lazy(() => import('~/components/screens/Chat'));
const ListDiary = lazy(() => import('~/components/screens/List'));
const DiaryDetail = lazy(() => import('~/components/screens/DiaryDetail'));
const Setting = lazy(() => import('~/components/screens/Setting'));
const Analysis = lazy(() => import('~/components/screens/Analysis'));
const Privacy = lazy(() => import('~/components/screens/Privacy'));
const Terms = lazy(() => import('~/components/screens/Terms'));
const FirstSettings = lazy(() => import('~/components/screens/FirstSettings'));
const Complete = lazy(() => import('~/components/screens/Complete'));

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const location = useLocation();
  const outlet = useOutlet();
  // ルートごとの nodeRef 管理用
  const nodeRefs = useMemo(() => new Map<string, RefObject<HTMLDivElement>>(), []);

  if (!nodeRefs.has(location.pathname)) {
    nodeRefs.set(location.pathname, createRef());
  }

  const nodeRef = nodeRefs.get(location.pathname);
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {location.pathname !== '/chat' && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} />

        <div id="scrollable" className="flex-1 overflow-auto mt-14">
          <div className="flex items-center m-auto max-w-[696px] w-full">
            <SwitchTransition>
              <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} classNames="page">
                <div ref={nodeRef} className="w-full">
                  {outlet}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <InnerRouter />
    </BrowserRouter>
  );
};
const wrapSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<Loader className="animate-spin m-auto" />}>
    <Component />
  </Suspense>
);

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <Home />, // 通常読み込み
        },
        {
          path: '/history',
          element: wrapSuspense(ListDiary),
        },
        {
          path: '/history/:id',
          element: wrapSuspense(DiaryDetail),
        },
        {
          path: 'analysis',
          element: wrapSuspense(Analysis),
        },
        {
          path: 'setting',
          element: wrapSuspense(Setting),
        },
        {
          path: 'complete',
          element: wrapSuspense(Complete),
        },
        {
          path: '*',
          element: wrapSuspense(Page404Screen),
        },
      ],
    },
    {
      path: '/chat/step',
      element: wrapSuspense(ChatMessage),
    },
    {
      path: '/privacy',
      element: wrapSuspense(Privacy),
    },
    {
      path: '/terms',
      element: wrapSuspense(Terms),
    },
    {
      path: '/first-setting',
      element: wrapSuspense(FirstSettings),
    },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
};
