import { useState } from 'react';

const login = () => {
  const [showHidePassword, setShowHidePassword] = useState(true);
  return (
    <div className="max-w-[80%] w-[80%] m-auto items-center justify-center flex flex-col">
      <div className="flex w-full items-center justify-center h-40">
        <p className="font-bold text-2xl text-slate-50">
          Wellcome to Happy Quiz
        </p>
      </div>

      <div className="w-[80%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4">
        <div className="w-full">
          <label htmlFor="" className="form-label inline-block mb-2 text-white">
            Username
          </label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="username"
          />
        </div>

        <div className="w-full">
          <label htmlFor="" className="form-label inline-block mb-2 text-white">
            Password
          </label>
          <div className="flex">
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded-l-md transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none"
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
      </div>
    </div>
  );
};

export default login;
