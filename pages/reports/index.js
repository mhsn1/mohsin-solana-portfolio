import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlackHoleBackground from '../../components/BlackHoleBackground';
import { useTheme } from '../../components/ThemeContext'; // ✅ Theme Import

const reports = [
  {
    id: 1,
    title: "SecureDEX Protocol Audit",
    client: "SecureDEX",
    date: "Oct 2025",
    type: "Smart Contract",
    status: "Critical Bugs Fixed",
    fileSize: "2.4 MB",
    githubLink: "https://github.com/mhsn1/RabbitHole-THM-Writeup", 
    fileLink: "/audits/securedex-audit.pdf" 
  },
  {
    id: 2,
    title: "ArtChain NFT Marketplace",
    client: "ArtChain Global",
    date: "Sep 2025",
    type: "DApp Security",
    status: "Passed",
    fileSize: "1.8 MB",
    githubLink: "https://github.com/your-username/your-repo",
    fileLink: "/audits/artchain-audit.pdf"
  },
  {
    id: 3,
    title: "Solana Liquidity Pool V2",
    client: "DeFi Zone",
    date: "Aug 2025",
    type: "Rust Logic",
    status: "Optimized",
    fileSize: "3.1 MB",
    githubLink: "#",
    fileLink: "#"
  },
  {
    id: 4,
    title: "Governance Token Staking",
    client: "DAO Maker",
    date: "July 2025",
    type: "Tokenomics",
    status: "Secure",
    fileSize: "1.2 MB",
    githubLink: "#",
    fileLink: "#"
  }
];

const Reports = () => {
  const { theme } = useTheme(); // ✅ Theme State

  const handleBoxClick = (url) => {
    if (url && url !== "#") {
      window.open(url, '_blank');
    }
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation(); 
  };

  // ✅ FIXED: Dynamic Styles (High Contrast for Light Mode)
  const pageClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white !text-black';
  
  const cardClass = theme === 'dark' 
    ? 'bg-gray-900/60 backdrop-blur-md border-gray-700/50 hover:border-blue-500/50 hover:shadow-blue-900/20'
    : '!bg-white border border-gray-200 hover:border-blue-600 hover:shadow-2xl shadow-md'; // Solid White Card
    
  const textTitle = theme === 'dark' ? 'text-white' : '!text-black'; // Force Black
  const textBody = theme === 'dark' ? 'text-gray-400' : '!text-gray-800'; // Darker Gray Body
  const textSub = theme === 'dark' ? 'text-gray-500' : '!text-gray-600';

  // Badge Logic
  const badgeClass = theme === 'dark' 
    ? 'bg-blue-900/20 border-blue-500/20 text-blue-400' 
    : 'bg-blue-50 border-blue-200 text-blue-700 font-bold';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${pageClass}`}>
      <Head>
        <title>Audit Reports | Mohsin Arif</title>
        <meta name="description" content="Download and view detailed security audit reports for Solana smart contracts." />
      </Head>
      
      {/* ✅ Background hamesha render hoga (Theme khud adjust karega) */}
      <div className="fixed inset-0 z-0">
         <BlackHoleBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16 flex-grow">
          
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-extrabold mb-4 drop-shadow-xl ${textTitle}`}>
              Security Audit Reports
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${textBody}`}>
              Comprehensive analysis and findings from my recent Solana smart contract audits. 
              Transparency is key to trust in Web3.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reports.map((report) => (
              <div 
                key={report.id} 
                onClick={() => handleBoxClick(report.githubLink)}
                className={`group relative p-6 border rounded-xl transition-all duration-300 flex flex-col cursor-pointer ${cardClass}`}
              >
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${badgeClass}`}>
                      {report.type}
                    </span>
                    <h3 className={`text-xl font-bold mt-2 transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-300' : 'text-black group-hover:text-blue-700'}`}>
                      {report.title}
                    </h3>
                    <p className={`text-sm ${textSub}`}>{report.client}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-xs font-mono mb-1 ${textSub}`}>{report.date}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                      report.status.includes('Fixed') || report.status.includes('Secure') 
                        ? (theme === 'dark' ? 'text-green-400 bg-green-900/20 border border-green-500/20' : 'text-green-700 bg-green-100 border border-green-200')
                        : (theme === 'dark' ? 'text-yellow-400 bg-yellow-900/20 border border-yellow-500/20' : 'text-yellow-800 bg-yellow-100 border border-yellow-200')
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className={`border-t my-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

                <div className="flex justify-between items-center mt-auto">
                  <span className={`text-xs flex items-center gap-1 ${textSub}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    PDF • {report.fileSize}
                  </span>
                  
                  <a 
                    href={report.fileLink}
                    download
                    onClick={handleDownloadClick}
                    className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer z-20 relative"
                  >
                    <span>Download</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Reports;