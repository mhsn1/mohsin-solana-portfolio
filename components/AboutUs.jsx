import React from 'react';
import { useTheme } from './ThemeContext';

const AboutUs = () => {
  const { theme } = useTheme();

  // Theme-based colors and classes
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white-50';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const accentColor = 'text-blue-500';
  const dividerColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const iconBg = theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600';
  const expertiseIconBg = theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600';

  return (
    <div className={`py-16 md:py-24 transition-colors duration-300 ${sectionBg}`}>
      <div className="container mx-auto px-4 max-w-6xl">

        {/* =========================================================
            SECTION 1: MAIN HEADING (Our Story & Expertise)
        ========================================================= */}
        <header className="mb-20 text-center">
            <h2 className={`text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight ${textMain}`}>
              Our Story & <span className={accentColor}>Expertise</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${textSub}`}>
              We are committed to delivering uncompromising security and high-efficiency smart contract solutions for the Solana ecosystem.
            </p>
        </header>


        {/* =========================================================
            SECTION 2: OUR MISSION (Minimalistic Block)
        ========================================================= */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 pb-10 border-b ${dividerColor}`}>
            
            {/* Mission Title/Icon */}
            <div>
                <div className="flex items-center mb-4">
                    <span className={`p-3 rounded-full mr-4 ${iconBg}`}>
                      {/* Shield Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 005 18a11.955 11.955 0 0012.618 4.04c-.42-.81-.665-1.74-.618-2.716z" /></svg>
                    </span>
                    <h3 className={`text-3xl font-bold ${textMain}`}>Who We Are</h3>
                </div>
                <p className={`text-lg italic leading-relaxed ${textSub} mt-2`}>
                   A dedicated collective of senior Solana auditors and developers, committed to fortifying the security of decentralized finance.
                </p>
            </div>

            {/* Mission Details */}
            <div className={`space-y-6 ${textSub} text-lg`}>
                <p className="leading-relaxed">
                    Our dedication lies in creating a secure, transparent, and highly scalable decentralized environment. We ensure the **cryptographic integrity** and reliability of high-value smart contracts, making security the foundation of every successful project.
                </p>
                <p className="leading-relaxed">
                    We believe security should be the foundation, not an afterthought. Our audit process combines deep human expertise with **proprietary automated tooling** to provide the most comprehensive assurance in the ecosystem.
                </p>
            </div>
        </div>

        {/* =========================================================
            SECTION 3: CORE EXPERTISE (Clean Feature List)
        ========================================================= */}
        <div className="pt-10">
          <h3 className={`text-3xl font-bold mb-12 ${textMain} text-center`}>Our Core Competencies</h3>
          
          <dl className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            
            {/* Expertise 1 */}
            <div className="flex flex-col items-center text-center">
              <span className={`p-4 rounded-xl mb-4 ${expertiseIconBg}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.04A11.955 11.955 0 005 18a11.955 11.955 0 0012.618 4.04c-.42-.81-.665-1.74-.618-2.716z" /></svg>
              </span>
              <dt className={`text-xl font-semibold ${textMain}`}>Solana Security Audit</dt>
              <dd className={`mt-2 ${textSub}`}>Deep specialization in **Rust/Anchor** security reviews, focusing on **CU limits, CPI safety**, and state management.</dd>
            </div>

            {/* Expertise 2 */}
            <div className="flex flex-col items-center text-center">
              <span className={`p-4 rounded-xl mb-4 ${expertiseIconBg}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </span>
              <dt className={`text-xl font-semibold ${textMain}`}>Smart Contract Development</dt>
              <dd className={`mt-2 ${textSub}`}>Building highly optimized and **production-ready** programs for DeFi, Tokenomics, and NFT platforms.</dd>
            </div>
            
            {/* Expertise 3 */}
            <div className="flex flex-col items-center text-center">
              <span className={`p-4 rounded-xl mb-4 ${expertiseIconBg}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </span>
              <dt className={`text-xl font-semibold ${textMain}`}>Web3 Infrastructure</dt>
              <dd className={`mt-2 ${textSub}`}>Expertise in **full-stack dApp integration**, secure API gateways, and scalable backend services.</dd>
            </div>

          </dl>
        </div>
        
        {/* --- Final CTA --- */}
        <div className={`pt-20 text-center`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg shadow-xl transition duration-300 transform hover:scale-105">
              Start Your Security Audit
            </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;