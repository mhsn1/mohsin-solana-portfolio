import React from 'react';
import { useTheme } from './ThemeContext'; // ✅ Theme Context Import

const Contact = () => {
  const { theme } = useTheme(); // ✅ Get Theme State

  const links = {
    // CALENDLY (Appointment Scheduling)
    calendly: "https://calendly.com/mohsinarif84/discovery-call", 
    // EMAIL (Direct Contact)
    email: "mohsinarif@mhxmllc.com", 
    // GITHUB (Code Authority)
    github: "https://github.com/mhsn1/Profile", 
    // UPWORK (Verified Experience)
    upwork: "https://www.upwork.com/freelancers/~0164fcaefd2e237646?s=1517518458463281152", 
  };

  // ✅ Dynamic Theme Classes
  // Light Mode mein background light white hoga
  const sectionBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white-50'; 
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const dividerColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const connectTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  return (
    // ✅ Dynamic Background
    <div id="contact" className={`py-24 md:py-32 transition-colors duration-500 ${sectionBg}`}>
      <div className="container mx-auto px-4 text-center">
        
        {/* Heading */}
        <h2 className={`text-5xl font-extrabold mb-6 ${headingColor}`}>
          Ready to Build the Next <span className="text-blue-500">Web3 Innovation</span>?
        </h2>
        
        <p className={`text-xl mb-10 max-w-2xl mx-auto ${subTextColor}`}>
          Let's connect to discuss your project. I specialize in secure Solana DApp architecture and smart contract development.
        </p>

        {/* Primary CTA (Calendly) */}
        <a href={links.calendly} target="_blank" rel="noopener noreferrer" 
           className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 text-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105">
          Schedule Your Discovery Call Now
        </a>

       
          
      </div>
    </div>
  );
};

export default Contact;