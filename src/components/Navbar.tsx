import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const openMenuHandler = () => setOpenMenu((prev) => !prev);
  return (
    <div className="m-auto max-w-[80%] lg:max-w-[60%] bg-neutral-800 w-[80%] max-h-14 h-14 rounded-md flex items-center justify-between px-2">
      <div>
        <p className="text-gray-400 hover:text-white">
          <Link href="/">Happy Quizy</Link>
        </p>
      </div>
      <div className="hidden md:flex gap-10">
        <p className="text-gray-400 hover:text-white">
          <Link href="/dashboard">Dashboard</Link>
        </p>
        <p className="text-gray-400 hover:text-white">
          <Link href="/quiz">Quiz</Link>
        </p>
        <p className="text-gray-400 hover:text-white">
          <Link href="/users">Users</Link>
        </p>
        <p className="text-gray-400 hover:text-white">
          <Link href="/login">Login/Logout</Link>
        </p>
      </div>
      <div className="cursor-pointer relative md:hidden">
        {openMenu ? (
          <XMarkIcon
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        ) : (
          <Bars3Icon
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        )}

        <div
          className={`${
            openMenu ? 'flex' : 'hidden'
          } flex flex-col md:hidden gap-5 absolute right-8 top-0 bg-neutral-800 p-5 rounded-md`}
        >
          <p className="text-gray-400 hover:text-white">
            <Link href="/dashboard">Dashboard</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/quiz">Quiz</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/users">Users</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/login">Login/Logout</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
