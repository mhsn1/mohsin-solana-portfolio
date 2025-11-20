import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlackHoleBackground from '../../components/BlackHoleBackground';
import { useTheme } from '../../components/ThemeContext';

const TermsPage = () => {
  const { theme } = useTheme();

  // Dynamic Theme Classes
  const pageClass = theme === 'dark' ? 'bg-white-800 text-white' : 'bg-white text-black';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sectionBg = theme === 'dark' ? 'bg-white-800/60' : 'bg-white-50';
  const cardBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textBody = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${pageClass}`}>
      <Head>
        <title>Terms & Privacy | SecureChainX</title>
        <meta name="description" content="Terms of Service and Privacy Policy for SecureChainX's consulting and audit services." />
      </Head>
      
      {/* Background (Theme Aware) */}
      <div className="fixed inset-0 z-0">
         <BlackHoleBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16 flex-grow max-w-4xl">
          
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-extrabold mb-4 drop-shadow-xl ${headingColor}`}>
              Legal & Transparency
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${textBody}`}>
              Review our terms of service and how we handle data privacy.
            </p>
          </div>

          {/* --- TERMS OF SERVICE --- */}
          <section className={`p-8 rounded-xl border ${cardBorder} ${sectionBg} mb-10`}>
            <h2 className={`text-3xl font-bold mb-4 ${headingColor}`}>1. Terms of Service (ToS)</h2>
            <p className={`mb-4 ${textBody}`}>
              By engaging with SecureChainX for Solana auditing or development services, you agree to these terms. All services are provided "as is" without warranty. The client assumes all risk associated with smart contract deployment. Our liability is strictly limited to the fee paid for the specific service.
            </p>
            <h3 className={`text-xl font-semibold mt-6 mb-2 ${headingColor}`}>1.1 Scope of Service</h3>
            <p className={textBody}>
              The audit scope is strictly limited to the code commit hash agreed upon before the start of the engagement. Any code changes made after the audit report is issued are not covered unless a re-audit is explicitly purchased.
            </p>
          </section>

          {/* --- PRIVACY POLICY --- */}
          <section className={`p-8 rounded-xl border ${cardBorder} ${sectionBg}`}>
            <h2 className={`text-3xl font-bold mb-4 ${headingColor}`}>2. Privacy Policy</h2>
            <p className={`mb-4 ${textBody}`}>
              We are committed to protecting your privacy. We collect minimal personal data necessary for communication (email, name, organization). We do not sell or share client code or sensitive project details with third parties without express written permission.
            </p>
            <h3 className={`text-xl font-semibold mt-6 mb-2 ${headingColor}`}>2.1 Data Retention</h3>
            <p className={textBody}>
              Audit reports and related communications are retained for a maximum of 5 years unless a longer period is required by legal obligation or specifically requested by the client for archival purposes.
            </p>
          </section>
          
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default TermsPage;