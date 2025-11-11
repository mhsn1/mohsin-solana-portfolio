// /components/Expertise.jsx

import React from 'react';

const skills = [
  { title: "Blockchain Core (Rust & Anchor)", description: "Designing auditable and gas-efficient Solana programs for Escrow, Staking, and Tokenomics." },
  { title: "Optimized Frontend (React & Next.js)", description: "Building seamless user experiences with TypeScript for real-time Web3 interaction." },
  { title: "Security & Penetration Testing", description: "Full OWASP Top 10 Web-App Penetration Test and 14-day Free Re-test available (Starting From $149)." },
  { title: "High-Throughput Performance", description: "Proven ability to manage transactions and optimize compute units for demanding DeFi protocols." },
];

const Expertise = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-400">Core Expertise & Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-2xl transition duration-300 hover:scale-[1.03]">
            <h3 className="text-2xl font-semibold mb-3 text-solana-green">{skill.title}</h3>
            <p className="text-gray-400">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;