import React from 'react';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head key="version: 1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gappris</title>
      </Head>
      <Component {...pageProps} bg="gray.900" />
    </ChakraProvider>
  );
}

export default App;
