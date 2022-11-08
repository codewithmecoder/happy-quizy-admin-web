import Link from 'next/link';
import { useState } from 'react';
import InputForm from '../components/InputForm';
import InputFormPasswordGroup from '../components/InputFormPasswordGroup';
import PrimaryButton from '../components/PrimaryButton';
import Welcome from '../components/Welcome';

const Login = () => {
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [errorObject, setErrorObject] = useState({});

  const loginHandler = (e: any) => {
    console.log(e);
  };
  return (
    <div className="max-w-[80%] w-[80%] m-auto items-center justify-center flex flex-col">
      <Welcome />
      <form className="w-[80%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4">
        <InputForm label="Username" name="username" />
        <InputFormPasswordGroup
          name="password"
          label="Password"
          setShowHidePassword={setShowHidePassword}
          showHidePassword={showHidePassword}
        />
        <div className="flex items-center justify-center w-full mt-5">
          <PrimaryButton type="submit" text="Login" />
        </div>
      </form>
      <div className="flex items-center justify-center w-full mt-5">
        <p className="text-white">Don't have an account yet ?</p>
        <div className="w-3"></div>
        <Link href="/register">
          <span className="text-lg text-blue-700 font-bold">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
