import React, { useState, useEffect } from 'react';

const GridBackground = () => {
  const [gridCells, setGridCells] = useState([]);
  
  // ✅ COLS=30 (Width ke liye theek hai)
  // ✅ ROWS=40 (Height barha di kyunke ab ye 2 sections cover karega)
  const COLS = 50; 
  const ROWS = 32;  

  useEffect(() => {
    const cells = Array.from({ length: COLS * ROWS }).map((_, index) => ({
      id: index,
      grade: Math.floor(Math.random() * 12 - 6),
      opacity: Math.min(Math.random(), 0.2),
      hue: Math.floor(Math.random() * 30),
    }));
    setGridCells(cells);
  }, []);

  return (
    // Absolute inset-0 ensures it covers the full parent container
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0">
      <div className="custom-grid" style={{ '--cols': COLS, '--rows': ROWS }}>
        {gridCells.map((cell) => (
          <div
            key={cell.id}
            className="grid-cell"
            style={{
              '--grade': cell.grade,
              '--opacity': cell.opacity,
              '--hue': cell.hue,
            }}
          >
            +
          </div>
        ))}
      </div>

      <style>{`
        .custom-grid {
          display: grid;
          grid-template-columns: repeat(var(--cols), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
          gap: 0;
          width: 100%;
          height: 100%;
        }
        
        .grid-cell {
          display: grid;
          place-items: center;
          font-family: monospace;
          font-size: 1.5rem;
          font-weight: 600;
          color: hsl(var(--hue), 80%, 60%);
          opacity: calc(var(--opacity) + 0.05);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out, filter 0.4s ease-out;
          user-select: none;
          cursor: crosshair;
        }

        .grid-cell:hover {
          opacity: 1;
          transform: scale(1.5);
          filter: brightness(1.5) grayscale(0);
          transition: all 0s;
          color: #60a5fa;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .custom-grid {
            grid-template-columns: repeat(10, 1fr);
            grid-template-rows: repeat(30, 1fr); /* Mobile par aur zyada rows */
          }
        }
      `}</style>
    </div>
  );
};

export default GridBackground;