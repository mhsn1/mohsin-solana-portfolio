// /components/Contact.jsx (Final Code with Correct Image Path)

import React from 'react';

const Contact = () => {
  const links = {
    // CALENDLY (Appointment Scheduling)
    calendly: "https://calendly.com/mohsinarif84/discovery-call", 
    // EMAIL (Direct Contact)
    email: "mohsinarif@mhxmllc.com", 
    // GITHUB (Code Authority)
    github: "https://github.com/mhsn1/Profile", 
    // UPWORK (Verified Experience)
    upwork: "https://www.upwork.com/freelancers/~0164fcaefd2e237646?s=1517518458463281152", // ⬅️ Zaroor badlein!
  };

  return (
    <div id="contact" className="py-24 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        
        {/* SEO-Rich Heading */}
        <h2 className="text-5xl font-extrabold text-white mb-6">
          Ready to Build the Next <span className="text-solana-green">Web3 Innovation</span>?
        </h2>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Let's connect to discuss your project. I specialize in secure Solana DApp architecture and smart contract development.
        </p>

        {/* Primary CTA (Calendly) */}
        <a href={links.calendly} target="_blank" rel="noopener noreferrer" 
           className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 text-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105">
          Schedule Your Discovery Call Now
        </a>

        {/* Secondary Links for Authority */}
        <div className="mt-16 pt-8 border-t border-gray-700 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-300 mb-6">
            Connect & View My Credentials
          </h3>
          <div className="flex justify-center space-x-12">
            
            {/* GitHub - IMAGE LOGO (Path Fixed to Public, Size w-8 h-8) */}
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
              <img src="/github-logo.png" alt="GitHub Logo" className="w-8 h-8" /> 
              <span className="text-lg">GitHub</span>
            </a>

            {/* Email - IMAGE LOGO */}
            <a href={`mailto:${links.email}`} className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
              <img src="/email-logo.png" alt="Email Logo" className="w-8 h-8" /> 
              <span className="text-lg">Email</span>
            </a>
            
            {/* Upwork - IMAGE LOGO */}
            <a href={links.upwork} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
              <img src="/upwork-logo.png" alt="Upwork Logo" className="w-8 h-8" /> 
              <span className="text-lg">Upwork</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;