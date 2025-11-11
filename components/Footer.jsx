import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p className="mb-4">
          Built with Next.js & Tailwind CSS. Hosted on Vercel.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="YOUR_GITHUB_LINK" target="_blank" rel="noopener noreferrer" className="hover:text-solana-green">GitHub</a>
          <a href="YOUR_UPWORK_PROFILE_LINK" target="_blank" rel="noopener noreferrer" className="hover:text-solana-green">Upwork</a>
          <a href="mailto:your_email@example.com" className="hover:text-solana-green">Email</a>
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Mohsin Arif. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;