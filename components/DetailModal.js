import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';

const DetailModal = ({ isOpen, onClose, clientName, allDetails, TABLE_BORDER_COLOR }) => {
  const { theme } = useTheme(); 

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

  if (!isOpen || !clientName) return null;

  // ✅ LOGIC CHANGE: Script wala data 'Object' hai, Array nahi
  // Hum direct Key se data uthayenge (e.g., CLIENT_DETAILS['Babylon'])
  
  // Name clean karo (spaces hatao)
  const cleanName = clientName.trim();
  
  // Data dhoondo (Try exact match, then loose match)
  let clientAuditList = allDetails[cleanName];
  
  if (!clientAuditList) {
    // Agar exact match na mile, to milti julti key dhoondo
    const foundKey = Object.keys(allDetails).find(key => 
      key.toLowerCase().includes(cleanName.toLowerCase()) || 
      cleanName.toLowerCase().includes(key.toLowerCase())
    );
    if (foundKey) clientAuditList = allDetails[foundKey];
  }

  // Styles
  const modalBg = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const headerText = theme === 'dark' ? 'text-white' : 'text-gray-900'; 
  const subText = theme === 'dark' ? 'text-gray-500' : 'text-gray-400'; 
  const tableBodyText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const closeBtnColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black';
  const tableHeadBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const tableHeadText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const rowDivider = theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200';
  const rowHover = theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50';

  // Headers (Fixed hain kyunke Script me fixed structure hai)
  const HEADERS = ['Title', 'Status', 'Report', 'Type', 'Integrations', 'Ecosystem', 'Language', 'Date'];

  const getStatusColor = (val) => {
    if (!val) return null;
    const s = val.toLowerCase();
    if (s.includes('secure')) return 'bg-green-500/20 text-green-400 border border-green-500/30';
    if (s.includes('critical')) return 'bg-red-500/20 text-red-400 border border-red-500/30';
    if (s.includes('major')) return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className={`rounded-xl max-w-6xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border p-6 relative custom-scrollbar ${modalBg}`} 
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: TABLE_BORDER_COLOR }}
      >
        <div className={`flex justify-between items-center border-b pb-4 mb-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div>
            <h3 className={`text-2xl font-bold ${headerText}`}>{clientName}</h3>
            <span className={`text-sm ${subText}`}>
              {clientAuditList ? `Found ${clientAuditList.length} reports` : 'No reports found'}
            </span>
          </div>
          <button onClick={onClose} className={`transition-colors text-3xl leading-none focus:outline-none ${closeBtnColor}`}>&times;</button>
        </div>

        {!clientAuditList ? (
          <div className="text-center py-12">
            <p className={`${tableBodyText} opacity-70`}>
              No detailed audit history found for <strong>{clientName}</strong> in the script database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${rowDivider}`}>
              <thead className={tableHeadBg}>
                <tr>
                  {HEADERS.map(h => (
                    <th key={h} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${tableHeadText}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${rowDivider}`}>
                {clientAuditList.map((auditRow, index) => (
                  <tr key={index} className={`transition duration-150 ${rowHover}`}>
                    {/* Script Array Structure: [Title, Status, Link, Type, Integ, Eco, Lang, Date] */}
                    
                    {/* Title */}
                    <td className={`px-4 py-3 text-sm font-medium ${tableBodyText}`}>{auditRow[0]}</td>
                    
                    {/* Status */}
                    <td className="px-4 py-3 text-sm">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(auditRow[1]) || 'text-gray-500'}`}>
                         {auditRow[1]}
                       </span>
                    </td>

                    {/* Link */}
                    <td className="px-4 py-3 text-sm">
                      {auditRow[2] && auditRow[2].includes('http') ? (
                        <a href={auditRow[2]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Report</a>
                      ) : '-'}
                    </td>

                    {/* Baqi Columns */}
                    <td className={`px-4 py-3 text-sm ${tableBodyText}`}>{auditRow[3]}</td>
                    <td className={`px-4 py-3 text-sm ${tableBodyText}`}>{auditRow[4]}</td>
                    <td className={`px-4 py-3 text-sm ${tableBodyText}`}>{auditRow[5]}</td>
                    <td className={`px-4 py-3 text-sm ${tableBodyText}`}>{auditRow[6]}</td>
                    <td className={`px-4 py-3 text-sm ${tableBodyText}`}>{auditRow[7]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}; 
          border-radius: 5px; 
        }
      `}</style>
    </div>
  );
};

export default DetailModal;