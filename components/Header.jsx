import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo/Name FIX: Mohsin Arif par click karne se hamesha homepage (Hero Section) par jayega */}
        <a href="/" className="text-3xl font-bold text-white hover:text-blue-400 transition duration-300 cursor-pointer">
          Mohsin Arif
        </a>

        {/* Navigation Links */}
        <nav className="space-x-6 hidden md:flex">
          <a href="/#expertise" className="text-gray-300 hover:text-blue-400 transition duration-300">Expertise</a>
          <a href="/#history" className="text-gray-300 hover:text-blue-400 transition duration-300">History</a>
          
          {/* NEW BLOG LINK */}
          <a href="/blog" className="text-gray-300 hover:text-blue-400 transition duration-300 font-bold">Blog</a>
          
        </nav>

        {/* Contact Button */}
        <a href="/#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hidden md:block">
          Get in Touch
        </a>
      </div>
    </header>
  );
};

export default Header;