import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import {
  Provider as AuthProvider,
  getSession,
  Session,
} from 'next-auth/client';

import toastContainerProps from '@src/config/toastify';
import queryClient from '@src/config/queryClient';

import 'tailwindcss/tailwind.css';
import '@src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

type ExtendedAppProps = AppProps & {
  session: Session;
};

export const getServerSideProps = async (
  context: NextPageContext
): Promise<{ props: { session: Session } }> => {
  const session = await getSession(context);
  return { props: { session } };
};

const App: FC<ExtendedAppProps> = ({
  Component,
  session,
  pageProps,
}) => {
  return (
    <AuthProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className="animate-fadeInFast">
          <Component {...pageProps} />
          <ToastContainer {...toastContainerProps} />
        </main>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
