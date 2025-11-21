import React from 'react';
import { useTheme } from './ThemeContext';

// Helpers wese hi rahenge
const getSafeValue = (item, searchKey) => {
  if (!item) return null;
  const keys = Object.keys(item);
  const foundKey = keys.find(k => k.toLowerCase().replace(/_/g, ' ').includes(searchKey.toLowerCase()));
  return foundKey ? item[foundKey] : null;
};

const getStatusColor = (status, theme) => {
  // ... same previous logic ...
  if (!status) return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const s = status.toString().toLowerCase().trim();
  if (s.includes('uploaded') || s.includes('secure')) return theme === 'dark' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-green-50 text-green-700 border-green-200';
  if (s.includes('pending')) return theme === 'dark' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  if (s.includes('critical') || s.includes('major')) return theme === 'dark' ? 'bg-red-400/10 text-red-400 border-red-400/20' : 'bg-red-50 text-red-700 border-red-200';
  return theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
};

// ✅ Props update kiye: onClientClick aur onCostClick
const AuditTable = ({ data, isLoading, error, onClientClick, onCostClick, borderColor }) => {
  const { theme } = useTheme(); 
  const containerClass = theme === 'dark' ? 'bg-black/40 border-white/10 backdrop-blur-md' : 'bg-white border-gray-200 shadow-xl';
  const headerClass = theme === 'dark' ? 'bg-gray-900/90 text-white' : 'bg-gray-100 text-gray-800 border-b border-gray-200';
  const rowHoverClass = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`rounded-xl overflow-hidden border transition-colors duration-300 ${containerClass}`} style={{ borderColor: borderColor, maxHeight: '600px' }}>
      {isLoading ? (
        <div className="p-6 text-center text-blue-500">Loading Audit Data...</div>
      ) : data.length > 0 ? (
        <div className="overflow-y-auto max-h-[400px] relative hide-scrollbar">
          <table className="min-w-full divide-y" style={{ borderCollapse: 'separate', borderSpacing: '0 0' }}>
            <thead className={`sticky top-0 z-10 backdrop-blur ${headerClass}`}> 
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Identity & Origin</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Client Inherent Flaw</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Magnitude of Risk</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Cost of Negligence</th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">Mirror of Reality</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
              {data.map((item, index) => {
                const identity = getSafeValue(item, 'identity') || 'N/A';
                const clientName = getSafeValue(item, 'inherent') || getSafeValue(item, 'client') || 'N/A';
                const risk = getSafeValue(item, 'magnitude') || getSafeValue(item, 'risk') || 'N/A';
                const cost = getSafeValue(item, 'cost') || getSafeValue(item, 'negligence') || 'N/A';
                const mirrorStatus = getSafeValue(item, 'mirror') || getSafeValue(item, 'reality') || 'Pending';

                return (
                  <tr 
                    key={index} 
                    className={`transition duration-150 ${rowHoverClass}`}
                    style={{ borderBottom: `1px solid ${borderColor}` }}
                    // ❌ REMOVED: onClick from TR
                  >
                    <td className={`px-4 py-3 text-sm font-semibold ${textMain} cursor-default`}>{identity}</td>
                    
                    {/* ✅ CLICKABLE CLIENT */}
                    <td 
                      className={`px-4 py-3 text-sm font-bold text-blue-500 hover:underline cursor-pointer`}
                      onClick={(e) => { e.stopPropagation(); onClientClick(clientName); }}
                    >
                      {clientName !== 'N/A' ? <>{clientName} ↗</> : 'N/A'}
                    </td>
                    
                    <td className={`px-4 py-3 text-sm ${textMain} cursor-default`}>{risk}</td>
                    
                    {/* ✅ CLICKABLE COST OF NEGLIGENCE */}
                    <td 
                      className={`px-4 py-3 text-sm font-medium hover:text-purple-400 cursor-pointer transition-colors ${textSub}`}
                      onClick={(e) => { e.stopPropagation(); onCostClick(item); }} // Pass full row item
                    >
                      {cost} <span className="text-xs opacity-50 ml-1">ℹ️</span>
                    </td>
                    
                    <td className="px-4 py-3 text-center cursor-default">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(mirrorStatus, theme)}`}>
                        {mirrorStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : ( <div className="p-6 text-center text-gray-500">No data found.</div> )}
      <style jsx>{` .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `}</style>
    </div>
  );
};

export default AuditTable;