import { FC } from 'react';

import NavigationBar from '@src/components/NavigationBar';

const Routes: FC<{}> = () => (
  <>
    <NavigationBar />
    <div className="h-screen w-screen flex justify-center items-center">
      <h1 className="text-2xl">Our Routes</h1>
    </div>
  </>
);

export default Routes;
