import React from 'react';
import { useTheme } from './ThemeContext';

const auditSteps = [
  { 
    id: 1,
    title: "Discovery & Scoping", 
    description: "Understanding the protocol architecture, collecting documentation, and determining the audit scope to ensure complete coverage.",
    icon: "search", 
  },
  { 
    id: 2,
    title: "Static & Dynamic Analysis", 
    description: "Utilizing automated tools alongside line-by-line manual code review to identify all types of logic errors and vulnerabilities.",
    icon: "code",
  },
  { 
    id: 3,
    title: "Vulnerability Reporting", 
    description: "Providing a detailed report that includes the severity of each issue and appropriate recommendations for remediation.",
    icon: "bug_report",
  },
  { 
    id: 4,
    title: "Fix Verification & Sign-off", 
    description: "Re-checking the fixes implemented by the client, and issuing the final audit certificate to confirm security assurance.",
    icon: "verified_user",
  },

];

const ProcessTimeline = () => {
  const { theme } = useTheme();

  // Dynamic Theme Classes
  const headingColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const cardBg = theme === 'dark' 
    ? 'bg-gray-800/80 border-gray-700/50' 
    : 'bg-white border-gray-200 shadow-md'; 
  const iconBg = theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100';
  const iconColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const descriptionColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const dividerColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
  const ringColor = theme === 'dark' ? 'border-gray-900' : 'border-white';
  
  // Animation Colors
  const animatedLineColor = theme === 'dark' 
    ? 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' 
    : 'linear-gradient(to bottom, #2563eb, #1e40af)'; 
  const movingIconColor = theme === 'dark' ? '#10b981' : '#059669'; // Green icon

  return (
    <section id="auditing-process" className="py-16">
      {/* Material Icons Global Import */}
      <style jsx global>{`@import url('https://fonts.googleapis.com/icon?family=Material+Icons');`}</style>

      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className={`text-4xl font-bold mb-16 text-center ${headingColor}`}>
        Auditing Process
        </h2>
        
        {/* Timeline Container */}
        <div className="relative timeline-container-main">
          
          {/* 1. Base Line (Static) and Animated Elements */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden md:block z-0">
            
            {/* Static Grey Line (Base) */}
            <div className={`h-full w-full ${dividerColor}`}></div>
            
            {/* Animated Blue Progress Line (Overlays the grey line) */}
            <div className="animated-progress-line" style={{ background: animatedLineColor }}></div>
            
            {/* Moving Icon (Ladybug/Lens) */}
            
          </div>


          {auditSteps.map((item, index) => (
            <div key={item.id} className="mb-10 flex flex-col md:flex-row items-center w-full">
              
              {/* Content (Left on Odd, Right on Even) */}
              <div 
                className={`flex-1 w-full md:w-5/12 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div 
                  className={`p-6 rounded-xl border transition-all duration-500 w-full group timeline-step ${cardBg} ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-blue-500`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${descriptionColor}`}>
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Icon / Separator */}
              <div className="md:w-2/12 flex justify-center items-center relative py-4 md:py-0 md:order-2">
                <span className={`material-icons p-3 rounded-full z-10 text-2xl border-4 ${iconBg} ${iconColor} ${ringColor} shadow-md`}>
                  {item.icon}
                </span>
              </div>

              {/* Empty space for responsive layout */}
              <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}></div>
              
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for sequential animation and moving line */}
      <style jsx>{`
        /* Step fade-in animation */
        .timeline-step {
          opacity: 0;
          animation: slideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Animated Line Styles */
        .animated-progress-line {
            position: absolute;
            top: 0;
            width: 100%;
            height: 0; 
            /* Background is set via inline style for theme support */
            animation: progress-fill 4s linear forwards; 
        }
        
        /* Moving Icon Styles */
        .moving-icon {
            position: absolute;
            top: 0;
            left: 50%;
            width: 16px;
            height: 16px;
            margin-left: -8px; /* Center */
            color: #fff;
            background: #3b82f6; 
            border-radius: 50%;
            line-height: 16px;
            text-align: center;
            font-size: 10px;
            z-index: 20;
            
            animation: icon-move 4s linear forwards;
        }
        
        /* Animation Keyframes */
        @keyframes progress-fill {
            0% { height: 0%; }
            100% { height: 100%; }
        }
        
        @keyframes icon-move {
            0% { transform: translate(-50%, 0px); }
            /* Icon ko bilkul neeche rokne ke liye */
            100% { transform: translate(-50%, calc(100% - 16px)); } 
        }
        
      `}</style>
    </section>
  );
};

export default ProcessTimeline;