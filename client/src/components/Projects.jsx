import { useState } from 'react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { 
      title: "MYR Art Direction", 
      desc: "Minimalist curatorial archive & admin suite.", 
      longDesc: "Designed a high-fidelity digital archive for a professional art director. The core challenge was balancing a minimalist 'gallery' aesthetic with a heavy-duty admin suite. I implemented a custom journal system and a searchable media library with Cloudinary, ensuring the client could update their portfolio without touching a single line of code.",
      tech: ["React", "Node.js", "MongoDB", "Cloudinary"],
      link: "#" // Add your link here
    },
    { 
      title: "BS1 Room Booking", 
      desc: "A full-stack MERN solution for seamless space management.", 
      longDesc: "A dual-version (BS1/BS2) room management system built to eliminate scheduling friction. I focused on building a robust backend architecture using the MERN stack to handle real-time booking conflicts. The dashboard provides a clean, visual representation of availability, making it accessible for non-technical users.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      link: "#"
    },
    { 
      title: "University Portal", 
      desc: "Custom PHP & MySQL assignment portal for campus efficiency.", 
      longDesc: "A centralized assignment and grading portal developed to bridge the gap between students and faculty. Using PHP and MySQL, I architected a relational database that handles secure file submissions and automated deadline tracking. This reduced the administrative load for instructors by 40%.",
      tech: ["PHP", "MySQL", "Tailwind"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-swiss-dark px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 text-center tracking-tight">
          Featured <span className="text-swiss-green">Work</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedProject(p)}
              className="group bg-swiss-navy/40 border border-white/5 p-8 rounded-3xl hover:border-swiss-green/30 transition-all cursor-pointer relative overflow-hidden"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-swiss-green transition-colors">{p.title}</h3>
              <p className="text-swiss-grey mb-6 leading-relaxed text-sm">{p.desc}</p>
              <span className="text-swiss-green text-xs font-bold uppercase tracking-widest">View Details →</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL OVERLAY --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-swiss-dark/80">
          <div className="bg-swiss-navy border border-white/10 max-w-2xl w-full rounded-[2rem] p-8 md:p-12 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-swiss-grey hover:text-white transition-colors"
            >
              ✕ Close
            </button>

            <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tech.map(t => (
                <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-swiss-green bg-swiss-green/10 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {selectedProject.longDesc}
            </p>

            <div className="flex gap-4">
              <a href={selectedProject.link} className="px-8 py-3 bg-swiss-green text-swiss-dark rounded-full font-bold hover:brightness-110 transition-all">
                Live Demo
              </a>
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-8 py-3 border border-swiss-grey text-white rounded-full font-bold hover:bg-white/5 transition-all"
              >
                Back to Work
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;