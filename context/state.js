import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db, signup } from '../firebase';

const UserStateContext = createContext();

export function UserProvider({ children }) {
  const auth = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = () => {
      if (auth?.uid) {
        const docRef = doc(db, 'users', auth.uid);
        onSnapshot(docRef, (doc) => {
          setUser({
            name: doc.data().name,
            currentDay: doc.data().currentDay,
            uid: auth.uid,
            calendar: doc.data().calendar,
          });
        });

        const q = query(
          collection(db, 'users', auth.uid, 'calendar'),
          orderBy('day', 'asc')
        );

        onSnapshot(q, (col) => {
          const days = [];
          col.forEach((doc) => {
            days.push(doc.data());
          });
          setUser((prevState) => {
            return { ...prevState, calendar: days };
          });
        });
      }
    };
    return getUser();
  }, [auth]);
  return (
    <UserStateContext.Provider value={user}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserStateContext);
}

// I GOT THIS FROM:
// https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/
