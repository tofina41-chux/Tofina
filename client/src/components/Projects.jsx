const projects = [
  {
    title: "Yumm Restaurant",
    desc: "A responsive restaurant site built for Mount Kenya University.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#"
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <section className="py-20 bg-slate-800 px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-sky-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-slate-400 mb-4">{p.desc}</p>
            <div className="flex gap-2">
              {p.tech.map(t => <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-1 rounded">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;