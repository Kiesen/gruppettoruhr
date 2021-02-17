import { FC } from 'react';

import {
  backgroundImage as backgroundImageStyle,
  sizeContent as sizeContentStyle,
  sizeWindow as sizeWindowStyle,
} from '@src/styles/section';

type SectionProps = {
  heading?: string;
  backgroundColor?: string;
  backgroundImagePath?: string;
  useWindowSize?: boolean;
};

/**
 * This component acts as an wrapper for html sections. One important
 * note is that whenever an background image is passed as prop, the
 * background color is not used.
 */
const Section: FC<SectionProps> = ({
  children,
  heading,
  backgroundColor,
  backgroundImagePath,
  useWindowSize,
}) => (
  <section
    className={`${
      useWindowSize ? sizeWindowStyle : sizeContentStyle
    } ${
      backgroundImagePath ? backgroundImageStyle : backgroundColor
    }`}
    style={
      backgroundImagePath
        ? {
            backgroundImage: `url(${backgroundImagePath})`,
          }
        : null
    }
  >
    {heading && (
      <h2 className="w-full mb-6 text-center text-3xl font-semibold uppercase">
        {heading}
      </h2>
    )}
    {children}
  </section>
);

export default Section;
