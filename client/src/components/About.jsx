import React, { useState, useEffect } from 'react';

const About = () => {
  // Pointing to a public folder image or a route from your Port 5000 server
  const [profileImg, setProfileImg] = useState("/profile.jpg"); 

  return (
    <section id="about" className="py-24 bg-swiss-navy px-6 relative overflow-hidden">
      
      {/* Decorative architectural layout detail line */}
      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side: Enhanced Image Display */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-swiss-dark via-transparent to-transparent z-10 opacity-60"></div>
            <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 transition-colors group-hover:border-swiss-green/30"></div>
            
            {/* Dynamic Image handling fallback neatly */}
            <img 
              src={profileImg} 
              alt="Cynthia Wafula" 
              onError={() => setProfileImg("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80")}
              className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />

            {/* Floating Title Stamp inside image container */}
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-xs font-mono tracking-widest text-swiss-green uppercase mb-1">Identity</p>
              <h3 className="text-xl font-bold text-white tracking-tight">Cynthia Wafula</h3>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-swiss-green"></span>
              <span className="text-swiss-green font-mono text-xs tracking-widest uppercase">01 / Background</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight leading-none">
              Engineering <span className="text-swiss-green">Systems</span> With Aesthetic Precision.
            </h2>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              I am an IT professional and Creative Designer based in Kenya. I bridge the gap between heavy infrastructure architecture and clean frontend user interaction, turning complex code pipelines into lightweight digital assets.
            </p>

            <p className="text-swiss-grey text-base mb-8 leading-relaxed">
              Specializing in the <span className="text-white font-medium">MERN Stack, Django, and AWS Cloud deployments</span>, I scale solutions tailored for efficiency. With deep domain knowledge in digital asset optimization and technical communication, I shape automation workflows that help digital products gain visibility and run smoothly.
            </p>

            {/* Concrete Analytics Counters replacing the basic placeholder text grids */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              <div>
                <p className="text-3xl font-black text-white tracking-tight mb-1">MERN</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Architecture</p>
              </div>
              <div>
                <p className="text-3xl font-black text-swiss-green tracking-tight mb-1">AWS</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Cloud Sync</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white tracking-tight mb-1">UI/UX</p>
                <p className="text-xs font-mono text-swiss-grey tracking-wider uppercase">Optimization</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;