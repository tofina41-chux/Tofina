const Skills = () => {
  const categories = [
    { title: "Frontend", skills: ["React", "JavaScript", "Tailwind CSS", "HTML5"] },
    { title: "Backend", skills: ["Node.js", "Express", "REST APIs", "Nodemailer"] },
    { title: "Cloud & Design", skills: ["AWS", "Git", "MongoDB", "Canva"] }
  ];

  return (
    <section id="skills" className="py-24 bg-swiss-navy px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 text-center tracking-tight">
          Technical <span className="text-swiss-green">Expertise</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="group p-8 bg-swiss-dark rounded-3xl border border-white/5 hover:border-swiss-green/20 hover:shadow-[0_0_40px_rgba(1,195,141,0.1)] transition-all duration-500">
              
              {/* Category Title with extra spacing */}
              <h3 className="text-swiss-green font-mono text-[10px] tracking-[0.3em] uppercase mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                {cat.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-white/5 border border-white/5 text-white/70 text-xs font-bold rounded-xl tracking-wide uppercase transition-all duration-300 hover:bg-swiss-green/10 hover:text-swiss-green hover:border-swiss-green/30 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;