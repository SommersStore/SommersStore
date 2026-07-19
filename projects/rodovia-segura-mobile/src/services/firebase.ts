import Constants from 'expo-constants';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

declare const process:
  | {
      env?: Record<string, string | undefined>;
    }
  | undefined;

const runtimeEnv = typeof process === 'undefined' ? {} : process.env ?? {};
const expoExtra = (Constants.expoConfig?.extra ?? {}) as Record<string, string | undefined>;

const firebaseConfig = {
  apiKey: runtimeEnv.EXPO_PUBLIC_FIREBASE_API_KEY ?? expoExtra.firebaseApiKey,
  authDomain: runtimeEnv.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? expoExtra.firebaseAuthDomain,
  projectId: runtimeEnv.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? expoExtra.firebaseProjectId,
  storageBucket: runtimeEnv.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? expoExtra.firebaseStorageBucket,
  messagingSenderId:
    runtimeEnv.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? expoExtra.firebaseMessagingSenderId,
  appId: runtimeEnv.EXPO_PUBLIC_FIREBASE_APP_ID ?? expoExtra.firebaseAppId,
};

export const firebaseMode = Object.values(firebaseConfig).every(Boolean) ? 'firebase-ready' : 'demo-local';

function getOrCreateApp(): FirebaseApp {
  if (getApps().length) return getApp();
  return initializeApp(firebaseConfig);
}

export function getFirebaseServices() {
  if (firebaseMode !== 'firebase-ready') return null;
  const app = getOrCreateApp();
  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };
}
