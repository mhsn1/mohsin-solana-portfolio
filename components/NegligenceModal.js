import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';

// Helper: Fuzzy match to find keys like "Client Inherent Flaw"
const getSafeValue = (item, searchKey) => {
  if (!item) return null;
  const keys = Object.keys(item);
  const foundKey = keys.find(k => k.toLowerCase().trim().includes(searchKey.toLowerCase().trim()));
  return foundKey ? item[foundKey] : null;
};

const NegligenceModal = ({ isOpen, onClose, rowData, allNegligenceData }) => {
  const { theme } = useTheme();

  // Scroll Lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !rowData) return null;

  // ✅ FIX: Sab se pehle 'Client Inherent Flaw' try karega
  const rawClientName = getSafeValue(rowData, 'Client Inherent Flaw') || 
                        getSafeValue(rowData, 'Client') || 
                        getSafeValue(rowData, 'Inherent') || 
                        getSafeValue(rowData, 'Name');

  const cleanName = rawClientName ? rawClientName.trim() : 'Unknown Client';
  
  // Script data se match karo
  let data = allNegligenceData ? allNegligenceData[cleanName] : null;

  // Fuzzy match fallback
  if (!data && allNegligenceData) {
     const foundKey = Object.keys(allNegligenceData).find(k => 
        k.toLowerCase().trim() === cleanName.toLowerCase()
     );
     if (foundKey) data = allNegligenceData[foundKey];
  }

  // Theme Colors
  const bgClass = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50';

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border p-0 relative custom-scrollbar ${bgClass}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold transition-colors"
          >
            ✕
          </button>
          
          <h2 className="text-3xl font-bold mb-2">{cleanName}</h2>
          <p className="text-blue-100 text-sm uppercase tracking-wider font-semibold">Cost of Negligence Report</p>
          
          {data && (
             <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                   <span className="block text-xs text-white/70 uppercase">Estimated Loss</span>
                   <span className="text-xl font-bold text-white">{data.estimated_loss || 'N/A'}</span>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                   <span className="block text-xs text-white/70 uppercase">Critical Bugs</span>
                   <span className="text-xl font-bold text-red-400">{data.critical_count || 0}</span>
                </div>
                <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                   <span className="block text-xs text-white/70 uppercase">Major Bugs</span>
                   <span className="text-xl font-bold text-orange-400">{data.major_count || 0}</span>
                </div>
             </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-8">
          {!data ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className={`text-xl font-bold mb-2 ${textMain}`}>Data Not Available</h3>
              <p className={textSub}>
                Detailed negligence report for <strong>{cleanName}</strong> has not been uploaded to the database yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
               <h3 className={`text-lg font-bold border-b pb-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${textMain}`}>
                 Vulnerability Breakdown
               </h3>
               
               <div className="grid gap-4">
                 {data.issues && data.issues.map((issue, idx) => {
                   const isCritical = issue.level.toLowerCase() === 'critical';
                   const badgeColor = isCritical 
                     ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                     : 'bg-orange-500/10 text-orange-500 border-orange-500/20';
                   
                   return (
                     <div key={idx} className={`p-5 rounded-xl border flex items-start gap-4 transition-all hover:shadow-lg ${cardBg} ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className={`mt-1 min-w-[80px] text-center px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
                          {issue.level}
                        </div>
                        <div>
                          <h4 className={`text-base font-bold mb-1 ${textMain}`}>{issue.title}</h4>
                          <p className={`text-sm leading-relaxed ${textSub}`}>{issue.desc}</p>
                        </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NegligenceModal;