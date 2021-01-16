import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav: FC<{}> = () => (
  <nav className="container w-full mx-auto py-4 fixed">
    <Link href="/">
      <a>
        <Image
          className="transition duration-300 ease-in-out transform hover:scale-110"
          src="/logos/gr-black.svg"
          alt="gruppettoruhr logo"
          width="50"
          height="50"
        />
      </a>
    </Link>
  </nav>
);

export default Nav;
