import React from 'react';
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '@src/styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
