import React from 'react';
import { useTheme } from './ThemeContext';
// ✅ Import Logo Component
import SecureChainLogo from './SecureChainLogo';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-white/5' 
        : 'bg-white/80 border-black/5'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative h-20"> 
        
        {/* Logo Section */}
        <a href="/" className="cursor-pointer z-10 flex items-center">
          {/* ✅ LOGO SCALING WRAPPER 
             Logo kaafi bara hai, is liye 'scale-[0.25]' se usay navbar size ka kiya hai.
             '-ml-10' margin adjust kiya hai taake wo sahi position par aye.
          */}
          <div className="transform scale-[0.25] origin-left -ml-4 w-[200px]">
             <SecureChainLogo />
          </div>
        </a>

        {/* Navigation */}
        <nav className="absolute inset-x-0 mx-auto w-full md:w-auto flex justify-center items-center h-full pointer-events-none md:pointer-events-auto"> 
          <div className={`flex items-center space-x-4 text-xs sm:text-sm md:text-base px-4 pointer-events-auto backdrop-blur-md rounded-full py-1 border transition-colors duration-300 ${
             theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-gray-200 shadow-sm'
          }`}>
            
            {[
              { name: 'Process', link: '/#auditing-process' },
              { name: 'Reports', link: '/reports' },
              { name: 'About Us', link: '/#about-us' },
              { name: 'Blog', link: '/blog' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.link}
                className={`transition duration-300 px-2 font-medium ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-blue-400' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className={`p-1.5 rounded-full transition-colors duration-300 flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

          </div>
        </nav>

        <a href="/#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-lg transition duration-300 text-xs sm:text-sm z-10 shadow-md">
          Get in Touch
        </a>
      </div>
    </header>
  );
};

export default Header;