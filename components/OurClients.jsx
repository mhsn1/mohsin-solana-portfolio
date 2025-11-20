import React from 'react';
// ✅ Import path check kar lein, ye same folder mein hona chahiye
import { useTheme } from './ThemeContext'; 

const CLIENTS = [
  { id: 1, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png", name: "Client 1" },
  { id: 2, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png", name: "Client 2" },
  { id: 3, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png", name: "Client 3" },
  { id: 4, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png", name: "Client 4" },
  { id: 5, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png", name: "Client 5" },
  { id: 6, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png", name: "Client 6" },
  { id: 7, logo: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png", name: "Client 7" },
];

const OurClients = () => {
  const { theme } = useTheme(); // ✅ Theme State access

  // Theme ke hisaab se Gradient Colors set kiye
  const gradientStart = theme === 'dark' ? '#111827' : '#ffffff';
  const gradientEnd = theme === 'dark' ? 'rgba(17, 24, 39, 0)' : 'rgba(255, 255, 255, 0)';

  return (
    <div className={`client-slider-section w-full py-10 relative z-20 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      
      {/* 💥 Yahan naya Heading style lagaya gaya hai 💥 */}
      <h2 className={`text-center text-3xl font-extrabold mb-10 tracking-tight transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900' // Base text color (Trusted by)
      }`}>
        Trusted by <span className="text-blue-500">Industry Leaders</span>
      </h2>
      
      <div className="slider">
        <div className="slide-track">
          {CLIENTS.map((client) => (
            <div className="slide" key={`original-${client.id}`}>
              <img src={client.logo} height="100" width="250" alt={client.name} />
            </div>
          ))}
          {CLIENTS.map((client) => (
            <div className="slide" key={`duplicate-${client.id}`}>
              <img src={client.logo} height="100" width="250" alt={client.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Styles for Gradients */}
      <style jsx>{`
        .slider {
          background: transparent;
          height: 100px;
          margin: auto;
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 1200px;
        }

        /* Side Gradients (Dynamic color injection) */
        .slider::before,
        .slider::after {
          background: linear-gradient(to right, ${gradientStart} 0%, ${gradientEnd} 100%);
          content: "";
          height: 100px;
          position: absolute;
          width: 150px;
          z-index: 2;
          pointer-events: none; 
        }

        .slider::before { left: 0; top: 0; }
        .slider::after { right: 0; top: 0; transform: rotateZ(180deg); }

        .slide-track {
          animation: scroll 30s linear infinite;
          display: flex;
          width: calc(250px * 14); 
        }

        .slide {
          height: 100px;
          width: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .slide img {
           /* Dark mode mein thoda dim rakha hai, light mein normal */
           filter: grayscale(100%) ${theme === 'dark' ? 'brightness(0.8)' : 'brightness(1)'};
           opacity: 0.7;
           transition: all 0.3s;
        }
        
        .slide:hover img {
            filter: grayscale(0%) brightness(1);
            opacity: 1;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 7)); } 
        }
        
        @media (max-width: 768px) {
            .slider::before, .slider::after {
                width: 50px; 
            }
        }
      `}</style>
    </div>
  );
};

export default OurClients;