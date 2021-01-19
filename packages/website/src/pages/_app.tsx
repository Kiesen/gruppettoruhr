import { FC } from 'react';
import { AppProps } from 'next/app';

import Nav from '@src/components/Nav';
import 'tailwindcss/tailwind.css';
import '@src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="animate-fadeInFast">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
