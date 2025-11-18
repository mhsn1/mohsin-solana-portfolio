import Head from 'next/head'; // Head component ko import karna zaroori hai
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import History from '../components/History';
import Contact from '../components/Contact';

const DummyStyleFix = () => <div className="hidden bg-gray-900" />;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Head>
        {/* FIX 1: SEO Title aur Description (Search result mein dikhega) */}
        <title>Mohsin Arif | Elite Solana Engineer & Web3 Security Architect</title>
        <meta name="description" content="Full-Stack Solana DApp Developer specializing in Rust, Anchor, and Web3 Security Audits. Building robust, high-throughput systems on the Solana blockchain." />
        
        {/* FIX 2: Favicon (Browser Tab ka Logo) */}
        <link rel="icon" href="/mohsin-arif-photo.jpg" type="image/jpeg" sizes="32x32" />
        
        {/* FIX 3: Open Graph Tags (Jab aap link share karein) */}
        <meta property="og:title" content="Elite Solana DApp Developer | Mohsin Arif" />
        <meta property="og:description" content="Rust, Anchor, Next.js Expert. Architecting secure DeFi solutions." />
        <meta property="og:image" content="/mohsin-arif-photo.jpg" />
        <meta property="og:url" content="https://www.mhxmllc.com/" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <DummyStyleFix />
        
        <section id="expertise" className="py-16">
          <Expertise />
        </section>
        <hr className="border-gray-700 my-8" />
        <section id="history" className="py-16">
          <History />
        </section>
        <hr className="border-gray-700 my-8" />
        <section id="contact" className="py-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}