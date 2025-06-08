import HomeView from '../domain/home/HomeView';
import { useUser } from '../contexts/UserContext';

function Home() {
  const { user } = useUser();
  return <HomeView user={user} />;
}

export default Home;
