import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);
  
  const strings = ["CREATORS.", "DEVELOPERS.", "LOCAL BUSINESSES.", "BRANDS."];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Smooth looping cycle for text phrases
    const stringInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % strings.length);
    }, 2500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stringInterval);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center bg-swiss-dark px-6 overflow-hidden">
      
      {/* 1. ATMOSPHERE LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-swiss-green/10 blur-[140px] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-swiss-navy/40 blur-[140px] rounded-full animate-float-delayed"></div>
      </div>

      {/* 2. INTERACTIVE LAYER */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(1, 195, 141, 0.05), transparent 60%)`
        }}
      />

      {/* 3. TEXTURE LAYER */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #696E79 1px, transparent 1px), linear-gradient(to bottom, #696E79 1px, transparent 1px)`, 
             backgroundSize: '60px 60px' 
           }}>
      </div>

      {/* 4. CONTENT */}
      <div className="max-w-5xl text-center z-10 flex flex-col items-center">
        <h2 className="text-swiss-green font-mono mb-6 text-sm tracking-[0.4em] uppercase animate-pulse">
          Frontend Developer & Creative Technologist
        </h2>
        
        <h1 className="text-7xl md:text-[9rem] font-black mb-4 text-white tracking-tighter leading-[0.85]">
          Tofina<span className="text-swiss-green inline-block animate-bounce">.</span>
        </h1>

        {/* Dynamic Infinite Marquee - Solves the dead space natively */}
        <div className="w-screen max-w-xl overflow-hidden mb-10 relative py-2 mask-linear">
          <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono text-xs tracking-[0.3em] text-white/30 uppercase">
            <span>• Full-Stack Automation</span>
            <span>• UI/UX Design</span>
            <span>• AWS Cloud Infrastructure</span>
            <span>• Custom Digital Tools</span>
            <span>• Full-Stack Automation</span>
            <span>• UI/UX Design</span>
          </div>
        </div>
        
        <p className="text-swiss-grey text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light h-16 md:h-8">
          I build clean websites, automation systems, and digital tools for {' '}
          <span className="text-swiss-green font-bold transition-all duration-500 underline decoration-swiss-green/20 underline-offset-8">
            {strings[index]}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="#projects" 
            className="group relative px-12 py-5 bg-swiss-green text-swiss-dark rounded-full font-black overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(1,195,141,0.2)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-sm">Explore Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          
          <a 
            href="/CV.pdf" 
            download
            className="px-12 py-5 border border-white/10 text-white rounded-full font-bold hover:bg-white/5 transition-all tracking-widest uppercase text-sm"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll Call-to-Action */}
      <div className="absolute bottom-10 flex flex-col items-center gap-3 opacity-30">
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-white">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-swiss-green via-swiss-green/50 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;