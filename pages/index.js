import Head from 'next/head';
import Image from 'next/image';
import { db, signup } from '../firebase';
import Header from '../components/Header';
import CheckList from '../components/CheckList';
import { useAuth } from '../firebase';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/state';
export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  const user = useUserContext();

  useEffect(() => {
    if (auth == 'not loged in' || '') {
      router.push('/login');
    }
  }, [auth, router]);

  return (
    <div className="bg-main h-screen w-screen max-w-sm m-auto">
      <Header
        user={user}
        title={'75 Hard'}
        main={true}
        route={'/calendar'}
        page={'Calendar'}
      />
      <CheckList user={user} />
    </div>
  );
}
