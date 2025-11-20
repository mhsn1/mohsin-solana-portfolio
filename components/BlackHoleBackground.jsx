import React, { useEffect, useRef } from 'react';
// ✅ Theme Import zaroori hai
import { useTheme } from './ThemeContext';

const BlackHoleBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme(); // ✅ Theme detect karega

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let render = { width: 0, hWidth: 0, height: 0, hHeight: 0, dpi: 1 };
    let discs = [];
    let dots = [];
    const startDisc = { x: 0, y: 0, w: 0, h: 0 };

    // --- Configuration based on Theme ---
    const isDark = theme === 'dark';
    
    // ✅ Background Color Logic
    const bgColor = isDark ? '#000000' : '#ffffff';
    
    // ✅ Disc Lines Color
    const discStroke = isDark ? '#111111' : '#eeeeee'; 
    
    // ✅ Dots Color (Blue/Purple hi rahenge, jaisa aapne kaha)
    const getDotColor = () => {
        return `rgb(${Math.random() * 50}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55})`;
    };

    const easings = {
      linear: (t) => t,
      outCubic: (t) => 1 - Math.pow(1 - t, 3),
      outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    };

    const tweenValue = (start, end, p, ease = 'linear') => {
      const delta = end - start;
      const easeFn = easings[ease] || easings.linear;
      return start + delta * easeFn(p);
    };

    const setCanvasSize = () => {
      if (!canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect();
      render = {
        width: rect.width,
        hWidth: rect.width * 0.5,
        height: rect.height,
        hHeight: rect.height * 0.5,
        // Performance Cap
        dpi: Math.min(window.devicePixelRatio || 1, 2)
      };
      canvas.width = render.width * render.dpi;
      canvas.height = render.height * render.dpi;
      startDisc.x = render.width * 0.5;
      startDisc.y = render.height * 0; 
      startDisc.w = render.width * 1;
      startDisc.h = render.height * 1;
    };

    const tweenDisc = (disc) => {
      const scaleX = tweenValue(1, 0, disc.p, 'outCubic');
      const scaleY = tweenValue(1, 0, disc.p, 'outExpo');
      disc.sx = scaleX;
      disc.sy = scaleY;
      disc.w = startDisc.w * scaleX;
      disc.h = startDisc.h * scaleY;
      disc.x = startDisc.x;
      disc.y = startDisc.y + disc.p * startDisc.h;
      return disc;
    };

    const setDiscs = () => {
      discs = [];
      const totalDiscs = 40; 
      for (let i = 0; i < totalDiscs; i++) {
        const p = i / totalDiscs;
        const disc = tweenDisc({ p });
        discs.push(disc);
      }
    };

    const setDots = () => {
      dots = [];
      const totalDots = 500; 
      for (let i = 0; i < totalDots; i++) {
        const disc = discs[Math.floor(discs.length * Math.random())];
        const dot = {
          d: disc,
          a: 0,
          c: getDotColor(), // ✅ Blue Dots
          p: Math.random(),
          o: Math.random()
        };
        dots.push(dot);
      }
    };

    const moveDiscs = () => {
      discs.forEach((disc) => {
        disc.p = (disc.p + 0.0002) % 1; 
        tweenDisc(disc);
        const p = disc.sx * disc.sy;
        let a = 1;
        if (p < 0.01) a = Math.pow(Math.min(p / 0.01, 1), 3);
        else if (p > 0.2) a = 1 - Math.min((p - 0.2) / 0.8, 1);
        disc.a = a;
      });
    };

    const moveDots = () => {
      dots.forEach((dot) => {
        const v = tweenValue(0, 0.001, 1 - dot.d.sx * dot.d.sy, 'outExpo'); 
        dot.p = (dot.p + v) % 1;
      });
    };

    const drawDiscs = () => {
      ctx.strokeStyle = discStroke; // ✅ Dynamic Stroke (Dark/Light)
      ctx.lineWidth = 1;
      discs.forEach((disc) => {
        ctx.beginPath();
        ctx.globalAlpha = disc.a * 0.1; 
        ctx.ellipse(disc.x, disc.y + disc.h, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      });
    };

    const drawDots = () => {
      dots.forEach((dot) => {
        const { d, a, p, c, o } = dot;
        const _p = d.sx * d.sy;
        
        ctx.fillStyle = c;
        const newA = a + (Math.PI * 2 * p);
        const x = d.x + Math.cos(newA) * d.w;
        const y = d.y + Math.sin(newA) * d.h;
        
        ctx.globalAlpha = d.a * o; 
        ctx.beginPath();
        ctx.arc(x, y + d.h, 1 + _p * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    };

    const tick = () => {
      if (!ctx) return;
      // ✅ Clear with Dynamic Background Color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.scale(render.dpi, render.dpi);
      moveDiscs();
      moveDots();
      drawDiscs();
      drawDots();
      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    const init = () => {
      setCanvasSize();
      setDiscs();
      setDots();
      tick();
    };

    init();

    const handleResize = () => {
      setCanvasSize();
      setDiscs(); 
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // ✅ Jab Theme change ho, tab dobara run kare

  return (
    // ✅ Container Background bhi change hoga
    <div className={`absolute inset-0 w-full h-full overflow-hidden z-0 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BlackHoleBackground;