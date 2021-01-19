import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav: FC<{}> = () => (
  <nav className="w-full mx-auto fixed bg-white border-b border-gray-100">
    <div className="container mx-auto">
      <Link href="/">
        <a className="flex">
          <Image
            src="/logos/gr-black.svg"
            alt="gruppettoruhr logo"
            width="50"
            height="50"
          />
        </a>
      </Link>
    </div>
  </nav>
);

export default Nav;
