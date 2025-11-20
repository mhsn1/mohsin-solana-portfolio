import React, { useState } from 'react';
import { useTheme } from './ThemeContext'; // ✅ Theme Context Import

const auditSteps = [
  { 
    step: "01",
    id: "discovery",
    title: "Discovery & Scoping", 
    icon: "search", 
    shortDesc: "Architecture & Scope",
    description: "Understanding the protocol architecture, gathering documentation, and defining the audit scope to ensure full coverage." 
  },
  { 
    step: "02",
    id: "analysis",
    title: "Manual & Static Analysis", 
    icon: "code",
    shortDesc: "Deep Code Review",
    description: "Line-by-line manual code review combined with automated static analysis tools to identify logic errors and vulnerabilities." 
  },
  { 
    step: "03",
    id: "reporting",
    title: "Vulnerability Reporting", 
    icon: "bug_report",
    shortDesc: "Critical Fixes",
    description: "Delivering a detailed report categorizing issues by severity (Critical, Major, Medium) with recommended fixes." 
  },
  { 
    step: "04",
    id: "certification",
    title: "Fix Review & Certification", 
    icon: "verified_user",
    shortDesc: "Final Security Seal",
    description: "Verifying the applied fixes and issuing the final audit certificate confirming the security of the smart contracts." 
  },
];

