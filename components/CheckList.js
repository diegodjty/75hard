import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useLocalStorage from '../hooks/useLocalStorage';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  FieldValue,
  increment,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

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
  const [imgUrl, setImgUrl] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [weight, setWeight] = useState(0);
  const router = useRouter();

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

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (attachments.length == 0 || weight <= 0) {
      // use cloudinary to get a secured url for images
      alert('Set Weight and Image');
    } else {
      const formData = new FormData();
      formData.append('file', attachments);
      formData.append('upload_preset', 'myImages');
      const { NEXT_PUBLIC_CLOUD_NAME } = process.env;
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => r.json());

      await updateDoc(
        doc(db, 'users', user.uid, 'calendar', user.currentDay.toString()),
        {
          img: data.secure_url,
          lbs: weight,
          completed: true,
        }
      );

      await updateDoc(doc(db, 'users', user.uid), {
        currentDay: increment(1),
      });

      setChallenges({
        water: false,
        outside_workout: false,
        inside_workout: false,
        read: false,
        diet: false,
        shower: false,
      });
      setAttachments('');
      setWeight(0);
      setAllChecked(false);
      router.push('/calendar');
    }
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

  //FUNCTION TO ADD 75 DAYS TO DB
  // const addDate = async () => {
  //   for (let x = 1; x < 76; x++) {
  //     if (user) {
  //       await setDoc(doc(db, 'users', user.uid, 'calendar', x.toString()), {
  //         img: '',
  //         lbs: '',
  //         completed: false,
  //         day: x,
  //       });
  //     }
  //   }
  // };
  // addDate();
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
          <div className="flex items-end mb-4">
            <input
              onChange={handleWeight}
              type="number"
              name="weight"
              min={100}
              step=".1"
              className={
                'text-white font-bold font-dancingScript text-center bg-transparent border-2 border-white w-[60px] placeholder:font-dancingScript placeholder:text-white'
              }
              // value={challenges.read}
              placeholder="Ex: 150"
            />
            <label htmlFor="read" className="label">
              lbs
            </label>
          </div>
          <div className="flex items-end mb-4">
            <input
              type="file"
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:text-sm file:font-semibold file:bg-transparent file:text-white file:border-white"
              onChange={(event) => {
                setAttachments(event.target.files[0]);
              }}
            />
          </div>
          {allChecked && (
            <input
              type="submit"
              value="Done"
              className="border-2 border-white m-auto text-white
            font-bold  w-[80%] h-[50px]"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckList;
