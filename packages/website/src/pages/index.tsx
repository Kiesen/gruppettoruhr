import { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaStrava, FaInstagram } from 'react-icons/fa';

import KomootIcon from '@src/components/icons/KomootIcon';

const Home: FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Gruppettoruhr - Home</title>
      </Head>
      <main className="flex items-center justify-center flex-col h-screen">
        <div className="m-5">
          <Image
            src="/logos/name-claim-black.svg"
            alt="gruppettoruhr logo"
            width="300"
            height="80"
            layout="intrinsic"
          />
        </div>
        <span className="grid grid-cols-3 gap-6">
          <a
            href="https://www.instagram.com/gruppettoruhr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-7 w-7 transition duration-300 ease-in-out transform hover:scale-150" />
          </a>
          <a
            href="https://www.strava.com/clubs/gruppettoruhr-690171"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaStrava className="h-7 w-7 transition duration-300 ease-in-out transform hover:scale-150" />
          </a>
          <a
            href="https://www.komoot.de/user/1704741799149"
            target="_blank"
            rel="noopener noreferrer"
          >
            <KomootIcon className="h-7 w-7 transition duration-300 ease-in-out transform hover:scale-150" />
          </a>
        </span>
      </main>
    </>
  );
};

export default Home;
