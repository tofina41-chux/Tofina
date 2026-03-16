const Hero = () => {
  return (
    /* 1. Added id="home" here */
    <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white px-6">
      <div className="max-w-4xl text-center">
        <h2 className="text-sky-400 font-mono mb-4 text-lg">Hi, my name is</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
          Tofina. <br />
          <span className="text-slate-400">I build digital experiences.</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          Frontend Developer & Creative Technologist. I build clean websites, 
          automation systems, and digital tools for businesses and creators.
        </p>
        <div className="flex gap-4 justify-center">
          {/* 2. Changed <button> to <a> and added href="#projects" */}
          <a 
            href="#projects" 
            className="px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold transition-all cursor-pointer"
          >
            View My Work
          </a>
          
          {/* 3. Updated Download CV button for Point 8 */}
          <a 
            href="/CV.pdf" 
            download
            className="px-8 py-3 border border-sky-500 text-sky-500 hover:bg-sky-500/10 rounded-lg font-semibold transition-all cursor-pointer"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;