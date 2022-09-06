import '../styles/globals.css';
import React from 'react';
import { GlobalContextProvider } from '../components/GlobalStore';
import NavBar from '../components/header/NavBar';
import { useRouter } from 'next/router';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (

    <GlobalContextProvider>
      <Head>
        <title>Pokemon</title>
      </Head>
      <NavBar />
      {router.pathname !== '/' ? (
        <button
          className="rounded-full h-full w-1/4 mt-5 text-xl bg-slate-700"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
      ) : null}
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
