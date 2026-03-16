const Skills = () => {
  const categories = [
    { title: "Frontend", skills: ["React", "JavaScript", "Tailwind CSS", "HTML5"] },
    { title: "Backend", skills: ["Node.js", "Express", "REST APIs", "Nodemailer"] },
    { title: "Cloud & Design", skills: ["AWS", "Git", "MongoDB", "Canva"] }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Tech Stack</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <h3 className="text-sky-400 font-bold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="bg-slate-900 text-slate-300 px-3 py-1 rounded-md text-sm border border-slate-700">
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