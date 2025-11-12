import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      {/* FIX: Header container mein items ko space-between rakhne ki bajaye, unhein group karenge */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo/Name: Left Side */}
        <a href="/" className="text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-blue-400 transition duration-300 cursor-pointer z-10">
          Mohsin Arif
        </a>

        {/* NAVIGATION LINKS (CENTERED): FIX - Mobile par links center mein aur desktop par bhi center-focused honge */}
        <nav className="absolute inset-x-0 mx-auto w-full md:w-auto flex justify-center items-center h-full"> 
          <div className="flex space-x-4 text-xs sm:text-sm md:text-base px-2">
            <a href="/#expertise" className="text-gray-300 hover:text-blue-400 transition duration-300">Expertise</a>
            <a href="/#history" className="text-gray-300 hover:text-blue-400 transition duration-300">History</a>
            <a href="/blog" className="text-gray-300 hover:text-blue-400 transition duration-300 font-bold">Blog</a>
          </div>
        </nav>

        {/* Contact Button: Right Side */}
        <a href="/#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-lg transition duration-300 text-xs sm:text-sm z-10">
          Get in Touch
        </a>
      </div>
    </header>
  );
};

export default Header;