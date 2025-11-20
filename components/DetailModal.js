import React, { useState, useEffect } from 'react';
// ✅ Updated Import Path
import { parseCsv } from './csvParser';

const DetailModal = ({ isOpen, onClose, clientName, detailSheets, TABLE_BORDER_COLOR }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700 p-6 relative" 
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: TABLE_BORDER_COLOR }}
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
          <h3 className="text-2xl font-bold text-white">{clientName} <span className="text-gray-500 text-lg font-normal">| Project History</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-3xl leading-none focus:outline-none">
            &times;
          </button>
        </div>

        {isLoadingDetail ? (
          <div className="p-12 text-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
             <p className="text-green-400">Loading project details...</p>
          </div>
        ) : detailError ? (
          <div className="p-8 text-center text-yellow-400 bg-yellow-900/20 rounded-lg border border-yellow-900/50">{detailError}</div>
        ) : clientData.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No projects found for this client.</p>
        ) : (
          <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800 sticky top-0">
                <tr>
                  {allKeys.map(key => (
                    <th key={key} className="px-4 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap shadow-sm bg-gray-800">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clientData.map((project, index) => (
                  <tr key={index} className="transition duration-150 ease-in-out hover:bg-gray-800/50">
                    {allKeys.map(key => {
                      const value = project[key];
                      const isLink = value && (value.startsWith('http://') || value.startsWith('https://'));
                      return (
                        <td key={key} className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap border-b border-gray-800">
                          {isLink ? (
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium underline decoration-blue-400/30 underline-offset-4">View Link</a>
                          ) : (value || <span className="text-gray-600 italic">N/A</span>)}
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
            background: rgba(0, 0, 0, 0.2); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(153, 69, 255, 0.3); 
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default DetailModal;