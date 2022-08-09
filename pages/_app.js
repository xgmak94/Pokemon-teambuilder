import '../styles/globals.css';
import React from 'react';
import { GlobalContextProvider } from '../components/GlobalStore';
import NavBar from '../components/header/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
