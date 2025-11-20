import React from 'react';
import { useTheme } from './ThemeContext'; 

const testimonialsData = [
  {
    id: 1,
    quote: "Mohsin's audit was incredibly thorough. He found a subtle re-entrancy bug in our staking module that three prior audits missed. His focus on Solana's specific CU limits and CPI security is unmatched.",
    name: "Alex V.",
    title: "CTO, SecureDEX Protocol",
    stars: 5,
  },
  {
    id: 2,
    quote: "Beyond security, his development work on our token mint program was flawless and extremely gas-efficient. A true full-stack Solana architect.",
    name: "Sara J.",
    title: "Lead Developer, ArtChain Global",
    stars: 5,
  },
  {
    id: 3,
    quote: "The final report was clear, actionable, and delivered on time. We highly recommend SecureChainX for any high-value smart contract work.",
    name: "Mike L.",
    title: "Founder, DeFi Launchpad",
    stars: 5,
  },
];

const Testimonials = () => {
  const { theme } = useTheme();
  // Dynamic Theme Classes
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'; // Light theme ko bhi thoda subtle background diya
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardBg = theme === 'dark' 
    ? 'bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 shadow-2xl shadow-blue-900/20'
    : 'bg-white border border-gray-200 shadow-xl hover:border-blue-600/50 shadow-gray-300/50'; // Enhanced shadows
  const quoteText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const sourceText = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const starColor = 'text-yellow-400';

  const renderStars = (count) => {
    return Array(count).fill().map((_, i) => (
      <svg key={i} className={`w-5 h-5 fill-current ${starColor}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.53-6.93L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.35 4.83L5.82 21z"/></svg>
    ));
  };

  return (
    <div className={`py-16 md:py-24 transition-colors duration-500 ${sectionBg}`}>
        {/* Elite Look ke liye Custom CSS */}
        <style jsx>{`
            /* Keyframes for Fade In and Slide Up */
            @keyframes fadeInSlideUp {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            /* Apply animation to cards */
            .animated-card {
                opacity: 0; /* Default hidden */
                animation: fadeInSlideUp 0.7s ease-out forwards;
                will-change: transform, opacity; /* Performance boost */
            }

            /* Hover Tilt Effect */
            .animated-card:hover {
                transform: perspective(1000px) rotateX(1deg) rotateY(1deg) scale(1.02); /* Subtle 3D tilt and slight scale */
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); /* Stronger shadow on hover */
                z-index: 10;
            }
        `}</style>
      
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-12 text-center ${headingColor} tracking-tight`}>
          What Our <span className="text-blue-500">Clients</span> Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-xl border transition-all duration-500 animated-card relative ${cardBg}`}
              style={{ 
                  animationDelay: `${0.2 + index * 0.15}s`, // Sequence animation delay
                  transformStyle: 'preserve-3d', // 3D effect ke liye
                  perspective: '1000px'
              }}
            >
              <div className="flex mb-4">
                {renderStars(item.stars)}
              </div>
              
              <blockquote className={`text-lg mb-6 italic ${quoteText}`}>
                "{item.quote}"
              </blockquote>
              
              <div className="mt-auto pt-4 border-t border-gray-700/30">
                <p className={`text-lg font-bold ${sourceText}`}>{item.name}</p>
                <p className={`text-sm ${quoteText}`}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;