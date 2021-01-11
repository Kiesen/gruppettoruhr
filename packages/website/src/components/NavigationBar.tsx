import { FC } from 'react';
import Link from 'next/link';

const NavigationBar: FC<{}> = () => (
  <nav className="w-full py-4 flex justify-between">
    <Link href="/">Gruppettoruhr</Link>

    <div className="grid grid-cols-2 gap-4">
      <Link href="/routes">Routes</Link>
      <Link href="/events">Events</Link>
    </div>
  </nav>
);

export default NavigationBar;
