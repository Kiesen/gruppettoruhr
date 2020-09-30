import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
