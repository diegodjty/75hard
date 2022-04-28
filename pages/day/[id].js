import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useUserContext } from '../../context/state';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';

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
            <Image src={day?.img} height={300} width={300} alt="img" />
          </div>
        )}
        <div className="text-white font-dancingScript">Apr 4th 2022</div>
        <div className="text-white font-dancingScript">{day?.lbs} lbs</div>
      </div>
    </div>
  );
};

export default Day;
