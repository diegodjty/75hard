import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useLocalStorage from '../hooks/useLocalStorage';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

const CheckList = ({ user }) => {
  const [challenges, setChallenges] = useLocalStorage('challenges', {
    water: false,
    outside_workout: false,
    inside_workout: false,
    read: false,
    diet: false,
    shower: false,
  });

  const [allChecked, setAllChecked] = useLocalStorage('allChecked', false);

  const handleChange = (e) => {
    if (e.target.checked) {
      setChallenges((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    } else {
      setChallenges((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('submit');
  };

  useEffect(() => {
    const checkChallenges = Object.values(challenges).every(
      (item) => item === true
    );

    if (checkChallenges) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [challenges, setAllChecked]);

  const addDate = async () => {
    for (let x = 1; x < 76; x++) {
      if (user[0]) {
        await setDoc(doc(db, 'users', user[0].uid, 'calendar', x.toString()), {
          img: '',
          lbs: '',
          completed: false,
          day: x,
        });
      }
    }
  };
  addDate();
  return (
    <div className="w-[90%] m-auto">
      <div className="text-white font-dancingScript my-5 text-2xl">
        {format(new Date(), 'MMM do yyyy')}
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="water"
              className="check-box"
              value={challenges.water}
              checked={challenges.water}
            />
            <label htmlFor="water" className="label">
              1 Galon of Water
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="diet"
              className="check-box "
              value={challenges.diet}
              checked={challenges.diet}
            />
            <label htmlFor="diet" className="label">
              Stick to Diet
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="shower"
              className="check-box "
              value={challenges.shower}
              checked={challenges.shower}
            />
            <label htmlFor="shower" className="label">
              5 Minute Cold Shower
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="outside_workout"
              className="check-box "
              value={challenges.outside_workout}
              checked={challenges.outside_workout}
            />
            <label htmlFor="outside_workout" className="label">
              45 Minutes Workout Outside
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="inside_workout"
              className="check-box "
              value={challenges.inside_workout}
              checked={challenges.inside_workout}
            />
            <label htmlFor="inside_workout" className="label">
              45 Minutes Workout Inside
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              onChange={handleChange}
              type="checkbox"
              name="read"
              className="check-box "
              value={challenges.read}
              checked={challenges.read}
            />
            <label htmlFor="read" className="label">
              Read 10 Pages
            </label>
          </div>
          {allChecked && (
            <input
              type="submit"
              value="Done"
              className="border-2 border-white m-auto text-white
            font-bold mt-16 w-[80%] h-[50px]"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckList;
