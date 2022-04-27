import React from 'react';
import { useUserContext } from '../context/state';
import Header from '../components/Header';
import Day from '../components/Day';

const Calendar = () => {
  const user = useUserContext();

  return (
    <div className="bg-main h-auto w-screen">
      <Header
        user={user}
        title={'Summary'}
        main={false}
        route={'/'}
        page={'Today'}
      />
      <div className="text-white font-dancingScript w-[90%] m-auto  grid grid-cols-7 text-4xl py-16">
        {user.calendar?.map((day) => (
          <Day key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
