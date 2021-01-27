import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import {
  Provider as AuthProvider,
  getSession,
  Session,
} from 'next-auth/client';

import Nav from '@src/components/Nav';
import toastContainerProps from '@src/config/toastify';

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

const queryClient = new QueryClient();

const App: FC<ExtendedAppProps> = ({
  Component,
  session,
  pageProps,
}) => {
  return (
    <AuthProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="animate-fadeInFast">
          <Nav />
          <Component {...pageProps} />
          <ToastContainer {...toastContainerProps} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
