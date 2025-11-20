import React from 'react';
import { useTheme } from './ThemeContext'; // ✅ Theme Import kiya

const getResultColor = (summary, theme) => {
  if (!summary) return theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  
  // Dark Mode Colors
  if (theme === 'dark') {
    if (summary.includes('No critical') || summary.includes('Complete') || summary.includes('Secure')) {
      return 'text-green-400 border-green-400/30 bg-green-400/10';
    } else if (summary.includes('Minor optimization') || summary.includes('Good') || summary.includes('Minor Fixes')) {
      return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    } else if (summary.includes('Review')) {
      return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    } else if (summary.includes('critical') || summary.includes('major')) {
      return 'text-red-400 border-red-400/30 bg-red-400/10';
    }
    return 'text-gray-400';
  } 
  // Light Mode Colors
  else {
    if (summary.includes('No critical') || summary.includes('Complete') || summary.includes('Secure')) {
      return 'text-green-700 border-green-200 bg-green-50';
    } else if (summary.includes('Minor optimization') || summary.includes('Good') || summary.includes('Minor Fixes')) {
      return 'text-blue-700 border-blue-200 bg-blue-50';
    } else if (summary.includes('Review')) {
      return 'text-yellow-700 border-yellow-200 bg-yellow-50';
    } else if (summary.includes('critical') || summary.includes('major')) {
      return 'text-red-700 border-red-200 bg-red-50';
    }
    return 'text-gray-600';
  }
};

const AuditTable = ({ data, isLoading, error, onRowClick, borderColor }) => {
  const { theme } = useTheme(); 

  // Dynamic Styles
  const containerClass = theme === 'dark' 
    ? 'bg-black/40 border-white/10 backdrop-blur-md' 
    : 'bg-white border-gray-200 shadow-xl';

  const headerClass = theme === 'dark'
    ? 'bg-gray-900/90 text-white'
    : 'bg-gray-100 text-gray-800 border-b border-gray-200';

  const rowHoverClass = theme === 'dark'
    ? 'hover:bg-white/5'
    : 'hover:bg-gray-50';

  const textMain = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';

  return (
    <div 
      className={`rounded-xl overflow-hidden border transition-colors duration-300 ${containerClass}`}
      style={{ 
        boxShadow: theme === 'dark' ? 'none' : '0 10px 30px rgba(0,0,0,0.05)', 
        borderColor: borderColor,
        // 👇 YAHAN SE TABLE KI HEIGHT ADJUST KAREIN (Line 60 approx)
        maxHeight: '600px' 
      }}
    >
      {/* Error Message */}
      {error && (
        <div className={`p-4 text-center text-sm border-b ${theme === 'dark' ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-50 text-red-600 border-red-100'}`}>
            ⚠️ {error}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading ? (
        <div className={`p-6 text-center ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>Loading data from API...</div>
      ) : data.length > 0 ? (
        // 👇 YAHAN BHI HEIGHT ADJUST KAREIN (Agar 400px se zyada chahiye)
        <div className="overflow-y-auto max-h-[400px] relative hide-scrollbar">
          <table className="min-w-full divide-y" style={{ borderCollapse: 'separate', borderSpacing: '0 0' }}>
            
            {/* Sticky Header */}
            <thead className={`sticky top-0 z-10 backdrop-blur ${headerClass}`}> 
              <tr>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider min-w-[120px] shadow-sm">Title</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider min-w-[100px] shadow-sm">Client</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider min-w-[100px] shadow-sm">Project Type</th>
                <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider min-w-[140px] shadow-sm">Status</th>
                <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider min-w-[80px] shadow-sm">Details</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
              {data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`transition duration-150 ease-in-out cursor-pointer ${rowHoverClass}`}
                  onClick={() => onRowClick(item.Client_Name)}
                  style={{ borderBottom: `1px solid ${borderColor}` }}
                >
                  <td className={`px-3 py-3 text-sm font-semibold min-w-[120px] ${textMain}`}>
                    {item.Title || 'N/A'}
                  </td>
                  <td className={`px-3 py-3 text-sm min-w-[100px] ${textSub}`}>
                    {item.Client_Name || 'N/A'}
                  </td>
                  <td className={`px-3 py-3 text-sm min-w-[100px] ${textMuted}`}>
                    {item.Project_Type || 'N/A'}
                  </td>
                  <td className="px-3 py-3 min-w-[140px]">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getResultColor(item.Result_Summary, theme)}`}>
                      {item.Result_Summary ? item.Result_Summary.split('.')[0] : 'N/A'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-sm min-w-[80px]">
                    <button className={`font-medium text-xs uppercase tracking-wide ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`p-6 text-center ${textSub}`}>No data found.</div>
      )}
      
      {/* Scrollbar Hiding Styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }
        .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default AuditTable;