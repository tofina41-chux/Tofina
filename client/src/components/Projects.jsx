import { useState } from 'react';
import { PROJECTS, PROJECT_FILTERS } from '../data/site';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const visible = PROJECTS.filter((p) => filter === 'all' || p.type === filter);

  return (
    <section id="projects" className="py-24 bg-swiss-dark px-6 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="text-swiss-green font-mono text-xs tracking-[0.4em] uppercase block mb-3">
            Production / Repositories
          </span>
          <h2 className="text-4xl font-black text-fg tracking-tight">
            Selected Work<span className="text-swiss-green">.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12" role="group" aria-label="Filter projects">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest border transition-all ${
                filter === f.key
                  ? 'bg-swiss-green text-swiss-dark border-swiss-green font-black'
                  : 'border-fg/10 text-swiss-grey hover:border-swiss-green/40 hover:text-swiss-green'
              }`}
            >
              {f.label}
            </button>
          ))}
          <a href="#gallery" className="ml-auto font-mono text-xs uppercase tracking-widest text-swiss-green hover:underline underline-offset-4">
            Design work → Creative Gallery
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {visible.map((project) => (
            <article
              key={project.id}
              className="group bg-swiss-navy border border-fg/5 rounded-3xl overflow-hidden hover:border-swiss-green/40 transition-all duration-500 shadow-xl flex flex-col h-full"
            >
              <div className="overflow-hidden bg-swiss-dark h-64">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-swiss-navy to-swiss-dark"
                    role="img"
                    aria-label={`${project.title} (screenshot coming soon)`}
                  >
                    <span className="text-swiss-green/70 font-black text-3xl tracking-tight px-6 text-center">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-swiss-green mb-5">
                  {project.kind}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-swiss-green/10 border border-swiss-green/20 text-swiss-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-fg mb-4 tracking-tight group-hover:text-swiss-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-swiss-grey/90 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {(project.liveLink || project.githubLink) && (
                  <div className="flex gap-4 mt-auto">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-3 rounded-xl border border-swiss-green text-swiss-green font-semibold text-sm transition-all duration-300 hover:bg-swiss-green hover:text-swiss-dark"
                      >
                        Live Preview
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-3 rounded-xl border border-fg/10 text-fg font-semibold text-sm transition-all duration-300 hover:bg-fg/5 hover:border-fg/30"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
