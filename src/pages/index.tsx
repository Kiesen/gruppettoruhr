import React from "react";
import Head from "next/head";
import { Flex, Link, Heading, Text, useTheme } from "@chakra-ui/core";
import { FaStrava, FaInstagram } from "react-icons/fa";

const Home: React.FC<{}> = () => {
  const theme = useTheme();
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

        <Flex p="20px">
          <Link href="https://www.strava.com/clubs/gruppettoruhr" isExternal>
            <FaStrava size={theme.fontSizes["4xl"]} />
          </Link>
          <Link href="https://www.instagram.com/gruppettoruhr/" isExternal>
            <FaInstagram size={theme.fontSizes["4xl"]} />
          </Link>
        </Flex>

        <Text>More content coming soon</Text>
      </Flex>
    </>
  );
};

export default Home;
