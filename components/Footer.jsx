import React from 'react';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  // Dynamic Theme Classes
  const footerBg = theme === 'dark' ? 'bg-white-800' : 'bg-white-100';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const hoverColor = theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-700';

  return (
    <footer className={`transition-colors duration-500 border-t ${footerBg} ${borderColor} py-12 mt-12`}>
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-left">
          
          {/* Column 1: Website */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${headingColor}`}>SecureChainX</h3>
            <ul className={`space-y-2 text-sm ${textColor}`}>
              <li><a href="/" className={hoverColor}>Home</a></li>
              <li><a href="/#contact" className={hoverColor}>Contact</a></li>
              <li><a href="https://calendly.com/mohsinarif84/discovery-call" target="_blank" rel="noopener noreferrer" className={hoverColor}>Schedule Call</a></li>
            </ul>
          </div>

          {/* Column 2: Audits & Content */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${headingColor}`}>Audits & Content</h3>
            <ul className={`space-y-2 text-sm ${textColor}`}>
              <li><a href="/reports" className={hoverColor}>Browse Audits</a></li>
              <li><a href="/#auditing-process" className={hoverColor}>Audit Process</a></li>
              <li><a href="/blog" className={hoverColor}>Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Company (Core Values Link) */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${headingColor}`}>Company</h3>
            <ul className={`space-y-2 text-sm ${textColor}`}>
              <li><a href="/#about-us" className={hoverColor}>About Us</a></li>
              {/* ✅ Link to Terms Page */}
              <li><a href="/terms" className={hoverColor}>Terms & Privacy</a></li>
              {/* ✅ Link to Core Values Page */}
              <li><a href="/core-values" className={hoverColor}>Core Values</a></li>
            </ul>
          </div>

          {/* Column 4: Proof & Links */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${headingColor}`}>Proof & Links</h3>
            <ul className={`space-y-2 text-sm ${textColor}`}>
              <li><a href="/#testimonials" className={hoverColor}>Testimonials</a></li>
              <li><a href="https://github.com/mhsn1/Profile" target="_blank" rel="noopener noreferrer" className={hoverColor}>GitHub</a></li>
              {/* Upwork link hata diya gaya hai */}
            </ul>
          </div>

        </div>

        <div className={`mt-10 pt-6 border-t ${borderColor}`}>
          <p className={`text-sm text-center ${textColor}`}>
            &copy; {new Date().getFullYear()} Mohsin Arif. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;