import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';

let firebaseApp: FirebaseApp;
// const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FIREBASE_APPID,
    });
  } catch (error) {
    console.error({ error });
  }
};

// export const useAuth = () => {
//   // 初期化前に実行しない
//   if (!getApps().length) {
//     return;
//   }
//   auth = getAuth();
//   auth.languageCode = 'ja';
//   // 初回だけ実行
//   useEffect(() => {
//     if (window.location.hostname === 'localhost' && useEmulator()) {
//       connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
//     }
//   }, []);

//   return auth;
// };
