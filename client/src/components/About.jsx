const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Visual Side: Portrait or Graphic */}
          <div className="relative aspect-square bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent"></div>
            {/* Replace this text with an <img src="..." /> later */}
            <p className="text-slate-500 font-mono text-sm group-hover:scale-110 transition-transform duration-500">
              [Your Photo / Illustration]
            </p>
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700">
              <p className="text-xs text-sky-400 font-mono italic">"Simple, efficient, and frictionless."</p>
            </div>
          </div>

          {/* Text Side: Your Personality */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            
            <p className="text-slate-400 text-lg mb-4 leading-relaxed">
              I'm a developer based in Kenya who enjoys building functional, clean, and 
              visually appealing digital tools. I don't just write code — I focus on 
              solving real problems for businesses and creators.
            </p>

            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              I'm currently expanding my skills in **AWS and automation systems**, exploring 
              how technology can help local businesses operate smarter and grow their 
              digital presence. Whether it's a restaurant website or a custom digital tool, 
              my focus is always the same: **simple, efficient, and frictionless experiences.**
            </p>

            {/* Quick Facts / Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition-colors">
                <h4 className="text-sky-400 font-bold text-xl">Kenya</h4>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Location</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition-colors">
                <h4 className="text-sky-400 font-bold text-xl">LTS</h4>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Stack Focus</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;