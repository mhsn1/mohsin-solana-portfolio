import React from 'react';

const Hero = () => {
  return (
    // FIX 1: Mobile par flex-col (upar-neeche) aur bade screen par flex-row (baghal-baghal)
    <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24"> 
      
      {/* Text Content */}
      <div className="md:w-3/5 order-2 md:order-1 mt-10 md:mt-0 text-center md:text-left"> 
        <span className="text-solana-green text-lg font-mono block mb-2">Blockchain & Security</span>
        
        {/* Heading Size: Mobile par chota (4xl) aur Desktop par bada (6xl) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
          Full-Stack <span className="text-blue-400">Solana Engineer</span> & <br /> Web3 Security Architect
        </h1>
        
        <p className="mt-4 text-lg text-gray-400 max-w-lg mx-auto md:mx-0">
          I don't just write code; I build an asset. I specialize in robust, production-ready solutions on the Solana blockchain, focused on security and capital-efficiency.
        </p>
        
        {/* Buttons: Mobile par bhi space-x-4 */}
        <div className="mt-8 space-x-4 flex justify-center md:justify-start">
          <a 
            href="https://calendly.com/mohsinarif84/discovery-call" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition duration-300 text-sm sm:text-base"
          >
            Schedule Call
          </a>
          <a href="/#expertise" className="text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-gray-900 font-bold py-3 px-5 rounded-lg transition duration-300 text-sm sm:text-base">
            View Expertise
          </a>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="md:w-1/4 order-1 md:order-2 flex justify-center">
        {/* Image Size: Mobile par bhi theek lagna chahiye */}
        <img 
          src="/mohsin-arif-photo.jpg" 
          alt="Mohsin A. Professional Portrait" 
          className="rounded-full w-56 h-56 sm:w-64 sm:h-64 object-cover border-4 border-solana-green shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;