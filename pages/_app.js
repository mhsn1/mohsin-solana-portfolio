import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // FIX: Agar request '/sitemap.xml' ya '/sitemap.xml/' ke liye hai, 
  // toh koi component render mat karo (null return karo)
  if (router.pathname === '/sitemap.xml' || router.pathname === '/sitemap.xml/') {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;