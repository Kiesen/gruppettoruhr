import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';

import Nav from '@src/components/Nav';

import 'tailwindcss/tailwind.css';
import '@src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <div className="animate-fadeInFast">
        <Nav />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
};

export default App;
