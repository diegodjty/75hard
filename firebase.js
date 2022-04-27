import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'hard-b679c.firebaseapp.com',
  projectId: 'hard-b679c',
  storageBucket: 'hard-b679c.appspot.com',
  messagingSenderId: '747615517145',
  appId: '1:747615517145:web:27c049df6de07790c1c1c8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const db = getFirestore(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser('not loged in');
      }
    });

    return unsub;
  }, []);

  return currentUser;
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
