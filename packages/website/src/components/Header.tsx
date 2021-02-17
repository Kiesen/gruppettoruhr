import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { initial, scroll, scrollOffset } from '@src/styles/header';
import { useScrollYPosition } from '@src/hooks/scroll';

const Header: FC<{}> = () => {
  const scrollTransition = useScrollYPosition() > scrollOffset;

  return (
    <header
      className={`w-full mx-auto z-50 ${
        scrollTransition ? `${scroll}` : `${initial}`
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="h-full">
            <Image
              src={
                scrollTransition
                  ? '/logos/gr-clean.svg'
                  : '/logos/gr-clean-white.svg'
              }
              alt="gruppettoruhr logo"
              width={125}
              height={50}
            />
          </a>
        </Link>
        <div className="hidden md:grid grid-cols-3 gap-6 text-lg font-bold uppercase">
          <Link href="/">
            <a>Rides</a>
          </Link>
          <Link href="/">
            <a>Events</a>
          </Link>
          <Link href="/">
            <a>Routen</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
