// /components/Contact.jsx

import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Build Your Asset?</h2>
      <p className="text-xl text-gray-400 mb-8">
        Let's connect to validate your project's technical architecture.
      </p>
      
      <div className="space-y-4">
        <p className="text-lg font-medium text-solana-green">
          Email: <a href="mailto:your_email@example.com" className="underline hover:text-blue-400">your_email@example.com</a>
        </p>
        <p className="text-lg text-gray-400">
          Location: Multan, Pakistan
        </p>
      </div>

      <div className="mt-8 flex justify-center space-x-6">
        <a href="YOUR_GITHUB_LINK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
          {/* GitHub Icon */}
          <span className="text-3xl">🐙</span> GitHub
        </a>
        <a href="YOUR_UPWORK_PROFILE_LINK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
          {/* Upwork Icon */}
          <span className="text-3xl">💼</span> Upwork Profile
        </a>
      </div>
    </div>
  );
};

export default Contact;