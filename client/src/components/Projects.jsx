import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`);
        const data = await response.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (err) { 
        console.error("Error linking projects pipeline:", err); 
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-swiss-dark px-6">
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
                {/* Image Frame Container - NO MORE GRAYSCALE */}
                <div className="aspect-video w-full overflow-hidden bg-swiss-dark border-b border-white/5">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700" 
                  />
                </div>
                
                {/* Content Block */}
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
              
              {/* Operational Anchors Footer */}
              <div className="px-8 pb-8 pt-2 flex gap-6 text-xs font-mono border-t border-white/5 mt-auto">
                <a 
                  href={project.liveLink || '#'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`transition-colors flex items-center gap-1 font-bold ${project.liveLink ? 'text-white hover:text-swiss-green' : 'text-swiss-grey cursor-not-allowed opacity-60'}`}
                >
                  <span>⚡ Launch Live App</span>
                </a>
                <a 
                  href={project.githubLink || '#'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`transition-colors flex items-center gap-1 ${project.githubLink ? 'text-swiss-grey hover:text-white' : 'text-swiss-grey cursor-not-allowed opacity-60'}`}
                >
                  <span>📁 View Code Base</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center font-mono text-xs text-swiss-grey/40 py-12">
            No live deployment packages found in core pipeline.
          </p>
        )}

      </div>
    </section>
  );
};

export default Projects;