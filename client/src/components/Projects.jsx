import React from 'react';

const projects = [
  {
    id: 1,
    title: 'MYR | Art Direction & Curatorial Archive',
    description: 'A high-end, minimalist digital archive built for Myrna, a Mombasa-based Art Director and Curator. This platform serves as a visual portfolio, a journal for field notes, and a catalog of professional services.',
    tags: ['MERN', 'Dashboard', 'API'],
    imageUrl: 'https://6a2b01f09e041c30a1857ea5.imgix.net/images/Screenshot%202026-05-27%20212207.png',
    liveLink: 'https://myr-art-direction.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/MyrnA'
  },
  {
    id: 2,
    title: 'My portfolio',
    description: 'A modern cloud operations interface with serverless deployment patterns, automated build sync, and secure token-based user flows for enterprise tools.',
    tags: ['AWS', 'Serverless', 'Design'],
    imageUrl: 'https://6a2b01f09e041c30a1857ea5.imgix.net/images/Screenshot%202026-06-13%20235717.png',
    liveLink: 'https://tofina-portfolio.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/Tofina'
  },
  {
    id: 3,
    title: 'Design Ops System',
    description: 'A lightweight front-end product suite for visual teams, focusing on component consistency, performance-first UI, and optimized asset delivery.',
    tags: ['UI/UX', 'Performance', 'Design'],
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
    liveLink: 'https://tofina-portfolio.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-swiss-dark px-6 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase block mb-3">
            Production / Repositories
          </span>
          <h2 className="text-4xl font-black text-white tracking-tight">
            Selected Architecture<span className="text-swiss-green">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-swiss-navy/40 border border-white/5 rounded-3xl overflow-hidden hover:border-swiss-green/40 transition-all duration-500 shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden bg-swiss-dark border-b border-white/5">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                  />
                </div>

                <div className="p-8">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-swiss-green/10 border border-swiss-green/20 px-3 py-1 rounded-full text-swiss-green uppercase tracking-wider font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-swiss-green transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-swiss-grey/90 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 flex gap-6 text-xs font-mono border-t border-white/5 mt-auto">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors flex items-center gap-1 font-bold text-white hover:text-swiss-green"
                >
                  <span>⚡ Launch Live App</span>
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors flex items-center gap-1 text-swiss-grey hover:text-white"
                >
                  <span>📁 View Code Base</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
