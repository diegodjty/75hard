import React, { useRef, useState } from 'react';
import Title from '../components/ui/title';
import { login } from '../firebase';
import { useRouter } from 'next/router';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert('error');
    }
    setLoading(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen bg-main justify-center items-center">
      <Title />
      <form className="w-[70%] mt-10">
        <input
          id="email"
          type="email"
          className="input-field"
          placeholder="Email"
          ref={emailRef}
        />

        <input
          id="password"
          type="password"
          className="input-field"
          placeholder="Password"
          ref={passwordRef}
        />

        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-3 mt-10 bg-white border-2 rounded-md font-medium text-black uppercase focus:outline-none hover:shadow-none"
        >
          Login
        </button>
      </form>
    </div>
  );
}
