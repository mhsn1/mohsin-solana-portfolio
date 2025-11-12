import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/mhsn1/Profile" target="_blank" rel="noopener noreferrer" className="hover:text-solana-green">GitHub</a>
          <a href="https://www.upwork.com/freelancers/~0164fcaefd2e237646?s=1517518458463281152" target="_blank" rel="noopener noreferrer" className="hover:text-solana-green">Upwork</a>
          
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Mohsin Arif. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;