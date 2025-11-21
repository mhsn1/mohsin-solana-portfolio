import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlackHoleBackground from '../../components/BlackHoleBackground';
import { useTheme } from '../../components/ThemeContext';

const AnimatedTermsPage = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [particles, setParticles] = useState([]);

  // Dynamic Theme Classes
  const pageClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sectionBg = theme === 'dark' ? 'bg-gray-800/60' : 'bg-gray-50';
  const cardBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textBody = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const glowColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.2)';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // SVG Icons as components
  const ShieldIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const FileIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const AlertIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

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

      {/* Animated Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className={`absolute rounded-full blur-sm ${theme === 'dark' ? 'bg-purple-400' : 'bg-blue-400'} opacity-20`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, ${glowColor} 1px, transparent 1px),
            linear-gradient(${glowColor} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.5}px)`
        }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16 flex-grow max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <h1 
              className={`text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-xl ${headingColor}`}
              style={{ 
                animation: 'titlePulse 2s ease-in-out infinite',
                textShadow: theme === 'dark' ? '0 0 40px rgba(168, 85, 247, 0.4)' : '0 0 20px rgba(59, 130, 246, 0.3)'
              }}
            >
              Legal & Transparency
            </h1>
            <p className={`text-xl max-w-2xl mx-auto mb-10 ${textBody}`} style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}>
              Review our terms of service and how we handle data privacy with complete transparency
            </p>
            
            {/* Floating Icons */}
            <div className="flex justify-center gap-8">
              {[
                { Icon: ShieldIcon, delay: '0s' },
                { Icon: LockIcon, delay: '0.5s' },
                { Icon: FileIcon, delay: '1s' }
              ].map(({ Icon, delay }, i) => (
                <div
                  key={i}
                  className={`p-4 ${theme === 'dark' ? 'bg-purple-600/20 border-purple-400/30' : 'bg-blue-100 border-blue-300'} rounded-2xl backdrop-blur-sm border transition-all cursor-pointer hover:scale-110 ${theme === 'dark' ? 'hover:bg-purple-600/40' : 'hover:bg-blue-200'}`}
                  style={{ animation: `float 3s ease-in-out infinite ${delay}` }}
                >
                  <div className={theme === 'dark' ? 'text-purple-300' : 'text-blue-600'}>
                    <Icon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms of Service */}
          <section
            id="terms"
            data-animate
            className={`mb-16 transition-all duration-1000 ${
              visibleSections.terms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="relative group">
              {/* Glowing Border */}
              <div className={`absolute -inset-1 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600' : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              
              <div className={`relative ${sectionBg} backdrop-blur-xl p-10 rounded-2xl border ${cardBorder} hover:border-opacity-70 transition-all duration-500`}>
                {/* Corner Decorations */}
                <div className={`absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 ${theme === 'dark' ? 'border-purple-400' : 'border-blue-500'} rounded-tl-2xl`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 ${theme === 'dark' ? 'border-purple-400' : 'border-blue-500'} rounded-br-2xl`} style={{ animation: 'pulse 2s ease-in-out infinite 1s' }} />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={theme === 'dark' ? 'text-purple-400' : 'text-blue-600'} style={{ animation: 'bounce 2s ease-in-out infinite' }}>
                    <FileIcon />
                  </div>
                  <h2 className={`text-4xl font-bold ${headingColor}`}>
                    1. Terms of Service
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className={`${textBody} leading-relaxed text-lg hover:opacity-80 transition-opacity`}>
                    By engaging with <span className={`${theme === 'dark' ? 'text-purple-400' : 'text-blue-600'} font-semibold`}>SecureChainX</span> for Solana auditing or development services, you agree to these terms. All services are provided "as is" without warranty. The client assumes all risk associated with smart contract deployment. Our liability is strictly limited to the fee paid for the specific service.
                  </p>

                  {/* Sub-section */}
                  <div className={`${theme === 'dark' ? 'bg-gray-900/50 border-l-purple-500 hover:border-l-pink-500' : 'bg-white border-l-blue-500 hover:border-l-cyan-500'} p-6 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                        <CheckIcon />
                      </div>
                      <h3 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-blue-700'}`}>1.1 Scope of Service</h3>
                    </div>
                    <p className={`${textBody} leading-relaxed hover:opacity-80 transition-opacity`}>
                      The audit scope is strictly limited to the code commit hash agreed upon before the start of the engagement. Any code changes made after the audit report is issued are not covered unless a re-audit is explicitly purchased.
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      { Icon: AlertIcon, text: 'Limited Liability', color: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600' },
                      { Icon: CheckIcon, text: 'Clear Scope', color: theme === 'dark' ? 'text-green-400' : 'text-green-600' }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-4 ${theme === 'dark' ? 'bg-gray-900/50 hover:bg-gray-900/80' : 'bg-white hover:bg-gray-50'} rounded-lg transition-all cursor-pointer hover:scale-105`}
                        style={{ animation: `slideInRight 0.8s ease-out ${i * 0.2}s both` }}
                      >
                        <div className={item.color}>
                          <item.Icon />
                        </div>
                        <span className={`${textBody} font-medium`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section
            id="privacy"
            data-animate
            className={`transition-all duration-1000 ${
              visibleSections.privacy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="relative group">
              <div className={`absolute -inset-1 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              
              <div className={`relative ${sectionBg} backdrop-blur-xl p-10 rounded-2xl border ${cardBorder} hover:border-opacity-70 transition-all duration-500`}>
                <div className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 ${theme === 'dark' ? 'border-blue-400' : 'border-purple-500'} rounded-tr-2xl`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 ${theme === 'dark' ? 'border-blue-400' : 'border-purple-500'} rounded-bl-2xl`} style={{ animation: 'pulse 2s ease-in-out infinite 1s' }} />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={theme === 'dark' ? 'text-blue-400' : 'text-purple-600'} style={{ animation: 'bounce 2s ease-in-out infinite 0.5s' }}>
                    <LockIcon />
                  </div>
                  <h2 className={`text-4xl font-bold ${headingColor}`}>
                    2. Privacy Policy
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className={`${textBody} leading-relaxed text-lg hover:opacity-80 transition-opacity`}>
                    We are committed to protecting your privacy. We collect minimal personal data necessary for communication (email, name, organization). We do not sell or share client code or sensitive project details with third parties without express written permission.
                  </p>

                  <div className={`${theme === 'dark' ? 'bg-gray-900/50 border-l-blue-500 hover:border-l-purple-500' : 'bg-white border-l-purple-500 hover:border-l-blue-500'} p-6 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                        <EyeIcon />
                      </div>
                      <h3 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-purple-700'}`}>2.1 Data Retention</h3>
                    </div>
                    <p className={`${textBody} leading-relaxed hover:opacity-80 transition-opacity`}>
                      Audit reports and related communications are retained for a maximum of 5 years unless a longer period is required by legal obligation or specifically requested by the client for archival purposes.
                    </p>
                  </div>

                  {/* Privacy Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {[
                      { Icon: ShieldIcon, text: 'Data Protected', color: theme === 'dark' ? 'text-green-400' : 'text-green-600' },
                      { Icon: LockIcon, text: 'Encrypted', color: theme === 'dark' ? 'text-blue-400' : 'text-blue-600' },
                      { Icon: EyeIcon, text: 'Transparent', color: theme === 'dark' ? 'text-purple-400' : 'text-purple-600' }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center gap-3 p-6 ${theme === 'dark' ? 'bg-gray-900/50 hover:bg-gray-900/80' : 'bg-white hover:bg-gray-50'} rounded-xl transition-all cursor-pointer hover:scale-105 hover:-translate-y-2`}
                        style={{ animation: `bounceIn 0.8s ease-out ${i * 0.2}s both` }}
                      >
                        <div className={item.color}>
                          <item.Icon />
                        </div>
                        <span className={`${textBody} font-medium text-center`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes titlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedTermsPage;