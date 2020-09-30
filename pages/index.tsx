import React from "react";
import Head from "next/head";
import { Flex, Link, Heading } from "@chakra-ui/core";
import { FaStrava, FaInstagram } from "react-icons/fa";

const Home: React.FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Gruppettoruhr</title>
      </Head>

      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        w="100%"
      >
        <Heading as="h1" size="2xl">
          Gruppettoruhr
        </Heading>

        <Flex>
          <Link href="https://www.strava.com/clubs/gruppettoruhr" isExternal>
            <FaStrava size={40} />
          </Link>
          <Link href="https://www.instagram.com/gruppettoruhr/" isExternal>
            <FaInstagram size={40} />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
