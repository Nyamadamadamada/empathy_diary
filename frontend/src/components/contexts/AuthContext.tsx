// src/components/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, connectAuthEmulator, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { setupFirebase } from '~/lib/firebase';

const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

type AuthContextType = {
  auth: Auth | null;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ auth: null, user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setupFirebase();
    const authInstance = getAuth();
    authInstance.languageCode = 'ja';

    if (useEmulator()) {
      try {
        connectAuthEmulator(authInstance, 'http://127.0.0.1:9099');
      } catch (e) {
        console.warn('Auth emulator already connected or failed:', e);
      }
    }

    setAuth(authInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ auth, user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
