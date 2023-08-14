import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBthC5RAlNOS93SI13DZtzcvOMyYV83n0k',
  authDomain: 'reflex-47bad.firebaseapp.com',
  projectId: 'reflex-47bad',
  storageBucket: 'reflex-47bad.appspot.com',
  messagingSenderId: '388288361120',
  appId: '1:388288361120:web:83ea668d832d6b7bfd0fc5',
};
const apps = getApps();

console.log(apps, 'apps');

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
