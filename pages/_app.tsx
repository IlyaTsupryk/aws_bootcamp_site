// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect } from 'react';
import Header from './components/header';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <br />
      <hr />
      <Component {...pageProps} />
    </>
  );
}
