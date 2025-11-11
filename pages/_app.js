// /pages/_app.js

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Yahan hum CSS file ko saare components par apply kar rahe hain
  return <Component {...pageProps} />;
}

export default MyApp;