const AuditingProcess = () => {
  const { theme } = useTheme(); // ✅ Get current theme
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = auditSteps[activeStepIndex];

  // ✅ Dynamic Colors based on Theme
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const textMuted = theme === 'dark' ? '#9ca3af' : '#4b5563'; // Gray-400 vs Gray-600
  const cardBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)';
  const cardBorder = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const shadow = theme === 'dark' ? 'none' : '0 10px 30px rgba(0,0,0,0.1)';
  
  const listBg = theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#ffffff';
  const listBorder = theme === 'dark' ? 'transparent' : '#e5e7eb';
  const listIconColor = theme === 'dark' ? '#ffffff' : '#6b7280';

  return (
    <>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&family=Big+Shoulders+Display:wght@500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    `}</style>

    <section className="skillcontainer" id="auditing-process">
      
      <div className="skill_intro">
        <h2>Our Process</h2>
        <p>
          Securing a smart contract is not just about finding bugs; it's about ensuring logic integrity and capital efficiency.
        </p>
        <p>
          My auditing methodology follows a rigorous 4-step standard used by top firms to guarantee protocol safety.
        </p>
      </div>

      <div className="skillcontainer_inner">  
        
        {/* LEFT: Summary */}
        <div className="skill skill_summary">
          <h2 className="summary_title">SECURITY <span>ROADMAP</span></h2>
          <h3 className="summary_level_desc">CURRENT PHASE</h3>
          
          <div className='summary_level-rank'>
            <h2 className="summary_level">STEP {currentStep.step}</h2>
          </div>

          <div className="summary_img_wrapper">
             <span className="material-icons summary_main_icon">{currentStep.icon}</span>
          </div>
          
          <div className="summary_message">
            <svg className="border" viewBox="0 0 300 180">
              <path d="M142.8,5.2l-22.5,8.3-4.7,1.7,4.6,2,12.3,5.3-17.1,9.9L109,36.2H297.2V178H2.8V36.2H60.4l.4-.2,33-13.6,3-1.3L94.4,19l-5.9-5.2,54.3-8.6M162.5,0,83.9,12.5l9.1,8L60,34.2H.8V180H299.2V34.2H116.4l20.5-12-16-6.8L162.5,0Z"></path>
            </svg>
            <div className="text">
                <h4 className="highline text-xl mb-2">{currentStep.title}</h4>
                {currentStep.description}
            </div>
          </div>
        </div>

        {/* MIDDLE: List */}
        <div className="skill skill_progress">
          <div className="progress">
            <div className="progress_icon">
                <span className="material-icons text-5xl text-purple-500">security</span>
            </div>
            <div className="progress_lists">
              <ul className="lists_block">
                {auditSteps.map((item, index) => (
                  <li 
                    key={index} 
                    className={`list ${index === activeStepIndex ? 'active' : ''} ${index < activeStepIndex ? 'completed' : ''}`}
                    onClick={() => setActiveStepIndex(index)}
                  >
                    <a href="#auditing-process" onClick={(e) => e.preventDefault()}>
                      <i className="material-icons">{item.icon}</i>
                    </a>
                    <small className="recommend">
                        <span>Step {item.step}</span>
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="skill skill_detail">
          <div className="detail_top">
            <div className="logo">
                <i className="material-icons">{currentStep.icon}</i>
            </div>
            <div className="name">{currentStep.shortDesc}</div>
          </div>
          
          <div className="detail_bottom">
            <div className="unit recommend">
              <div className="top">
                <div className="logo"><i className="material-icons">info</i></div>
                <div className="name">KEY ACTIONS</div>
              </div>
              <div className="bottom text-sm px-4">
                 <p>• Comprehensive Analysis</p>
                 <p>• {currentStep.title}</p>
                 <p>• Verification & Validation</p>
              </div>
            </div>
            
            <button 
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % auditSteps.length)}
                className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded transition-colors"
            >
                NEXT STEP &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>

    <style jsx>{`
      .skillcontainer {
        font-family: 'Nunito', sans-serif;
        display: flex;
        flex-direction: column;
        padding: 0 20px 40px 20px; 
        width: 100%;
        min-height: auto; 
        position: relative;
        overflow: visible; 
        background: transparent;
        color: ${textColor}; /* ✅ Dynamic Main Color */
      }

      .skill_intro {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto 10px auto; 
        padding: 10px;
      }
      .skill_intro h2 {
        color: ${textColor}; /* ✅ Dynamic Heading */
        font-size: 2.5rem;
        font-family: 'Big Shoulders Display', cursive;
        text-transform: uppercase;
        margin-bottom: 10px;
        color: #3b82f6; /* Blue Tint */
      }
      .skill_intro p {
        color: ${textMuted}; /* ✅ Dynamic Paragraph */
        margin-bottom: 5px;
      }

      .skillcontainer_inner {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        z-index: 2;
      }

      /* Cards Styling */
      .skill_summary, .skill_detail {
        width: 350px;
        background: ${cardBg}; /* ✅ Dynamic Background */
        border: 1px solid ${cardBorder}; /* ✅ Dynamic Border */
        box-shadow: ${shadow}; /* ✅ Dynamic Shadow */
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        backdrop-filter: blur(10px);
        transition: background 0.3s, border 0.3s;
      }
      
      .summary_title {
        font-family: 'Big Shoulders Display', cursive;
        color: #d946ef; /* Fuchsia */
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }
      
      .summary_level_desc {
        background-color: #3b82f6;
        color: #fff;
        padding: 2px 10px;
        font-size: 0.7rem;
        margin: 5px 0 15px 0;
        border-radius: 2px;
      }
      
      .summary_level-rank {
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid ${cardBorder};
        margin-bottom: 20px;
      }
      .summary_level {
        font-size: 1.5rem;
        font-family: 'Big Shoulders Display', cursive;
        border-bottom: 4px solid #8b5cf6;
        padding-bottom: 5px;
        color: ${textColor}; /* ✅ Dynamic Text */
      }

      .summary_img_wrapper {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
      }
      .summary_main_icon {
        font-size: 80px;
        color: #d946ef;
        filter: drop-shadow(0 0 10px #d946ef);
        animation: float 3s ease-in-out infinite;
      }

      .summary_message {
        position: relative;
        width: 100%;
        height: 200px;
      }
      .summary_message .border {
        width: 100%;
        height: 100%;
        transform: scaleX(-1);
      }
      .summary_message .border path { fill: rgba(0,0,0,0.02); stroke: #d946ef; stroke-width: 2; }
      
      .summary_message .text {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        text-align: center;
        font-size: 0.9rem;
        line-height: 1.4;
        color: ${textMuted}; /* ✅ Dynamic Description Text */
      }
      .highline { color: #d946ef; font-weight: bold; }

      .skill_progress {
        flex: 1;
        min-width: 300px;
        display: flex;
        justify-content: center;
      }
      .progress {
        display: flex;
        width: 100%;
        max-width: 400px;
      }
      .progress_icon {
        width: 60px;
        position: relative;
        display: flex;
        justify-content: center;
      }
      .progress_icon:before {
        content: '';
        position: absolute;
        width: 4px;
        height: 100%;
        background: ${theme === 'dark' ? '#35006a' : '#d1d5db'}; /* ✅ Line Color */
        top: 20px;
      }

      .lists_block {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        padding-left: 20px;
      }

      .list {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .list:hover { transform: translateX(5px); }

      .list a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        background: ${listBg}; /* ✅ Dynamic List Bg */
        border: 2px solid ${listBorder};
        border-radius: 10px;
        color: ${listIconColor}; /* ✅ Dynamic Icon Color */
        margin-right: 15px;
        transition: all 0.3s;
        box-shadow: ${shadow};
      }

      .list.active a {
        border-color: #d946ef;
        background: ${theme === 'dark' ? 'rgba(251, 97, 248, 0.2)' : '#fdf4ff'};
        color: #d946ef;
        box-shadow: 0 0 15px rgba(219, 39, 119, 0.4);
      }
      .list.completed a {
        border-color: #3b82f6;
        color: #3b82f6;
      }

      .recommend {
        display: flex;
        flex-direction: column;
        color: ${textMuted}; /* ✅ Dynamic */
        font-size: 0.9rem;
        font-family: 'Big Shoulders Display', cursive;
        letter-spacing: 1px;
      }

      .detail_top {
        padding: 20px;
        text-align: center;
        background: ${theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'};
        border-radius: 5px;
        margin-bottom: 10px;
        width: 100%;
      }
      .detail_top .logo i {
        font-size: 60px;
        color: ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#9ca3af'};
      }
      .detail_top .name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 10px;
        color: ${textColor}; /* ✅ Dynamic */
        font-family: 'Big Shoulders Display', cursive;
      }

      .detail_bottom {
        padding: 10px;
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .unit {
        background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f3f4f6'};
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        border: 1px solid ${cardBorder};
      }
      .unit .top {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        color: #d946ef;
      }
      .unit .top i { margin-right: 5px; }
      .unit .name { font-weight: bold; font-size: 0.8rem; }
      .unit .bottom { color: ${textMuted}; }

      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      @media (max-width: 768px) {
        .skillcontainer_inner {
           flex-direction: column;
           align-items: center;
        }
        .skill_summary, .skill_progress, .skill_detail {
          width: 100%;
          max-width: 100%;
        }
        .lists_block {
           flex-direction: row;
           overflow-x: auto;
           padding-bottom: 20px;
        }
        .progress_icon { display: none; }
        .list { flex-direction: column; margin-right: 20px; }
        .list a { margin-right: 0; margin-bottom: 10px; }
      }
    `}</style>
    </>
  );
};

export default AuditingProcess;