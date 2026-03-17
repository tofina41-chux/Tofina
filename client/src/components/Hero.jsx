const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center bg-swiss-dark px-6 overflow-hidden">
      
      {/* 1. Digital Texture: Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #696E79 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* 2. Ambient Lighting: Large soft glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-swiss-green/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-swiss-navy blur-[120px] rounded-full"></div>

      <div className="max-w-4xl text-center z-10">
        {/* Subtitle with better spacing */}
        <h2 className="text-swiss-green font-mono mb-6 text-sm tracking-[0.4em] uppercase opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
          Frontend Developer & Creative Technologist
        </h2>
        
        {/* Name with high-impact weight */}
        <h1 className="text-7xl md:text-9xl font-black mb-8 text-white tracking-tighter leading-none">
          Tofina<span className="text-swiss-green inline-block animate-bounce-slow">.</span>
        </h1>
        
        {/* Description with high-end font sizing */}
        <p className="text-swiss-grey text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          I build <span className="text-white font-medium italic">clean websites</span>, automation systems, and digital tools for businesses and creators.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Primary Action: Magnetic Glow Button */}
          <a 
            href="#projects" 
            className="group relative px-12 py-5 bg-swiss-green text-swiss-dark rounded-full font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(1,195,141,0.3)] hover:shadow-[0_0_40px_rgba(1,195,141,0.5)]"
          >
            <span className="relative z-10 uppercase tracking-widest">Explore Work</span>
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

      {/* 3. Subtle Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
        <span className="text-[10px] font-mono tracking-widest uppercase text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-swiss-green to-transparent"></div>
      </div>

    </section>
  );
};

export default Hero;