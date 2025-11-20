import { Analytics } from "@vercel/analytics/react";
import '../styles/globals.css';
import '../styles/BlogSlider.css';
// ✅ Theme Provider Import
import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    // ✅ Poori App ko ThemeProvider se wrap kiya
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;