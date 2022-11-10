import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import Router from 'next/router';
import { ChangeEvent, useState } from 'react';
import InputForm from '../components/InputForm';
import InputFormPasswordGroup from '../components/InputFormPasswordGroup';
import PrimaryButton from '../components/PrimaryButton';
import Welcome from '../components/Welcome';
import { loginUser } from '../services/auth.service';

const Login = () => {
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      Router.push('/');
    },
  });

  const submitHadler = (e: any) => {
    e.preventDefault();
    mutation.mutate(loginValues as any);
  };
  return (
    <div className="max-w-[80%] w-[80%] m-auto items-center justify-center flex flex-col">
      <Welcome />
      <form
        onSubmit={submitHadler}
        className="w-[80%] lg:w-[50%] h-[60%] bg-neutral-800 items-start justify-start flex flex-col p-5 gap-4"
      >
        <InputForm
          label="Username"
          name="username"
          errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
          pattern="^[A-Za-z0-9]{3,16}$"
          required={true}
          onChange={onchangeHandler}
        />
        <InputFormPasswordGroup
          required={true}
          name="password"
          label="Password"
          setShowHidePassword={setShowHidePassword}
          showHidePassword={showHidePassword}
          errorMessage="Password cannot be empty!"
          pattern="^[A-Za-z0-9]{1,900000}$"
          onChange={onchangeHandler}
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
