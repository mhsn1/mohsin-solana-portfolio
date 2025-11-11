// /components/History.jsx

import React from 'react';

const History = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-10 text-center text-solana-green">Professional Journey</h2>
      
      <div className="space-y-10">
        
        {/* Employment */}
        <div className="border-l-4 border-blue-400 pl-6">
          <h3 className="text-3xl font-semibold mb-4 text-white">Employment History</h3>
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-solana-green">Blockchain Developer | Smart contract Auditor | BlockApex</p>
            <p className="text-sm text-gray-400">April 2022 - February 2025</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-solana-green">IT Manager | Government Of Pakistan</p>
            <p className="text-sm text-gray-400">March 2016 - June 2017</p>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="border-l-4 border-solana-green pl-6">
          <h3 className="text-3xl font-semibold mb-4 text-white">Education & Credentials</h3>
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-blue-400">Bachelor of Science (BS), Computer Science</p>
            <p className="text-sm text-gray-400">Superior University Lahore (2014-2018)</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-lg font-bold text-blue-400">Certification: Financial Technology (Fintech) Innovations</p>
            <p className="text-sm text-gray-400">Provider: University of Michigan (Issued: November 2020)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;