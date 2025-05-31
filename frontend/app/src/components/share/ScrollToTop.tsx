import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollable = document.getElementById('scrollable');
    scrollable?.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
