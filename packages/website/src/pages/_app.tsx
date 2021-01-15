import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

import '@src/styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="animate-fadeInFast">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
