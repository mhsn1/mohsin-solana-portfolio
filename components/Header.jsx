import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo/Name */}
        <div className="text-3xl font-bold text-white">
          Mohsin Arif
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <a href="#expertise" className="text-gray-300 hover:text-blue-400 transition duration-300">Expertise</a>
          <a href="#history" className="text-gray-300 hover:text-blue-400 transition duration-300">History</a>
          <a href="https://github.com/mhsn1/Profile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">GitHub</a>
          <a href="https://www.upwork.com/freelancers/~0164fcaefd2e237646?s=1517518458463281152" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300">Upwork Profile</a>
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