import { FC } from 'react';

import {
  backgroundImage as backgroundImageStyle,
  sizeContent as sizeContentStyle,
  sizeWindow as sizeWindowStyle,
} from '@src/styles/section';

type SectionProps = {
  id?: string;
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
  id,
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
    id={id}
  >
    <div className="container mx-auto">
      {heading && (
        <h2 className="w-full mb-6 text-center text-3xl font-semibold uppercase">
          {heading}
        </h2>
      )}
      {children}
    </div>
  </section>
);

export default Section;
