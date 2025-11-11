// /pages/_app.js (New Code)

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Hum yahan ek 'key' daal rahe hain taake Next.js/Turbopack force ho jaye
  return <Component {...pageProps} key="app-root-load" />; 
}

export default MyApp;