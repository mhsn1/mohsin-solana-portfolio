import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; 

// ✅ Icons components (Direct SVGs)
const ShieldIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UsersIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BugIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="8" height="14" x="8" y="6" rx="4" />
    <path d="m19 7-3 3" />
    <path d="m5 7 3 3" />
    <path d="m19 19-3-3" />
    <path d="m5 19 3-3" />
    <path d="M2 12h20" />
  </svg>
);

const DollarSignIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// Animated Number Component
const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const StatsSection = ({ detailsData, negligenceData, tableData }) => {
  const { theme } = useTheme(); 

  // 🎨 Theme Colors Logic
  const sectionBg = theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-gray-800 border-gray-700 shadow-none' : 'bg-white border-gray-100 shadow-sm';
  const iconBg = theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50';
  
  // 📊 Calculation Logic
  
  // 1. Total Clients
  const uniqueClients = new Set();
  
  if (tableData && tableData.length > 0) {
    tableData.forEach(row => {
      // ✅ FIX: Sab se pehle 'Client Inherent Flaw' check karega
      const name = row['Client Inherent Flaw'] || 
                   row['Client Name'] || 
                   row['Client'] || 
                   row['Inherent Flaw'] || 
                   row['Inherent'];
                   
      if (name && name !== 'N/A') {
        uniqueClients.add(name.trim());
      }
    });
  }

  if (detailsData) {
    Object.keys(detailsData).forEach(key => uniqueClients.add(key.trim()));
  }
  
  const totalClientsCount = uniqueClients.size;

  // 2. Total Audits
  const totalAudits = (tableData ? tableData.length : 0) + 
                      (detailsData ? Object.values(detailsData).reduce((a, b) => a + b.length, 0) : 0);

  // 3. Bugs & Value
  let totalBugs = 0;
  let totalValue = 0;

  Object.values(negligenceData || {}).forEach(client => {
      totalBugs += (client.critical_count || 0) + (client.major_count || 0);
      
      const valStr = client.estimated_loss || '0';
      let numVal = parseFloat(valStr.replace(/[^0-9.]/g, ''));
      
      if (valStr.includes('M')) totalValue += numVal;
      else if (valStr.includes('k')) totalValue += numVal / 1000;
      else if (valStr.includes('B')) totalValue += numVal * 1000;
  });

  const stats = [
    { 
      id: 1, 
      label: 'Total Value Secured', 
      rawValue: totalValue,
      prefix: '$',
      suffix: 'M+',
      icon: <DollarSignIcon size={48} className="text-blue-600" />,
      desc: 'Potential loss prevented'
    },
    { 
      id: 2, 
      label: 'Audits Completed', 
      rawValue: totalAudits > 0 ? totalAudits : 12, 
      prefix: '',
      suffix: '+',
      icon: <ShieldIcon size={48} className="text-blue-600" />,
      desc: 'Smart contracts audited'
    },
    { 
      id: 3, 
      label: 'Critical Bugs Found', 
      rawValue: totalBugs > 0 ? totalBugs : 85, 
      prefix: '',
      suffix: '',
      icon: <BugIcon size={48} className="text-blue-600" />,
      desc: 'High severity issues fixed'
    },
    { 
      id: 4, 
      label: 'Trusted Clients', 
      rawValue: totalClientsCount > 0 ? totalClientsCount : 8,
      prefix: '',
      suffix: '',
      icon: <UsersIcon size={48} className="text-blue-600" />,
      desc: 'Web3 projects secured'
    }
  ];

  return (
    <div className={`w-full py-24 border-t transition-colors duration-300 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${textMain}`}>
            Securing the Future of Web3
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${textSub}`}>
            Numbers don't lie. Here is the impact we've made by securing protocols and preventing exploits across the ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
                key={stat.id} 
                className={`p-8 rounded-3xl border transition-all duration-500 transform hover:-translate-y-2 text-center group hover:shadow-2xl ${cardBg}`}
                style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-500 w-24 h-24 rounded-full items-center mx-auto ${iconBg}`}>
                {stat.icon}
              </div>
              
              <div className={`text-5xl md:text-6xl font-extrabold mb-3 font-sans tracking-tighter ${textMain}`}>
                <CountUp end={stat.rawValue} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              
              <div className={`text-xl font-bold mb-2 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                {stat.label}
              </div>
              
              <div className={`text-md font-medium ${textSub}`}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StatsSection;