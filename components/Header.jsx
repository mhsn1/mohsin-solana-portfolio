import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo/Name */}
        <div className="text-2xl font-bold text-solana-green">
          Mohsin Arif
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <a href="#expertise" className="text-gray-300 hover:text-blue-400 transition duration-300">Expertise</a>
          <a href="#history" className="text-gray-300 hover:text-blue-400 transition duration-300">History</a>
          <a href="YOUR_GITHUB_LINK" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">GitHub</a>
          <a href="YOUR_UPWORK_PROFILE_LINK" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">Upwork Profile</a>
        </nav>

        {/* Contact Button */}
        <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hidden md:block">
          Get in Touch
        </a>
      </div>
    </header>
  );
};

export default Header;