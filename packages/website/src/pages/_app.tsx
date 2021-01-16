import { FC } from 'react';
import { AppProps } from 'next/app';

import Nav from '@src/components/Nav';
import 'tailwindcss/tailwind.css';
import '@src/styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="container mx-auto animate-fadeInFast">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
