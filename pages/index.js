import React from 'react';
import Head from 'next/head'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import GridBackground from '../components/GridBackground';
import OurClients from '../components/OurClients';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import { useTheme } from '../components/ThemeContext';

// ✅ FIX: ProcessTimeline ko import kiya gaya
import ProcessTimeline from '../components/ProcessTimeline'; 

const DummyStyleFix = () => <div className="hidden bg-white bg-gray-900 text-black text-white border-gray-200 border-gray-700" />;

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      <Head>
        <title>Mohsin Arif | Block Chain and Security Audit</title>
        <meta name="description" content="Full-Stack Solana DApp Developer." />
        <link rel="icon" href="/mohsin-arif-photo.jpg" type="image/jpeg" sizes="32x32" />
      </Head>
      
      <Header />

      <div className="relative w-full overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <GridBackground />
        </div>

        <div className="relative z-10">
           <Hero />
        </div>

        <div className="relative z-20">
            <OurClients />
        </div>

      </div>
      
      <DummyStyleFix />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        
        {/* ✅ FIX: AuditingProcess ko ProcessTimeline se replace kiya */}
        <section id="auditing-process" className="py-16">
           <ProcessTimeline />
        </section>

        <hr className={`my-8 transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
        
        <section id="about-us" className="py-16">
          <AboutUs />
        </section>
        
        {/* TESTIMONIALS SECTION */}
        <section id="testimonials">
            <Testimonials />
        </section>
        
        <hr className={`my-8 transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
        
        <section id="contact" className="py-16">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}