import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useSession, getSession, Session } from 'next-auth/client';

import Section from '@src/components/Section';
import Header from '@src/components/Header';
import content from '@src/static/content.json';
import {
  transparentActionButtonClasses,
  // hoverScale,
} from '@src/styles/buttons';
import Unauthorized from '@src/components/Unauthorized';

type HomeProps = {
  content: typeof content;
  session?: Session;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{
  props: HomeProps;
}> => {
  let session = undefined;
  try {
    session = await getSession(context);
  } catch (error) {
    console.error(error);
  }
  return {
    props: { session, content },
  };
};

const Redesign: FC<HomeProps> = ({ content }) => {
  const [session, sessionLoading] = useSession();

  return (
    <>
      <Head>
        <title>Gruppettoruhr - Redesign</title>
      </Head>

      {!sessionLoading && !session && (
        <Unauthorized classes="h-screen" />
      )}

      {!sessionLoading && session && (
        <>
          <Header />

          <Section
            backgroundImagePath="/images/gruppettoruhr.jpg"
            useWindowSize={true}
          />
          <Section
            heading="Rides"
            id="rides"
            backgroundColor="bg-green-50"
          >
            <p
              className="max-w-lg mb-8 mx-auto font-light text-center text-lg"
              dangerouslySetInnerHTML={{
                __html: content.rides.intro,
              }}
            />
            {content.rides.content && (
              <div className="mb-8 grid grid-cols-1 divide-y md:grid-cols-3 divide-gray-300 md:divide-y-0 md:divide-x">
                {content.rides.content.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="py-6 flex flex-col items-center"
                  >
                    <span className="text-xl uppercase">
                      {appointment.date}
                    </span>
                    <h3 className="text-2xl font-semibold uppercase">
                      {appointment.title}
                    </h3>
                    <div className="pt-6">
                      {appointment.groups.map((group, i) => (
                        <div key={i} className="text-center pb-4">
                          <h4 className="font-light text-lg">
                            {group.title}
                          </h4>
                          <p className="font-semibold">
                            {group.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {content.rides.action && (
              <div className="w-full flex justify-center">
                <a
                  className={`max-w-xs uppercase ${transparentActionButtonClasses}`}
                  href={content.rides.action.href}
                >
                  {content.rides.action.title}
                </a>
              </div>
            )}
          </Section>

          <Section heading="Events" id="events">
            <p
              className="mb-8 max-w-lg mx-auto text-center text-lg"
              dangerouslySetInnerHTML={{
                __html: content.events.intro,
              }}
            />
            {content.events.action && (
              <div className="w-full flex justify-center">
                <a
                  className={`max-w-xs uppercase border-orange text-orange ${transparentActionButtonClasses} `}
                  href={content.events.action.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.events.action.title}
                </a>
              </div>
            )}
          </Section>

          <Section
            heading="Routen"
            id="routes"
            backgroundColor="bg-indigo-50"
          >
            <p
              className="max-w-lg mx-auto text-center text-lg"
              dangerouslySetInnerHTML={{
                __html: content.routes.intro,
              }}
            />
            {content.routes.content && (
              <div className="mb-8 flex flex-col flex-grow">
                {content.routes.content.map((route, i) => (
                  <>
                    {i % 2 === 0 && (
                      <div
                        key={route.title}
                        className="flex justify-between p-10"
                      >
                        <div className="flex justify-center items-center w-full p-10">
                          <div className="text-3xl font-bold">
                            Placeholder
                          </div>
                        </div>
                        <div className="w-full p-10">
                          <h3 className="text-center text-xl font-bold p-6">
                            {route.title}
                          </h3>
                          <div className="text-center">
                            {route.description}
                          </div>
                        </div>
                      </div>
                    )}

                    {i % 2 !== 0 && (
                      <div
                        key={route.title}
                        className="flex justify-between"
                      >
                        <div className="w-full p-10">
                          <h3 className="text-center text-xl font-bold p-6">
                            {route.title}
                          </h3>
                          <div className="text-center">
                            {route.description}
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-full p-10">
                          <div className="text-3xl font-bold">
                            Placeholder
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          </Section>
        </>
      )}
    </>
  );
};

export default Redesign;
