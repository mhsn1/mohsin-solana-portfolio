import React, { useState, useEffect } from 'react';
import { parseCsv } from './csvParser';
import { useTheme } from './ThemeContext';

const DetailModal = ({ isOpen, onClose, clientName, detailSheets, TABLE_BORDER_COLOR }) => {
  const { theme } = useTheme(); 
  const [clientData, setClientData] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    if (!isOpen || !clientName) return;
    
    const fetchClientDetails = async () => {
      setIsLoadingDetail(true);
      setDetailError(null);
      
      const clientSheet = detailSheets.find(
        sheet => sheet.clientName.toLowerCase() === clientName.toLowerCase()
      );
      
      if (!clientSheet) {
        setDetailError(`No detail sheet configured for ${clientName}`);
        setIsLoadingDetail(false);
        return;
      }
      
      try {
        const endpoint = clientSheet.endpoint;
        const cacheBuster = `&t=${Date.now()}`;
        const finalUrl = endpoint.includes('?') ? `${endpoint}${cacheBuster}` : `${endpoint}?${cacheBuster}`;

        const response = await fetch(finalUrl, { headers: { 'Cache-Control': 'no-cache' } });
        if (!response.ok) throw new Error('Failed to fetch detail data');
        
        const csvText = await response.text();
        const parsed = parseCsv(csvText);
        setClientData(parsed);
      } catch (err) {
        console.error('Detail fetch error:', err);
        setDetailError('Could not load project details');
      } finally {
        setIsLoadingDetail(false);
      }
    };
    
    fetchClientDetails();
  }, [isOpen, clientName, detailSheets]);

  if (!isOpen || !clientName) return null;

  const allKeys = clientData.length > 0 
    ? Object.keys(clientData[0]).filter(key => {
        return clientData.some(row => row[key] && row[key].trim() !== '');
      })
    : [];

  // ✅ Dynamic Classes based on Theme
  // Modal Body Background and Border
  const modalBg = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  
  // Text Colors
  const headerText = theme === 'dark' ? 'text-white' : 'text-gray-900'; 
  const subText = theme === 'dark' ? 'text-gray-500' : 'text-gray-400'; 
  const tableBodyText = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const N_A_Color = theme === 'dark' ? 'text-gray-600' : 'text-gray-400';
  const closeBtnColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black';
  const linkColor = 'text-blue-500 hover:text-blue-700';

  // Table Styles
  const tableHeadBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const tableHeadText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const rowDivider = theme === 'dark' ? 'divide-gray-800' : 'divide-gray-200';
  const rowHover = theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50';

  return (
    // Overlay black hi rahega, ye theek hai
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        // Modal Body: bg-white ya bg-gray-900 lagayenge
        className={`rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border p-6 relative ${modalBg}`} 
        onClick={(e) => e.stopPropagation()}
        style={{ 
            borderColor: TABLE_BORDER_COLOR, 
            // Optional: Agar global CSS override kar rahi ho to yahan background-color: #ffffff laga sakte hain
        }}
      >
        <div className={`flex justify-between items-center border-b pb-3 mb-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-2xl font-bold ${headerText}`}>{clientName} <span className={`text-lg font-normal ${subText}`}>| Project History</span></h3>
          <button onClick={onClose} className={`transition-colors text-3xl leading-none focus:outline-none ${closeBtnColor}`}>
            &times;
          </button>
        </div>

        {isLoadingDetail ? (
          <div className="p-12 text-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
             <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-blue-600'}`}>Loading project details...</p>
          </div>
        ) : detailError ? (
          <div className={`p-8 text-center text-sm rounded-lg border ${theme === 'dark' ? 'text-yellow-400 bg-yellow-900/20 border-yellow-900/50' : 'text-yellow-800 bg-yellow-50 border-yellow-200'}`}>{detailError}</div>
        ) : clientData.length === 0 ? (
          <p className={`text-center py-8 ${tableBodyText}`}>No projects found for this client.</p>
        ) : (
          <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
            <table className={`min-w-full divide-y ${rowDivider}`}>
              <thead className={`${tableHeadBg} sticky top-0`}>
                <tr>
                  {allKeys.map(key => (
                    <th key={key} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-sm ${tableHeadText} ${tableHeadBg}`}>
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${rowDivider}`}>
                {clientData.map((project, index) => (
                  <tr key={index} className={`transition duration-150 ease-in-out ${rowHover}`}>
                    {allKeys.map(key => {
                      const value = project[key];
                      const isLink = value && (value.startsWith('http://') || value.startsWith('https://'));
                      return (
                        <td key={key} className={`px-4 py-3 text-sm whitespace-nowrap border-b ${rowDivider} ${tableBodyText}`}>
                          {isLink ? (
                            <a href={value} target="_blank" rel="noopener noreferrer" className={`font-medium underline decoration-blue-400/30 underline-offset-4 ${linkColor}`}>View Link</a>
                          ) : (value || <span className={`italic ${N_A_Color}`}>N/A</span>)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'}; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${theme === 'dark' ? 'rgba(153, 69, 255, 0.3)' : 'rgba(59, 130, 246, 0.5)'}; /* Blue for light theme */
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default DetailModal;