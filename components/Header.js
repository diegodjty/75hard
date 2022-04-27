import React from 'react';
import { logout } from '../firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
function Header({ user, title, main, route, page }) {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <div className="flex flex-col">
      <div className="text-white font-dancingScript text-xl flex w-[90%] m-auto justify-between pt-12 ">
        <div>Hi, {user && user.name}</div>
        <Link href={route}>{page}</Link>
        <div onClick={handleLogout}>Logout</div>
      </div>
      <div className=" w-[90%] m-auto">
        <div className="text-6xl font-dancingScript text-white mt-16 text-center">
          {title}
        </div>
        <div className="h-[2px] mt-4  w-[100%] before:content-[''] bg-white"></div>
      </div>
      {main && (
        <div className="w-[90%] text-center text-xl text-white mt-2">
          Day {user?.currentDay}
        </div>
      )}
    </div>
  );
}

export default Header;
