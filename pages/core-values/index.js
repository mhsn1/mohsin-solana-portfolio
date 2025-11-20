import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlackHoleBackground from '../../components/BlackHoleBackground';
import { useTheme } from '../../components/ThemeContext';

// Material Icons Font import for global use (needed for icons)
const MaterialIcons = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  `}</style>
);

const valuesData = [
  {
    id: 1,
    icon: "security",
    title: "Security First",
    description: "Every decision, from architecture design to code review, is driven by the mandate of absolute security. We treat all code as mission-critical.",
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    id: 2,
    icon: "bolt",
    title: "Performance & Efficiency",
    description: "We optimize smart contracts for minimal Compute Unit consumption, ensuring capital efficiency and high transaction throughput on Solana.",
    color: "text-yellow-500",
    bg: "bg-yellow-50"
  },
  {
    id: 3,
    icon: "visibility",
    title: "Radical Transparency",
    description: "All audit findings, methodologies, and post-fix verifications are documented clearly and shared openly with the client.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    id: 4,
    icon: "code",
    title: "Engineering Integrity",
    description: "We only deliver production-ready, clean, and highly maintainable Rust and Anchor code that adheres to industry best practices.",
    color: "text-green-500",
    bg: "bg-green-50"
  }
];

const CoreValues = () => {
  const { theme } = useTheme();

  // Dynamic Theme Classes
  const pageClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  
  const cardClass = theme === 'dark' 
    ? 'bg-gray-900/60 backdrop-blur-md border-gray-700 hover:border-blue-500'
    : 'bg-white shadow-lg border-gray-200 hover:border-blue-600';
    
  const cardTitle = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardBody = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const dividerColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
  const ringColor = theme === 'dark' ? 'border-gray-900' : 'border-white';
  const iconBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <>
    <MaterialIcons />
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${pageClass}`}>
      <Head>
        <title>Core Values | SecureChainX</title>
        <meta name="description" content="The fundamental principles guiding SecureChainX's approach to Solana security and smart contract development." />
      </Head>
      
      <div className="fixed inset-0 z-0">
         <BlackHoleBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-16 flex-grow">
          
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-extrabold mb-4 drop-shadow-xl ${headingColor}`}>
              Our Core Values
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${subTextColor}`}>
              These principles define how we approach security, engineering, and client relationships in the decentralized world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {valuesData.map((item) => (
              <div key={item.id} className={`p-6 rounded-xl border transition-all duration-300 ${cardClass}`}>
                
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <span className={`material-icons p-3 rounded-full mr-3 ${item.color} ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-gray-100'}`}>
                    {item.icon}
                  </span>
                  <h3 className={`text-xl font-bold ${cardTitle}`}>
                    {item.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className={`text-sm ${cardBody}`}>
                  {item.description}
                </p>

              </div>
            ))}
          </div>

        </main>
        
        <Footer />
      </div>
    </div>
    
    <style jsx>{`
      /* Timeline specific styles (for the moving line effect) */
      .timeline-container {
        position: relative;
        padding-bottom: 20px; /* Space for the line to end */
      }
      
      /* Base Line */
      .timeline-line {
        background: ${dividerColor}; 
      }
      
      /* Animated Blue Progress Line */
      .animated-progress-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0; /* Starts at 0 height */
        background: linear-gradient(to bottom, #3b82f6, #8b5cf6); /* Blue/Purple Gradient */
        animation: progress-fill 4s linear forwards 1; /* 4 second fill animation */
        animation-delay: 0.5s;
      }
      
      /* Moving Icon (Ladybug/Diamond) */
      .moving-icon {
        position: absolute;
        top: 0;
        left: 50%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: -10px;
        color: #fff;
        background: #3b82f6; /* Blue circle */
        border-radius: 50%;
        text-align: center;
        font-size: 10px;
        
        /* Animation: Moves along the progress line */
        animation: icon-move 4s linear forwards 1;
        animation-delay: 0.5s;
        
        /* Starting Position */
        transform: translateY(0%);
      }
      
      /* Keyframes for Line Filling */
      @keyframes progress-fill {
        0% { height: 0%; }
        100% { height: 100%; }
      }
      
      /* Keyframes for Icon Movement (Y-axis) */
      @keyframes icon-move {
        0% { transform: translate(-50%, 0); }
        100% { transform: translate(-50%, 100%); } /* Full length of the line */
      }
    `}</style>

    {/* Yahan hum timeline container ko replace kar rahe hain taake animation dikhay */}
    <div className="relative pt-16"> 
        {/* Timeline Container (Yahan koi item map nahi ho raha tha, is liye yeh area khali rakhte hain) */}
    </div>
    </>
  );
};

export default CoreValues;