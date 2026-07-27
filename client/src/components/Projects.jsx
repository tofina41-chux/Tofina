import React from 'react';

const projects = [
  {
    id: 1,
    title: 'MYR | Art Direction & Curatorial Archive',
    category: 'Client Project',
    description:
      'A high-end, minimalist digital archive built for Myrna, a Mombasa-based Art Director and Curator. This platform serves as a visual portfolio, a journal for field notes, and a catalogue of professional services.',
    tags: ['MERN', 'Dashboard', 'API'],
    imageUrl: '/myrna.png',
    liveLink: 'https://myr-art-direction.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/MyrnA'
  },

  {
    id: 2,
    title: 'Tofina Portfolio',
    category: 'Personal Portfolio',
    description:
      'A polished personal portfolio showcasing cloud-native web design, scalable MERN architecture and modern deployment workflows with a strong focus on performance and refined user experience.',
    tags: ['React', 'AWS', 'Portfolio'],
    imageUrl: '/tofina.png',
    liveLink: 'https://tofina-portfolio.vercel.app',
    githubLink: 'https://github.com/tofina41-chux/Tofina'
  },

  {
    id: 3,
    title: 'Tofina Sparkle Solutions',
    category: 'Business Website',
    description:
      'A responsive business website for a professional cleaning company featuring service showcases, quotation requests, project galleries and customer contact workflows.',
    tags: ['React', 'Business', 'Responsive'],
    imageUrl: '/tss.png',
    liveLink: 'https://tofina-sparkle-solutions.vercel.app/',
    githubLink:
      'https://github.com/tofina41-chux/Tofina-sparkle-solutions'
  },

  {
    id: 4,
    title: 'Story Forge',
    category: 'Web Application',
    description:
      'An interactive storytelling platform where readers influence the narrative through collaborative voting and community participation, creating dynamic reading experiences.',
    tags: ['React', 'Interactive', 'AI-Assisted'],
    imageUrl: '/sfg.png',
    liveLink: 'https://story-forge-vote.lovable.app/',
    githubLink: 'https://github.com/tofina41-chux/story-forge-vote'
  }
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-swiss-dark px-6 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">

        <div className="mb-16">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase block mb-3">
            Production / Repositories
          </span>

          <h2 className="text-4xl font-black text-white tracking-tight">
            Selected Architecture
            <span className="text-swiss-green">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {projects.map((project) => (

            <div
              key={project.id}
              className="group bg-swiss-navy/40 border border-white/5 rounded-3xl overflow-hidden hover:border-swiss-green/40 transition-all duration-500 shadow-xl flex flex-col h-full"
            >

              <div className="overflow-hidden bg-swiss-dark">

                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-8 flex flex-col flex-grow">

                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-swiss-green mb-5">
                  {project.category}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-swiss-green/10 border border-swiss-green/20 text-swiss-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-swiss-green transition-colors">
                  {project.title}
                </h3>

                <p className="text-swiss-grey/90 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex gap-4 mt-auto">

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-3 rounded-xl border border-swiss-green text-swiss-green font-semibold text-sm transition-all duration-300 hover:bg-swiss-green hover:text-swiss-dark"
                  >
                    Live Preview
                  </a>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-3 rounded-xl border border-white/10 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/5 hover:border-white/30"
                  >
                    Source Code
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Projects;