import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { FC, SyntheticEvent, useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/client';

import { ErrorAlert } from '@components/Alerts';
import {
  primaryActionButtonClasses,
  secondaryActionButtonClasses,
} from '@src/styles/buttons';

type LoginProps = {
  csrfToken: string;
  callbackUrl: string;
  remoteError: boolean;
};

type LoginState = {
  username: string;
  password: string;
  errorMessage: string;
  error: boolean;
};

export const getServerSideProps = async (
  context: NextPageContext
): Promise<{ props: LoginProps }> => {
  const csrfToken = await getCsrfToken(context);
  const { from, error } = context.query;
  return {
    props: {
      csrfToken,
      callbackUrl: typeof from === 'string' ? from : '/',
      remoteError: typeof error === 'string' ? true : false,
    },
  };
};

const Login: FC<LoginProps> = ({
  csrfToken,
  callbackUrl,
  remoteError,
}) => {
  const [state, setState] = useState<LoginState>({
    username: '',
    password: '',
    errorMessage: 'Username or password are invalid',
    error: remoteError,
  });

  console.log(callbackUrl);

  const onChangeField = (
    event: SyntheticEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    event.currentTarget.name;
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const loginHandler = async (
    event: SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    if (state.username.length > 0 && state.password.length > 0) {
      await signIn('credentials', {
        username: state.username,
        password: state.password,
        callbackUrl: `${window.origin}${callbackUrl}`,
      });
    } else {
      setState({
        ...state,
        errorMessage: 'Username and password are required fields',
        error: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Login</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        <div className="h-screen container mx-auto flex items-center justify-center">
          <form
            className="
              border 
              rounded-xl
              bg-white  
              w-80 
              px-4 
              flex 
              flex-col 
              items-center 
              justify-between"
          >
            <h1 className="w-full py-8 text-center text-2xl font-bold">
              Login
            </h1>
            {state.error && (
              <ErrorAlert message={state.errorMessage} />
            )}
            <div className="w-full py-2 flex flex-col">
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
              />
              <label className="block py-1 text-base font-light subpixel-antialiased">
                Username
                <input
                  name="username"
                  type="text"
                  className="w-full px-2 py-1 block border rounded-md focus:outline-none"
                  onChange={onChangeField}
                />
              </label>
              <label className="block py-1 text-base font-light subpixel-antialiased">
                Password
                <input
                  name="password"
                  type="password"
                  className="w-full px-2 py-1 block border rounded-md focus:outline-none"
                  onChange={onChangeField}
                />
              </label>
            </div>
            <div className="w-full py-8 flex flex-col items-center">
              <button
                className={`mb-2 ${primaryActionButtonClasses}`}
                onClick={loginHandler}
              >
                Login
              </button>
              <Link href="/">
                <a className={`${secondaryActionButtonClasses}`}>
                  Home
                </a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
