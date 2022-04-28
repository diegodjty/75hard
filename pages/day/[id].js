import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useUserContext } from '../../context/state';
import { doc, getDoc, toDate } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';
import { format } from 'date-fns';

const Day = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const user = useUserContext();

  const [day, setDay] = useState(null);
  useEffect(() => {
    const getDay = async () => {
      if (user && id && db) {
        const docRef = doc(db, 'users', user.uid, 'calendar', id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDay(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };
    return getDay();
  }, [id, user]);
  return (
    <div className="bg-main h-screen w-screen">
      <Header
        user={user}
        title={`Day ${id}`}
        main={false}
        route={'/calendar'}
        page={'Go back'}
      />
      <div className="mt-16 w-[90%] m-auto flex flex-col justify-center items-center">
        {day?.img && (
          <div>
            <Image
              src={day?.img}
              width={300}
              height={400}
              alt="img"
              className="rounded-md"
            />
          </div>
        )}
        <div className="text-white font-dancingScript text-2xl">
          {day?.date.toDate().toDateString()}
        </div>
        <div className="text-white font-dancingScript text-2xl">
          {day?.lbs} lbs
        </div>
      </div>
    </div>
  );
};

export default Day;
