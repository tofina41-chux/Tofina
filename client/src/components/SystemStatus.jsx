import React, { useState, useEffect } from 'react';
import SystemStatus from './SystemStatus'; // Brings in the live tracking clock node

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [mockupImages, setMockupImages] = useState([
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" // High-tech fallback image
  ]);
  
  const strings = ["CREATORS.", "DEVELOPERS.", "LOCAL BUSINESSES.", "BRANDS."];

  // 1. Fetch live uploaded project images straight from your dashboard forms
  useEffect(() => {
    const fetchDashboardImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        
        if (data && data.length > 0) {
          const dashboardImages = data
            .map(project => project.imageUrl)
            .filter(img => img !== null && img !== undefined);
          
          if (dashboardImages.length > 0) {
            setMockupImages(dashboardImages);
          }
        }
      } catch (err) {
        console.log("No custom projects uploaded yet. Displaying core backup viewport system.");
      }
    };

    fetchDashboardImages();
  }, []);

  // 2. Control interactive cursor states and blinking terminal slideshows
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const stringInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % strings.length);
    }, 2500);

    const frameTimer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % mockupImages.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stringInterval);
      clearInterval(frameTimer);
    };
  }, [mockupImages.length]);

  return (
    <section id="home" className="min-h-screen bg-white text-swiss-dark dark:bg-swiss-dark dark:text-white flex flex-col justify-center px-6 pt-32 relative overflow-hidden transition-colors duration-300">
      
      {/* 1. ATMOSPHERE BACKDROP LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-swiss-green/10 blur-[140px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-navy/40 blur-[140px] rounded-full animate-float-delayed"></div>
      </div>

      {/* 2. INTERACTIVE MOUSE GLOW */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(1, 195, 141, 0.05), transparent 60%)`
        }}
      />

      {/* 3. TEXTURE MATRIX GRID */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #696E79 1px, transparent 1px), linear-gradient(to bottom, #696E79 1px, transparent 1px)`, 
             backgroundSize: '60px 60px' 
           }}>
      </div>

      {/* 4. CONTENT GRID FRAME CONTAINER */}
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* LEFT COLUMN: BRAND IDENTIFIERS (Takes up 6 of 12 columns) */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          
          {/* Mombasa Realtime Tracker Node */}
          <div className="w-fit mb-2">
            <SystemStatus />
          </div>

          <h2 className="text-swiss-green font-mono text-sm tracking-[0.4em] uppercase">
            Frontend Developer & Creative Technologist
          </h2>
          
          <h1 className="text-7xl md:text-[8.5rem] font-black text-swiss-green tracking-tighter leading-[0.85] select-none drop-shadow-[0_0_30px_rgba(1,195,141,0.15)]">
            Tofina<span className="text-swiss-dark dark:text-white inline-block animate-bounce">.</span>
          </h1>

          {/* Marquee Ticker */}
          <div className="w-full max-w-xl overflow-hidden relative py-2 mask-linear">
            <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-xs tracking-[0.3em] text-swiss-dark/40 dark:text-white/30 uppercase">
              <span>• Full-Stack Automation</span>
              <span>• UI/UX Design</span>
              <span>• AWS Cloud Infrastructure</span>
              <span>• Custom Digital Tools</span>
              <span>• Full-Stack Automation</span>
              <span>• UI/UX Design</span>
            </div>
          </div>
          
          <p className="text-swiss-dark/80 dark:text-swiss-grey text-xl md:text-2xl max-w-xl leading-relaxed font-light min-h-[4rem] lg:min-h-[auto]">
            I build clean websites, automation systems, and digital tools for {' '}
            <span className="text-swiss-green font-bold transition-all duration-500 underline decoration-swiss-green/20 underline-offset-8">
              {strings[index]}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a 
              href="#projects" 
              className="group relative px-10 py-4 bg-swiss-green text-swiss-dark rounded-full font-black overflow-hidden transition-all text-center hover:scale-105 shadow-[0_0_30px_rgba(1,195,141,0.2)]"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs">Explore Work</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            
            <a 
              href="http://localhost:5000/uploads/Cynthia_Wafula_CV.pdf" 
              download="Cynthia_Wafula_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-transparent border border-swiss-dark/20 dark:border-white/10 hover:bg-swiss-dark/5 dark:hover:bg-white/5 text-swiss-dark dark:text-white font-mono text-xs font-bold uppercase rounded-xl tracking-widest text-center transition-all"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: ENLARGED TERMINAL SCREEN DISPLAY VIEWPORT (Expanded to 6 of 12 columns) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full">
          {/* Scaled footprint up to max-w-2xl and increased base height ratio */}
          <div className="relative w-full aspect-[4/3] bg-swiss-navy/40 dark:bg-swiss-navy/80 border border-swiss-dark/10 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-2 max-w-2xl transition-all duration-300">
            
            {/* Terminal Window Header Controls */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-swiss-dark/5 dark:border-white/5 font-mono text-[9px] text-swiss-grey uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-red-500/40"></span>
              <span className="h-2 w-2 rounded-full bg-yellow-500/40"></span>
              <span className="h-2 w-2 rounded-full bg-swiss-green/40"></span>
              <span className="ml-2 font-bold text-swiss-green">live_preview_node.exe</span>
            </div>

            {/* Core Image Display Frame */}
            <div className="w-full h-[calc(100%-28px)] rounded-2xl overflow-hidden bg-swiss-dark relative">
              <img 
                src={mockupImages[imageIndex]} 
                alt="Infrastructure Render Screen" 
                className="w-full h-full object-cover transition-opacity duration-150" 
              />
              
              {/* Scanline CRT overlay filter layer */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none"></div>
            </div>

          </div>
        </div>

      </div> {/* <-- This closing tag resolves the Vite compile crash perfectly! */}
    </section>
  );
};

export default Hero;