import Image from 'next/image';
import { useState } from 'react';

const Login = () => {
  const [showHidePassword, setShowHidePassword] = useState(true);
  return (
    <div className="max-w-[80%] w-[80%] m-auto items-center justify-center flex flex-col">
      <Image
        src="/assets/images/welcome.webp"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <div className="flex w-full items-center justify-center h-20">
        <p className="font-bold text-2xl text-slate-50">To Happy Quiz</p>
      </div>

      <div className="w-[80%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4">
        <div className="w-full">
          <label htmlFor="" className="form-label inline-block mb-2 text-white">
            Username
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:outline-none"
            placeholder="username"
          />
        </div>

        <div className="w-full">
          <label htmlFor="" className="form-label inline-block mb-2 text-white">
            Password
          </label>
          <div className="flex">
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded-l-md transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:outline-none"
              placeholder="password"
              type={showHidePassword ? 'password' : 'text'}
            />
            <p
              className="form-control block px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding rounded-r-md hover:cursor-pointer"
              onClick={() => setShowHidePassword((preval) => !preval)}
            >
              {showHidePassword ? 'show' : 'hide'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-5">
          <button
            type="button"
            className="w-full md:w-[50%] inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
