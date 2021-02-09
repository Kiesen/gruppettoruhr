import { useEffect, useState } from 'react';

const useScrollYPosition = (initialPosition = 0): number => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [position]);

  return position;
};

export { useScrollYPosition };
