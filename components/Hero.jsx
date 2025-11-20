import React, { useState, useEffect } from 'react';
import AuditTable from './AuditTable';
import DetailModal from './DetailModal';
import GridBackground from './GridBackground';
import { parseCsv } from './csvParser';
import { useTheme } from './ThemeContext';

// ** Custom CSS block for Audiowide font (pichle modification se) **
const customStyles = `
  /* --- SECURE TEXT --- */
  .text-audiowide {
    font-family: 'Audiowide', cursive;
    /* letter-spacing: 2px; */
  }
`;

const Hero = () => {
  const { theme } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const SHEET_CONFIG = {
    mainSheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKKofpQLGgd0PgszXT9iMg0ujx25bAzdhW-agBd4sLIeutZu27h7Ug6DhWRcN7uWl2TcIyHIuCr8f2/pub?gid=0&single=true&output=csv',
    detailSheets: [{clientName: 'SecureDEX', endpoint: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKKofpQLGgd0PgszXT9iMg0ujx25bAzdhW-agBd4sLIeutZu27h7Ug6DhWRcN7uWl2TcIyHIuCr8f2/pub?gid=654958656&single=true&output=csv'}]
  };

  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const cacheBuster = `&t=${Date.now()}`;
        const finalUrl = endpoint.includes('?') ? `${endpoint}${cacheBuster}` : `${endpoint}?${cacheBuster}`;
        const response = await fetch(finalUrl, { 
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.text();
      } catch (err) {
        console.error('Data Fetching Error:', err);
        return "";
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      const mainCsv = await fetchData(SHEET_CONFIG.mainSheet);
      if (!mainCsv) { setError('Could not load main data.'); setIsLoading(false); return; }
      const parsedMainData = parseCsv(mainCsv);
      if (parsedMainData.length === 0) { setError('No data found.'); setIsLoading(false); return; }
      const sortedMainData = parsedMainData.filter(item => item.Date).sort((a, b) => new Date(b.Date) - new Date(a.Date));
      setTableData(sortedMainData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const openModal = (clientName) => { setSelectedClient(clientName); setIsModalOpen(true); };

  const TABLE_BORDER_COLOR = theme === 'dark' ? 'rgba(153, 69, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      
      {/* Naya style tag yahan add kiya gaya hai */}
      <style>{customStyles}</style>
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <GridBackground />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 py-16 flex flex-col md:flex-row items-center justify-between mx-auto pointer-events-none">
        
        <div className="md:w-4/5 mt-10 md:mt-0 text-center md:text-left p-4">
          
          
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-sm ${
              theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            We <span className="text-audiowide">secure.</span> <br />
            <span className="text-blue-500">You grow.</span> 
          </h1>
          
          
          <div className="mt-8 space-x-4 flex justify-center md:justify-start pointer-events-auto">
            <a href="https://calendly.com/mohsinarif84/discovery-call" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
              Schedule Call
            </a>
            {/* 'View Expertise' button yahan se remove kar diya gaya hai */}
          </div>
        </div>


        <div className="md:w-4/5 w-full p-4 mt-8 md:-mt-48 md:ml-12 pointer-events-auto">
          <h2 className={`text-2xl font-bold mb-6 text-center md:text-left drop-shadow-sm pl-2 ${
              theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
              Recent Audit Case Studies
          </h2>
          
          <AuditTable 
              data={tableData}
              isLoading={isLoading}
              error={error}
              onRowClick={openModal}
              borderColor={TABLE_BORDER_COLOR}
          />
        </div>
      </div>

      <div className="pointer-events-auto">
        <DetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clientName={selectedClient} detailSheets={SHEET_CONFIG.detailSheets} TABLE_BORDER_COLOR={TABLE_BORDER_COLOR} />
      </div>
    </section>
  );
};

export default Hero;