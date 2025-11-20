import React from 'react';
// ✅ Ensure ye path sahi ho (same folder mein hain to ./ThemeContext)
import { useTheme } from './ThemeContext';

const SecureChainLogo = () => {
  const { theme } = useTheme();

  // Theme Colors
  // Dark Mode: Text White | Light Mode: Text Dark Gray
  const secureColor = theme === 'dark' ? '#ffffff' : '#1f2937';
  
  // Fixed Brand Colors
  const chainColor = '#2563eb'; // Blue (jaisa "You grow" ka hai)
  const xColor = '#10b981';     // Green (jaisa "Blockchain & Security" ka hai)

  return (
    <div className="logo-wrapper">
      
      {/* Top Layer: CHAIN */}
      <div className="text-chain">
        CHAIN
      </div>

      {/* Bottom Layer: SECURE X (Shifted Right) */}
      <div className="bottom-row">
        <span className="text-secure">SECURE</span>
        
        {/* Animated X Icon */}
        <div className="x-container">
          <div className="x-bar bar1"></div>
          <div className="x-bar bar2"></div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Raleway:wght@900&display=swap');

        .logo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          /* Size adjustment */
          transform: scale(1.2); 
          transform-origin: left center;
          padding-left: 5px;
        }

        /* --- 1. CHAIN TEXT (Upper) --- */
        .text-chain {
          font-family: 'Raleway', sans-serif;
          font-size: 8rem; /* Bara size */
          font-weight: 900;
          color: ${chainColor};
          line-height: 0.85;
          letter-spacing: -2px;
          text-transform: uppercase;
          /* Halki si shadow taake pop kare */
          text-shadow: 4px 4px 0px ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
          z-index: 2;
        }

        /* --- 2. BOTTOM ROW (Secure + X) --- */
        .bottom-row {
          display: flex;
          align-items: center;
          /* Margin Left se isay 'CHAIN' ke 'N' ke neeche laye hain */
          margin-left: 220px; 
          margin-top: -10px; /* Thoda upar chipkaya */
          z-index: 1;
        }

        /* --- SECURE TEXT --- */
        .text-secure {
          font-family: 'Audiowide', cursive;
          font-size: 6.2rem;
          color: ${secureColor};
          margin-right: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* --- ANIMATED X --- */
        .x-container {
          position: relative;
          width: 35px;
          height: 35px;
          /* Slow spin animation */
          animation: spin 8s linear infinite; 
        }

        .x-bar {
          position: absolute;
          background-color: ${xColor};
          border-radius: 2px;
          box-shadow: 0 0 8px ${xColor}; /* Neon Glow */
        }

        .bar1 {
          width: 8px;
          height: 40px;
          left: 13px;
          top: -2px;
          transform: rotate(45deg);
        }

        .bar2 {
          width: 8px;
          height: 40px;
          left: 13px;
          top: -2px;
          transform: rotate(-45deg);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

      `}</style>
    </div>
  );
}; 

export default SecureChainLogo;