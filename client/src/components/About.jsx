const About = () => {
  return (
    /* Using Swiss Navy for a subtle section break from the Hero's Swiss Dark */
    <section id="about" className="py-24 bg-swiss-navy px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side: Styled with the Green Glow theme */}
          <div className="relative aspect-square rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-swiss-green/10 group-hover:bg-swiss-green/5 transition-colors z-10"></div>
            <div className="absolute inset-0 border-2 border-swiss-green/20 rounded-3xl z-20"></div>
            
            {/* Placeholder for your photo */}
            <div className="w-full h-full bg-swiss-dark flex items-center justify-center">
               <span className="text-swiss-grey font-mono text-sm tracking-widest uppercase">
                 [ Tofina.img ]
               </span>
            </div>

            {/* Accent Glow Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-swiss-green/20 blur-3xl rounded-full"></div>
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
              About <span className="text-swiss-green">Me</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              I'm a developer based in Kenya who enjoys building functional, clean, and 
              visually appealing digital tools. I don't just write code — I focus on 
              solving real problems for businesses and creators.
            </p>

            <p className="text-swiss-grey text-lg mb-8 leading-relaxed">
              I'm currently expanding my skills in <span className="text-white font-semibold">AWS and automation systems</span>, exploring 
              how technology can help local businesses operate smarter and grow their 
              digital presence. Whether it's a restaurant website or a custom digital tool, 
              my focus is always the same: <span className="text-swiss-green italic font-medium">simple, efficient, and frictionless experiences.</span>
            </p>

            {/* Skills Mini-Grid (replacing the old stats) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-swiss-dark/50 border border-white/5 rounded-2xl">
                <p className="text-swiss-green font-bold text-sm uppercase tracking-wider mb-1">Focus</p>
                <p className="text-white/90 font-medium">Creative Tech</p>
              </div>
              <div className="p-4 bg-swiss-dark/50 border border-white/5 rounded-2xl">
                <p className="text-swiss-green font-bold text-sm uppercase tracking-wider mb-1">Location</p>
                <p className="text-white/90 font-medium">Kenya</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;