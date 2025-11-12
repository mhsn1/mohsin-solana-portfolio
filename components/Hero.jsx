// /components/Hero.jsx (Final Code with Calendly Link)

import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-24">
      <div className="md:w-3/5">
        <span className="text-solana-green text-lg font-mono">Blockchain & Security</span>
        
        {/* HEADING (Aapke Design aur Upwork profile ke mutabiq) */}
       <h1 className="text-6xl font-extrabold mt-2 leading-tight">
  Elite Solana DApp Developer & <br /> <span className="text-blue-400">Web3 Security Consultant</span>
</h1>
        
        <p className="mt-6 text-xl text-gray-400">
          I don't just write code; I build an asset. I specialize in converting complex DeFi and NFT marketplace visions into robust, production-ready solutions on the Solana blockchain, focused on security and capital-efficiency.
        </p>
        
        <div className="mt-8 space-x-4">
          
          {/* CALENDLY LINK BUTTON */}
          <a 
            href="https://calendly.com/mohsinarif84/discovery-call" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Let's Schedule a Brief Call
          </a>
          
          {/* EXPERTISE LINK */}
          <a href="#expertise" className="text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300">
            View My Expertise
          </a>
          
        </div>
      </div>
      
      {/* IMAGE SECTION */}
      <div className="md:w-1/4 mt-10 md:mt-0 flex justify-center">
        <img 
          src="/mohsin-arif-photo.jpg" 
          alt="Mohsin A. Professional Portrait" 
          className="rounded-full w-64 h-64 object-cover border-4 border-solana-green shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;