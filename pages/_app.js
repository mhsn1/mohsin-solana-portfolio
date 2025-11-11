// /pages/_app.js (Final Code)

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Yeh 'key' Tailwind compilation ko force kar sakta hai.
  return <Component {...pageProps} key="app-root-fix" />; 
}

export default MyApp;