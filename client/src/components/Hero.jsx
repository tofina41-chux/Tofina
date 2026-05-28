import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  
  // 🌍 Global Language Toggle State Matrix (Default: English)
  const [language, setLanguage] = useState('EN');

  const [mockupImages, setMockupImages] = useState([
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" // High-tech baseline display
  ]);

  // 📝 Complete English & Swahili Localization Dictionaries
  const contentMatrix = {
    EN: {
      subtitle: "Frontend Developer & Creative Technologist",
      marquee: ["• Full-Stack Automation", "• UI/UX Design", "• AWS Cloud Infrastructure", "• Custom Digital Tools"],
      pitch: "I build clean websites, automation systems, and digital tools for ",
      strings: ["CREATORS.", "DEVELOPERS.", "LOCAL BUSINESSES.", "BRANDS."],
      btnExplore: "Explore Work",
      btnCV: "Download CV"
    },
    SW: {
      subtitle: "Msanidi Programu wa Frontend na Mtaalamu wa Ubunifu",
      marquee: ["• Mifumo ya Kiotomatiki", "• Ubunifu wa UI/UX", "• Miundombinu ya AWS Cloud", "• Zana Maalum za Kidijitali"],
      pitch: "Mimi huunda tovuti safi, mifumo ya kiotomatiki, na zana za kidijitali kwa ajili ya ",
      strings: ["WABUNIFU.", "WASANIDI PROGRAMU.", "BIASHARA ZA MTAANI.", "MASHIRIKA."],
      btnExplore: "Kagua Kazi Zangu",
      btnCV: "Pakua CV Yangu"
    }
  };

  const currentStrings = contentMatrix[language].strings;

  // ⏱️ Live Running Clock Logic Array
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  // 🖥️ Dynamic screenshot tracking stream from your project dashboard
  useEffect(() => {
    const fetchDashboardImages = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`);
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
        console.log("Displaying fallback dashboard viewports.");
      }
    };
    fetchDashboardImages();
  }, []);

  // 🔄 UI Intervals for phrase looping and terminal image blinking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const stringInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentStrings.length);
    }, 2500);

    const frameTimer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % mockupImages.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stringInterval);
      clearInterval(frameTimer);
    };
  }, [mockupImages.length, currentStrings.length]);

  return (
    <section id="home" className="min-h-screen bg-white text-swiss-dark dark:bg-swiss-dark dark:text-white flex flex-col justify-center px-6 pt-32 relative overflow-hidden transition-colors duration-300">
      
      {/* LANGUAGE FLOATING CONTROLLER TOGGLE PILL */}
      <div className="absolute top-24 right-6 z-50">
        <button 
          onClick={() => setLanguage(prev => prev === 'EN' ? 'SW' : 'EN')}
          className="flex items-center gap-2 bg-swiss-green text-swiss-dark font-mono text-xs font-black px-4 py-2 rounded-xl shadow-lg border border-swiss-green/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
        >
          <span>🌐</span>
          <span>{language === 'EN' ? 'Swahili' : 'English'}</span>
        </button>
      </div>

      {/* ATMOSPHERE BACKDROP EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-swiss-green/10 blur-[140px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-navy/40 blur-[140px] rounded-full animate-float-delayed"></div>
      </div>

      {/* INTERACTIVE RADIAL MOUSE MASK */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(1, 195, 141, 0.05), transparent 60%)`
        }}
      />

      {/* TECH GEOMETRIC MICROGRID */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #696E79 1px, transparent 1px), linear-gradient(to bottom, #696E79 1px, transparent 1px)`, 
             backgroundSize: '60px 60px' 
           }}>
      </div>

      {/* LAYOUT CONTAINER MATRIX */}
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* LEFT LAYOUT COLUMN: BRAND DATA OPERATORS */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          
          {/* 📍 FIXED: HIGH-VISIBILITY EMBEDDED MOMBASA TRACKER PILL */}
          <div className="inline-flex items-center gap-3 bg-swiss-dark/5 dark:bg-white/5 border border-swiss-green text-swiss-dark dark:text-white px-4 py-2 rounded-xl font-mono text-[10px] tracking-wider shadow-md select-none">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-swiss-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-swiss-green"></span>
              </span>
              <span className="font-black text-swiss-green">SYS_NOMINAL</span>
            </div>
            <div className="h-3 w-[1px] bg-swiss-dark/20 dark:bg-white/20"></div>
            <div>
              <span className="opacity-60 font-bold">LOC:</span> <span className="font-bold">MOMBASA, KE</span>
            </div>
            <div className="h-3 w-[1px] bg-swiss-dark/20 dark:bg-white/20"></div>
            <div>
              <span className="opacity-60 font-bold">TIME:</span> <span className="text-swiss-green font-black tabular-nums">{formatTime(time)}</span>
            </div>
          </div>

          <h2 className="text-swiss-green font-mono text-sm tracking-[0.4em] uppercase">
            {contentMatrix[language].subtitle}
          </h2>
          
          <h1 className="text-7xl md:text-[8.5rem] font-black text-swiss-green tracking-tighter leading-[0.85] select-none drop-shadow-[0_0_30px_rgba(1,195,141,0.15)]">
            Tofina<span className="text-swiss-dark dark:text-white inline-block animate-bounce">.</span>
          </h1>

          {/* Dynamic Infinite Marquee - Fully Localized */}
          <div className="w-full max-w-xl overflow-hidden relative py-2 mask-linear">
            <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-[11px] tracking-[0.25em] text-swiss-dark/50 dark:text-white/40 uppercase">
              {contentMatrix[language].marquee.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
              {contentMatrix[language].marquee.map((item, i) => (
                <span key={`dup-${i}`}>{item}</span>
              ))}
            </div>
          </div>
          
          <p className="text-swiss-dark/80 dark:text-swiss-grey text-xl md:text-2xl max-w-xl leading-relaxed font-light min-h-[4rem] lg:min-h-[auto]">
            {contentMatrix[language].pitch}
            <span className="text-swiss-green font-bold transition-all duration-500 underline decoration-swiss-green/20 underline-offset-8">
              {currentStrings[index]}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a 
              href="#projects" 
              className="group relative px-10 py-4 bg-swiss-green text-swiss-dark rounded-full font-black overflow-hidden transition-all text-center hover:scale-105 shadow-[0_0_30px_rgba(1,195,141,0.2)]"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs">
                {contentMatrix[language].btnExplore}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            
            <a 
              href={`${API_BASE}/uploads/Cynthia_Wafula_CV.pdf`} 
              download="Cynthia_Wafula_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-transparent border border-swiss-dark/20 dark:border-white/10 hover:bg-swiss-dark/5 dark:hover:bg-white/5 text-swiss-dark dark:text-white font-mono text-xs font-bold uppercase rounded-xl tracking-widest text-center transition-all"
            >
              {contentMatrix[language].btnCV}
            </a>
          </div>
        </div>

        {/* RIGHT LAYOUT COLUMN: COMMAND DISPLAY MONITOR */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full">
          <div className="relative w-full aspect-[4/3] bg-swiss-navy/40 dark:bg-swiss-navy/80 border border-swiss-dark/10 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-2 max-w-2xl transition-all duration-300">
            
            {/* Terminal Window Action Bar */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-swiss-dark/5 dark:border-white/5 font-mono text-[9px] text-swiss-grey uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-red-500/40"></span>
              <span className="h-2 w-2 rounded-full bg-yellow-500/40"></span>
              <span className="h-2 w-2 rounded-full bg-swiss-green/40"></span>
              <span className="ml-2 font-bold text-swiss-green">live_preview_node.exe</span>
            </div>

            {/* Core Viewport Layer */}
            <div className="w-full h-[calc(100%-28px)] rounded-2xl overflow-hidden bg-swiss-dark relative">
              <img 
                src={mockupImages[imageIndex]} 
                alt="System Metric Screen" 
                className="w-full h-full object-cover transition-opacity duration-150" 
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;