import React, { useState, useEffect } from 'react';
import AuditTable from './AuditTable';
import DetailModal from './DetailModal';
import NegligenceModal from './NegligenceModal';
import GridBackground from './GridBackground';
import StatsSection from './StatsSection';
import { parseCsv } from './csvParser';
import { useTheme } from './ThemeContext';

const customStyles = `
  .text-audiowide { font-family: 'Audiowide', cursive; }
`;

const Hero = () => {
  const { theme } = useTheme();
  
  // States
  const [tableData, setTableData] = useState([]); 
  const [detailsData, setDetailsData] = useState({});
  const [negligenceData, setNegligenceData] = useState({});
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [selectedNegligenceRow, setSelectedNegligenceRow] = useState(null);

  // URLs
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTWZidn_GzAw1z8hz0qWrsU_1RCk1-PsRKkZGtR7Sf48af5bUP-8BhcPXrgGg7AER42nPAi_0CQ2FWg/pub?output=csv';
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFswsDy4VgqyaxLAfUcqUhJdwERhgp6S4zY_9pvPAwh-kDBEtc-ovnX2xqX0qd53NOBQ/exec';

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [sheetRes, scriptRes] = await Promise.all([
          fetch(`${SHEET_URL}&t=${Date.now()}`),
          fetch(SCRIPT_URL, { method: "GET", redirect: "follow" }) 
        ]);

        if (!scriptRes.ok) console.warn("Script fetch failed");

        // 1. Parse Sheet Data
        const csvText = await sheetRes.text();
        const parsedSheet = parseCsv(csvText);
        const sortedSheet = parsedSheet.sort((a, b) => {
            const dateA = new Date(a.Date || '2000-01-01'); 
            const dateB = new Date(b.Date || '2000-01-01');
            return dateB - dateA;
        });
        setTableData(sortedSheet);

        // 2. Parse Script Data
        let scriptJson = {};
        try {
            scriptJson = await scriptRes.json();
        } catch (e) { console.error("JSON Parse Error", e); }
        
        if (scriptJson.audit_details) setDetailsData(scriptJson.audit_details);
        if (scriptJson.negligence_details) setNegligenceData(scriptJson.negligence_details);

      } catch (err) { 
        console.error("Error loading data:", err);
        setError('Failed to load data.'); 
      } finally { 
        setIsLoading(false); 
      }
    };
    loadData();
  }, []);

  const TABLE_BORDER_COLOR = theme === 'dark' ? 'rgba(153, 69, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <section className={`relative w-full min-h-screen flex flex-col overflow-x-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <style>{customStyles}</style>
      
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
         <GridBackground />
      </div>

      

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 w-full max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between mx-auto min-h-[80vh]">
        <div className="md:w-4/5 mt-10 md:mt-0 text-center md:text-left p-4">
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            We <span className="text-audiowide">secure.</span> <br />
            <span className="text-blue-500">You grow.</span> 
          </h1>
           <div className="mt-8 space-x-4 flex justify-center md:justify-start pointer-events-auto">
            <a href="https://calendly.com/mohsinarif84/discovery-call" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg">Schedule Call</a>
          </div>
        </div>

        <div className="md:w-4/5 w-full p-4 mt-8 md:-mt-48 md:ml-12 pointer-events-auto">
           <h2 className="text-2xl font-bold mb-6">Recent Audit Case Studies</h2>
           <AuditTable 
              data={tableData}
              isLoading={isLoading}
              error={error}
              borderColor={TABLE_BORDER_COLOR}
              onClientClick={(clientName) => setSelectedClientName(clientName)}
              onCostClick={(rowItem) => setSelectedNegligenceRow(rowItem)}
           />
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative z-10 bg-white w-full">
        <StatsSection detailsData={detailsData} negligenceData={negligenceData} tableData={tableData} />
      </div>

      {/* Modals */}
      <DetailModal 
        isOpen={!!selectedClientName} 
        onClose={() => setSelectedClientName(null)} 
        clientName={selectedClientName} 
        allDetails={detailsData} 
        TABLE_BORDER_COLOR={TABLE_BORDER_COLOR} 
      />

      <NegligenceModal
        isOpen={!!selectedNegligenceRow}
        onClose={() => setSelectedNegligenceRow(null)}
        rowData={selectedNegligenceRow}
        allNegligenceData={negligenceData}
      />
    </section>
  );
};

export default Hero;