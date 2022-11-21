import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { CurrentUserResponse } from '../models/user.model';

const Navbar: NextPage<{ userData: CurrentUserResponse }> = ({ userData }) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const openMenuHandler = () => setOpenMenu((prev) => !prev);
  const logoutUser = () => {
    return axios.post('/api/auth/logout');
  };
  const mutation = useMutation(logoutUser, {
    onSuccess: () => {
      router.push('/login');
    },
  });
  return (
    <div className="m-auto md:max-w-[80%] lg:max-w-[60%] bg-neutral-800 w-[100%] max-h-14 h-14 rounded-md flex items-center justify-between px-2">
      <div>
        <p className="text-gray-300 hover:text-white">
          <Link href="/">
            <b>Happy Quizy</b>
          </Link>
        </p>
      </div>
      <div className="hidden md:flex gap-10">
        {/* <p className="text-gray-400 hover:text-white">
          <Link href="/dashboard">Dashboard</Link>
        </p> */}
        <p className="text-gray-400 hover:text-white">
          <Link href="/quiz">Quiz</Link>
        </p>
        <p className="text-gray-400 hover:text-white">
          <Link href="/users">Users</Link>
        </p>
        <div className="text-gray-400 hover:text-white cursor-pointer">
          {!userData?.data?.displayName ? (
            <Link href="/login">Login</Link>
          ) : (
            <p onClick={() => mutation.mutate()}>
              Welcome <b>{userData.data.displayName}</b> /Logout
            </p>
          )}
        </div>
      </div>
      <div className="cursor-pointer relative md:hidden">
        {openMenu ? (
          <HiOutlineXMark
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        ) : (
          <BiMenu
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={openMenuHandler}
          />
        )}

        <div
          className={`${
            openMenu ? 'flex' : 'hidden'
          } flex flex-col md:hidden gap-5 absolute right-8 top-0 bg-neutral-800 p-5 rounded-md`}
        >
          {/* <p className="text-gray-400 hover:text-white">
            <Link href="/dashboard">Dashboard</Link>
          </p> */}
          <p className="text-gray-400 hover:text-white">
            <Link href="/quiz">Quiz</Link>
          </p>
          <p className="text-gray-400 hover:text-white">
            <Link href="/users">Users</Link>
          </p>
          <div className="text-gray-400 hover:text-white">
            {!userData?.data?.displayName ? (
              <Link href="/login">Login</Link>
            ) : (
              <p onClick={() => mutation.mutate()}>
                Welcome <b>{userData.data.displayName}</b> /Logout
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
