import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Day = ({ day }) => {
  return (
    <div className="relative py-3">
      <div>{day.day < 10 ? '0' + day.day : day.day}</div>
      <Link href={`/day/${day.day}`}>
        <a>
          {day.completed && (
            <div className="absolute top-4 left-0">
              <Image
                src={'/img/close.png'}
                alt="close"
                height="35"
                width="35"
                className="absolute  "
              />
            </div>
          )}
        </a>
      </Link>
    </div>
  );
};

export default Day;
